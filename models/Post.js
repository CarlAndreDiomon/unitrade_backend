import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    caption: {
      type: String,
      required: [true, 'Please add a caption'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
    facebookName: {
      type: String,
      required: [true, 'Please add a Facebook name'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', postSchema);
