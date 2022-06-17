/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {
    user: import('@prisma/client').User;
    /**
     * Asserts that the user is authenticated, will throw an error otherwise, which the `handle`
     * hook will catch and return a 401 response.
     */
    assertAuthorized: () => void;
  }
  interface Platform { }
  interface Session { }
  interface Stuff { }
}
