/// <reference types="@sveltejs/kit" />

import { User } from '$lib/structures';

declare global {
  declare namespace App {
    interface Locals {
      user: User;
    }
    interface Platform {}
    interface Session {}
    interface Stuff {}
  }
}
