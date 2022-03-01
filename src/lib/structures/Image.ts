import { Instance, Structure, types } from '@davecode/structures';

/**
 * Represents a photo, with a blurhash, and it's size. This lets me display images without layout
 * shift and give a nice blur loading. Not named Image due to a conflict with the Image type in the Web API.
 */
export const DavecodeImage = new Structure('Image') //
  .prop('url', types.String)
  .prop('width', types.Number)
  .prop('height', types.Number)
  .prop('hash', types.String.nullable)
  .method('getAspect', function () {
    return this.width / this.height;
  })
  .create();

export type DavecodeImage = Instance<typeof DavecodeImage>;
