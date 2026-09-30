import express, { request, Request, Response } from 'express';

const PORT: number = 8000;

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({
    message: 'Welcome to API Intro Express',
  });
});

app.post('/handle-request/:slug', (req: Request, res: Response) => {
  const data = req.body;
  const params = req.params;
  console.log(params?.slug);
  const queries = req.query;
  console.log(queries?.isVerified);

  return res.json({
    message: `Handle request successful`,
  });
});
app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
