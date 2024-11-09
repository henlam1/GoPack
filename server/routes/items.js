import express from "express";

// Connect to the database
import db from "../db/connection.js";

// Converts string id to ObjectId for the _id
import { ObjectId } from "mongodb";

// Router to define our routes
const router = express.Router();

/**
 * Items is where every one has a name (same as copied from a default or whatever it is), units, packed, itemListDefault id
 */

// Get a list of all items
/**
 * curl --header "Content-Type: application/json" \
--request GET \
http://localhost:5050/items
 * 
 */
router.get("/", async (req, res) => {
    let collection = await db.collection("items");
    let results = await collection.find({}).toArray();
    console.log("Got all items");
    res.status(200).send(results);
});

// Query a single item
router.get("/:id", async (req, res) => {
    try {
        let collection = await db.collection("items");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) {
            res.send("Not found").status(400);
        }
        else {
            console.log("Got item: ", req.params.id);
            res.status(200).send(result);
        }
    } catch(err) {
        console.error(err);
        res.status(400).send("Not found")
    }
});

// Create new item
// very simple. 
// keep the logic of deciding the units based on the defaults outside of this call. 
/**
 * example
 * curl --header "Content-Type: application/json" \
--request POST \
--data '{"name":"miscellaneous", "units": 0, "packed": false}' \
http://localhost:5050/items
 */
router.post("/", async(req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            units: req.body.units,
            packed: req.body.packed
        };

        let collection = await db.collection("items");
        let result = await collection.insertOne(newDocument);
        console.log("New item created");
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating new item")
    }
});

// Update an item by id
/**
 * example
 * curl --header "Content-Type: application/json" \
--request PATCH \
--data '{"units": 5, "packed": true}' \
http://localhost:5050/items/6724664ca30ee3e6ca1dffeb
 */

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)}

        const updates = {};
        if (req.body.units) {
            updates.units = req.body.units
        }
        if(req.body.packed) {
            updates.packed = req.body.packed
        }

        console.log(updates)

        let collection = await db.collection("items");
        let result = await collection.updateOne(query, { $set: updates});
        console.log("Updated packing list: ", req.params.id);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating item");
    }
});

// Deleting an item by id
/**
 * example
 * curl --header "Content-Type: application/json" \
--request DELETE \
http://localhost:5050/items/6724664ca30ee3e6ca1dffeb
 */
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        let collection = await db.collection("items");
        let result = await collection.deleteOne(query);

        console.log("Deleted item: ", req.params.id);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting item")
    }
});

export default router;