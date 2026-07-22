
import express from 'express';

const app = express();

app.use(express.json());

// Debug route: shows whatever path cPanel sends to Express
app.use((req, res) => {
    res.send(`Express is receiving this exact path: ${req.url}`);
});

app.listen(3000, () => {
    console.log(`App Running On Port ${3000}`);
});
