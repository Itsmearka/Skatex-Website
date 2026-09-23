import createClient from '$lib/prismicio';

export async function GET({ fetch, request, url }) {
	const client = createClient({ fetch, request });
	const pages = await client.getAllByType('page');
	const urls = pages
		.map(({ uid }) => (uid === 'homepage' ? '/' : `/${uid}`))
		.map((path) => `\t<url><loc>${url.origin}${path}</loc></url>`)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml' }
	});
}
