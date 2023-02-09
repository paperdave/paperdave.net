import { formatDate } from 'src/date';
import type { ArtifactEntry, Question } from '@prisma/client';

export function getDateID(m: Pick<Question, 'date'>) {
  return formatDate(m.date, 'question-id');
}

export function parseDateID(id: string) {
  const match = id.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (!match) {
    return null;
  }
  const [, year, month, day, hour, minute, second] = match;
  return new Date(`${month} ${day} 20${year} ${hour}:${minute}:${second} EST`);
}

export type QuestionWithResolvedArtifacts = Question & {
  artifacts?: Record<string, Pick<ArtifactEntry, 'title' | 'type'>>;
};

export type QuestionPage = {
  id: number;
  questions: QuestionWithResolvedArtifacts[];
  latest: boolean;
  count: number;
};
