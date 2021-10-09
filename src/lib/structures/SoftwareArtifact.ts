import { AppArtifact } from './AppArtifact';
import { Artifact } from './Artifact';
import { GameArtifact } from './GameArtifact';
import { NerdGearArtifact } from './NerdGearArtifact';

export interface SoftwareVersion {
  name: string;
  version: string;
  downloads: SoftwareDownload[];
}

export interface SoftwareDownload {
  platform: SoftarePlatform;
  url: string;
}

export type SoftarePlatform =
  | 'linux'
  | 'macos'
  | 'windows'
  | 'web-url'
  | 'zip'
  | 'java'
  | 'android'
  | 'ios'
  | 'source-gamemaker'
  | 'source-zip';

const categories = ['game', 'app', 'nerd-gear'] as const;

export type SoftwareCategory = typeof categories[number];

export class SoftwareArtifact extends Artifact {
  get description(): string {
    return this.getProperty('description');
  }

  set description(value: string) {
    this.setProperty('description', value);
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  get versions(): SoftwareVersion[] {
    return this.getProperty('versions');
  }

  set versions(value: SoftwareVersion[]) {
    this.setProperty('versions', value);
  }

  setVersions(versions: SoftwareVersion[]): this {
    this.versions = versions;
    return this;
  }

  addVersion(version: SoftwareVersion): this {
    this.versions.push(version);
    return this;
  }

  isGame(): this is GameArtifact {
    return this.hasTag('game');
  }

  isNerdGear(): this is NerdGearArtifact {
    return this.hasTag('nerd-gear');
  }

  isApp(): this is AppArtifact {
    return this.hasTag('app');
  }

  set category(category: SoftwareCategory) {
    categories.forEach((c) => this.removeTag(c));
    this.addTag(category);
  }

  get category(): SoftwareCategory | undefined {
    return categories.find((c) => this.hasTag(c));
  }

  setCategory(category: SoftwareCategory): this {
    this.category = category;
    return this;
  }
}
