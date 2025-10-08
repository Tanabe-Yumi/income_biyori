import express from 'express';
// import { Express, Request, Response } from 'express';

const app = express();
const port = 3000;

const books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
