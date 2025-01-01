<script lang="ts">
	let { data } = $props();

	import blevins from '$lib/img/blevins.jpg';
	import { DiscordSDK } from '@discord/embedded-app-sdk';
	import { onMount } from 'svelte';

	const discordSdk = new DiscordSDK(data.client_id);

	onMount(async () => {
		await discordSdk.ready();

		const { code } = await discordSdk.commands
			.authorize({
				client_id: data.client_id,
				response_type: 'code',
				state: '',
				prompt: 'none',
				scope: ['identify', 'rpc.activities.write']
			})
			.catch((e) => ({ code: false as false }));
		if (!code) return console.log('man that sucks i guess');

		const response = await fetch('/api/token', {
			method: 'POST',
			body: JSON.stringify({ code }),
			headers: { 'Content-Type': 'application/json' }
		});

		const { access_token } = await response.json();

		await discordSdk.commands.authenticate({ access_token });

		await discordSdk.commands.setActivity({
			activity: {
				type: 0,
				details: 'Details',
				state: 'State',
				instance: true,
				secrets: {
					join: 'joinsecret',
					match: 'matchsecret'
				},
				timestamps: {
					start: Date.now()
					// end: Date.now() + 60_000
				}
			}
		});
	});
</script>

<button
	onclick={() => {
		discordSdk.commands.openInviteDialog();
	}}
>
	<img src={blevins} class="h-48 shadow-sm" alt={'Tyler "Ninja" Blevins'} />
</button>
