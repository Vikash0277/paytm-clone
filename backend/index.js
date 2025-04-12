import express from 'express';
import { connectDB }from './db.js';
import cors from 'cors';

import router from './routes/index.js';

const app = express();


app.use(express.json());
app.use(cors());



connectDB();


app.use('/api/v1',router)


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});