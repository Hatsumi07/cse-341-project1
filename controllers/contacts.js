const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const createError = require("http-errors");

const getAll = async (req, res) => {
    // #swagger.tags=["Users"]
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid contact id to find a contact.');
            throw createError(404, "Invalid ID format");
        }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .find({ _id: userId })
            .toArray((result) => {
            return result;
            });
            if (!response.length > 0) {
                res.status(500).json(response.error || "Contact doesn't exist");
                throw createError(404, "Contact does not exist"); 
            }
            // res.setHeader("Content-Type", "application/json");
            res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }

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
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurres while updating the user.");
    }
};

const updateUser = async(req, res) => {
    // #swagger.tags=["Users"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
        throw createError(404, "Invalid ID format");
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurres while updating the user.");
    }
};
const deleteUser = async(req, res) => {
    // #swagger.tags=["Users"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
        throw createError(404, "Invalid ID format");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("contacts").deleteOne({ _id: userId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while deleting the user.");
    }
};
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};