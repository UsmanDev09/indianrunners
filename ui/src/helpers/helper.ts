import axios from "axios";
import toast from "react-hot-toast";
// import cloudinary from "../../configs/cloudinary";

export const getPreSignedUrlFromCloudinary = async () => {
  try {
    const response = await axios.get(`${process.env.SERVER_DOMAIN}/api/landingpage/signedUrl`);
    return response.data.data;

  } catch (error) {
    if(error instanceof Error) 
      toast.error(`Error fetching pre-signed URL: ${error.message}`);
  }
};

export const uploadImageToCloudinary = async (file: any, preSignedData: any) => {
  if (!file || !preSignedData) {
    console.error('File or pre-signed data missing.');
    return; 
  } 

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(preSignedData.uploadUrl + `?timestamp=${preSignedData.timestamp}&signature=${preSignedData.signature}&api_key=467594938555567`, formData);
    
    return response.data.secure_url
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};




// export const deleteImageFromCloudinary = async(result: any) => {
//     result = await cloudinary.uploader.destroy(result.public._id, (error: Error, result: any) => {
//         if (error) {
//           console.error(error);
//         } else {
//           console.info(result);
//         }
//       });
//   return result
// }