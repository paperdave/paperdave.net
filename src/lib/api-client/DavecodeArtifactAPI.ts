import { Artifact, enhanceArtifact, JSONData } from '$lib/structures';
import { GenericSuccess } from '$lib/utils/api';
import { resolveError } from '$lib/utils/promise';
import { APIClient } from './ApiClient';

/** Client API class that parallels the /artifact endpoints */
export class DavecodeArtifactAPI {
  constructor(private readonly client: APIClient) {}

  /**
   * Retrives an artifact by it's id
   *
   * - Private or draft artifacts will be invisible to the public, but returned if the user has the
   *   `VIEW_ARTIFACTS` permission.
   * - If it does not exist, a 404 Error is returned.
   * - You can pass a `props` query parameter to return only the properties you want (separated by commas).
   */
  async getArtifact(id: string) {
    const { data: response } = await resolveError(this.client.get<Artifact>(`/artifact/${id}`));
    if (!response) {
      return null;
    }
    return enhanceArtifact(response.data);
  }

  /**
   * Creates a new artifact.
   *
   * - Requires a user to be logged in.
   * - If the user does not have the `CREATE_ARTIFACTS` permission, a 403 Error is returned.
   * - The visibility of the artifact is automatically set to `DRAFT` no matter what.
   * - This does not allow overwriting an existing artifact.
   */
  async createArtifact(newArtifact: Artifact) {
    const response = await this.client.post<Artifact, GenericSuccess>(
      `/artifact/${newArtifact.id}`,
      newArtifact.toJSON()
    );
    return response.data.success;
  }

  /**
   * Updates an artifact by it's id.
   *
   * - Requires a user to be logged in.
   * - If the user does not have the `EDIT_ARTIFACTS` permission, a 403 Error is returned.
   * - If the artifact does not exist, a 404 Error is returned.
   */
  async updateArtifact(id: string, artifact: Artifact) {
    const response = await this.client.put<Artifact, GenericSuccess>(
      `/artifact/${id}`,
      artifact.toJSON()
    );
    return response.data.success;
  }

  /**
   * Updates an artifact by it's id. This accepts a partial update.
   *
   * - Requires a user to be logged in.
   * - If the user does not have the `EDIT_ARTIFACTS` permission, a 403 Error is returned.
   * - If the artifact does not exist, a 404 Error is returned.
   */
  async patchArtifact(id: string, artifact: JSONData<Artifact> & { id: string }) {
    const response = await this.client.put<Artifact, GenericSuccess>(`/artifact/${id}`, artifact);
    return response.data.success;
  }

  /**
   * Deletes an artifact by it's id.
   *
   * - Requires a user to be logged in.
   * - If the user does not have the `DELETE_ARTIFACTS` permission, a 403 Error is returned.
   * - If the artifact does not exist, a 404 Error is returned.
   */
  async deleteArtifact(id: string) {
    const response = await this.client.del<GenericSuccess>(`/artifact/${id}`);
    return response.data.success;
  }

  /**
   * Get an artifact list by it's list id. Lists are hardcoded into the api code, so the api does
   * not support modifying these presets.
   */
  async getArtifactList(listName: string): Promise<Artifact[]> {
    const response = await this.client.get<JSONData<Artifact>[]>(`/artifact/list/${listName}`);
    return response.data.map(enhanceArtifact);
  }
}
