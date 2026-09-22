import { error } from '@sveltejs/kit'
import createClient from '$lib/prismicio'

export async function load({ fetch, request }) {
  const client = createClient({ fetch, request })

  try {
    const document = await client.getByUID('page', 'homepage')
    return { document }
  } catch (cause) {
    if (cause?.message === 'No documents were returned') {
      throw error(404, 'Homepage not found')
    }

    throw cause
  }
}