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
    const r = await this.client.get<QuestionRequest[]>(`/q+a/request`);
    if (r.data) {
      return r.data.map((x) => QuestionRequest.fromJSON(x));
    } else {
      throw new Error('Failed to get all requests');
    }
  }

  async getRequest(idOrDate: string | Date) {
    const id = typeof idOrDate === 'string' ? idOrDate : formatDate(idOrDate, 'question-id');

    const r = await this.client.get<QuestionRequest>(`/q+a/request/${id}`);
    if (r.data) {
      return QuestionRequest.fromJSON(r.data);
    } else {
      throw new Error('Failed to get request');
    }
  }

  async deleteRequest(req: string | Date | QuestionRequest) {
    const id =
      typeof req === 'string'
        ? req
        : formatDate(req instanceof Date ? req : req.date, 'question-id');

    const r = await this.client.del<GenericSuccess>(`/q+a/request/${id}`);

    if (r.data && r.data.success) {
      return;
    } else {
      throw new Error('Failed to delete request');
    }
  }

  async random() {
    const r = await this.client.get<{ url: string }>(`/q+a/question/random`);
    if (r.data) {
      return r.data.url;
    } else {
      throw new Error('Failed to get random question');
    }
  }
}