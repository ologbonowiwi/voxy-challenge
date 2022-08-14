import express from "express";
import { getOptions } from "./domain/getOptions.js";

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/*', (req, res) => {
  res.render('index', getOptions(req.query));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
})
