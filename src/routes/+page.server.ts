import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export async function load({ request, url }) {
	if (dev && request.headers.get('host')?.includes('discordsays.com'))
		return redirect(302, '/activity' + url.search);
}
