import express from 'express';
import { authorsRoute } from './route/author.route';
import { booksRouter } from './features/book/book.route';
import { categoriesRouter } from './route/category.route';

const PORT: number = 8002;

const app = express();
app.use(express.json());

app.use('/api/v1/authors', authorsRoute);
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/categories', categoriesRouter);

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
