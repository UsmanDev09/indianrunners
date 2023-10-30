import { model, Schema, Types } from 'mongoose'

const designState = new Schema({
    imgSrc: { type: String },
    finetunes: { type: String },
    filter: { type: String },
    adjustments: {
        crop: {
            ratio: { type: String },
            ratioTitleKey: { type: String },
            width: { type: Number },
            height: { type: Number },
            x: { type: Number },
            y: { type: Number }, 
        },
        isFlippedX: { type: Boolean },
        isFlippedY: { type: Boolean },
        rotation: { type: Number },

    },
    annotations: { type: Object },
    resize: { type: Object },
    shownImageDimensions: { 
        width: { type: Number },
        height: { type: Number },
        scaledBy: { type: Number }
    }
}, { timestamps: true })

export interface DesignState extends Document {
    imgSrc: String
    finetunes: String[]
    filter: String[]
    adjustments: {
        crop: {
            ratio: String
            ratioTitleKey: String
            width: String
            height: String
            x: String
            y: String
        },
        isFlippedX: String
        isFlippedY: String
        rotation: String
        },
    annotations: String
    resize: String
    shownImageDimensions: {
        width: String
        height: String
        scaledBy: String
    }
}

export default model<DesignState>('DesignState', designState)
