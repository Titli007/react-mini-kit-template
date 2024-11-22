import mongoose from "mongoose";

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://Ananya:12345@cluster0.jb8dc.mongodb.net/QA_world_app?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(error => console.error("MongoDB connection error:", error));

// Export the mongoose connection
export default mongoose.connection;
