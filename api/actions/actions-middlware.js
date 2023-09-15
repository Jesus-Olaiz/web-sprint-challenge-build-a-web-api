// add middlewares here related to actions
const Actions = require('./actions-model')


async function checkIdAction(req, res, next) {
    
    try {
        const action = await Actions.get(req.params.id)

        if(action){
            req.action = action
            next()
        }else {
            res.sendStatus(404)
        }   

    } catch (error) {
        next(error)
    }
    
        
}

module.exports = {
    checkIdAction
}