const { Schema, model } = require('mongoose');

const schema = new Schema({
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
        ref: 'Thought'
    }
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }

);



Schema.virtual('friendCount').get(function () {
    return this.friend.reduce((total, user) => total + user.friends.length + 1, 0);
});

const User = model('User', Schema);

module.exports = User;
