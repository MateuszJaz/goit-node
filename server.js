const mongoose = require('mongoose');
const app = require('./app');
const { createFolderIsNotExist } = require('./config/createFolder');
const { AVATAR_DIR, UPLOAD_DIR } = require('./config/upload');

require('dotenv').config();

const uriDb = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, async () => {
      await createFolderIsNotExist(UPLOAD_DIR);
      await createFolderIsNotExist(AVATAR_DIR);
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log('Database connection successful');
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

process.on('SIGINT', () => {
  mongoose.disconnect();
  console.log(' Database disconnected!');
});
