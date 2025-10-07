import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  const { client_id } = req.query

  if (req.method === 'GET') {
    if (!client_id) {
      return res.status(400).json({ error: 'client_id required' })
    }

    const { data, error } = await supabase
      .from('holdings')
      .select('*')
      .eq('client_id', client_id)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ holdings: data })
    
  } else if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('holdings')
      .insert([req.body])
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(201).json({ holding: data[0] })
    
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
