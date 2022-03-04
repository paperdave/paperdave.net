import { getDatabase } from '$lib/db';
import { Artifact } from '$lib/structures';
import { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const artifacts = await getDatabase(Artifact);

  const featured = [
    await artifacts.findOne({ id: 'mayday' }),
    await artifacts.findOne({ id: 'intermission' }),
    await artifacts.findOne({ id: 'phoenix-write' }),
  ];

  return {
    body: featured.map((artifact) => artifact?.toJSON()).filter(Boolean),
  } as RequestHandlerOutput;
};
