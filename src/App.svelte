<script lang="ts">
  export let name: string;
  import GoogleAuth, { user } from "./GoogleAuth.svelte";
  import GMail from "./GMail.svelte";
</script>

<div class="app">
  <p>Hello {name}!</p>
</div>

<GoogleAuth>
  <GMail />
</GoogleAuth>
