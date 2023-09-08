import { dev } from "$app/environment";
import { twitch_auth } from "$lib/server/lucia";

// Lucia login function
export const GET = async ({ cookies }) => {
  const [ url, state ] = await twitch_auth.getAuthorizationUrl();

  // set cookies in client so browser remembers the user logged in
  cookies.set("twitch_oauth_state", state, {
    httpOnly: true,
    secure: !dev,
    path: "/",
    maxAge: 60 * 60
  });

  return new Response(null, {
    status: 302,
    headers: { Location: url.toString() }
  });
}
