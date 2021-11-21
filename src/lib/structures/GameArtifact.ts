import { Artifact } from './Artifact';
import { SoftwareArtifact } from './SoftwareArtifact';
import { JSONData } from './structure-utils';

export class GameArtifact extends SoftwareArtifact {
  static type = 'game';
  
  static fromJSON(data: JSONData<Artifact>) {
    return new GameArtifact(Artifact.fromJSON(data));
  }

  get genre(): string {
    return this.getProperty('genre');
  }

  set genre(value: string) {
    this.setProperty('genre', value);
  }

  setGenre(value: string) {
    this.setProperty('players', value);
    return this;
  }

  get players(): string {
    return this.getProperty('players');
  }

  set players(value: string) {
    this.setProperty('players', value);
  }

  setPlayers(value: string) {
    this.setProperty('players', value);
    return this;
  }
}
