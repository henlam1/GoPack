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
    res.send(results).status(200);
});

// Query a single category list
router.get("/:id", async (req, res) => {
    try {
        let collection = await db.collection("categoryLists");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) res.send("Not found").status(400);
        else res.send(result).status(200);
    } catch(err) {
        console.error(err);
        res.status(400).send("Not found")
    }
});

// Create a new category list
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            category: req.body.category,
            items: req.body.items,
        };
        let collection = await db.collection("categoryLists");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
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
        res.send(result).status(200);
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

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting category list")
    }
});

export default router;