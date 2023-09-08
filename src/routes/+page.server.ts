import { auth } from "$lib/server/lucia";
import { redirect, fail } from "@sveltejs/kit";

export const actions = {
  logout: async ({ locals }) => {
    // check if a user is logged in
    const session = await locals.auth.validate();
  
    // return an error if there is no user logged in, no need to "logout"
    if (!session) { return fail(401); }

    // removes 'twitch_oauth_state' cookie
    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);

    // go back to home page
    throw redirect(302, "/");
  },
}
