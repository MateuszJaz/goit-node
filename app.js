const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const contactsRouter = require('./api/index');

app.use(logger(formatsLogger));

app.use('/api', contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

const uriDb = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
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
  console.log('Database disconnected!');
});
