import express from 'express';
import Cors from 'cors';
import { router } from './router';

const app = express();
const PORT = process.env.PORT || 3000
app.use(Cors());
app.use(express.json());
app.use(router);


app.listen(PORT, () => { console.log(`🚀 - Server is running in http://localhost:${PORT}`) })

