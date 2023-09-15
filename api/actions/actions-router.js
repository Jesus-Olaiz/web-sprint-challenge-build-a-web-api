const express = require('express')

const Action = require('./actions-model')
const Project = require('../projects/projects-model')
const { checkIdAction } = require('./actions-middlware')

const router = express.Router()

router.use(express.json())



// [GET] /api/actions
router.get('/', async (req, res, next) => {
    try {
        const actions = await Action.get()
        res.json(actions)
        
    } catch (error) {
        next(error)
    }
    
})

// [GET] /api/actions/:id

router.get('/:id', checkIdAction, (req, res, next) => {
    try {
        res.json(req.action)
    } catch (error) {
        next(error)
    }
})

// [POST] /api/actions
router.post('/', async (req, res, next) => {
    try {
        const {notes, description, project_id} = req.body

        const project = await Project.get(project_id)

        if(!notes || !description || !project) {
        res.sendStatus(400)
        }else{

            const newAction = await Action.insert(req.body)

            res.status(201).json(newAction)

        }

        
    } catch (error) {
        next(error)
    }
})

// [PUT] /api/actions/:id

router.put('/:id', checkIdAction, async (req,res,next) => {
    try {
        const {notes, description} = req.body

        if(!notes || !description) {
        res.sendStatus(400)
        }else{

            const updatedAction = await Action.update(req.params.id, req.body)

            res.json(updatedAction)

        }
    } catch (error) {
        next(error)
    }
})

// [DELETE] /api/actions/:id

router.delete('/:id', checkIdAction, async (req, res, next) => {
    const id = req.params.id
    Action.remove(id)
    .then(() => {
        res.sendStatus(200)
    })

})




router.use((error,req,res,next) => {
    res.status(error.status || 500).json({message: error})
});

module.exports = router