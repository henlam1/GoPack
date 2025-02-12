import express from "express";

// Connect to the database
import db from "../config/db.js";

// Converts string id to ObjectId for the _id
import { ObjectId } from "mongodb";

// Router to define our routes
const router = express.Router();

/**
 * ItemListDefault is a collection of default items and the suggested unit per day
 * users will not be able to interface with it but we will use this to help categorize and suggest defaults
 */
// Get a list of all item list default objects
router.get("/", async (req, res) => {
    let collection = await db.collection("itemListDefaults");
    let results = await collection.find({}).toArray();
    console.log("Got all item defaults");
    res.status(200).send(results);
});

// Query a single default item by id
router.get("/findById/:id", async (req, res) => {
    try {
        let collection = await db.collection("itemListDefaults");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) {
            res.send("Not found").status(400);
        }
        else {
            console.log("Got item default ", req.params.id);
            res.status(200).send(result);
        }
    } catch(err) {
        console.error(err);
        res.status(400).send("Not found")
    }
});

// Query a single default item by name
// Pass the name through body because of spaces and special characters...
router.get("/findByName", async (req, res) => {
    try {
        let collection = await db.collection("itemListDefaults");
        let query = { "name": req.body.name };
        let result = await collection.findOne(query);

        if (!result) {
            res.send("Not found").status(400);
        }
        else {
            console.log("Got item default ", req.body.name);
            res.status(200).send(result);
        }
    } catch(err) {
        console.error(err);
        res.status(400).send("Not found")
    }
});

// Create a new item list default
/**
 * Example
 * curl --header "Content-Type: application/json" \
--request POST \
--data '{"name":"T-shirt", "units": 3}' \
http://localhost:5050/ItemListDefaults/
 */
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            units: req.body.units,
        };
        let collection = await db.collection("itemListDefaults");
        let result = await collection.insertOne(newDocument);
        console.log("New default item created");
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating new default item")
    }
});

// Update a default item's unit by name
// need name and units (to update) of default item passed by body
router.patch("/updateUnitsByName", async (req, res) => {
    try {

        let updateObj = {}

        /**
         * Decided not to let people update name because ive set the 
         * name as unique on the db so you shouldnt need to update it
         */
        if(req.body.units) {
            updateObj.units = req.body.units
        }

        const updates = {
            $set: updateObj
        };

        let query = { "name": req.body.name };

        let collection = await db.collection("itemListDefaults");
        let result = await collection.updateOne(query, updates);

        console.log("Updated itemListDefaults: ", req.body.name);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating default item");
    }
});

// Deleting a default item
// should probably delete reference from all category type object if there was
router.delete("/deleteById/:id", async (req, res) => {
    try {
        // Delete from ItemListDefaults collection
        const query = { _id: new ObjectId(req.params.id) };
        let result1 = await db.collection("itemListDefaults").deleteOne(query);

        // Delete references from CategoryType collection (If we dont want to hide this call we can just call two apis instead)
        // this is copied from categoryType.js
        let result2 = await db.collection("categoryType").updateMany({}, { "$pull": {"defaultItems" : new ObjectId(req.params.id)}})

        console.log("Deleted itemListDefaults: ", req.params.id);
        res.status(200).send(result1);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting category type")
    }
});

// Deleting a default item by name
// should probably delete reference from all category type object if there was
// must pass the name through body
router.delete("/deleteByName", async (req, res) => {
    try {
        //Pretty much the same as above but find the id first
        let defaultItem = await db.collection("itemListDefaults").findOne({ "name": req.body.defaultItemName});
        if(!defaultItem) {
            res.status(400).send("no such default item");
            return;
        }
        // Delete from ItemListDefaults collection
        const query = { _id: defaultItem._id };
        let result1 = await db.collection("itemListDefaults").deleteOne(query);

        // Delete references from CategoryType collection (If we dont want to hide this call we can just call two apis instead)
        // this is copied from categoryType.js
        let result2 = await db.collection("categoryType").updateMany({}, { "$pull": {"defaultItems" : defaultItem._id}})

        console.log("Deleted itemListDefaults: ", req.body.name);
        res.status(200).send(result1);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting category type")
    }
});

export default router;