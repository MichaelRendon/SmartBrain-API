const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '37e93993b0e14aedbb084f9aaa8eb5ee'
});

const handleApiCall = (req, res) => {
app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to pull API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get image count'))
}

module.exports = {
    handleImage,
    handleApiCall
}