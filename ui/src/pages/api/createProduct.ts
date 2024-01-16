import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { ApiService } from '.';
import { deleteImageFromCloudinary, uploadImageToCloudinary } from '../../helpers/helper';

interface CustomNextApiRequest extends NextApiRequest {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };
}
export const config = {
  api: {
    bodyParser: false
  }
}
const storage = multer.memoryStorage(); // Store files in memory as Buffers

const upload = multer({ storage: storage });

export default async function handler(req: any, res: any) {
    try {
      upload.single('image')(req, res, async () => {

        const { name, price, description, rewardPoints } = req.body;
        const file = req.file; 
        const result = await uploadImageToCloudinary(file, 'product')         
        const params = {
          body:  {
            name, price, description, rewardPoints, image: result?.secure_url
          }
        }
        const response = await ApiService.createProduct(params, req.headers.authorization)
        if(!response.success)
          await deleteImageFromCloudinary(result)

        res.status(200).json(response.data);
      });
    } catch (error) {
      console.error('Error processing form data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
