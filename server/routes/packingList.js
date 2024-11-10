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

// Get a list of all packing lists and nested details
router.get("/details", async (req, res) => {
    const pipeline = [
        {
            $lookup: {
                from: "categoryLists",
                localField: "categories_new",
                foreignField: "_id",
                as: "categories_new"
            }
        }
    ];

    const results = await db.collection("packingLists").aggregate(pipeline).toArray();
    console.log("Got all packingLists lists");
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

// Get full details of packing list
router.get("/details/:id", async (req, res) => {

    const pipeline = [
        {
            $match: { _id: new ObjectId(req.params.id) }
        },
        {
            $lookup: {
                from: "categoryLists",
                localField: "categories_new",
                foreignField: "_id",
                as: "categories_new"
            }
    }]
    const results = await db.collection("packingLists").aggregate(pipeline).toArray();
    console.log("Got all packing lists");
    res.status(200).send(results);
});

// Get categories from packing list
router.get("/:id/get-categories", async (req, res) => {
    try {
        let collection = await db.collection("packingLists");
        let query = { _id: new ObjectId(req.params.id) };
        const packingList = await collection.findOne(query);
        if (!packingList) {
            console.log("Packing list empty")
            return res.status(404).send('Packing list not found');
        }
        const categories = packingList.categories;
        if (categories === undefined) {
            console.log("categories undefined")
            return res.status(404).send('Categories not found');
        }
        res.status(200).send(categories);
    } catch (err){
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
                        name: category,
                        items: [],
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

// Update a packing list by adding category
router.patch("/:packingListId/add-category", async (req, res) => {
    const { packingListId } = req.params;
    const { categoryListId } = req.body;
    console.log("line 169", req.params, req.body);

    try {
        let collection = await db.collection("packingLists");
        let result = await collection.updateOne(
            { _id: new ObjectId(packingListId) },
            { $push: { categories: categoryListId } }
        );
        console.log("Updated packing list: ", req.params.packingListId);
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding category to packing list");
    }
});

// Update a packing list by id
/**
 * curl --header "Content-Type: application/json" \
--request PATCH \
--data '{"name":"help", "duration": 10}' \
http://localhost:5050/packingList/672029732ede47cd1a6459eb
 */
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)}

        const updateObj = {}
        if (req.body.name) {
            updateObj.name = req.body.name;
        }
        if (req.body.duration) {
            updateObj.name = req.body.duration;
        }
        if (req.body.categories) {
            updateObj.categories = req.body.categories;
        }
        const updates = {
            $set: updateObj
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

// Add a category to packing list
/*
* Example
* curl --header "Content-Type: application/json" \
--request POST \
http://localhost:5050/packinglist/categorylist/672029732ede47cd1a6459eb/6722f5ea424708a5419e5438
*/
router.post("/categorylist/:id/:categoryId", async (req, res) => {
    try {
        let category = await db.collection("categoryLists").findOne({ _id: new ObjectId(req.params.categoryId) });
        if(!category) {
            res.status(404).send("no such category");
            return;
        }

        const updates = {
            $push: {"categories_new": new ObjectId(category._id)}
        };

        const query = { _id: new ObjectId(req.params.id)}

        let collection = await db.collection("packingLists");
        let result = await collection.updateOne(query, updates);
        console.log("Updated packingList list: ", req.params.id);
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


// Deleting a category list from a packing list
/*
* Example
* curl --header "Content-Type: application/json" \
--request DELETE \
http://localhost:5050/packinglist/categorylist/672029732ede47cd1a6459eb/6722f5ea424708a5419e5438
*/
router.delete("/categorylist/:id/:categoryId", async (req, res) => {
    try {
        const updates = {
            $pull: {"categories_new": new ObjectId(req.params.categoryId)}
        };

        const query = { _id: new ObjectId(req.params.id)}

        let collection = await db.collection("packingLists");
        let result = await collection.updateOne(query, updates);
        console.log("Updated packingList list: ", req.params.id);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating packing list");
    }
});


export default router;