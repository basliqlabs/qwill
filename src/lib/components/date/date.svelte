<script lang="ts">
  type Props = {
    dateString: string
    title?: string
    dimTitle?: boolean
    calendar?: 'gregory' | 'persian'
  }

  let { dateString, title, dimTitle = false, calendar = 'gregory' }: Props = $props()
  const date = new Date(dateString)

  const fullJalaliDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    calendar: 'persian'
  })

  const fullGeorgianDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    calendar: 'gregory'
  })
</script>

<a href="#" class="subtle">
  <div class="date-container">
    {#if title}
      <p class="date-title {dimTitle ? 'dimmed' : ''}">{title}</p>
    {/if}
    <p class="date-representation" title={fullGeorgianDate.format(date)}>
      {calendar === 'gregory' ? fullGeorgianDate.format(date) : fullJalaliDate.format(date)}
    </p>
  </div>
</a>

<style>
  .date-container {
    display: flex;
    flex-direction: column;
    gap: var(--ws-2);
    line-height: 1;
  }

  .date-title {
    font-size: var(--font-size-3);
  }

  .date-title.dimmed {
    color: var(--t-color-text-muted);
  }

  .date-representation {
    font-size: var(--font-size-5);
  }
</style>
