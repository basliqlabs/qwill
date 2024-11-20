<script lang="ts">
	import * as m from '$lib/paraglide/messages'
	import SwitchLanguageButton from '../switch-language-button/SwitchLanguageButton.svelte'

	let name = 'Svelte'
</script>

<header>
	<div class="logo">
		<figure>
			<img />
		</figure>
		<p>{name}</p>
	</div>

	<nav class="navbar">
		<ul>
			<!-- <li><a href="/blog">{m.header_all_blog_posts()}</a></li> -->
			<li><a href="/categories">{m.header_categories()}</a></li>
			<!-- <li><a href="/collections">{m.header_collections()}</a></li> -->
			<!-- <li><a href="/series">{m.header_series()}</a></li> -->
		</ul>
	</nav>

	<div class="actions">
		<SwitchLanguageButton />
	</div>
</header>
