import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

app.get('/exercise-image/:id', async (req, res) => {
  const { id } = req.params;
  const url = `https://exercisedb.p.rapidapi.com/image?exerciseId=${id}&resolution=360`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set('Content-Type', 'image/gif');
    res.send(buffer);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Proxy server running on port ${PORT}`));
