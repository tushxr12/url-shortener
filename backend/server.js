const app = require('./app');
const mongoose = require('mongoose');
const Url = require('./models/Url'); 

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        app.get('/:shortId', async (req, res) => {
            const shortId = req.params.shortId;

            try {
                const entry = await Url.findOne({ shortId });

                if (entry) {
                    return res.redirect(entry.originalUrl);
                } else {
                    return res.status(404).send('Short URL not found');
                }
            } catch (err) {
                console.error('Error during redirection:', err);
                return res.status(500).send('Internal Server Error');
            }
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });