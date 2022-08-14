import express from "express";
import { buildOptions } from "./helpers.js";

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/*', (req, res) => {
  console.log('req.query :>> ', req.query);
  res.render('index', buildOptions({}));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
})
