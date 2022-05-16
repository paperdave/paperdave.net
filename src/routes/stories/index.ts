import { getDatabase } from '$lib/db';
import { Artifact, ArtifactType, StoryArtifact } from '$lib/structures';
import type { RequestHandler } from '@sveltejs/kit';

const hardcodedList: StoryArtifact[] = [
  new StoryArtifact({
    id: 'bowling',
    title: 'Bowling',
    description: "Read one week of a bowling addict's diary.",
    url: 'https://media.davecode.net/project/bowling/index.html',
    tags: new Set(['entries']),
    date: new Date('2022-05-20'),
    endDate: null,
    thumb: null,
  }),
  new StoryArtifact({
    id: 'deempathize',
    title: 'deempathize',
    description: 'A story about AI and the future.',
    url: 'https://media.davecode.net/project/deempathize/index.html',
    tags: new Set(['prose', 'interactive']),
    date: new Date('2022-01-17'),
    thumb: null,
    endDate: null,
  }),
  new StoryArtifact({
    id: 'winter-heartbreak',
    title: 'winter heartbreak',
    description: 'Julia learns that no one really knows how to love during high school.',
    url: 'https://media.davecode.net/project/winter-heartbreak/index.html',
    tags: new Set(['prose']),
    date: new Date('2022-01-11'),
    thumb: null,
    endDate: null,
  }),
  new StoryArtifact({
    id: 'life',
    title: 'LIFE',
    description:
      'A collection of poems about life, death, art, love, sleep, dreams, dreams, and waking up.',
    url: 'https://media.davecode.net/project/life/index.html',
    tags: new Set(['poetry']),
    date: new Date('2021-11-03'),
    thumb: null,
    endDate: null,
  }),
  new StoryArtifact({
    id: 'the-writer',
    title: 'The Writer',
    description:
      'A story about a person hired to write poetry on a new piece of equipment. Read their journey through creative poetry and publishing content to a universe-wide scale.',
    url: 'https://media.davecode.net/project/the-writer/index.html',
    tags: new Set(['poetry', 'entries']),
    date: new Date('2020-10-22'),
    endDate: new Date('2020-12-03'),
    thumb: null,
  }),
];

export const get: RequestHandler = async ({}) => {
  const artifacts = await getDatabase(Artifact);
  const stories = await artifacts.find({ type: ArtifactType.STORY });

  return {
    body: {
      stories: [...hardcodedList, ...stories],
    },
  };
};
