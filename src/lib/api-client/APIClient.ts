import { JSONData } from '$lib/structures';
import { AsJson } from '$lib/utils/api';
import { getToken, token as tokenStore } from './session';

/** Result of an api query, it is organized this way to include http status codes and other metadata */
export interface FetchResult<Output = unknown> {
  status: number;
  headers: Headers;
  data: Output;
}

export class APIError extends Error {
  status: number;

  constructor(response: Response, message?: string) {
    super(message);
    this.status = response.status;
  }
}

/** Shared code for fetching data from the davecode API or any similarly formatted api. */
export class APIClient {
  baseUrl: string;

  constructor(baseUrl: string, private readonly fetchFunction = fetch.bind(null)) {
    this.baseUrl = baseUrl;
  }

  /** Replace the fetch function for this API, used for svelte load functions. */
  with(fetchFunction: typeof fetch): this {
    return new (this.constructor as any)(this.baseUrl, fetchFunction) as this;
  }

  /** Send a request using a url relative of the base, and an optional JSON body. */
  async fetch<Input = unknown, Output = unknown>(
    url: string,
    method: string,
    body?: JSONData<Input> & AsJson<JSONData<Input>>
  ): Promise<FetchResult<JSONData<Output>>> {
    const token = getToken();

    const response = await this.fetchFunction(`${this.baseUrl}${url}`, {
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      if (token) {
        // Retry without a token.
        // This will never cause an infinite loop, because the token will be removed from the store.
        tokenStore.set(null);
        return this.fetch<Input, Output>(url, method, body);
      } else {
        throw new APIError(response, 'Invalid token');
      }
    }

    const json = await response.json();

    if (json.error) {
      throw new APIError(response, json);
    }

    return {
      status: response.status,
      headers: response.headers,
      data: json as JSONData<Output>,
    };
  }

  async get<Output = unknown>(url: string): Promise<FetchResult<JSONData<Output>>> {
    return this.fetch<void, Output>(url, 'GET');
  }

  async post<Input = unknown, Output = unknown>(
    url: string,
    body?: JSONData<Input> & AsJson<JSONData<Input>>
  ): Promise<FetchResult<JSONData<Output>>> {
    return this.fetch<Input, Output>(url, 'POST', body);
  }

  async put<Input = unknown, Output = unknown>(
    url: string,
    body?: JSONData<Input> & AsJson<JSONData<Input>>
  ): Promise<FetchResult<JSONData<Output>>> {
    return this.fetch<Input, Output>(url, 'PUT', body);
  }

  async del<Output = unknown>(url: string): Promise<FetchResult<JSONData<Output>>> {
    return this.fetch<void, Output>(url, 'DELETE');
  }

  async patch<Input = unknown, Output = unknown>(
    url: string,
    body?: JSONData<Input> & AsJson<JSONData<Input>>
  ): Promise<FetchResult<JSONData<Output>>> {
    return this.fetch<Input, Output>(url, 'PATCH', body);
  }
}