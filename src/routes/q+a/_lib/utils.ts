import { formatDate } from 'src/date';
import type { ArtifactEntry, Message } from '@prisma/client';

export function getMessageDateID(m: Pick<Message, 'date'>) {
  return formatDate(m.date, 'message-id');
}

export function parseMessageDateID(id: string) {
  const match = id.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (!match) {
    return null;
  }
  const [, year, month, day, hour, minute, second] = match;
  return new Date(`${month} ${day} 20${year} ${hour}:${minute}:${second} EST`);
}

export type MessageWithResolvedArtifacts = Message & {
  artifacts?: Record<string, Pick<ArtifactEntry, 'title' | 'type'>>;
};

export type MessagePage = {
  id: number;
  messages: MessageWithResolvedArtifacts[];
  latest: boolean;
};
