import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.APP_PORT || 7070;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
