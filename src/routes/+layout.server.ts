import { auth } from "$lib/server/lucia";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const session = await locals.auth?.validate();
  const user = session?.user;

  return { user }
}
