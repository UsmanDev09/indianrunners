// pages/api/createProduct.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiService } from './index'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
    try {
        const params = {
            body: req.body
        }

        const response = await ApiService.createChallenge(params, req.headers.authorization); 

        res.status(200).json(response.data);
    }  catch(err) {
        if(err instanceof Error) {
            console.log(err.message)
            res.status(500).json(err.message)
        }
    }  
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}


