import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import type { MessageInput } from '@prisma/client';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { PROXYCHECK_API_KEY } from '$env/static/private';
import { db } from 'src/db.server';
import { getMessageDateID } from '../../_lib/utils';

function toStrOrUndef(params: FormDataEntryValue | null) {
  return params ? params.toString() : undefined;
}

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();

  if (!formData) {
    throw error(400, 'Missing form data');
  }

  const email = toStrOrUndef(formData.get('email'));
  const content = toStrOrUndef(formData.get('content'));

  if (!content) {
    throw error(400, 'Missing content');
  }

  const input: MessageInput = {
    date: new Date(),
    notifyEmail: email ?? null,
    prompt: content,
    sourceName: 'unknown',
    sourceLocation: 'unknown',
    sourceVPN: null
  };

  input.date.setMilliseconds(0);

  if (email?.includes(',')) {
    throw error(400, 'Multiple emails are not allowed');
  }

  if (content.length <= 0) {
    throw error(400, 'Content is too short');
  }

  if (content.length > 16000) {
    throw error(400, 'Content is too long');
  }

  const ipAddr = request.headers.get('cf-connecting-ip');
  if (ipAddr) {
    input.sourceName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: '-',
      seed: ipAddr
    });
  }

  const cfIPCountry = request.headers.get('cf-ipcountry');
  if (cfIPCountry) {
    input.sourceLocation = cfIPCountry;
  }

  if ((ipAddr || email) && PROXYCHECK_API_KEY) {
    const proxyCheck = await fetch(
      `https://proxycheck.io/v2/?key=${PROXYCHECK_API_KEY}&risk=1&vpn=1`,
      {
        method: 'POST',
        body: 'ips=' + [ipAddr, email].filter(Boolean).join(','),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).then((res) => res.json());
    if (email && proxyCheck[email]) {
      if (proxyCheck[email].disposable === 'yes') {
        throw error(403, 'Disposable email services are not allowed');
      }
    }

    if (ipAddr && proxyCheck[ipAddr]) {
      if (proxyCheck[ipAddr].proxy === 'yes') {
        input.sourceVPN = proxyCheck[ipAddr].operator?.name ?? 'unknown';
      }
      if (Number(proxyCheck[ipAddr].risk) > 72) {
        throw error(403, 'User risk is too high');
      }
    }
  }

  while (await db.messageInput.findFirst({ where: { date: input.date } })) {
    input.date.setTime(input.date.getTime() + 1000);
  }

  const message = await db.messageInput.create({
    data: input
  });

  return json({
    url: 'https://paperdave.net/q+a/' + getMessageDateID(message)
  });
};
