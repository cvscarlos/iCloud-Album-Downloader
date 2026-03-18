const icloudSharedAlbum = require('icloud-shared-album');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const albumId = (req.query.id || '').replace(/[^a-z0-9]/gi, '');

  if (!albumId) {
    return res.status(400).json({ error: 'Missing album id' });
  }

  try {
    const { photos } = await icloudSharedAlbum.getImages(albumId);

    const images = photos.map((photo) => {
      const derivatives = Object.values(photo.derivatives);
      const best = derivatives.reduce((a, b) => (b.fileSize > a.fileSize ? b : a), derivatives[0]);
      return { url: best.url };
    });

    return res.json(images);
  } catch (error) {
    console.log(error);
    return res.status(400).send('Error requesting the album');
  }
};
