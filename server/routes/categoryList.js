import express from "express";

// Connect to the database
import db from "../db/connection.js";

// Converts string id to ObjectId for the _id
import { ObjectId } from "mongodb";

// Router to define our routes
const router = express.Router();

/**
 * Category list should have
 * category (same as category type's name)
 * items - list of the object ids of the items from the items collection
 */

// Get a list of all category lists
router.get("/", async (req, res) => {
    let collection = await db.collection("categoryLists");
    let results = await collection.find({}).toArray();
    console.log("Got all category lists");
    res.status(200).send(results);
});

// Get a list of all category lists and nested details
router.get("/details", async (req, res) => {
    const pipeline = [
        {
            $lookup: {
                from: "items",
                localField: "items",
                foreignField: "_id",
                as: "items"
            }
        }
    ];

    const results = await db.collection("categoryLists").aggregate(pipeline).toArray();
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

// Get full details of category list
router.get("/details/:id", async (req, res) => {

    const pipeline = [
        {
            $match: { _id: new ObjectId(req.params.id) }
        },
        {
            $lookup: {
                from: "items",
                localField: "items",
                foreignField: "_id",
                as: "items"
            }
    }]
    const results = await db.collection("categoryList").aggregate(pipeline).toArray();
    console.log("Got all category lists");
    res.status(200).send(results);
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
/**
 * given the nature of the properties, you can only add to the items list
 * pass itemId into the body. 
 * To use this api i'd imagine when a user adds an item to a categorylist in their UI,
 * then the code will create the item, get the item id,
 *  and pass it to this api to add that item to the categorylist

 * example
 * curl --header "Content-Type: application/json" \
--request PATCH \
--data '{"itemId": "67246c275a761a242a04b012"}' \
http://localhost:5050/categoryList/67202949440b819859af4ce7
 */

//TODO: SOMETHING HERE IS BROKEN GODDAQMN
router.patch("/:id", async (req, res) => {
    try {
        console.log("in here?")
        
        let item = await db.collection("items").findOne({ _id: new ObjectId(req.body.itemId) });
        if(!item) {
            res.status(404).send("no such item");
            return;
        }

        const updates = {
            $push: {"items": item._id}
        };

        const query = { _id: new ObjectId(req.params.id)}

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