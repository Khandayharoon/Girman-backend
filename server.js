const express = require('express');
const cors = require('cors')
const { User, connectDB } = require('./DB/db'); 
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors())

connectDB();


app.get('/', (req, res) => {
    res.send("hi there");
});

app.post('/create_user', async (req, res) => {
    try {
        const userData = req.body;
        
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            city: req.body.city,
            contact_number: req.body.contact_number,
            image_link: req.body.image_link
        });
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

app.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username; 
        console.log('Searching for username:', username);

        const allMatchUser = await User.find({
            first_name: username 
        });

        console.log('Found users:', allMatchUser);

        res.status(200).json({
            message: "Find successfully",
            users: allMatchUser
        });
    } catch (e) {
        res.status(500).json({
            message: "Error Finding user",
            error: e.message
        });
    }
});


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${ PORT }`);
});