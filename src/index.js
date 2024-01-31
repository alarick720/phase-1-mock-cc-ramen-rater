// write your code here 
JAVASCRIPT

Queue
Play
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory "database" for simplicity
let ramens = [
    { id: 1, name: "Tonkotsu Ramen", image: "url_to_image", rating: 5, comment: "Delicious!" },
    // Add more ramen objects as needed
];

// GET /ramens - Fetch all ramens
app.get('/ramens', (req, res) => {
    res.json(ramens);
});

// GET /ramens/:id - Fetch a single ramen by id
app.get('/ramens/:id', (req, res) => {
    const ramen = ramens.find(r => r.id === parseInt(req.params.id));
    if (!ramen) return res.status(404).send('The ramen with the given ID was not found.');
    res.json(ramen);
});

// POST /ramens - Create a new ramen
app.post('/ramens', (req, res) => {
    const { name, image, rating, comment } = req.body;
    const newRamen = {
        id: ramens.length + 1, // Simple ID assignment, not suitable for production
        name,
        image,
        rating,
        comment
    };
    ramens.push(newRamen);
    res.status(201).send(newRamen);
});

// PATCH /ramens/:id - Update a ramen's rating and comment
app.patch('/ramens/:id', (req, res) => {
    const ramen = ramens.find(r => r.id === parseInt(req.params.id));
    if (!ramen) return res.status(404).send('The ramen with the given ID was not found.');

    const { rating, comment } = req.body;
    if (rating) ramen.rating = rating;
    if (comment) ramen.comment = comment;

    res.json(ramen);
});

// DELETE /ramens/:id - Delete a ramen
app.delete('/ramens/:id', (req, res) => {
    const ramenIndex = ramens.findIndex(r => r.id === parseInt(req.params.id));
    if (ramenIndex === -1) return res.status(404).send('The ramen with the given ID was not found.');

    ramens = ramens.filter(r => r.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Ramen API listening at http://localhost:${port}`);
});