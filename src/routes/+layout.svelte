<script>
  // Global Styles (DO NOT DELETE, needed for tailwind)
  import "../app.css";

  export let data;
  const user = data.user;
</script>

<div class="text-white font-jakarta bg-neutral-900 w-full h-full min-w-screen min-h-screen">

  <nav class="flex justify-between items-center p-4">
    <a href="/" class="text-3xl font-slice tracking-widest text-white underline underline-offset-8 decoration-pink-400">rnlive.club</a>
    {#if user}
      <div class="flex items-center gap-4">
        <form method="POST" action="/?/logout">
          <button class="px-4 py-2 border border-pink-400 rounded-md hover:font-bold hover:bg-pink-400 transition-all duration-300">Logout</button>
        </form>
        <a href="/admin">
          <img src={user.avatar} alt={user.twitch_username} class="w-16 h-16 rounded-full" />
        </a>
      </div>
    {:else}
      <a href="/auth/twitch">Sign in with Twitch</a>
    {/if}
  </nav>

  <slot />

</div>
