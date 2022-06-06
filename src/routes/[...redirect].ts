import { db } from '$lib/db';
import type { ArtifactType } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import _redirectsList from '../simple-redirects.yaml';

const artifactTypeToPrefix: Record<ArtifactType, string> = {
  Video: 'videos',
  Music: 'music',
  Application: 'apps',
  Journal: 'journal',
  Fragment: 'fragments',
  WordMagnet: '???',
  Game: 'games',
  NerdGear: 'nerd-gear',
  Story: 'stories',
  Square: '???',
  MusicVideo: 'videos',
  Doodle: '???',
};

const redirectsList: Record<string, string> = _redirectsList;

function getDest(page: string) {
  for (const [key, value] of Object.entries(redirectsList)) {
    if (key.endsWith('/*')) {
      const prefix = key.replace('/*', '');

      if (page.startsWith(prefix)) {
        return page.replace(prefix, value.replace('/*', ''));
      }
    } else if (page === key) {
      return value;
    }
  }
  return null;
}

export const get: RequestHandler = async ({ url }) => {
  const redirect = getDest(url.pathname);

  if (redirect) {
    return {
      status: 302,
      headers: {
        Location: redirect,
      },
    };
  }

  if (!url.pathname.slice(1).includes('/')) {
    const id = url.pathname.slice(1).toLowerCase();
    const artifact = await db.artifactEntry.findFirst({
      where: {
        id
      }
    });
    if (artifact) {
      return {
        status: 302,
        headers: {
          Location: `/${artifactTypeToPrefix[artifact.type]}/${artifact.id}`,
        },
      }
    }
  }

  return {
    status: 404
  }
}