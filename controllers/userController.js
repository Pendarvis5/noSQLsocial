const { User, Thought } = require('../models');

const user_controller = {
    //mongoose controller function for getting users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: ('-__v')
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    getUserById({params}, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id found!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createNewUser({ body }, res) {
        console.log(body);
        User.create(body)
            .then(dbUserData => {
                console.log("dbUserData", dbUserData);
                res.json(dbUserData)
                return;
            })
            .catch(err => res.status(400).json(err));
    },
    updateUser({params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id found!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this Id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteFriend({params}, res) {
        User.findByIdAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .select("-__v")
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No friend found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },


}

module.exports = user_controller;