import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { authorsRoute } from './route/author.route';
import { booksRouter } from './features/book/book.route';
import { categoriesRouter } from './route/category.route';
import { AppError } from './errors/app.error';
import { MulterError } from 'multer';
import { authRouter } from './features/auths/auth.route';
import cookieParser from 'cookie-parser';

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
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(`${API_PREFIX}/authors`, authorsRoute);
app.use(`${API_PREFIX}/books`, booksRouter);
app.use(`${API_PREFIX}/categories`, categoriesRouter);
app.use(`${API_PREFIX}/auths`, authRouter);

/* Centralized Error */
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error instanceof AppError)
    return res.status(error?.status).json({
      success: false,
      message: error?.message,
      data: {},
    });

  if (error instanceof MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        message: `File size exceeds the maximum limit of 1 KB`,
        data: {},
      });
    }
  }

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
