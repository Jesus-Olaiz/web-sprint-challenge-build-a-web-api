// Write your "projects" router here!
const express = require('express')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
    try {
        
        res.status(200).json({message: 'Request Responded'})
        
    } catch (error) {
        res.status(500).json({message: error})
    }
    
})

module.exports = router