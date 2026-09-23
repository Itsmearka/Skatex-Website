export function GET({ url }) {
	const body = `User-agent: *
Allow: /

Sitemap: ${url.origin}/sitemap.xml
`;

	return new Response(body, {
		headers: { 'content-type': 'text/plain' }
	});
}
