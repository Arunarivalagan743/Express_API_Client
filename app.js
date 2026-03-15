import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import userRouter from '../NodeHttp/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('i am from home');
});

app.use('/api',userRouter);
app.get('/about', (req, res) => {
    const { filter, value } = req.query;
    res.send(`i am from about. filter=${filter ?? ''} value=${value ?? ''}`);
});

app.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, 'fileMode', 'New.html'));
});

app.get('/n', (req, res) => {
    res.redirect('/new');
});

app.use((req, res) => {
    res.status(404).send('not found');
});

app.listen(3000, () => {
    console.log('server is running');
});