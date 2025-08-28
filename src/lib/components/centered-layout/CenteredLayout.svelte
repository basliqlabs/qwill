<script lang="ts">
  let { children } = $props()
</script>

<section class="container">
  {@render children()}
</section>

<style>
  .container {
    max-inline-size: var(--t-container-inline-size);
    margin-inline: auto;
    padding-block: var(--ws-14);
  }
</style>
