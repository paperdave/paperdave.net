import { db } from "$lib/db"
import type { ArtifactEntry } from "@prisma/client";

export const get = async ({ params }) => {
  if (true) return { body: { ok: false } };
  const data = await Promise.all([
    db.music.findMany({
      select: {
        id: true,
        title: true,
        album: true,
        date: true,
        unlisted: true,
      }
    }),
    db.game.findMany({
      select: {
        id: true,
        title: true,
        // thumb: true,
        date: true,
        unlisted: true,
      }
    }),
    db.video.findMany({
      select: {
        id: true,
        title: true,
        thumb: true,
        date: true,
        unlisted: true,
      }
    }),
    db.story.findMany({
      select: {
        id: true,
        title: true,
        thumb: true,
        date: true,
        unlisted: true,
      }
    }),
  ]);

  const mapped = ['Music', 'Game', 'Video', 'Story'].map((type, i) => {
    return data[i].map((input) => {
      return {
        id: input.id,
        title: input.title,
        date: input.date,
        type,
        unlisted: input.unlisted,
        thumb: input.thumb ?? input.album ?? null,
      } as ArtifactEntry;
    });
  }).flat();

  await db.$transaction(
    mapped.map((entry) => db.artifactEntry.upsert({
      where: {
        id: entry.id,
      },
      create: entry,
      update: entry,
    })),
  )

  return {
    body: { ok: true }
  }
}