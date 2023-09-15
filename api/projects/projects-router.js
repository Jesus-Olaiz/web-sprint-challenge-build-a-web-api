const express = require('express')
const Project = require('./projects-model')
const { checkIdProject } = require('./projects-middleware')

const router = express.Router()

router.use(express.json())



// [GET] /api/projects

router.get('/', async (req, res, next) => {

    Project.get()
    .then(project => {
        if (project){
            res.json(project)
        }else{
            res.json([])
        }
    })
    .catch(next)
    
})

// [GET] /api/projects/:id
router.get('/:id', checkIdProject, (req, res, next) => {
    try {
        
        res.json(req.project)
        
    } catch (error) {
        next(error)
    }
})

// [POST] /api/projects
router.post('/', async (req, res, next) => {
    try {
        const {name, description} = req.body

        if(!name || !description) {
        res.sendStatus(400)
        }else{

            const newProject = await Project.insert(req.body)

            res.status(201).json(newProject)

        }

        
    } catch (error) {
        next(error)
    }
})

// [PUT] /api/projects/:id

router.put('/:id', checkIdProject, async (req,res,next) => {
   try {
    const {name, description, completed} = req.body

    if(!name || !description || (completed === undefined)) {
        res.sendStatus(400)
    }else{
        const updatedProject = await Project.update(req.params.id, req.body)

        res.send(updatedProject)
    }

   } catch (error) {
    next(error)
   }
})


// [DELETE] /api/projects/:id

router.delete('/:id', checkIdProject, async (req, res, next) => {
    const id = req.params.id
    Project.remove(id)
    .then(() => {
        res.sendStatus(200)
    })

})

// [GET] /api/projects/:id/actions
router.get('/:id/actions', checkIdProject, async (req, res, next) => {
    const id = req.params.id

    try {
        
        const projects = await Project.getProjectActions(id)
        
        res.json(projects)


    } catch (error) {
        next(error)
    }
})

// Global Error

router.use((error,req,res,next) => {
    res.status(error.status || 500).json({message: error})
});


module.exports = router