const express = require('express');
const fs = require('fs');
const path = require('path');
const pug = require('pug');

const app = express();


function getSongById(songId) {
  const filePath = path.join(__dirname, 'songs.json');
  const rawData = fs.readFileSync(filePath);
  const songs = JSON.parse(rawData).songs;
  return songs.find(song => song.song_id == songId);
}


app.get('/song/:songId', (req, res) => {
  const songId = req.params.songId;
  const songData = getSongById(songId);
  if (!songData) {
    res.status(404).send('Canzone non trovata');
    return;
  }


  const filePath = path.join(__dirname, 'views', 'song.pug');
  const compiledFunction = pug.compileFile(filePath);
  const html = compiledFunction({ songData });
  res.send(html);
});

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});