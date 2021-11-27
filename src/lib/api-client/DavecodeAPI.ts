import { APIClient } from './ApiClient';
import { DavecodeArtifactAPI } from './DavecodeArtifactAPI';

export class DavecodeAPI extends APIClient {
  artifacts: DavecodeArtifactAPI;

  constructor(baseUrl: string, f?: typeof fetch) {
    super(baseUrl, f);

    this.artifacts = new DavecodeArtifactAPI(this);
  }
}
