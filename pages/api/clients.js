import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all clients
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ clients: data })
    
  } else if (req.method === 'POST') {
    // Create new client
    const { data, error } = await supabase
      .from('clients')
      .insert([req.body])
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(201).json({ client: data[0] })
    
  } else if (req.method === 'PUT') {
    // Update client
    const { id, ...updateData } = req.body
    const { data, error } = await supabase
      .from('clients')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ client: data[0] })
    
  } else if (req.method === 'DELETE') {
    // Delete client
    const { id } = req.body
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ message: 'Client deleted' })
    
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
