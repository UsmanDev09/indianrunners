import mongoose, { InferSchemaType, model, Schema, Types } from 'mongoose'
import Product, { Product as ProductInterface } from './product'
import Challenge, { Challenge as ChallengeInterface } from './challenge'

const landingPageSchema = new Schema({
    mainSection: { image: { type: String } },
    sections: [{
        _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
        type: { type: String, enum: ['product', 'challenge']},
        heading: { type: String, required: [true, 'Please add a heading'] },
        products: [ { type: Schema.Types.ObjectId, ref: 'Product' } ],
        challenges: [ { type: Schema.Types.ObjectId, ref: 'Challenge' } ]
    }],
    selected: { type: Boolean, default: false }
}, { timestamps: true })


export interface LandingPage extends Document {
    _id: Types.ObjectId,
    mainSection: Object
    sections: {
        _id: Number
        type: String
        heading: String
        products: ProductInterface[]
        challenges: ChallengeInterface[]
    }[]
    selected: Boolean

}
export default model<LandingPage>('LandingPage', landingPageSchema)