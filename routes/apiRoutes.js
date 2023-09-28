const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/api/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '../db/db.json'));

});

router.post('/api/notes',  (req, res) => {
    const db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);

    const userNote = {
        title: req.body.title,
        text: req.body.text,
    };

    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db))
    res.json(db);
});

router.delete('/api/notes/:id', (req, res) => {
    const db =JSON.parse(fs.readFileSync('db/db.json'));

    const deleteNotes = db.filter(item => item.id !== req.params.id);


    fs.writeFileSync('db/db.json',JSON.stringify(deleteNotes))
    res.json('deleteNotes');
});

module.exports = router;