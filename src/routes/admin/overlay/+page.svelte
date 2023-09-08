<script lang="ts">
  import { tick } from "svelte";
  import { page } from "$app/stores";
  import { fly, scale } from "svelte/transition";
  import PartySocket from "partysocket";
  import type { LayoutData } from "../$types";

  import { dev } from "$app/environment";
  export let data : LayoutData;
  
  // get emoteName's and their source URLs
  let sources = data.streamer?.emotes;

  // keep track of the emotes being displayed
  let emotes : { source: string, fading: boolean }[] = [];

  let width : number;
  let height : number;

  // 'socket' is used to connect to the party from '/lib/server/partykit.ts'
  const socket = new PartySocket({
    // 'localhost:1999' is the host URL to connect to when running 'npx partykit dev' 
    // '<party-name>.<username>.partykit.dev/party/:id' will be live to connect to after running 'npx partykit deploy'
    host: dev ? "localhost:1999" : `https://rnlive-club.zeucapua.partykit.dev/party/${$page.data.user.userId}`,
    room: $page.data.user.userId
  });

  // listen to party's broadcasts (this.party.broadcast) from server
  socket.addEventListener("message", (event) => {
    // from server (/lib/server/partykit.ts): { type: 'pong', content: 'emoteName' }
    const message_data = JSON.parse(event.data);

    switch (message_data.type) {
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
        // create emote with url
        let e = { source: s.source, fading: false };

        // add to list that's rendered below
        emotes = [...emotes, e];

        // wait a tick
        await tick();

        // make fading true to trigger out:transition
        emotes[emotes.indexOf(e)].fading = true;
        break;
      }
    }
  }
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<div class="relative bg-none" style:width={width + "px"} style:height={height + "px"}>
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
