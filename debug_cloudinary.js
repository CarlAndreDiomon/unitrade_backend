import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('multer-storage-cloudinary');
console.log('Package export:', pkg);
console.log('CloudinaryStorage:', pkg.CloudinaryStorage);
console.log('default:', pkg.default);
