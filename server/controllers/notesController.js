const db = require('../db');

const createNotes = async(req,res) => {
    try {
        const {note} = req.body;
        const user_id = req.user.id;
        const date = new Date().toISOString().split("T")[0];
        const [result] = await db.query('insert into notes (user_id,note,date) values (?,?,?)',[user_id,note,date]);
        res.status(201).json({message:"Note inserted",note_id: result.insertId});

    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

const getAllNotes = async(req,res) => {
    try {
        const user_id = req.user.id;
        const [result] = await db.query('select * from notes where user_id = ?',[user_id]);
        res.json(result);
    } catch (error) {
         res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

const updateNotes = async(req,res) => {
    try {
        const {note} = req.body;
        const user_id = req.user.id;
        const note_id = req.params.id;
        const [result] = await db.query('update notes set note = ? where user_id = ? and note_id = ?',[note,user_id,note_id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({message:"Note not found"});
        }
        res.json({message:"Note updated"});

    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

const deleteNotes = async(req,res) => {
    try {
        const user_id = req.user.id;
        const note_id = req.params.id;
        const [result] = await db.query('delete from notes where user_id = ? and note_id = ?',[user_id,note_id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({message:"Note not found"});
        }
        res.json({message:"Note deleted"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

module.exports = {createNotes,getAllNotes,updateNotes,deleteNotes};