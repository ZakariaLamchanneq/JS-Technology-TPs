const express = require('express');
const app = express();
app.use(express.json()); // Allows Express to parse JSON request bodies

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
let items = [];

app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).send(newItem);
});
app.get('/items', (req, res) => {
    res.send(items);
});
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.send(item);
});
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    Object.assign(item, req.body);
    res.send(item);
});
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = items.splice(itemIndex, 1);
    res.send(deletedItem);
});
