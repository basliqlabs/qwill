<script lang="ts">
  function switchToLanguage() {
    const currentTheme = document.documentElement.dataset['theme']

    if (currentTheme === 'qwill-light') document.documentElement.dataset['theme'] = 'qwill-dark'
    else document.documentElement.dataset['theme'] = 'qwill-light'
  }
</script>

<div>
  <button class="subtle" onclick={() => switchToLanguage()}>☀️</button>
</div>
