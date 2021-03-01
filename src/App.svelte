<script lang="ts">
  export let name: string;
</script>

<div class="app">
  <p>Hello {name}!</p>
</div>

<style lang="scss">
  .app {
    p {
      font-style: italic;
      color: red;
    }
  }
</style>
