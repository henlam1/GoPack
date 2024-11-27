import express from "express";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

// Router to define our routes
const router = express.Router();

// Authenticate user token with google oauth
router.post("/auth/google/", async (req, res) => {
    const { token } = req.body;
    console.log("token: ", token);
    try {
        // Verify authenticity of token
        const ticket = await client.verifyIdToken({ 
            idToken: token, 
            audience: process.env.GOOGLE_CLIENT_ID 
        }); 
            
        // Use the ID token to verify the user and extract user information 
        const payload = ticket.getPayload();
        console.log('payload object: ', payload);

        // Extract necessary user information 
        const userInfo = { 
            email: payload.email, 
            name: payload.name, 
            picture: payload.picture 
        };
        
        console.log("User successfully authenticated!: ", userInfo);
        res.status(200).send(userInfo);
    } catch(err) {
        console.error(err);
        res.status(400).send("Error authenticating google account")
    }
});

export default router;