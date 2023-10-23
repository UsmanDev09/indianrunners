// pages/api/createProduct.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiService, ProductService } from './index'; // Import your ApiService
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
    // Validate the input data if necessary
    // ...
    try {
        
        const params = {
            body: req.body
        }

        const response = await ApiService.createChallengeCategory(params, req.headers.authorization); // Assuming you store the token in a cookie
        console.log('RES',response)
        res.status(200).json(response.data);
    }  catch(err) {
        if(err instanceof Error) {
            res.status(500).json(err.message)
        }

    }  
  
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}


