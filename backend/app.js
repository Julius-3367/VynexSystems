import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import routes from './routes.js';  // Updated to use ES module syntax

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.CHAT_API_KEY  // Use environment variable for API key
});

// Determine the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Handle routes to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/images/index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Error loading the page.');
    }
  });
});

// API routes
app.use('/api', routes);

// API route for chat using OpenAI
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }]
    });
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ response: 'Sorry, I am unable to respond at the moment.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
