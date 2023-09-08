<script lang="ts">
  import { onMount } from 'svelte';
  import PartySocket from "partysocket";
  import { dev } from '$app/environment';

  export let data;
  const user_info = data.user_info;

  let socket : PartySocket;

  onMount(() => {
    socket = new PartySocket({
      host: dev ? "localhost:1999" : `https://rnlive-club.zeucapua.partykit.dev/party/${user_info.id}`,
      room: user_info.id 
    });
  });

  function sendToPartyServer(message : string) {
    if (socket) {
      const ping = JSON.stringify({
        type: "ping",
        content: message
      });
      socket.send(ping);
    }
  }
</script>

<main class="flex flex-col gap-8 bg-gradient-to-b from-base-100 to-base-300 w-full h-full min-w-screen min-h-screen p-8 items-center">
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl text-center font-slice tracking-widest">Welcome to rnlive.club</h2>
    <h1 class="text-5xl text-center font-bold">{user_info.twitch_username}</h1>
  </div>

  <section class="flex flex-col gap-8 w-full max-w-xl h-full">
    <h3 class="text-3xl font-slice self-start tracking-widest underline decoration-primary underline-offset-8">EMOTES</h3>

    {#if user_info.emotes.length > 0}
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {#each user_info.emotes as emote}
          <button on:click={() => sendToPartyServer(emote.name)} class="btn btn-primary btn-outline p-8 w-fit h-fit">
            <img src={emote.source} alt={emote.name} class="w-16 h-16"/>
            <p class="text-white normal-case">{emote.name}</p>
          </button>
        {/each} 
      </div>
    {:else}
      <p>No emotes yet :(</p>
    {/if}
  </section>

  <a href="/">{"Made with <3 using rnlive.club"}</a>
</main>
