const joi = require('joi')
const express = require('express');
const app = express();

// app.use(express.json())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
    { id: 4, name: "course4" },
]

app.get('/', (req, res) => {
    res.send("Hello World Uzair")
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)

    //400 bad request
    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id))
    //404 not found
    if (!course) return res.status(404).send('The course with given id is not found')

    const { error } = validateCourse(req.body)
    //400 bad request
    if (error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name;
    res.send(course)


})

app.get('/api/courses/:id', (req, res) => {

    const course = courses.find((c) => c.id === parseInt(req.params.id))

    //404 not found
    if (!course) return res.status(404).send('The course with given id is not found')
    res.send(course)

})

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find((c) => c.id === parseInt(req.params.id))
    //404 not found
    if (!course) return res.status(404).send('The course with given id is not found')

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)

})

function validateCourse(course) {

    const schema = joi.object({
        name: joi.string().min(3).required()
    })

    return schema.validate(course);


}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listning on port ${port}`))