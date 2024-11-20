<script lang="ts">
	import * as config from '$lib/config'
	import { getURL } from '$lib/navigation/url'

	let { data } = $props()
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={getURL(post)} class="title">{post.title}</a>
				<p class="date">{post.publishDate}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>
