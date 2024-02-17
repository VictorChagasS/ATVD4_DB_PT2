import bodyParser from "body-parser";
import express, { Express } from "express";
import router from "./routes";

const app: Express = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
