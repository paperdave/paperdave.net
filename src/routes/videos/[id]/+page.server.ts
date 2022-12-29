import { error } from '@sveltejs/kit';
import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { id } }) => {
  const artifact = await db.video.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      date: true,
      title: true,
      thumb: true,
      tags: true,
      media: true,
      source: true,
      ttms: true
    }
  });
  if (!artifact) {
    throw error(404);
  }
  const next = await db.video.findFirst({
    where: {
      date: {
        gt: artifact.date
      }
    },
    select: {
      id: true,
      thumb: true,
      date: true,
      title: true
    },
    orderBy: {
      date: 'asc'
    }
  });
  const prev = await db.video.findFirst({
    where: {
      date: {
        lt: artifact.date
      }
    },
    select: {
      id: true,
      thumb: true,
      date: true,
      title: true
    },
    orderBy: {
      date: 'desc'
    }
  });
  return {
    artifact,
    next,
    prev
  };
};
