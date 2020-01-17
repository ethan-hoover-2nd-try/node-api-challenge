const Projects = require('../../data/helpers/projectModel');

const validateProjectId = (req,res,next) =>{
    const {id} =  req.params;

    if(id){
        Projects.get(id).then(project =>{
            if(project){
                req.project = project;
                next();
            }else{
                res.status(404).json({message: "Project with requested ID does not exist"});
            }
        }).catch(error =>{
            res.status(500).json({errorMessage: "An error occurred while fetching project from the database."});
        });
    }
};

module.exports = validateProjectId;