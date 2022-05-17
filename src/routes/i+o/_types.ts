import { Structure, types } from '@davecode/structures';
import type { Message } from '@prisma/client';

export const MessageSendData = new Structure('MessageSendData')
  .prop('message', types.String)
  .prop('notifyEmail', types.String.nullable);

export type MessagePage = {
  id: number;
  messages: Message[];
  latest: boolean;
};
