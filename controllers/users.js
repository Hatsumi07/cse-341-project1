const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("users").find();
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("users").find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    console.log("successful validation:", req.body);
    const user = {
      email: req.body.email,
      username: req.body.username,
      name: req.body.name,
      ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().db().collection("users").insertOne(user);
    console.log(response);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
        res.status(500).json(res.locals.response.error || "Some error ocurres while updating the user.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser
};