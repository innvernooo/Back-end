import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { authorsRoute } from './route/author.route';
import { booksRouter } from './features/book/book.route';
import { categoriesRouter } from './route/category.route';

const PORT: number = 8002;

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
app.use('/api/v1/authors', authorsRoute);
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/categories', categoriesRouter);

/* Centralized Error */
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error)
    return res.status(500).json({
      success: false,
      message: error?.message,
      data: {},
    });
});

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
