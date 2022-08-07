const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");

//Mini database
const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"}
]

app.get("/api/courses/", (req, res) => {
    res.send(courses);
})

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Not Found");
    res.send(course);
})

app.post("/api/courses/", (req, res) => {

    const { error } = validateCourse(req.body.name);

    if(error) return res.status(400).send(error.message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
})

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Not found"); 

    const {error} = validateCourse(req.body.name);

    if(error) return res.status(400).send(error.message);

    course.name = req.body.name;

    res.send(course);
})

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Not found"); 

    const index = courses.indexOf(course);

    courses.splice(index, 1)

    res.send(courses);

})

//Reusable Validate Function
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi
            .string()
            .min(3)
            .required()
    });

    return schema.validate({name: course})
}

// Port Listening
const port = process.env.PORT || 3000;
app.listen(port, ()=> {console.log("Listening on", port)});
