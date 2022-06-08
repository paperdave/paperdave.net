/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {
    user: import('@prisma/client').User;
  }
  interface Platform { }
  interface Session { }
  interface Stuff { }
}
