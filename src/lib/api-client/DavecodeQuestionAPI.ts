import { APIClient } from './ApiClient';

/** Client API class that parallels the /q+a endpoints */
export class DavecodeQuestionAPI {
  constructor(private readonly client: APIClient) {}
}
