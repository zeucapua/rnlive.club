import { prisma_client } from "$lib/server/prisma";
import { redirect, fail } from "@sveltejs/kit";

export const actions = {
  createEmote: async ({ locals, request }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(303, "/");
    }

    // get data from <form> tag
    const form_data = await request.formData();
    const emote_name = form_data.get("emote_name");
    const emote_source = form_data.get("emote_source");

    try {
      await prisma_client.emote.create({
        data: {
          name: emote_name,
          source: emote_source,
          User: { connect: { id: session.user.userId }}
        },
      });

      const user = await prisma_client.user.findUnique({
        where: { id: session.user.userId },
        select: { emotes: true }
      });

      return {
        action: "createEmote",
        emotes: user?.emotes
      }
    }
    catch (e) {
      return fail(500, { status: e });
    }
  },

  deleteEmote: async ({ locals, request }) => {
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(303, "/");
    }

    const form_data = await request.formData();
    const emote_id = form_data.get("emote_id");

    try {
      await prisma_client.emote.delete({
        where: { id: emote_id }
      });

      const user = await prisma_client.user.findUnique({
        where: { id: session.user.userId },
        select: { emotes: true }
      });

      return {
        action: "createEmote",
        emotes: user?.emotes
      }
    }
    catch (e) {
      return fail(500, { status: e });
    }
  }
}
