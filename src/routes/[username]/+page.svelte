<script lang="ts">
  import { onMount } from 'svelte';
  import PartySocket from "partysocket";
  import { dev } from '$app/environment';

  export let data;
  const user_info = data.user_info;

  let socket : PartySocket;

  onMount(() => {
    socket = new PartySocket({
      host: dev ? "localhost:1999" : `https://rnlive-club.zeucapua.partykit.dev/party/${room_id}`,
      room: user_info.id 
    });

    socket.addEventListener("message", (event) => {
      const message_data = JSON.parse(event.data);
      switch (message_data.type) {
        case "log": {
          console.log("PARTY:", message_data.content);
          break;
        }
        default: {
          console.log("DEFAULT:", event.data);
        }
      }
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
