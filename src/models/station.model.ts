import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

export const stationDAO = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  icon: Yup.string().required(),
  category: Yup.string().required(),
  slug: Yup.string(),
  createdBy: Yup.string().required(),
  createdAt: Yup.string(),
  updatedAt: Yup.string(),
  location: Yup.object()
    .shape({
      region: Yup.number(),
      coordinates: Yup.array(),
    })
    .required(),
});

export type TStation = Yup.InferType<typeof stationDAO>;

export interface Station extends Omit<TStation, "category" | "createdBy"> {
  category: ObjectId;
  createdBy: ObjectId;
}

const StationSchema = new Schema<Station>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    icon: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    slug: {
      type: Schema.Types.String,
      unique: true,
    },
    location: {
      type: {
        region: {
          type: Schema.Types.Number,
        },
        coordinates: {
          type: [Schema.Types.Number],
          default: [0, 0],
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

StationSchema.pre("save", function () {
  if (!this.slug) {
    const slug = this.name.split(" ").join("-").toLowerCase();
    this.slug = `${slug}`;
  }
});

const StationModel = mongoose.model("Station", StationSchema);

export default StationModel;
