const { Router } = require('express')
const peliculaSchema = require('../models/pelicula')
const router = Router()

router.post('/pelicula', async(req, res) => {
    try {
        const peli = peliculaSchema(req.body)
        const createPeli = await peli.save()
        res.json(createPeli)
    }
    catch(error) {
        console.log(error)
    }
})



module.exports = router