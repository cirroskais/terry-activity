import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export function GET() {
	return json({ client_id: env.DISCORD_CLIENT_ID });
}
