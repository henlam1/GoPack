// import express from "express";

// // Connect to the database
// import db from "../config/connection.js";

// // Converts string id to ObjectId for the _id
// import { ObjectId } from "mongodb";

// // Router to define our routes
// const router = express.Router();

// /**
//  * Category Type is a collection of default category types and the default items associated with it.
//  * users will not be able to interface with it but we will use this to help categorize and suggest defaults
//  */
// // Get a list of all category types
// router.get("/", async (req, res) => {
//     let collection = await db.collection("categoryType");
//     let results = await collection.find({}).toArray();
//     console.log("Got all category types");
//     res.status(200).send(results);
// });


// /**
//  * Get a list of all category types and aggregate with the other object mahaha
//  * this magic $lookup function will help you map a different collection's object details into the query response.
//  */
// router.get("/details/", async (req, res) => {
//     const pipeline = [{
//         $lookup: {
//             from: "itemListDefaults",
//             localField: "defaultItems",
//             foreignField: "_id",
//             as: "defaultItems"
//         }
//     }]
//     const results = await db.collection("categoryType").aggregate(pipeline).toArray();
//     console.log("Got all category types");
//     res.status(200).send(results);
// });

// router.get("/details/:id", async (req, res) => {
//     const pipeline = [
//         {
//             $match: { _id: new ObjectId(req.params.id) }
//         },
//         {
//             $lookup: {
//                 from: "itemListDefaults",
//                 localField: "defaultItems",
//                 foreignField: "_id",
//                 as: "defaultItems"
//         }
//     }]
//     const results = await db.collection("categoryType").aggregate(pipeline).toArray();
//     console.log("Got all category types");
//     res.status(200).send(results);
// });

// /**
//  * Get list of category types with a given default item. 
//  * pass defaul item id through params
//  */
// router.get("/defaultItem/:id", async (req, res) => {
//     let collection = await db.collection("categoryType");
//     let results = await collection.find({ "defaultItems" : new ObjectId(req.params.id)}).toArray();
//     res.status(200).send(results);
// });

// /**
//  * Get list of category types with a given default item. 
//  * pass default item by name through body
//  */
// router.get("/defaultItem/", async (req, res) => {
//     let defaultItem = await db.collection("itemListDefaults").findOne({ "name": req.body.defaultItemName});
//     if(!defaultItem) {
//         res.status(400).send("no such default item");
//         return;
//     }

//     let collection = await db.collection("categoryType");
//     let results = await collection.find({ "defaultItems" : defaultItem._id} ).toArray();
//     res.status(200).send(results);
// });

// /**
//  * Remove all occurances of a defaultItem from category type collection. 
//  * For use when deleting the default item from the itemListDefaults collection and cleaning up.
//  */
// router.delete("/defaultItem/:id", async (req, res) => {
//     let collection = await db.collection("categoryType");
//     let results = await collection.updateMany({}, { "$pull": {"defaultItems" : new ObjectId(req.params.id)}})
//     res.status(200).send(results);
// });

// /**
//  * Remove all occurances of a defaultItem from category type collection. 
//  * For use when deleting the default item from the itemListDefaults collection and cleaning up.
//  * pass defaulItem by name through body
//  */
// router.delete("/defaultItem/", async (req, res) => {
//     let defaultItem = await db.collection("itemListDefaults").findOne({ "name": req.body.defaultItemName});
//     if(!defaultItem) {
//         res.status(400).send("no such default item");
//         return;
//     }
//     let collection = await db.collection("categoryType");
//     let results = await collection.updateMany({}, { "$pull": {"defaultItems" : defaultItem._id}})
//     res.status(200).send(results);
// });

// // Query a single category type by id
// router.get("/findById/:id", async (req, res) => {
//     try {
//         let collection = await db.collection("categoryType");
//         let query = { _id: new ObjectId(req.params.id) };
//         let result = await collection.findOne(query);

//         if (!result) {
//             res.send("Not found").status(400);
//         }
//         else {
//             console.log("Got category type: ", req.params.id);
//             res.status(200).send(result);
//         }
//     } catch(err) {
//         console.error(err);
//         res.status(400).send("Not found")
//     }
// });

// // Query a single category type by name
// router.get("/findByName/:name", async (req, res) => {
//     try {
//         let collection = await db.collection("categoryType");
//         let query = { "name": req.params.name };
//         let result = await collection.findOne(query);

//         if (!result) {
//             res.send("Not found").status(400);
//         }
//         else {
//             console.log("Got category type: ", req.params.name);
//             res.status(200).send(result);
//         }
//     } catch(err) {
//         console.error(err);
//         res.status(400).send("Not found")
//     }
// });

// // Create a new category type
// // the defaultItems list should be constructed by strict selection of what is available in ItemListDefault
// /**
//  * Example
//  * curl --header "Content-Type: application/json" \
// --request POST \
// --data '{"name":"Electronics"}' \
// http://localhost:5050/categoryType/
//  */
// router.post("/", async (req, res) => {
//     try {

//         let found = await db.collection("categoryType").findOne({"name": req.body.name})
//         if (found) {
//             res.status(409).send("Already created category")
//             return;
//         }

//         let newDocument = {
//             name: req.body.name,
//             defaultItems: [],
//         };
//         let collection = await db.collection("categoryType");
//         let result = await collection.insertOne(newDocument);
//         console.log("New Category Type created");
//         res.status(201).send(result);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error creating new category type")
//     }
// });

// // Add a default item to a category type
// /**
//  * curl --header "Content-Type: application/json" \
// --request PATCH \
// --data '{"name":"Electronics", "defaultItemName": "Laptop"}' \
// http://localhost:5050/CategoryType/addDefaultItem
//  */
// router.patch("/addDefaultItem", async (req, res) => {
//     /**
//      * req.body needs to have name and defaultItemName
//      */
//     try {
//         /**
//          * Name is unique so you shouldnt need to update it. 
//          */
//         let defaultItem = await db.collection("itemListDefaults").findOne({ "name": req.body.defaultItemName});
//         if(!defaultItem) {
//             res.status(400).send("no such default item");
//             return;
//         }

//         const updates = {
//             $push: {"defaultItems": defaultItem._id}
//         };

//         const query = { "name": req.body.name}

//         let result = await db.collection("categoryType").updateOne(query, updates);

//         console.log("Updated categoryType: ", req.body.name);
//         res.status(200).send(result);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error updating category type");
//     }
// });

// // Delete a default item from a category type
// router.delete("/deleteDefaultItem", async (req, res) => {
//     /**
//      * req.body needs to have name and defaultItemName
//      */
//     try {
//         /**
//          * Name is unique so you shouldnt need to update it. 
//          */
//         let defaultItem = await db.collection("itemListDefaults").findOne({ "name": req.body.defaultItemName});
//         if(!defaultItem) {
//             res.status(400).send("no such default item");
//             return;
//         }

//         const updates = {
//             $push: {"defaultItems": defaultItem._id}
//         };

//         const query = { "name": req.body.name}

//         let result = await db.collection("categoryType").updateOne(query, updates);

//         console.log("Updated categoryType: ", req.body.name);
//         res.status(200).send(result);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error updating category type");
//     }
// });

// // Deleting a category type
// router.delete("/:id", async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id) };

//         let collection = await db.collection("categoryType");
//         let result = await collection.deleteOne(query);

//         console.log("Deleted categoryType: ", req.params.id);
//         res.status(200).send(result);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error deleting category type")
//     }
// });

// export default router;