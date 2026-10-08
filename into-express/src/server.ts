import express from 'express';

const PORT: number = 8002;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
