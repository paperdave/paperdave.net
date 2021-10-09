import m from 'mongoose';

export interface IVaultKey {
  key: string;
  value: string;
}

export const VaultKeySchema = new m.Schema<IVaultKey, m.Model<IVaultKey>>({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export const VaultKeyModel = (m as any).model('VaultKey', VaultKeySchema) as m.Model<IVaultKey>;
