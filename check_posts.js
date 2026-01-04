import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/Post.js';
import User from './models/User.js'; // Needed for population

dotenv.config();

const checkPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const posts = await Post.find().sort({ createdAt: -1 }).limit(5);
    console.log('Latest 5 posts:');
    posts.forEach(post => {
      console.log('---------------------------------------------------');
      console.log(`ID: ${post._id}`);
      console.log(`Caption: ${post.caption}`);
      console.log(`Image URL: ${post.imageUrl}`);
      console.log(`User: ${post.user}`);
      console.log('---------------------------------------------------');
    });

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkPosts();
