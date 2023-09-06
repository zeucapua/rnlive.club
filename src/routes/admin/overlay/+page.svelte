<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import PartySocket from "partysocket";

  import { dev } from "$app/environment";
  let emotes : string[] = [];
  let socket : PartySocket;

  onMount(() => {
    socket = new PartySocket({
      host: dev ? "localhost:1999" : `https://rnlive-club.zeucapua.partykit.dev/party/${$page.data.user.userId}`,
      room: $page.data.user.userId
    });

    socket.addEventListener("message", (event) => {
      const message_data = JSON.parse(event.data);
      switch (message_data.type) {
        case "log": {
          console.log("PARTY:", message_data.content);
          break;
        }
        case "pong": {
          emotes = [...emotes, message_data.content];
          break;
        }
        default: {
          console.log("DEFAULT:", event.data);
        }
      }
    });
  });
</script>

<p>Overlay</p>
{#each emotes as emote}
  <p>{emote}</p>
{/each}
