import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import type { MessageInput } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";
import { PROXYCHECK_API_KEY } from '$lib/env';
import { db } from '$lib/db';
import { getMessageDateID } from '../_lib/utils';

function toStrOrUndef(params: FormDataEntryValue) {
  return params ? params.toString() : undefined;
}

export const post: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const email = toStrOrUndef(formData.get("email"));
  const content = toStrOrUndef(formData.get("content"));

  const input: MessageInput = {
    date: new Date(),
    notifyEmail: email ?? null,
    prompt: content,
    sourceName: 'unknown',
    sourceLocation: 'unknown',
    sourceVPN: null,
  };

  input.date.setMilliseconds(0);

  if (email?.includes(',')) {
    return {
      status: 400,
      body: {
        message: "Email invalid",
      }
    }
  }

  if (!content) {
    return {
      status: 400,
      body: {
        message: "Missing content",
      },
    }
  }

  if (content.length <= 0) {
    return {
      status: 400,
      body: {
        message: "Content is empty",
      },
    }
  }

  if (content.length > 16000) {
    return {
      status: 400,
      body: {
        message: "Content is too long",
      },
    }
  }

  const ipAddr = request.headers.get('x-vercel-forwarded-for');
  if (ipAddr) {
    input.sourceName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: '-',
      seed: ipAddr,
    });
  }

  const cfIPCountry = request.headers.get('x-vercel-ip-country');
  if (cfIPCountry) {
    input.sourceLocation = cfIPCountry;
  }

  if ((ipAddr || email) && PROXYCHECK_API_KEY) {
    const proxyCheck = await fetch(`https://proxycheck.io/v2/?key=${PROXYCHECK_API_KEY}&risk=1&vpn=1`, {
      method: 'POST',
      body: 'ips=' + [
        ipAddr,
        email,
      ].filter(Boolean).join(','),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => res.json());
    if (email && proxyCheck[email]) {
      if (proxyCheck[email].disposable === 'yes') {
        return {
          status: 400,
          body: {
            message: "Disposable email services are not allowed",
          },
        }
      }
    }

    if (ipAddr && proxyCheck[ipAddr]) {
      if (proxyCheck[ipAddr].proxy === 'yes') {
        input.sourceVPN = proxyCheck[ipAddr].operator?.name ?? 'unknown';
      }
      if (Number(proxyCheck[ipAddr].risk) > 72) {
        return {
          status: 403,
          body: {
            message: "User risk is too high",
          }
        }
      }
    }
  }

  while (await db.messageInput.findFirst({ where: { date: input.date } })) {
    input.date.setTime(input.date.getTime() + 1000);
  }

  const message = await db.messageInput.create({
    data: input,
  });

  return {
    body: {
      url: 'https://davecode.net/io/' + getMessageDateID(message),
    },
  };
};
