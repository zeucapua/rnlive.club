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

<p>CLUB {user_info.twitch_username}</p>

{#each user_info.emotes as emote}
  <button on:click={() => sendToPartyServer(emote.name)}>
    <img src={emote.source} alt={emote.name} />
  </button>
{/each} 
