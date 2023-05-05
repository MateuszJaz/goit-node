const path = require('path');
const multer = require('multer');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const UPLOAD_DIR = path.join(process.cwd(), 'tmp');
const AVATAR_DIR = path.join(process.cwd(), 'public', 'avatars');

const shortenAvatarURL = (avatarURL) => path.relative(PUBLIC_DIR, avatarURL);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, UPLOAD_DIR);
  },
  filename: (req, file, callback) => {
    const { id } = req.user;
    const date = Date.now();
    const name = [id, date, file.originalname].join('_');
    callback(null, name);
  },
  limits: { fileSize: 1_048_576 },
});

const upload = multer({
  storage: storage,
});

module.exports = {
  UPLOAD_DIR,
  AVATAR_DIR,
  upload,
  shortenAvatarURL,
};
