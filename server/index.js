import express from 'express';
import path from 'path';

const app = express();

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Fallback route for SPA (Single Page App)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
