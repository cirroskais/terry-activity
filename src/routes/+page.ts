export async function load({ fetch }) {
	const response = await fetch('./api/client');
	const { client_id } = await response.json();

	return { client_id };
}
