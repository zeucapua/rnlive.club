<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import PartySocket from "partysocket";

  import { dev } from "$app/environment";

  let party_messages : string[] = [];

  let room_id : string | undefined = $page.url.searchParams.get("room_id") ?? undefined;

  let socket : PartySocket;

  onMount(() => {
    if (room_id) {
      socket = new PartySocket({
        host: dev ? "localhost:1999" : `https://rnlive-club.zeucapua.partykit.dev/party/${room_id}`,
        room: room_id
      });

      socket.addEventListener("message", (event) => {
        const message_data = JSON.parse(event.data);
        switch (message_data.type) {
          case "log": {
            console.log("PARTY:", message_data.content);
            break;
          }
          case "pong": {
            party_messages = [...party_messages, message_data.content];
            break;
          }
          default: {
            console.log("DEFAULT:", event.data);
          }
        }
      });
    }
  });
</script>

<p>Overlay</p>
