import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connect the client to the server
    const uri = process.env.ATLAS_URI || '';
    await mongoose.connect(uri);
    // Send a ping to confirm a successful connection
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
