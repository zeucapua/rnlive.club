import { dev } from "$app/environment";
import { prisma_client } from "./prisma";
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from "$env/static/private";

import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { twitch } from "@lucia-auth/oauth/providers";

export const auth = lucia({
  adapter: prisma(prisma_client),
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),

  getUserAttributes: (data) => {
    return { 
      twitch_username: data.twitch_username
    }
  }
});

export const twitch_auth = twitch(auth, {
  clientId: TWITCH_CLIENT_ID,
  clientSecret: TWITCH_CLIENT_SECRET,
  redirectUri: (dev ? "http://localhost:5173/auth/twitch/callback" : "https://rnlive-club.vercel.app/auth/twitch/callback")
});

export type Auth = typeof auth;
