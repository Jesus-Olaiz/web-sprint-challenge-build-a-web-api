const express = require('express')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res, next) => {
    try {
        console.log("touched")
        res.status(200).json({message: 'Request Responded'})
        
    } catch (error) {
        next(error)
    }
    
})



router.use((err,req,res,next) => {
    res.status(err.status || 500).json({message: err})
});

module.exports = router