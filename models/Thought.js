const { Schema, model, Types } = require('mongoose');

//defining a schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: "true",
            max:280
        },
        username: {
            type: String,
            required: "true",
            trim:true
        },
        createdAt:{
            type:Date,
            default: Date.now,
            get: createdAtVal => createdAtVal.toDateString()
        }
    })

    const thoughtSchema = new Schema(
        {
            thoughtText: {
                type: String,
                required: true,
                min: 1,
                max: 280
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: createdAtVal => createdAtVal.toDateString()
            },
            username: {
                type: String,
                required: true
            },
            reactions: [reactionSchema]
        },
        {
            toJSON: {
                virtuals: true,
            },
            id: false
        }
    )

    //virtual method

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

//compile the models

const Thought = model ('Thought', thoughtSchema)

module.exports = Thought;
