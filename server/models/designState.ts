import { model, Schema, Types } from "mongoose";

const designStateSchema = new Schema(
  {
    imgSrc: { type: String },
    finetunes: { type: Array },
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
      scaledBy: { type: Number },
    },
  },
  { timestamps: true }
);

export interface DesignState extends Document {
  imgSrc: string;
  finetunes: string[];
  filter: string[];
  adjustments: {
    crop: {
      ratio: string;
      ratioTitleKey: string;
      width: string;
      height: string;
      x: string;
      y: string;
    };
    isFlippedX: string;
    isFlippedY: string;
    rotation: string;
  };
  annotations: string;
  resize: string;
  shownImageDimensions: {
    width: string;
    height: string;
    scaledBy: string;
  };
}

export default model<DesignState>("DesignState", designStateSchema);
