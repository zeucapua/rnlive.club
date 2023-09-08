// check for a logged in user
// +layout.server.ts allows this to be accessed to every page
export async function load({ locals }) {
  const session = await locals.auth?.validate();
  const user = session?.user;

  return { user }
}
