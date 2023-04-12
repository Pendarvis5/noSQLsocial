const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator(validEmail) {
                return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                    validEmail
                );
            }
        }

    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
        required: false
    }
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }]
},
    
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }

);

// virtuals method

userSchema.virtual('friendCount').get(function () {
    return this.friends.reduce((total, user) => total + user.friends.length + 1, 0);
});

//compile the models
const User = model('User', userSchema);

module.exports = User;
