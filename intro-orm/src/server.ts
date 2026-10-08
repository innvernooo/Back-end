import express from 'express';
import { authorsRoute } from './route/author.route';

const PORT: number = 8002;

const app = express();
app.use(express.json());

app.use('/api/v1/authors', authorsRoute);

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
