import { formatDate } from '$lib/utils/date';
import { Structure, types } from '@davecode/structures';
import type { Message } from '@prisma/client';

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

export type MessagePage = {
  id: number;
  messages: Message[];
  latest: boolean;
};
