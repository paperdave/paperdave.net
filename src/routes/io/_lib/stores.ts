import { persistent } from '@furudean/svelte-persistent-store';

export const ioNotifyEmail = persistent({
  key: 'io.notifyEmail',
  start_value: '',
  storage_type: 'localStorage',
});
