const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use('/uploads',express.static(path.join(__dirname,"uploads")));
app.use('/api/auth',authRoutes);
app.use('/api/notes',notesRoutes);
    

const PORT = process.env.PORT || 5000 ;



app.listen(PORT, () => {
    console.log(`connected to port :${PORT}`);
});