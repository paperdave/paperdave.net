import m from 'mongoose';

export interface ILegacyRedirect {
  key: string;
  value: string;
}

export const LegacyRedirectSchema = new m.Schema<ILegacyRedirect, m.Model<ILegacyRedirect>>({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export const LegacyRedirectModel = (m as any).model(
  'LegacyRedirect',
  LegacyRedirectSchema
) as m.Model<ILegacyRedirect>;
