# rnlive.club

A streamer's toolbox, focused on live interactions and audience support.

See it in action: 

- [rnlive.club](https://rnlive-club.vercel.app)
- [Overview Blog](https://thoughts.zeu.dev/blog/rnlive-partykit)
- [Showcase Video (TBD)](https://youtube.com)

## Notes

This repo is annotated with comments, made to be understandable as much as possible.
For this project, the main files to look at implement [PartyKit](https://partykit.io)
to create the live reaction feature.

- [lib/server/partykit.ts](https://github.com/zeucapua/rnlive.club/blob/master/src/lib/server/partykit.ts)
- [/admin/overlay/+page.svelte](https://github.com/zeucapua/rnlive.club/blob/master/src/routes/admin/overlay/%2Bpage.svelte)
- [/[username]/+page.svelte](https://github.com/zeucapua/rnlive.club/blob/master/src/routes/%5Busername%5D/%2Bpage.svelte)

## Built with...

- [SvelteKit](https://kit.svelte.dev): JS Meta Framework
- [PartyKit](https://partykit.io): Multiplayer platform (Websockets)
- [Lucia](https://lucia-auth.com): Authentication w Twitch OAuth
- [Prisma](https://prisma.io): Database ORM
- [TailwindCSS](https://tailwindcss.com): Styling
- [DaisyUI](https://daisyui.com): TailwindCSS component library
- [Vercel](https://vercel.com): Site deployment
