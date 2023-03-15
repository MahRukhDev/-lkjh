import type { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs'

const userExist = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.AFFILIATE_PROGRAM_API_URL || !req.query) {
    return res.status(400).json({ message: 'API URL Empty' })
  }

  const queryString = qs.stringify(req.query)
  const requestUrl = `${process.env.AFFILIATE_PROGRAM_API_URL}/user/exist?${queryString}`
  const response = await fetch(requestUrl)

  if (!response.ok) {
    return res.status(400).json({ message: 'An error occurred please try again' })
  }

  const result = await response.json()
  return res.status(200).json(result)
}

export default userExist
