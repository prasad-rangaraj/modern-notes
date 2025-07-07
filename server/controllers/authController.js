const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);

        const { username, email, contact, password } = req.body;
        const profile_img = req.file ? `/uploads/${req.file.filename}`: null;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "username, password, email are required" });
        }

        const [existingUser] = await db.query(
            "SELECT * FROM user WHERE username = ? OR email = ?",
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "username or email already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO user(username, password, email, contact, profile_img) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [username, hashedPass, email, contact||null, profile_img]);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

    const login = async(req,res) => {
        try{
            const {username,password} = req.body;
            const [user] = await db.query("select * from user where username = ? or email = ?",[username,username]);

            if(user.length === 0){
                return res.status(400).json({ message: "Invalid user"});
            }

            const users = user[0];

            const isMatch = await bcrypt.compare(password,users.password);

            if(!isMatch){
                return res.status(400).json({ message: "Invalid password"});
            }

            const token = jwt.sign({id: users.id},process.env.JWT_SECERT,{expiresIn: process.env.JWT_EXPIRES}); 

            res.cookie("token",token,{
                httpOnly: true,
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
            });

           return res.status(200).json({ message: "Login successfully"});

        }catch(error){
             return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };

    const getCurrentUser = async(req,res) => {
        try {
            const user_id = req.user.id;
            const [users] = await db.query('select id,username,email,contact,profile_img from user where id = ?',[user_id]);
            if(users.length === 0) return res.status(404).json({message:"user not found"});
            res.json(users[0]);
        } catch (error) {
            res.status(500).json({message:"Server Error",error: error.message})
        }
    }

    const uploadProfileImage = async(req,res) => {
        try {
            const user_id = req.user.id;
            const profile_img = req.file ? `/uploads/${req.file.filename}` : null;

            const [result] = await db.query('update user set profile_img = ? where id = ?',[profile_img,user_id]);
             if(result.affectedRows === 0){
                return res.status(404).json({message:"invalid user"});
             }

             res.json({message:"uploaded succesfully",profile_img});
        } catch (error) {
            res.status(500).json({message:"server error",error: error.message});
        }
    }

module.exports = { register,login,getCurrentUser,uploadProfileImage };
