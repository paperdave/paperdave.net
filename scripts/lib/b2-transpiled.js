/** BackBlaze API */
export class B2 {
  constructor(accountId, applicationKey, options = {}) {
    this.accountId = accountId;
    this.applicationKey = applicationKey;
    this.authExpires = new Date(0);
    if (!accountId || !applicationKey) {
      throw new Error('accountId and applicationKey are required');
    }
    if (accountId.length !== 12 && accountId.length !== 25) {
      throw new Error('Incorrect accountId passed (should be 12 or 25 characters)');
    }
    this.options = Object.assign({ maxConcurrentUploads: 10 }, options);
  }
  /** Gets the authentication object */
  async getAuthorization() {
    if (!this.auth || this.authExpires < new Date()) {
      const response = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(`${this.accountId}:${this.applicationKey}`)}`
        }
      });
      if (!response.ok) {
        throw new B2Error(await response.json());
      }
      this.auth = await response.json();
      this.authExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 - 1000);
    }
    return this.auth;
  }
  /** Makes an API request */
  async request(url, json, init = {}) {
    var _a;
    const auth = await this.getAuthorization();
    const url2 = new URL(url, auth.apiUrl + '/b2api/v2/').toString();
    const headers = new Headers(init.headers);
    headers.set('Authorization', auth.authorizationToken);
    if (json) {
      headers.set('Content-Type', 'application/json');
    }
    if (init.headers) {
      for (const [key, value] of new Headers(init.headers)) {
        headers.set(key, value);
      }
    }
    const response = await fetch(
      url2,
      Object.assign(
        Object.assign(
          { method: (_a = init.method) !== null && _a !== void 0 ? _a : json ? 'POST' : 'GET' },
          init
        ),
        { headers, body: json ? JSON.stringify(json) : init.body }
      )
    );
    if (!response.ok) {
      throw new B2Error(await response.json());
    }
    return response.json();
  }
  /** Gets a bucket object from an id, which is a simple wrapper for future method calls. */
  bucket(idOrName) {
    return new B2Bucket(this, idOrName);
  }
  /**
   * https://www.backblaze.com/b2/docs/b2_list_buckets.html
   *
   * Returns B2Bucket objects instead. To get the data this endpoint returns, use `bucket.getBucketInfo()`,
   * which will return another promise but that one will resolve instantly.
   */
  async listBuckets(options = {}) {
    const auth = await this.getAuthorization();
    const response = await this.request(
      'b2_list_buckets',
      Object.assign({ accountId: auth.accountId }, options)
    );
    return response.buckets.map((info) => new B2Bucket(this, info.bucketId, info));
  }
  async createBucket(options) {
    const bucket = await this.request(
      'b2_create_bucket',
      Object.assign({ accountId: (await this.getAuthorization()).accountId }, options)
    );
    return new B2Bucket(this, bucket.bucketId, bucket);
  }
  async createKey(options) {
    return this.request(
      'b2_create_key',
      Object.assign(
        Object.assign({ accountId: (await this.getAuthorization()).accountId }, options),
        {
          bucketId: options.bucketId
            ? typeof options.bucketId === 'string'
              ? options.bucketId
              : options.bucketId.id
            : undefined
        }
      )
    );
  }
  async deleteKey(keyId) {
    await this.request('b2_delete_key', {
      keyId
    });
  }
  async listKeys(options = {}) {
    return this.request(
      'b2_list_keys',
      Object.assign({ accountId: (await this.getAuthorization()).accountId }, options)
    );
  }
}
export class B2Bucket {
  constructor(b2, id, info) {
    this.b2 = b2;
    this.id = id;
    this.info = info;
    this.uploadTokens = [];
    this.overflowQueue = [];
    if (id.length !== 24) {
      throw new Error(
        'Incorrect bucketId passed (should be 24 characters). Did you pass your bucket name instead? If so, use b2.listBuckets() instead.'
      );
    }
  }
  /** https://www.backblaze.com/b2/docs/b2_list_buckets.html */
  async getBucketInfo() {
    if (!this.info) {
      const account = await this.b2.getAuthorization();
      this.info = await this.b2['request']('b2_list_buckets', {
        accountId: account.accountId,
        bucketId: this.id
      });
    }
    return this.info;
  }
  /**
   * https://www.backblaze.com/b2/docs/b2_copy_file.html
   *
   * Same as API above, except `destinationBucketId` can be a string or a B2Bucket object.
   */
  async copyFile(source, destination, options = {}) {
    return this.b2['request'](
      'b2_copy_file',
      Object.assign(Object.assign({}, options), {
        sourceFileId: source,
        destinationBucketId: options.destinationBucketId
          ? typeof options.destinationBucketId === 'string'
            ? options.destinationBucketId
            : options.destinationBucketId.id
          : undefined,
        fileName: destination
      })
    );
  }
  async deleteBucket() {
    await this.b2['request']('b2_delete_bucket', {
      accountId: (await this.b2.getAuthorization()).accountId,
      bucketId: this.id
    });
  }
  async deleteFileVersion(fileName, fileId, options = {}) {
    await this.b2['request'](
      'b2_delete_file_version',
      Object.assign(Object.assign({}, options), { fileName, fileId })
    );
  }
  async getFileInfo(fileId) {
    return this.b2['request']('b2_get_file_info', {
      fileId
    });
  }
  async getUploadUrl() {
    const token = {
      url: '',
      token: '',
      expires: 0,
      inUse: true
    };
    this.uploadTokens.push(token);
    const url = await this.b2['request']('b2_get_upload_url', {
      bucketId: this.id
    });
    token.url = url.uploadUrl;
    token.token = url.authorizationToken;
    token.expires = Date.now() + 1000 * 60 * 60 * 24;
    token.inUse = false;
    return url;
  }
  async getUploadToken() {
    let token;
    while (!token) {
      token = this.uploadTokens.find((t) => !t.inUse);
      if (this.uploadTokens.length >= this.b2.options.maxConcurrentUploads) {
        await new Promise((resolve) => this.overflowQueue.push(resolve));
      } else {
        await this.getUploadUrl();
      }
    }
    token.inUse = true;
    return [
      token,
      () => {
        var _a;
        token.inUse = false;
        (_a = this.overflowQueue.shift()) === null || _a === void 0 ? void 0 : _a();
      }
    ];
  }
  async hideFile(fileName, fileId) {
    return await this.b2['request']('b2_hide_file', {
      fileName,
      fileId
    });
  }
  async listFileNames(options = {}) {
    return this.b2['request']('b2_list_file_names', Object.assign({ bucketId: this.id }, options));
  }
  async listFileVersions(options = {}) {
    return this.b2['request'](
      'b2_list_file_versions',
      Object.assign({ bucketId: this.id }, options)
    );
  }
  async uploadFile(fileName, data, options = {}) {
    var _a;
    const headers = new Headers();
    const buffer =
      data instanceof Uint8Array
        ? data
        : data instanceof ArrayBuffer
        ? new Uint8Array(data)
        : data['arrayBuffer']
        ? await data.arrayBuffer()
        : new TextEncoder().encode(data);
    headers.set('Content-Length', buffer.byteLength.toString());
    headers.set(
      'Content-Type',
      (_a = options.contentType) !== null && _a !== void 0 ? _a : 'b2/x-auto'
    );
    headers.set('X-Bz-File-Name', encodeURIComponent(fileName));
    if (options.customUploadTimestamp) {
      headers.set(
        'X-Bz-Custom-Upload-Timestamp',
        new Date(options.customUploadTimestamp).getTime().toString()
      );
    }
    if (options.legalHold !== undefined) {
      headers.set('X-Bz-File-Legal-Hold', options.legalHold ? 'on' : 'off');
    }
    if (options.lastModified) {
      headers.set(
        'X-Bz-Info-src_last_modified_millis',
        new Date(options.lastModified).getTime().toString()
      );
    }
    if (options.headers) {
      const inner = new Headers(options.headers);
      for (const header of [
        'content-disposition',
        'content-language',
        'cache-control',
        'expires',
        'content-encoding'
      ]) {
        if (inner.has(header)) {
          headers.set(`X-Bz-Info-${header}`, encodeURIComponent(inner.get(header)));
          inner.delete(header);
        }
      }
      for (const [key, value] of inner) {
        headers.set(`X-Bz-Info-${key}`, value);
      }
    }
    const sha1 = await crypto.subtle.digest('SHA-1', buffer);
    const sha1hex = Array.from(new Uint8Array(sha1))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    headers.set('X-Bz-Content-Sha1', sha1hex);
    const [token, releaseToken] = await this.getUploadToken();
    try {
      headers.set('Authorization', token.token);
      return await this.b2['request'](token.url, undefined, {
        body: buffer,
        headers,
        method: 'POST'
      });
    } finally {
      releaseToken();
    }
  }
}
export class B2Error extends Error {
  constructor(response) {
    super(response.message);
    this.response = response;
    this.status = response.status;
    this.code = response.code;
  }
}
