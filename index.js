const express = require('express')

const server = express()

server.use(express.json())

const cursos = ['Node.js', 'Express', 'JavaScripts', 'java', 'ruby']

// Middleware global
server.use((req, res, next) => {
    console.log(`URL CHAMADA: ${req.url}`)

    return next()

})

function ckeckCurso(req,res,next) {
    if(!req.body.name) {
        return res.status(400).json({error:'Nome do curso é OBRIGATORIO!'})
    }

    return next()
}

// Listando todos os cursos
server.get('/cursos', (req, res) =>{
    res.json(cursos)
})

// Listando um unico cursos
server.get('/cursos/:index', (req, res) => {
    const {index} = req.params

    res.json(cursos[index])
})

// Criando um novo cursos
server.post('/cursos', ckeckCurso, (req, res) => {
    const { name } = req.body
    cursos.push(name)
    return res.json(cursos)
})

// Atualizando um cursos existente
server.put('/cursos/:index', ckeckCurso, (req, res) => {

    const { index } = req.params
    const { name } = req.body

    cursos[index] = name

    return res.json(cursos)
})

// Delete

server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params

    cursos.splice(index, 1)
    return res.json({message: 'Curso deletado com sucesso'})
})
server.listen(3000)