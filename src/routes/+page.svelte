<script lang="ts">
  import { page } from "$app/stores";
</script>

<section class="hero h-full min-h-[48rem] bg-gradient-to-b from-base-300 to-base-100">
  <div class="hero-content text-center">
    <div class="max-w-lg">
      <div class="my-4 badge badge-outline badge-secondary py-4">Build In Progress</div>
      <h1 class="text-6xl font-bold">Audience Interactions to the Next Level</h1>
      <p class="py-6 text-xl">
        Live reactions. Custom donations. Built-in "Link in Bio". All for you, for free!
      </p>
      {#if $page.data.user}
        <a href="/admin" class="btn btn-primary">Go to Dashboard</a>
      {:else}
        <a href="/auth/twitch" class="btn btn-primary">Get Started</a>
      {/if}
    </div>
  </div>
</section>

