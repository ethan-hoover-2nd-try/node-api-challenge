const express = require('express');
const Projects = require('../../data/helpers/projectModel');
const validateProjectId = require('../middleware/validateProjectId');

const router = express.Router();

// GET all projects
router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Something went wrong while retrieving projects' })
    });
});

//GET project by ID
router.get('/:id', validateProjectId, (req, res) => {
    const {id} = req.params;
    
    Projects.get(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Something went wrong while retrieving requested project" })
    });
});

//GET project actions 
router.get('/:id/actions', validateProjectId, (req, res) => {
    const{id} = req.params;

    Projects.getProjectActions(id)
    .then(actions => {
        if(actions.length > 0) {
            res.status(200).json(actions);
        }else{
            res.status(404).json({ message: "No actions could be retrieved" })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Something went wrong while retrieving requested project actions" })
    })
})

//POST new project
router.post('/', (req, res) => {
    const {name, description} = req.body;

    if(name && description){
        Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Something went wrong while attempting to add a new project" })
        })
    }else{
        res.status(400).json({ errorMessage: "Name and Description are required to add a new project" })
    }
});

//PUT update existing project
router.put('/:id', validateProjectId, (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;

    if(name || description) {
        Projects.update(id, {name, description})
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Something went wrong while attempting to update project" })
        });
    }else{
        res.status(400).json({ errorMessage: "Name and or description are required to update a project" })
    }
});

router.delete('/:id', validateProjectId, (req, res) => {
    const {id} = req.params;

    Projects.remove(id)
    .then(deleteProject => {
        res.status(200).json({ message: "Successfuly removed project from database" })
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Something went wrong while attempting to remove project." })
    })
})

module.exports = router;