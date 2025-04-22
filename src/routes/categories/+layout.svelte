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
    margin-block: var(--ws-8);
  }
</style>
