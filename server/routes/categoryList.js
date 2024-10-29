import express from "express";

// Connect to the database
import db from "../db/connection.js";

// Converts string id to ObjectId for the _id
import { ObjectId } from "mongodb";

// Router to define our routes
const router = express.Router();

// Get a list of all category lists
router.get("/", async (req, res) => {
    let collection = await db.collection("categoryLists");
    let results = await collection.find({}).toArray();
    console.log("Got all category lists");
    res.status(200).send(results);
});

// Query a single category list
router.get("/:id", async (req, res) => {
    try {
        let collection = await db.collection("categoryLists");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) {
            res.send("Not found").status(400);
        }
        else {
            console.log("Got category list: ", req.params.id);
            res.status(200).send(result);
        }
    } catch(err) {
        console.error(err);
        res.status(400).send("Not found")
    }
});

// Create a new category list
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.category,
            items: req.body.items,
        };
        let collection = await db.collection("categoryLists");
        let result = await collection.insertOne(newDocument);
        let newCategory = await collection.findOne({ _id: result.insertedId });
        console.log("Category list successfuly created");
        res.status(201).send(newCategory);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding category list")
    }
});

// Update a category list by id
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)}
        const updates = {
            $set: {
                category: req.body.category,
                items: req.body.items,
            },
        };

        let collection = await db.collection("categoryLists");
        let result = await collection.updateOne(query, updates);
        console.log("Updated category list: ", req.params.id);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating category list");
    }
});

// Deleting a category list
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        let collection = await db.collection("categoryLists");
        let result = await collection.deleteOne(query);

        console.log("Deleted category list: ", req.params.id);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting category list")
    }
});

export default router;