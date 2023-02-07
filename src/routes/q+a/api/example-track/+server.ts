import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { PROXYCHECK_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ request }) => {
  const data = {
    sourceName: 'unknown',
    sourceLocation: 'unknown',
    sourceVPN: null
  };

  const ipAddr = request.headers.get('cf-connecting-ip');
  if (ipAddr) {
    data.sourceName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: '-',
      seed: ipAddr
    });
  }

  const cfIPCountry = request.headers.get('cf-ipcountry');
  if (cfIPCountry) {
    data.sourceLocation = cfIPCountry;
  }

  if (ipAddr && PROXYCHECK_API_KEY) {
    const proxyCheck = await fetch(
      `https://proxycheck.io/v2/?key=${PROXYCHECK_API_KEY}&risk=1&vpn=1`,
      {
        method: 'POST',
        body: 'ips=' + [ipAddr].filter(Boolean).join(','),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).then((res) => res.json());

    if (ipAddr && proxyCheck[ipAddr]) {
      if (proxyCheck[ipAddr].proxy === 'yes') {
        data.sourceVPN = proxyCheck[ipAddr].operator?.name ?? 'unknown';
      }

      if (Number(proxyCheck[ipAddr].risk) > 72) {
        return json({
          blocked:
            'This IP address has been flagged as a high risk IP address. If you are using a VPN/Proxy, please disable it and try again.'
        });
      }
    }
  }

  return json(data);
};
