const router = require('express').Router();
const Sala = require('../models/Sala.model')


router.post('/', async (req, res) => {

    const { sala, filme, totalAssentos } = req.body

    const salas = {
        sala,
        filme, 
        totalAssentos
    }

    try {
        
        await Sala.create(salas)

        res.status(200).json({ message: "Sala criada com sucesso"})

    } catch (error) {
        res.status(500).json({ error: error})
    }
});


router.get('/', async (req, res) => {

    try {

        const salas =  await Sala.find()
        
        res.status(200).json(salas)

    } catch (error) {
        res.status(500).json({ error: error})
    }
});

router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        
        const sala = await Sala.findOne({ _id: id})


        if (!sala) {
            res.status(422).json({ message: 'Sala não encontrada!' })
            return
        }


        res.status(200).json(sala)

    } catch (error) {
        res.status(500).json({ error: error})
    }


})


router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { sala, filme, totalAssentos } = req.body

    const salas = {
        sala,
        filme, 
        totalAssentos
    }

    try {

        const updatedSala = await Sala.updateOne({ _id: id }, salas)
        if ( updatedSala.matchedCount === 0) {
            res.status(422).json({ message: 'Sala não encontrada' })
        }


        res.status(200).json(salas)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id


    const sala = await Sala.findOne({ _id: id }) 
    
    if (!sala) {
        res.status(422).json({ message: 'Sala não encontrada!' })
        return
    }
    
    try {
        
         await Sala.deleteOne({ _id: id })

        res.status(200).json({ messa: 'Sala deletada com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error})
    }
})

module.exports = router