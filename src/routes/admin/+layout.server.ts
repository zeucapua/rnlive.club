import { redirect } from "@sveltejs/kit";

import { prisma_client } from "$lib/server/prisma";

export async function load({ locals }) {
  // get logged in user
  const session = await locals.auth.validate();

  // if no user, go back to home page
  // not allowed in the admin page
  if (!session) { throw redirect(303, "/"); }

  // get the user's data from database, using Prisma as middleman
  const streamer = await prisma_client.user.findUnique({
    where: { id: session.user.userId },
    include: { emotes: true }
  });

  // return data to be accessible in /overlay and /admin/+page.svelte
  return { streamer }
}
