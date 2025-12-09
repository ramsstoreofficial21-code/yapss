export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' })
    }

    const { postLink, reactions } = req.body
    if (!postLink || !reactions) {
      return res.status(400).json({ message: 'Masukkan link post dan reaksi' })
    }

    const url = 'https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api/channel/react-to-post'
    const requestData = { post_link: postLink, reacts: reactions }
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <TOKEN-MU>'
    }

    const response = await axios.post(url, requestData, { headers })
    return res.status(200).json(response.data)

  } catch (error) {
    console.error(error)
    // selalu kirim JSON
    const message = error?.response?.data?.message || error.message || 'Terjadi kesalahan server'
    return res.status(500).json({ message })
  }
}
