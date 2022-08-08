const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());

let genres = [
    {id: 1, name: "Horror"},
    {id: 2, name: "Action"},
    {id: 3, name: "Comedy"},
]

app.get("/api/genres", (req, res) => {
    res.send(genres);
})

app.get("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Not found");
    res.send(genre)
})

app.post("/api/genres/", (req, res) => {

    const { error } = validateData(req.body.name);

    if(error) return res.status(400).send(error.message)

    const genre = {
        id: genres.length + 1,
        genre: req.body.name
    }
    genres.push(genre);
    res.send(genres)
})

app.put("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("Not found");

    const { error } = validateData(req.body.name);
    if(error) return res.status(400).send(error.message);

    genre.name = req.body.name
    res.send(genres);
});

app.delete("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genres)
})

app.delete("/api/genres", (req, res) => {
    genres = []
    res.send(genres)
})

//Validate Function
function validateData(genreName) {
    const schema = Joi.object({
        genre: Joi
            .string()
            .min(3)
            .required()
    })
    return schema.validate({genre: genreName})
} 

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Listening on", port));
