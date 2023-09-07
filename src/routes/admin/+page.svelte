<script lang="ts">
  import { enhance } from "$app/forms";
  import { dev } from "$app/environment";
  import type { ActionData, LayoutData } from "../$types";

  export let data : LayoutData;
  export let form : ActionData;
  const streamer = data.streamer;

  let emotes = streamer.emotes;

  function openOverlay() {
    window.open(
      (dev ? "http://localhost:5173" : "https://rnlive-club.vercel.app") + "/admin/overlay",
      "Overlay | rnlive.club",
      "width=1920,height=1080,popup"
    );
  }
</script>

<p>Admin</p>
<button on:click={openOverlay}>Open Overlay</button>

<form method="POST" action="/admin?/createEmote" use:enhance>
  <input name="emote_name" type="text" placeholder="peepoHug" />
  <input name="emote_source" type="url" placeholder="example.com/image.gif" />
  <button>Create</button>
</form>

{#if form?.emotes}
  {#if form.emotes.length != 0}
    {#each form.emotes as emote}
      <div>
        <img src={emote.source} alt={emote.name} />
        <form method="POST" action="/admin?/deleteEmote">
          <input name="emote_id" type="hidden" value={emote.id} />
          <button>Delete</button>
        </form>
      </div>
    {/each}
  {:else}
    <p>Create a new emote</p>
  {/if}
{:else}

  {#if emotes.length != 0}
    {#each emotes as emote}
      <div>
        <img src={emote.source} alt={emote.name} />
        <form method="POST" action="/admin?/deleteEmote" use:enhance>
          <input name="emote_id" type="hidden" value={emote.id} />
          <button>Delete</button>
        </form>
      </div>
    {/each}
  {:else}
    <p>Create a new emote</p>
  {/if}

{/if}
