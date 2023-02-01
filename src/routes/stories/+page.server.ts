import { db } from "src/db.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const stories = await db.story.findMany({
    where: {
      unlisted: false,
    },
    orderBy: {
      date: 'desc',
    },
  });

  return {
    stories,
  };
}
