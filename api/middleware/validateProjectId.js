const Projects = require('../../data/helpers/projectModel');

const validateProjectId = (req, res, next) => {
    const {id} = req.params;

    if(id){
        Projects.get(id).then(project =>{
            if(project){
                req.project = project;
                next();
            }else{
                res.status(404).json({error: "Invalid project id provided"});
            }
        }).catch(err => {
            res.status(500).json({ error: "An error occured while fetching project data from database" })
        });
    }
};

module.exports = validateProjectId;