import 'dotenv/config';
import app from './app.js';
import connectDb from './config/db.js';

const port = Number.parseInt(process.env.PORT ?? '5000', 10);

const startServer = async () => {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  } catch (error) {
    console.error('Server startup failed');
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
