const Project = require('./projects-model')


async function checkIdProject(req, res, next) {
    
    try {
        const project = await Project.get(req.params.id)

        if(project){
            req.project = project
            next()
        }else {
            res.sendStatus(404)
        }   

    } catch (error) {
        next(error)
    }
    
        
}

module.exports = {
    checkIdProject
}