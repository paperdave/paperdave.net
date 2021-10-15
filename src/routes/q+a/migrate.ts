import { getDatabase } from '$lib/db';
import { Question, QuestionParagraph } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';
import fs from 'fs-extra';

const deletes = [
  '190714232900',
  '190714234000',
  '190731231500',
  '200507182900',
  '200813000620',
  '200902161903',
  '200901094028',
  '200831134150',
  '210103181111',
  '201222075147',
  '210112165251',
  '210204154217',
  '210210174908',
  '210208235823',
  '210210003632',
  '211011093025',
];

export const get: RequestHandler = async ({}) => {
  return { body: 'This endpoint is disabled' };

  const db = await getDatabase(Question);

  const questions = fs.readJsonSync(`C:\\Code\\davecode.net\\src\\routes\\q+a\\migrate.json`);

  let mapped = questions
    .map(
      (x) =>
        new Question({
          date: new Date(Math.floor(new Date(x.d ?? x.date).getTime() / 1000) * 1000),
          content: (
            x.c ||
            x.content || [
              ['question', x.q],
              ['answer', x.a],
            ]
          ).flatMap((y) =>
            (y.message || y[1])
              .trim()
              .split('\n')
              .map((m) => {
                return new QuestionParagraph({
                  message: m.trim(),
                  who:
                    (y.who || y[0]) === 'question' || y.who || y[0] === 'q' ? 'question' : 'answer',
                });
              })
          ),
        })
    )
    .filter((x) => !deletes.includes((x as Question).getDateId()));

  await db.deleteMany({});
  await db.insertMany(mapped.map((x) => x.toJSON()));

  return {
    body: mapped.map((x) => x.toJSON()),
  };
};
