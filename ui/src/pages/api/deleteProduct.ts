// pages/api/createProduct.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from './index'; // Import your ApiService
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
    try {
        const params = {
            id: JSON.parse(req.body)._id
        }

        const response = await ProductService.deleteProduct(params, req.headers.authorization); // Assuming you store the token in a cookie
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


