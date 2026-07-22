import "dotenv/config";
import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Debug route: shows whatever path cPanel sends to Express
app.use((req, res) => {
    res.send(`Express is receiving this exact path: ${req.url}`);
});

app.listen(port, () => {
    console.log(`App Running On Port ${port}`);
});
