interface Serializer<T> {
  validate(instance: T): boolean;
  toJSON(instance: T): unknown;
  fromJSON(json: unknown): T;
}

function primativeSerializer<T>(type: string) {
  return {
    validate(instance) {
      return typeof instance === type;
    },
    toJSON(instance) {
      return instance;
    },
    fromJSON(json) {
      if (typeof json !== type) {
        throw new Error(`Expected ${type} but got ${typeof json}`);
      }
      return json;
    },
  } as Serializer<T>;
}

const JSONSerializer: Serializer<unknown> = {
  validate(instance) {
    return true;
  },
  fromJSON(json) {
    return json;
  },
  toJSON(instance) {
    return instance;
  },
};

const StringSerializer = primativeSerializer<string>('string');
const NumberSerializer = primativeSerializer<number>('number');
const BooleanSerializer = primativeSerializer<boolean>('boolean');

const DateSerializer: Serializer<Date> = {
  validate(instance) {
    return instance instanceof Date;
  },
  toJSON(instance) {
    return instance.getTime();
  },
  fromJSON(json: number) {
    return new Date(json);
  },
};

function SetOf<T>(type: Serializer<T>): Serializer<Set<T>> {
  return {
    validate(instance) {
      return instance instanceof Set && [...instance.values()].every((x) => type.validate(x));
    },
    fromJSON(json: unknown[]) {
      const set = new Set<T>();
      for (const item of json) {
        set.add(type.fromJSON(item));
      }
      return set;
    },
    toJSON(instance) {
      return Array.from(instance).map((x) => type.toJSON(x));
    },
  };
}

type EnumInstance<T extends string> = Serializer<T> & { readonly [K in T]: T } & {
  values: readonly T[];
};

function Enum<T extends string>(...values: T[]): EnumInstance<T> {
  const enumInstance = {
    validate(instance) {
      return values.includes(instance);
    },
    fromJSON(json) {
      if (!values.includes(json as T)) {
        throw new Error(`Expected one of ${values.join(', ')} but got ${json}`);
      }
      return json;
    },
    toJSON(instance) {
      return instance;
    },
    values,
  } as Serializer<T>;

  for (const value of values) {
    (enumInstance as any)[value] = value;
  }

  return enumInstance as EnumInstance<T>;
}

class StructureBuilder {
  constructor(public readonly name: string) {}

  addProperty<T>(name: string, serializer: Serializer<T>): this {}
  addAliasProperty(name: string, alias: string, serializer: Serializer<unknown>): this {}
  makeRequired(name: string, defaultValue: any): this {}
  build() {}
}

const ArtifactVisibility = Enum('PUBLIC', 'PRIVATE', 'UNLISTED', 'DRAFT');

// example
const Artifact = new StructureBuilder('Artifact')
  .addProperty('id', StringSerializer, { required: true })
  .addProperty('title', StringSerializer, { default: 'Artifact' })
  .addProperty('date', DateSerializer, { default: () => new Date() })
  .addProperty('thumbnail', StringSerializer)
  .addProperty('blurhash', StringSerializer)
  .addProperty('type', StringSerializer, { default: 'unknown' })
  .addProperty('tags', SetOf(StringSerializer), { default: new Set() })
  .addProperty('data', JSONSerializer, { default: {} })
  .addProperty('visibility', ArtifactVisibility, { default: ArtifactVisibility.PUBLIC })
  .build();
