import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

export function GET({ url }) {
	const install = url.searchParams.get('install');
	if (install === null || !['user', 'guild'].includes(install)) return redirect(302, '/');

	const params = new URLSearchParams();
	params.append('client_id', env.DISCORD_CLIENT_ID);
	params.append('response_type', 'code');
	if (dev) params.append('redirect_uri', 'http://localhost:5173/oauth');
	else params.append('redirect_uri', 'https://terry.snep.lol/oauth');
	if (install === 'guild') params.append('integration_type', '0');
	if (install === 'user') params.append('integration_type', '1');
	if (install === 'guild') params.append('scope', 'identify bot');
	if (install === 'user') params.append('scope', 'identify applications.commands');

	const authorizeUrl = 'https://discord.com/oauth2/authorize?' + params.toString();
	return redirect(302, authorizeUrl);
}
