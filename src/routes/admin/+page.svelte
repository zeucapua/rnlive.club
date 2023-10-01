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
      (dev ? "http://localhost:5173" : "https://rnlive.club") + "/admin/overlay",
      "Overlay | rnlive.club",
      "width=1920,height=1080,popup"
    );
  }
</script>
 
<main class="flex flex-col h-full min-h-screen p-8 gap-8 bg-gradient-to-b from-base-100 to-base-300">
  <h1 class="text-6xl font-slice tracking-widest">Admin</h1>
  <button on:click={openOverlay} class="btn btn-outline btn-accent">Open Overlay</button>

  <section class="flex flex-col gap-4 rounded-md p-8 bg-base-100">
    <h3 class="text-3xl font-bold">Create a new emote</h3>
    <form method="POST" action="/admin?/createEmote" use:enhance class="flex flex-col lg:flex-row w-fit gap-8 justify-between">
      <div class="form-control flex-none">
        <label class="label">
          <span class="label-text">Emote Name</span>
        </label>
        <input name="emote_name" type="text" placeholder="peepoHug" class="input input-bordered input-primary"/>
      </div>
      <div class="form-control grow w-full ">
        <label class="label">
          <span class="label-text">Source URL</span>
        </label>
        <input name="emote_source" type="url" placeholder="example.com/image.gif" class="input input-bordered input-primary w-full"/>
      </div>
      <button class="flex-none btn btn-outline btn-secondary self-end">Create</button>
    </form>
  </section>

  <section class="grid grid-cols-2 lg:grid-cols-3 mx-auto gap-8">

  {#if form?.emotes}

    {#if form.emotes.length != 0}
      {#each form.emotes as emote}
        <div class="flex flex-col gap-4 p-8 bg-base-100 w-fit h-fit rounded-md items-center">
          <img src={emote.source} alt={emote.name} />
          <p class="text-center">{emote.name}</p>
          <form method="POST" action="/admin?/deleteEmote" use:enhance>
            <input name="emote_id" type="hidden" value={emote.id} />
            <button class="btn btn-square">
              <svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.5001 6H3.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9.5 11L10 16" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M14.5 11L14 16" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#ffffff" stroke-width="1.5"></path> </g></svg>
            </button>
          </form>
        </div>
      {/each}
    {:else}
      <p>No emotes yet :(</p>
    {/if}

  {:else}

    {#if emotes.length != 0}
      {#each emotes as emote}
        <div class="flex flex-col gap-4 p-8 bg-base-100 w-fit h-fit rounded-md items-center">
          <img src={emote.source} alt={emote.name} />
          <p class="text-center">{emote.name}</p>
          <form method="POST" action="/admin?/deleteEmote" use:enhance>
            <input name="emote_id" type="hidden" value={emote.id} />
            <button class="btn btn-square">
              <svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.5001 6H3.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9.5 11L10 16" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M14.5 11L14 16" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#ffffff" stroke-width="1.5"></path> </g></svg>
            </button>
          </form>
        </div>
      {/each}
    {:else}
      <p>No emotes yet :(</p>
    {/if}

  {/if}
  </section>

</main>
