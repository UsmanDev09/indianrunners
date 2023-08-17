import { InferSchemaType, model, Schema } from 'mongoose'
import { Constants } from '../utility/constants'


const OtpSchema = new Schema({
  email: {
    type: String,
    required: [true, Constants.emailRequired],
  },
  code: {
    type: String,
    required: [true, Constants.codeRequired],
  },
})

type OTP = InferSchemaType<typeof OtpSchema>

export default model<OTP>('OTP', OtpSchema)
