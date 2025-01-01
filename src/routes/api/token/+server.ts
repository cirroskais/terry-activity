import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';

interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}

export async function POST({ request }) {
	const { code } = await request.json();
	if (!code) return error(400, 'fuck you');

	const response = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: env.DISCORD_CLIENT_ID,
			client_secret: env.DISCORD_CLIENT_SECRET,
			grant_type: 'authorization_code',
			code: code
		})
	});

	const { access_token } = (await response.json()) as TokenResponse;

	return json({ access_token });
}
