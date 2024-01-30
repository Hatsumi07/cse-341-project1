const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags=["Users"]
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    // #swagger.tags=["Users"]
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
};

const createUser = async(req, res) => {
    // #swagger.tags=["Users"]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection("contacts").insertOne(user);
    if (response.modfiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurres while updating the user.");
    }
};

const updateUser = async(req, res) => {
    // #swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection("contacts").replaceOne({ _id: userId }, user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurres while updating the user.");
    }
};
const deleteUser = async(req, res) => {
    // #swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("contacts").deleteOne({ _id: userId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurres while deleting the user.");
    }
};
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};