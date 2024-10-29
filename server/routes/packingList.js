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
    console.log("Got all packing lists");
    res.status(200).send(results);
});

// Query a single packing list
router.get("/:id", async (req, res) => {
    try {
        let collection = await db.collection("packingLists");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) {
            res.send("Not found").status(400);
        }
        else {
            console.log("Got packing list: ", req.params.id);
            res.status(200).send(result);
        }
    } catch(err) {
        console.error(err);
        res.status(400).send("Not found")
    }
});

// Create a new packing list
router.post("/", async (req, res) => {
    try {
        const promises = req.body.categories.map(async (category) => {
            console.log(category);
            try {
                const response = await fetch("http://localhost:5050/categoryList/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        category: category,
                        items: {},
                    })
                });
                const data = await response.json();
                console.log("Data: ", data);
                return data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        })
        const categoryObjects = await Promise.all(promises);
        console.log(categoryObjects);

        let newDocument = {
            name: req.body.name,
            duration: req.body.duration,
            categories: categoryObjects,
        };
        let collection = await db.collection("packingLists");
        let result = await collection.insertOne(newDocument);
        console.log("Packing list successfully created");
        res.status(201).send(result);
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
            },
        };

        let collection = await db.collection("packingLists");
        let result = await collection.updateOne(query, updates);
        console.log("Updated packing list: ", req.params.id);
        res.status(200).send(result);
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
        let result = await collection.deleteOne(query);

        console.log("Deleted packing list: ", req.params.id);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting packing list")
    }
});

export default router;