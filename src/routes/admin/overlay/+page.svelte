<script lang="ts">
  import { tick } from "svelte";
  import { page } from "$app/stores";
  import { fly, scale } from "svelte/transition";
  import PartySocket from "partysocket";
  import type { LayoutData } from "../$types";

  import { dev } from "$app/environment";
    import Layout from "../../+layout.svelte";
  export let data : LayoutData;
  
  let sources = data.streamer?.emotes;
  let emotes : { source: string, fading: boolean }[] = [];

  let width : number;
  let height : number;

  const socket = new PartySocket({
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
        displayEmote(message_data.content);
        break;
      }
      default: {
        console.log("DEFAULT:", event.data);
      }
    }
  });

  async function displayEmote(name : string) {
    for (const s of sources) {
      if (s.name === name) {
        let e = { source: s.source, fading: false };
        emotes = [...emotes, e];
        await tick();
        emotes[emotes.indexOf(e)].fading = true;
        break;
      }
    }
  }
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<div class="relative" style:width={width + "px"} style:height={height + "px"}>
  {#each emotes as e}
    {#if !e.fading}
      <img
        src={e.source}
        alt="emote alt"
        class="w-16 h-16"
        style:position="absolute"
        style:left={Math.floor(Math.random() * width) + "px"}
        style:bottom=0
        in:scale={{ duration: 3000 }}
        out:fly={{ y: -500, delay: 300, duration: 5000 }}
      />
    {/if}
  {/each}
</div>
