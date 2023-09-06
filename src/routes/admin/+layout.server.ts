import { redirect } from "@sveltejs/kit";

import { prisma_client } from "$lib/server/prisma";

export async function load({ locals }) {
  const session = await locals.auth.validate();
  if (!session) { throw redirect(303, "/"); }

  const streamer = await prisma_client.user.findUnique({
    where: { id: session.user.userId },
    include: { emotes: true }
  });

  return { streamer }
}
