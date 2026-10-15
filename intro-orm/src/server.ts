import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { authorsRoute } from './route/author.route';
import { booksRouter } from './features/book/book.route';
import { categoriesRouter } from './route/category.route';
import { AppError } from './errors/app.error';

const PORT: number = parseInt(process.env.PORT!);
const API_PREFIX: string = process.env.API_PREFIX!;

const app = express();
const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',');

    if (ALLOWED_ORIGINS!.includes(origin!))
      return callback(new Error('Origin not allowed by CORS'), false);

    return callback(null, true);
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(`${API_PREFIX}/authors`, authorsRoute);
app.use(`${API_PREFIX}/books`, booksRouter);
app.use(`${API_PREFIX}/categories`, categoriesRouter);

/* Centralized Error */
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError)
    return res.status(error?.status).json({
      success: false,
      message: error?.message,
      data: {},
    });
  if (error instanceof Error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: {},
    });
});

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
