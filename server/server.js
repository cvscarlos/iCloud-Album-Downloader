const cors = require('cors');
const express = require('express');
const icloudSharedAlbum = require('icloud-shared-album');

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/:album([a-zA-Z0-9]+)', async (req, res) => {
    try {
        const albumId = req.params.album.replace(/[^a-z0-9]/gi, '');
        res.json(await icloudSharedAlbum.getImages(albumId));
    } catch (error) {
        console.log(error);
        res.status(400).send('Error requesting the album');
    }
});
