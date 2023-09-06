import { prisma_client } from "$lib/server/prisma";

export async function load({ params }) {
  try {
    const user = await prisma_client.user.findUnique({
      where: { twitch_username: params.username },
      include: { emotes: true }
    });

    return { user_info: user }
  }
  catch (e) {
    return new Response(null, { status: 500 });
  }
}
