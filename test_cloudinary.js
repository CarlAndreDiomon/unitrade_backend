import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import dns from 'dns';
import https from 'https';

// Force IPv4 globally
dns.setDefaultResultOrder('ipv4first');
https.globalAgent.options.family = 4;

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Testing Cloudinary connection...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('Cloudinary Connection Failed:', error);
  } else {
    console.log('Cloudinary Connection Successful:', result);
  }
});
