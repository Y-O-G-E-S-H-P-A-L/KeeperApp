import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myKeeperAppDB", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("DB Connected.");
});

const keeperSchema = mongoose.Schema({
  title: String,
  description: String,
});

// Create Keeper Model
const Keeper = new mongoose.model("Keeper", keeperSchema);

app.get("/api/getAll", (req, res) => {
  Keeper.find({}, (err, keeperList) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(keeperList);
    }
  });
});

app.post("/api/addNew", (req, res) => {
  const { title, description } = req.body;
  const keeperObj = new Keeper({
    title,
    description,
  });

  keeperObj.save(() => {
    Keeper.find({}, (err, keeperList) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(keeperList);
      }
    });
  });
});

app.post("/api/delete", (req, res) => {
  const { id } = req.body;
  Keeper.deleteOne({ _id: id }, () => {
    Keeper.find({}, (err, keeperList) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(keeperList);
      }
    });
  });
});

app.listen(3001, () => {
  console.log("Backend Running on Port : 3001");
});
