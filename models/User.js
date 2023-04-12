const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJson: {
    virtuals: true
},
    id: false
});


Schema.virtual('friendCount').get(function(){
    return this.friend.reduce((total,user) => total + user.friends.length + 1, 0);
});

const User = model('User', Schema);

module.exports = User;
