<script context="module">
  import { writable } from "svelte/store";
  export const user = writable(null);
</script>

<script>
  import { onMount } from "svelte";

  let profile;
  import clientConfig from "./gapi-client-config.ts";
  async function signIn() {
    const googleAuth = gapi.auth2.getAuthInstance();
    return await googleAuth.signIn();
  }
  async function signOut() {
    const googleAuth = gapi.auth2.getAuthInstance();
    return await googleAuth.signOut();
  }
  onMount(async () => {
    // import gapi from "gapi-client";
    gapi.load("client:auth2", async () => {
      // library loaded
      await gapi.client.init(clientConfig);
      // console.log("client.init done");
      const googleAuth = gapi.auth2.getAuthInstance();
      googleAuth.currentUser.listen((u) => {
        $user = u;
      });
      if (googleAuth.isSignedIn.get()) {
        $user = googleAuth.currentUser.get();
      }
    });
  });
  $: if ($user) {
    const p = $user.getBasicProfile();
    profile = {
      name: p.getName(),
      email: p.getEmail(),
      imageUrl: p.getImageUrl(),
    };
  } else {
    profile = null;
  }
</script>

{#if $user && $user.isSignedIn()}
  <div class="auth yes">
    <img src={profile.imageUrl} alt={profile.name} />
    <div class="col2">
      <div class="name">
        Name: {profile.name}
      </div>
      <div class="email">
        Email: {profile.email}
      </div>
      <button on:click={signOut}>Sign Out</button>
    </div>
  </div>
  <slot />
{:else}
  <div class="auth no">
    <div class="col2">
      <button on:click={signIn}>Sign In</button>
    </div>
  </div>
{/if}

<style type="scss">
  .auth {
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 10px darkgrey;
    background-color: greenyellow;
    margin: 10px 0;
    img {
      widows: 80px;
      height: 80px;
      margin: 0.5em;
    }
    .col2 {
      display: flex;
      flex-direction: column;
      margin: 0.5em;
    }
    transition: all 1s ease-in-out;
  }
</style>
