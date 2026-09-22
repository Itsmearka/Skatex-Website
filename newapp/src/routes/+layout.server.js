import createClient from '$lib/prismicio'

export async function load({ fetch, request }) {
  const client = createClient({ fetch, request })
  const pages = await client.getAllByType('page')

  return {
    pages: pages.map(({ id, uid }) => ({ id, uid }))
  }
}
