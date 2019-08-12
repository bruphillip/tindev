import { Schema, Model, model } from 'mongoose';

class Dev extends Schema {
  constructor() {
    super(
      {
        name: {
          type: String,
          required: true
        },
        user: {
          type: String,
          required: true
        },
        bio: String,
        avatar: {
          type: String,
          required: true
        },
        likes: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Dev'
          }
        ],
        dislikes: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Dev'
          }
        ]
      },
      {
        timestamps: true
      }
    );
  }
}

export default model('Dev', new Dev());
