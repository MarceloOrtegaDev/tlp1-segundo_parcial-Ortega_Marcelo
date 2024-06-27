const express = require('express');
const bdBooks = require("./booksBd");
const app = express();


//Middleware
app.use(express.json());


//Rutas
app.get("/books", (req, res)=>{
    res.json(bdBooks)
})

app.get("/books/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const bookdId = bdBooks.find((bookId)=> bookId.id === id);
    if(bookdId) {
        res.json(bookdId);
    }else {
        res.json({mensaje:"Ese id de libro no existe."})
    }
})





app.listen(3000, ()=>{
    console.log('Server running on port 3000');
})


















