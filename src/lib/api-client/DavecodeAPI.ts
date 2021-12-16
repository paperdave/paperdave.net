import { APIClient } from './APIClient';
import { DavecodeArtifactAPI } from './DavecodeArtifactAPI';
import { DavecodeAuthenticationAPI } from './DavecodeAuthenticationAPI';
import { DavecodeQuestionAPI } from './DavecodeQuestionAPI';

export class DavecodeAPI extends APIClient {
  artifacts = new DavecodeArtifactAPI(this);
  auth = new DavecodeAuthenticationAPI(this);
  questions = new DavecodeQuestionAPI(this);
}
