<script>
  // Global Styles (DO NOT DELETE, needed for tailwind)
  import "../app.css";
  import { page } from "$app/stores";

  export let data;
  const user = data.user;
  const route = $page.route.id ;
</script>

<!-- remove the navbar in the overlay and viewer page -->
{#if route.includes("overlay") || route.includes("[username]")}

  <div class="flex flex-col">
    <slot />
  </div>

{:else}

  <div class="flex flex-col w-full h-full min-w-screen min-h-screen bg-base-100 font-jakarta">

    <nav class="flex justify-between items-center p-8">
      <a href="/" class="text-3xl font-slice tracking-widest text-white underline underline-offset-8 decoration-pink-400" aria-label="rnlive.club">rnlive.club</a>
      {#if user}
        <div class="flex items-center gap-4">
          <form method="POST" action="/?/logout">
            <button class="btn btn-outline btn-primary">Logout</button>
          </form>
          <a href="/admin">
            <img src={user.avatar} alt={user.twitch_username} class="w-12 h-12 rounded-full" />
          </a>
        </div>
      {:else}
        <a href="/auth/twitch" class="btn btn-accent">Sign in with Twitch</a>
      {/if}
    </nav>

    <slot />

  </div>

{/if}
