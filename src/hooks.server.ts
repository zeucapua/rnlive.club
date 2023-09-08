import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

// we can pass `event` because we used the SvelteKit middleware
export const handle: Handle = async ({ event, resolve }) => {
  // checks auth on every request
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};
