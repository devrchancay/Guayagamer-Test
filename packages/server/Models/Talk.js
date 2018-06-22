import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoosePaginate from "mongoose-paginate";

const TalkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true,
      match: [
        /[A-Za-z]/,
        "El título de la charla solo puede contener letras del alfabeto"
      ]
    },
    duration: {
      type: Number
    },
    speaker: {
      type: String
    },
    emailSpeaker: {
      type: String
    }
  },
  { timestamps: true }
);

TalkSchema.plugin(uniqueValidator, { message: "Debe ser unico." });
TalkSchema.plugin(mongoosePaginate);

const TalkModel = mongoose.model("Talk", TalkSchema);

export default TalkModel;
