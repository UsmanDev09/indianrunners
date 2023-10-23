import { v2 as cloudinary } from 'cloudinary'
import { uuid } from "uuidv4"

export const uploadImageToCloudinary = async (file: any, folder: string) => {
    let imageBuffer: Buffer, base64Image: string, result
  console.log(file)
    if(file) {
    imageBuffer = file.buffer
    base64Image = imageBuffer.toString('base64');
    result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
        folder: folder, 
        public_id: uuid() 
      }, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.info(result);
        }
    });
    return result
  }

}

export const deleteImageFromCloudinary = async(result: any) => {
    result = await cloudinary.uploader.destroy(result.public._id, (error: Error, result: any) => {
        if (error) {
          console.error(error);
        } else {
          console.info(result);
        }
      });
  return result
}