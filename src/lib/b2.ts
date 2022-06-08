// Partial Backblaze Client

interface B2AccountData {
  absoluteMinimumPartSize: number,
  accountId: string,
  allowed: {
    bucketId: string,
    bucketName: string,
    capabilities: string[],
    namePrefix?: string
  },
  apiUrl: string,
  authorizationToken: string,
  downloadUrl: string,
  recommendedPartSize: number,
  s3ApiUrl: string
}
interface UploadURL {
  uploadUrl: string;
  bucketId: string;
  authorizationToken: string;
}
interface B2UploadOptions {
  name: string;
  contentType: string;
  lastModified?: Date | number;
  // TODO: add the rest of the headers on
  // https://www.backblaze.com/b2/docs/b2_upload_file.html
}
interface B2UploadFileResult {
  fileId: string,
  fileName: string,
  accountId: string,
  bucketId: string,
  contentLength: number,
  contentSha1: string,
  contentType: string,
  fileInfo: Record<string, string>,
  fileRetention: any; // TODO
  legalHold: any; // TODO
  serverSideEncryption: {
    algorithm: string,
    mode: string
  }
}

export class B2 {
  constructor(readonly accountId, readonly applicationKey) { }

  account: B2AccountData = null;
  accountExpires: Date | null = null;

  async authorizeAccount() {
    const response = await fetch(`https://api.backblazeb2.com/b2api/v2/b2_authorize_account`, {
      headers: {
        Authorization: `Basic ${btoa(`${this.accountId}:${this.applicationKey}`)}`,
      }
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to authorize with B2: ${response.status} ${response.statusText} - ${text}`);
    }

    this.account = await response.json();
    this.accountExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);
  }

  async apiRequest(url: string, init: RequestInit & { json?: any }) {
    if (!this.account || this.accountExpires < new Date()) {
      await this.authorizeAccount();
    }

    const response = await fetch(new URL(url, this.account.apiUrl + '/b2api/v2/').toString(), {
      ...init,
      headers: {
        Authorization: this.account.authorizationToken,
        ...init.json && {
          'Content-Type': 'application/json',
        },
        ...init.headers,
      },
      body: ('json' in init) ? JSON.stringify(init.json) : init.body,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to request \`${url}\`: ${response.status} ${response.statusText} - ${text}`);
    }

    return response.json();
  }

  async getUploadUrl(bucketId: string): Promise<UploadURL> {
    return this.apiRequest('b2_get_upload_url', {
      method: 'POST',
      json: {
        bucketId,
      },
    });
  }

  async uploadFile(uploadUrl: UploadURL, file: ArrayBufferLike, options: B2UploadOptions): Promise<B2UploadFileResult> {
    const sha1 = await crypto.subtle.digest('sha-1', file);
    const sha1hex = Array.from(new Uint8Array(sha1)).map(b => b.toString(16).padStart(2, '0')).join('');
    const name = encodeURIComponent(options.name);
    const length = file.byteLength;
    const modified = options.lastModified ? new Date(options.lastModified).getTime() : null;

    const response = await fetch(uploadUrl.uploadUrl, {
      method: 'POST',
      headers: {
        Authorization: uploadUrl.authorizationToken,
        'Content-Type': options.contentType,
        'Content-Length': String(length),
        'X-Bz-File-Name': name,
        'X-Bz-Content-Sha1': sha1hex,
        'X-Bz-Info-src_last_modified_millis': String(modified),
      },
      body: file,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to upload file: ${response.status} ${response.statusText} - ${text}`);
    }

    return response.json();
  }
}

export const b2 = new B2(process.env.B2_ID, process.env.B2_KEY);