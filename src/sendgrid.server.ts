// import * as env from '$env/dynamic/private';

const baseURL = 'https://api.sendgrid.com/v3/mail/send';

const { SENDGRID_FROM, SENDGRID_API_KEY } = process.env;

export type SendEmailOptions = {
  to: string;
  subject: string;
} & (
  | {
      html: string;
      text?: never;
    }
  | {
      text: string;
      html?: never;
    }
);

export async function sendEmail(options: SendEmailOptions) {
  const { to, subject, html, text } = options;

  await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: to
            }
          ]
        }
      ],
      from: {
        email: SENDGRID_FROM
      },
      subject,
      content: [
        {
          type: html ? 'text/html' : 'text/plain',
          value: html ?? text
        }
      ]
    })
  });
}
