const { User, Thought } = require('../models')

const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).select('-__v')
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' })
    }
    res.status(200).json(thought)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find()
    res.json(thoughts)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body)
    res.status(200).json(thought)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' })
    }
    res.status(200).json(thought)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId)
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' })
    }
    await User.deleteMany({ username: thought.username })
    res.json({ message: 'Thought deleted!' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const createReaction = async (req, res) => {
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
    if (!reaction) {
      return res.status(404).json({ message: 'No thought with this id!' })
    }
    res.status(200).json(reaction)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteReaction = async (req, res) => {
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
    if (!reaction) {
      return res.status(404).json({ message: 'No thought with this id!' })
    }
    res.status(200).json(reaction)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
}
