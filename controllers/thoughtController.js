const { Thought, User, Types } = require('../models');

const thought_controller = {

    getAllThoughts(req, res) {
        Thought.find({})
            .select("-__v")
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.json(404).json({ message: "No thought found with this Id" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    
    newThought({ body }, res){
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username},
                { $push: { thoughts: _id } },
                { new: true }
            );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No User found with this id'});
                    return; 
                }
                res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    updateThought({params, body}, res){
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this Id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                res.status(404).json({ message: "No Thought found with this Id" });
                return;
            }
            return User.findOneAndUpdate(
                { username: deletedThought.username },
                { $pull: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No Thought found with this Id" });
                return; 
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    newReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    deleteReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thought_controller;