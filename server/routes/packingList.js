import express from "express";

// Connect to the database
import db from "../db/connection.js";

// Converts string id to ObjectId for the _id
import { ObjectId } from "mongodb";

// Router to define our routes
const router = express.Router();

// Get a list of all packing lists
router.get("/", async (req, res) => {
    let collection = await db.collection("packingLists");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Query a single list
router.get("/:id", async (req, res) => {
    let collection = await db.collection("packingLists");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(400);
    else res.send(result).status(200);
});

// Create a new packing list
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            duration: req.body.duration,
            categories: req.body.categories,
            lists: req.body.lists,
        };
        let collection = await db.collection("packingLists");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding packing list")
    }
});

// Update a packing list by id
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)}
        const updates = {
            $set: {
                name: req.body.name,
                duration: req.body.duration,
                categories: req.body.categories,
                lists: req.body.lists,
            },
        };

        let collection = await db.collection("packingLists");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating packing list");
    }
});

// Deleting a packing list
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        let collection = await db.collection("packingLists");
        let result = await collection.delteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting packing list")
    }
});

export default router;