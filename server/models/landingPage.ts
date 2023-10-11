import { InferSchemaType, model, Schema, Types } from 'mongoose'
import { Product as ProductInterface } from './product'
import { Challenge as ChallengeInterface } from './challenge'

const landingPageSchema = new Schema({
    mainSection: { image: { type: String } },
    sections: [{
        type: { type: String, enum: ['product', 'challenge']},
        heading: { type: String, required: [true, 'Please add a heading'] },
        products: [ { type: Schema.Types.ObjectId, ref: 'product' } ],
        challenges: [ { type: Schema.Types.ObjectId, ref: 'challenge' } ]
    }],
    selected: { type: Boolean, default: false }
}, { timestamps: true })


export interface LandingPage extends Document {
    _id: Types.ObjectId,
    mainSection: Object
    sections: {
        type: String
        heading: String
        products: ProductInterface[]
        challenges: ChallengeInterface[]
    }[]
    selected: Boolean

}
export default model<LandingPage>('LandingPage', landingPageSchema)