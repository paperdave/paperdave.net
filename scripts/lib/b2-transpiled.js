// Partial Backblaze Client
export class B2 {
  constructor(accountId, applicationKey) {
    this.accountId = accountId;
    this.applicationKey = applicationKey;
  }
  async authorizeAccount() {
    if (!(!this.account || !this.accountExpires || this.accountExpires < new Date())) {
      return this.account;
    }
    console.log('Authorizing with B2...');
    const response = await fetch(`https://api.backblazeb2.com/b2api/v2/b2_authorize_account`, {
      headers: {
        Authorization: `Basic ${btoa(`${this.accountId}:${this.applicationKey}`)}`
      }
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Failed to authorize with B2: ${response.status} ${response.statusText} - ${text}`
      );
    }
    this.account = await response.json();
    this.accountExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    return this.account;
  }
  async apiRequest(url, init) {
    const account = await this.authorizeAccount();
    const response = await fetch(
      new URL(url, account.apiUrl + '/b2api/v2/').toString(),
      Object.assign(Object.assign({}, init), {
        headers: Object.assign(
          Object.assign(
            { Authorization: account.authorizationToken },
            init.json && {
              'Content-Type': 'application/json'
            }
          ),
          init.headers
        ),
        body: 'json' in init ? JSON.stringify(init.json) : init.body
      })
    );
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Failed to request \`${url}\`: ${response.status} ${response.statusText} - ${text}`
      );
    }
    return response.json();
  }
  async getUploadUrl(bucketId) {
    return this.apiRequest('b2_get_upload_url', {
      method: 'POST',
      json: {
        bucketId
      }
    });
  }
  async uploadFile(uploadUrlOrBucketId, file, options) {
    const uploadUrl =
      typeof uploadUrlOrBucketId === 'string'
        ? await this.getUploadUrl(uploadUrlOrBucketId)
        : uploadUrlOrBucketId;
    const sha1 = await crypto.subtle.digest('sha-1', file);
    const sha1hex = Array.from(new Uint8Array(sha1))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    const name = encodeURIComponent(options.name);
    const length = file.byteLength;
    const modified = options.lastModified ? new Date(options.lastModified).getTime() : null;
    console.log(uploadUrl, uploadUrlOrBucketId);
    const response = await fetch(uploadUrl.uploadUrl, {
      method: 'POST',
      headers: {
        Authorization: uploadUrl.authorizationToken,
        'Content-Type': options.contentType,
        'Content-Length': String(length),
        'X-Bz-File-Name': name,
        'X-Bz-Content-Sha1': sha1hex,
        'X-Bz-Info-src_last_modified_millis': String(modified)
      },
      body: file
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to upload file: ${response.status} ${response.statusText} - ${text}`);
    }
    return response.json();
  }
}
