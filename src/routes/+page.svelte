<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import PartySocket from "partysocket";

  import { dev } from "$app/environment";

  let name : string;

  let room_id : string | undefined = $page.url.searchParams.get("room_id") ?? undefined;

  let socket : PartySocket;

  onMount(() => {
    if (room_id) {
      socket = new PartySocket({
        host: dev ? "localhost:1999" : `https://rnlive-club.zeucapua.partykit.dev/party/${room_id}`,
        room: room_id
      });

      socket.addEventListener("message", (event) => {
        console.log("[CLIENT 'message'] PartySocket EventListener: ", event.data);
      });
    }
  });

  function sendToPartyServer(message : string) {
    if (socket) {
      socket.send(message);
    }
  }
</script>
<h1 class="text-5xl font-bold">rnlive.club</h1>

<p>
  ROOM: 
  {#if room_id}
   {room_id} 
  {:else}
    Not in One
  {/if}
</p>

<input type="text" placeholder="Enter name" bind:value={name} />
<button on:click={() => sendToPartyServer(`[${room_id}] ${name}: Hello!`)}>
  Say Hello
</button>
