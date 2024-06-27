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

app.post("/books", (req, res)=>{
    const nuevosLibro = {
        id: parseInt(bdBooks.length + 1),
        title: req.body.title,
        author: req.body.author,
        year: parseInt(req.body.year)
    }
    if(bdBooks.some((titulo)=> titulo.title === nuevosLibro.title)) {
        res.json({mensaje: "Ese libro ya existe"})
    } else {
        bdBooks.push(nuevosLibro);
        res.json({mensaje: "Se subió el nuevo libro"})
    }
})

app.put("/books/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const editarLibro = bdBooks.find((editarLibro)=> editarLibro.id === id);
    if(editarLibro) {
        editarLibro.title = req.body.title;
        editarLibro.author = req.body.author;
        editarLibro.year = parseInt(req.body.year);
        res.json({mensaje: "Se editó el libro"})
    } else {
        res.json({mensaje: "Libro no encontrado"})
    }
})

app.delete("/books/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const bookdId = bdBooks.findIndex((bookId)=> bookId.id === id);
    if(bookdId === -1) {
        res.json({mensaje:"Ese id de libro no existe"})
    } else {
            bdBooks.splice(bookdId, 1);
            res.json({mensaje: "Se eliminó el libro elegido"})
        }
})




app.listen(3000, ()=>{
    console.log('Server running on port 3000');
})


















