import Post from '../models/Post.js';
import User from '../models/User.js';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  const { caption, facebookName } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  if (!caption || !imageUrl || !facebookName) {
    res.status(400).json({ message: 'Please add a caption, image, and Facebook name' });
    return;
  }

  try {
    const post = await Post.create({
      user: req.user._id,
      caption,
      imageUrl,
      facebookName,
    });

    // Populate user info to return with the post
    const populatedPost = await Post.findById(post._id).populate('user', 'name email');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public (or Private depending on requirements)
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Check for user
    if (!req.user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    // Make sure the logged in user matches the post user
    if (post.user.toString() !== req.user.id) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    await post.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPost, getPosts, deletePost };
