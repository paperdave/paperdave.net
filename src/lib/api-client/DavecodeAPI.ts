import { APIClient } from './APIClient';
import { DavecodeArtifactAPI } from './DavecodeArtifactAPI';
import { DavecodeAuthenticationAPI } from './DavecodeAuthenticationAPI';

export class DavecodeAPI extends APIClient {
  artifacts: DavecodeArtifactAPI;
  auth: DavecodeAuthenticationAPI;

  constructor(baseUrl: string, f?: typeof fetch) {
    super(baseUrl, f);

    this.artifacts = new DavecodeArtifactAPI(this);
    this.auth = new DavecodeAuthenticationAPI(this);
  }
}
