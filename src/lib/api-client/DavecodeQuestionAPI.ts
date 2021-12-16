import { Question, QuestionRequest } from '$lib/structures';
import { QuestionPage } from '$lib/structures/QuestionPage';
import { GenericSuccess } from '$lib/utils/api';
import { formatDate } from '$lib/utils/date';
import { QuestionPostSuccess } from 'src/routes/api/q+a/question/[qid]';
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

  async search(query: string) {
    const r = await this.client.get<QuestionPage>(
      `/q+a/question/search?q=${encodeURIComponent(query)}`
    );
    if (r.data) {
      return QuestionPage.fromJSON(r.data);
    }
    return null;
  }

  async createRequest(request: QuestionRequest) {
    const r = await this.client.post<QuestionRequest, GenericSuccess>(
      `/q+a/question/request/${formatDate(request.date, 'question-id')}`,
      request.toJSON()
    );

    if (r.data && r.data.success) {
      return {};
    } else {
      throw new Error('Question request failed');
    }
  }

  async deleteRequest(dateOrRequest: QuestionRequest | Date | number) {
    const date =
      dateOrRequest instanceof Date
        ? dateOrRequest.getTime()
        : typeof dateOrRequest === 'number'
        ? dateOrRequest
        : dateOrRequest.date.getTime();

    const r = await this.client.del<GenericSuccess>(
      `/q+a/question/request/${formatDate(new Date(date), 'question-id')}`
    );
  }

  async createQuestion(question: Question) {
    const r = await this.client.post<Question, QuestionPostSuccess>(
      `/q+a/question/${question.getDateId()}`,
      question.toJSON()
    );

    if (r.data && r.data.success) {
      return r.data;
    } else {
      throw new Error('Question creation failed');
    }
  }

  async getAllRequests() {
    const r = await this.client.get<string[]>(`/q+a/question/request`);
    if (r.data) {
      return r.data;
    } else {
      throw new Error('Failed to get all requests');
    }
  }
}
