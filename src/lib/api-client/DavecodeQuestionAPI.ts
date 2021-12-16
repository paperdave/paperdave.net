import { Question } from '$lib/structures';
import { QuestionPage } from '$lib/structures/QuestionPage';
import { APIClient } from './ApiClient';

/** Client API class that parallels the /q+a endpoints */
export class DavecodeQuestionAPI {
  constructor(private readonly client: APIClient) {}

  async getPage(n: 'latest' | number) {
    const r = await this.client.get<QuestionPage>(`/q+a/question/page/${n}`);
    if (r.data) {
      return QuestionPage.fromJSON(r.data);
    }
    return null;
  }

  async getQuestion(id: string) {
    const r = await this.client.get<Question>(`/q+a/question/${id}`);
    if (r.data) {
      return Question.fromJSON(r.data);
    }
    return null;
  }
}
