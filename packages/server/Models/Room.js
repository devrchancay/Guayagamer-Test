import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    sessions: {
      type: Object,
    },
  },
  { timestamps: true },
);

RoomSchema.plugin(mongoosePaginate);

const RoomModel = mongoose.model('Room', RoomSchema);

export default RoomModel;
