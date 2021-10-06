import m from 'mongoose';

export interface IArtifact {
  id: string;
  title: string;
  date: Date;
  thumbnail: string;
  type: string;
  tags: string[];
  data: Map<string, any>;
}

export const ArtifactSchema = new m.Schema<IArtifact, m.Model<IArtifact>>({
  id: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    index: true,
    required: true,
    lowercase: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  tags: {
    type: [
      {
        type: String,
        lowercase: true,
      },
    ],
    index: true,
    default: [],
  },
  data: {
    type: Map,
    of: m.SchemaTypes.Mixed,
    default: new Map(),
  } as any,
});

export const Artifact = (m as any).model('Artifact', ArtifactSchema) as m.Model<IArtifact>;
