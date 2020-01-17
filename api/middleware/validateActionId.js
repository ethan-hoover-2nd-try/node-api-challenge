const Actions = require('../../data/helpers/actionModel');

const validateActionId = (req, res, next) => {
    const {id} = req.params;

    if(id){
        Actions.get(id).then(action => {
            if(action){
                req.action = action;
                next();
            }else{
                res.status(404).json({message: "Requested action ID does not exist"});
            }
        })
        .catch(err => {
            res.status(500).json({ errormessage: "Something went wrong while fetching requested  action(s)" })
        })
    }
};

module.exports = validateActionId;