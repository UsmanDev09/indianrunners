// pages/api/createProduct.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from './index'; // Import your ApiService
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
    // Validate the input data if necessary
    // ...
    try {
        const params = {
            id: req.body._id,
            body: req.body
        }
        const response = await ProductService.updateProduct(params, req.headers.authorization); // Assuming you store the token in a cookie

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


