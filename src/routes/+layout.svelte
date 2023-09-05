<script>
  // Global Styles (DO NOT DELETE, needed for tailwind)
  import "../app.css";

  export let data;
  const user = data.user;
</script>

{#if user}
  <a href="/admin">{user.twitch_username}</a>
{:else}
  <a href="/auth/twitch">Sign in with Twitch</a>
{/if}

<slot />
