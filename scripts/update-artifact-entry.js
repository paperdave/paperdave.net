import { ArtifactType, PrismaClient } from '@prisma/client';

const client = new PrismaClient();

function artifactEntry(id, title, type, thumb, date, unlisted) {
  return {
    id,
    title,
    type,
    thumb,
    date,
    unlisted
  };
}

let artifacts = [];

// VIDEOS
const videos = await client.video.findMany();
artifacts.push(
  ...videos.map((video) =>
    artifactEntry(
      video.id,
      video.title,
      ArtifactType.Video,
      video.thumb,
      video.date,
      video.unlisted
    )
  )
);

// ALBUMS
const albums = await client.album.findMany({
  include: {
    songs: true
  }
});
for (const album of albums) {
  if (album.songs.length === 1) {
    artifacts.push(
      artifactEntry(album.id, album.title, ArtifactType.Song, album.art, album.date, album.unlisted)
    );
  } else {
    artifacts.push(
      artifactEntry(
        album.id,
        album.title,
        ArtifactType.Album,
        album.art,
        album.date,
        album.unlisted
      )
    );
    for (const song of album.songs) {
      artifacts.push(
        artifactEntry(
          album.id + '-' + song.id,
          song.title,
          ArtifactType.Song,
          album.art,
          song.date,
          song.unlisted
        )
      );
    }
  }
}

// GAMES
const games = await client.game.findMany();

artifacts.push(
  ...games.map((game) =>
    artifactEntry(game.id, game.title, ArtifactType.Game, undefined, game.date, game.unlisted)
  )
);

// STORIES
const stories = await client.story.findMany();

artifacts.push(
  ...stories.map((story) =>
    artifactEntry(story.id, story.id, ArtifactType.Story, story.thumb, story.date, story.unlisted)
  )
);

// check for duplicates
const duplicates = artifacts.filter(
  (artifact, index) => artifacts.findIndex((a) => a.id === artifact.id) !== index
);

for (const dupe of duplicates) {
  // Duplicates are only allowed for one being a song and the other being a video
  // we set it's type to MusicVideo

  const entries = artifacts.filter((a) => a.id === dupe.id);
  if (entries.length !== 2) {
    console.error('Found duplicate with more than 2 entries', dupe);
    process.exit(1);
  }

  const [a, b] = entries.sort((a, b) => a.type - b.type);

  if (a.type !== ArtifactType.Video || b.type !== ArtifactType.Song) {
    console.error('Found duplicate that is not a song and a video', dupe);
    process.exit(1);
  }

  artifacts = artifacts.filter((a) => a.id !== dupe.id);

  artifacts.push(
    artifactEntry(
      dupe.id,
      b.title,
      ArtifactType.MusicVideo,
      b.thumb,
      b.date,
      a.unlisted || b.unlisted
    )
  );
}

// Now we update the database

const existingIds = (
  await client.artifactEntry.findMany({
    select: {
      id: true
    }
  })
).map((x) => x.id);

const toBeRemoved = existingIds.filter((id) => !artifacts.find((a) => a.id === id));

await client.$transaction([
  client.artifactEntry.deleteMany({
    where: {
      id: {
        in: toBeRemoved
      }
    }
  }),
  ...artifacts.map((artifact) =>
    client.artifactEntry.upsert({
      where: {
        id: artifact.id
      },
      create: artifact,
      update: artifact
    })
  )
]);
