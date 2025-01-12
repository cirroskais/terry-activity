import { redirect } from '@sveltejs/kit';

export async function load({ request, url }) {
	const frame_id = url.searchParams.get('frame_id');
	if (!frame_id) return redirect(302, '/install');
}
