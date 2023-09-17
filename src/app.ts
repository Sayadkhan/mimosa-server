import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoSenitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

console.log('hello');
class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configerMiddlewares();
    this.setupRoutes();
    this.connectToDatabase();
  }

  private configerMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(mongoSenitize());
    this.app.use(helmet());
    this.app.use(hpp());
  }
  private setupRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'welcome to mimosa server' });
    });
  }
  private connectToDatabase(): void {
    const URI = process.env.MONGO_URI as string;
    mongoose
      .connect(URI)
      .then(() => {
        const PORT = process.env.PORT || 4000;

        this.app.listen(PORT, () => {
          console.log(`server is running on Port${PORT}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

dotenv.config();

new App();
