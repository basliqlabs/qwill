<script lang="ts">
  import * as m from '$lib/paraglide/messages'
  import SwitchLanguageButton from '../switch-language-button/SwitchLanguageButton.svelte'

  let name = m.site_name()
</script>

<header>
  <nav>
    <div class="logo">
      <a href="/">
        <figure>
          <img src="/logo.svg" alt="" />
        </figure>
        <p>{name}</p>
      </a>
    </div>

    <ul>
      <!--            <li><a href="/blog">{m.header_all_blog_posts()}</a></li>-->
      <li><a href="/categories">{m.header_categories()}</a></li>
      <!--            <li><a href="/collections">{m.header_collections()}</a></li>-->
      <!--            <li><a href="/series">{m.header_series()}</a></li>-->
    </ul>

    <!--        <div class="actions">-->
    <!--            <SwitchLanguageButton/>-->
    <!--        </div>-->
  </nav>
</header>

<style>
  header {
    inset-block-start: 0;
    display: grid;
    place-items: center;
    /* TODO: 'backdrop-filter: blur()' is not working as expected */
    /*backdrop-filter: blur(10px);*/
    z-index: 999;
  }

  nav {
    display: flex;
    align-items: center;
    gap: var(--ws-6);
    max-inline-size: var(--t-navbar-inline-size);
    background-color: var(--t-navbar-background-color);
    box-shadow: var(--t-navbar-box-shadow);
    padding: var(--t-navbar-padding);
    border-radius: var(--t-navbar-border-radius);
    margin-block: var(--t-navbar-margin-block);
  }

  div.logo {
    a {
      align-items: center;
      gap: var(--ws-2);
      padding: var(--ws-3);
    }

    figure {
      inline-size: 2.4rem;
    }

    p {
      font-size: var(--font-size-6);
      font-weight: var(--font-weight-bold);
      color: var(--t-navbar-logo-text);
    }
  }

  ul {
    display: flex;
    align-items: center;
    gap: var(--ws-3);
    list-style: none;
    padding: 0;
  }

  ul,
  .logo {
    a,
    a:visited {
      text-decoration: none;
      display: flex;
      color: var(--t-navbar-link-text);
      background-color: hsl(from var(--t-navbar-link-bg) h s l / 0);
      transition: all var(--transition-xs) ease-in-out;
      border-radius: var(--radius-sm);
      padding: var(--ws-2);
    }

    a:hover {
      background-color: hsl(from var(--t-navbar-link-bg) h s l / 0.1);
    }

    a:active {
      background-color: hsl(from var(--t-navbar-link-bg) h s l / 0.2);
      transform: scale(0.93);
    }
  }
</style>
