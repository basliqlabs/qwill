<script lang="ts">
  import { type Author, authorsStore } from '../../../content/config/authors'

  type Props = {
    author: string
  }

  let { author }: Props = $props()
  let info = $state<Author | undefined>()
  authorsStore.subscribe((v) => {
    info = v.find((a) => a.id === author)
  })
</script>

{#if info}
  <a href="#" class="subtle">
    <div class="link-content">
      <img src={info.avatar} alt="" />
      <div class="author-info">
        <p class="author-name">{info.first_name} {info.last_name}</p>
        <p class="author-id">@{info.id}</p>
      </div>
    </div>
  </a>
{/if}

<style>
  .link-content {
    display: flex;
    align-items: center;
    gap: var(--ws-4);

    img {
      inline-size: 35px;
      aspect-ratio: 1;
      border-radius: var(--radius-xs);
    }

    .author-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--ws-2);
      line-height: 1;
    }

    .author-name {
      font-size: var(--font-size-4);
    }

    .author-id {
      font-size: var(--font-size-2);
      color: var(--t-color-text-muted);
      direction: ltr;
    }
  }
</style>
