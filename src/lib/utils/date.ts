const dateFormats = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm',
  'date-time': 'YYYY-MM-DD HH:mm',
  'time-sec': 'HH:mm:ss',
  'date-time-sec': 'YYYY-MM-DD HH:mm:ss',
  'message-id': 'YYMMDDHHmmss',
  iso: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
};

const formatRules: Record<string, (date: Date) => string | number> = {
  YYYY: (date) => date.getFullYear(),
  YY: (date) => String(date.getFullYear()).slice(-2),
  MM: (date) => String(date.getMonth() + 1).padStart(2, '0'),
  DD: (date) => String(date.getDate()).padStart(2, '0'),
  HH: (date) => String(date.getHours()).padStart(2, '0'),
  mm: (date) => String(date.getMinutes()).padStart(2, '0'),
  ss: (date) => String(date.getSeconds()).padStart(2, '0'),
};

const regexSrc = Object.keys(formatRules)
  .map((key) => `${key}`)
  .join('|');
const regex = new RegExp(regexSrc, 'g');

export type DateFormat = keyof typeof dateFormats;

export function formatDate(date: Date | number, format: DateFormat | string) {
  date = new Date(date);
  const dateFormat = dateFormats[format as DateFormat] ?? format;
  const convertedDate = new Date(date.toLocaleString('en-US', { timeZone: 'EST' }));
  return dateFormat.replace(regex, (match) => String(formatRules[match](convertedDate)));
}

const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,3})?Z$/;

export function parseObjectWithDateStrings(o: any) {
  if (typeof o === 'string') {
    if (o.match(dateRegex)) {
      return new Date(o);
    }
    return o;
  } else if (Array.isArray(o)) {
    return o.map((item) => parseObjectWithDateStrings(item));
  } else if (typeof o === 'object') {
    const newObj = {};
    for (const key in o) {
      newObj[key] = parseObjectWithDateStrings(o[key]);
    }
    return newObj;
  }
}