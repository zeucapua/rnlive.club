<script lang="ts">
    import type { LayoutData } from "../$types";

  export let data : LayoutData;
  const user = data.user;
</script>

<p>Admin</p>
<p>{user.twitch_username}</p>
