const express = require('express');
const Actions = require('../../data/helpers/actionModel');
const validateActionId = require('../middleware/validateActionId');
const validateProjectId = require('../middleware/validateProjectId');

const router = express.Router();

//GET all actions
router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Something went wrong while trying to retrieve actions" })
    });
});

//GET actions by id
router.get('/:id', validateActionId, (req, res) => {
    const {id} = req.params
    Actions.get(id)
    .then(action => {
        res.status(200).json(action);
    }).catch(error => {
        res.status(500).json({ errorMessage: "Something went wrong while fetching action" })
    })
})

//POST new action 
router.post('/:id', validateProjectId, (req, res) => {
    const {description, notes} = req.body;
    const {id} = req.params;

    if(description, notes) {
        Actions.insert({project_id: id, ...req.body})
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Something went wrong while attempting to add action" })
        })
    }else{
        res.status(400).json({ message: "Description and notes is required to add action" })
    }
})

//PUT update action
router.put('/:id', validateActionId, (req, res) =>{
    const {id} = req.params;
    const {description, notes} = req.body;

    if(description || notes){
        Actions.update(id, {description, notes})
        .then(action =>{
            res.status(200).json(action);
        })
        .catch(error =>{
            res.status(500).json({errorMessage: "Something went wrong while attempting to update action"});
        });
    }else{
        res.status(400).json({error: "description and or notes are required to update an action"});
    }
});

router.delete('/:id', validateActionId, (req, res) => {
    const {id} = req.params;
    Actions.remove(id)
    .then(removeAction => {
        res.status(200).json({ message: "Action has been successfully removed" })
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Something went wrong while attempting to remove action." })
    })

})

module.exports = router;