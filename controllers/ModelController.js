const path = require('path');
const root = require('../utils/root');
const db =  require('../utils/db');


//  this handles getting all the models from the server and sending to the client
const getHomeController = (request, response, next) => {
    let sql = "SELECT * from models";
    
    db.execute(sql)
    .then(([data, fields]) => {
        return response.json(data)
    })
    .catch(err => {
        return response.status(404).json({
            error : 'No models were found'
        });
    });
}



//  handles uploading a model to the server
const postModelController = (request, response, next) => {
    let file, title = request.body.title;

    try{
        file = request.files.upload;
    }catch(err) {
        return response.status(403).json({
            error : 'Upload a file'
        })
    }

    if(!title || title.length < 5) {
        return response.status(403).json({
            error : 'Title must be greater than 5 characters'
        })
    }

    //  checking if the file uploaded is a modal or not
    //  .glb .gltf
    let splittedpath = file.name.split(".")
    
    if(splittedpath[splittedpath.length - 1] !== 'glb' && splittedpath[splittedpath.length - 1] !== 'gltf') {
        return response.status(403).json({
            error : 'File uploaded is not a 3-d modal file'
        })
    }

    //  I have both the files as well as title
    let filepath = path.join(root, 'uploads', file.name);

    file.mv(filepath, (err) => {
        if(err) {
            return response.status(503).json({
                error : err.message
            })
        }
    })

    let sql = "INSERT INTO models(title, created_on, filename) VALUES (?, ?, ?)";

    db.query(sql, [title, new Date(), file.name])
        .then(res => {
            return response.status(200).json({
                message : 'Modal uploaded succesfully'
            })
        })
        .catch(err => {
            return response.status(403).json({
                error : 'Bad request'
            })
        })
}


//  function to get individual modal from the server
const getIndividualModal = (request, response, next) => {
    let sql = "SELECT * FROM models WHERE id = ?";
    db.query(sql, [request.body.id])
        .then(([data, fields]) => {
            return response.status(200).json(data);
        })
        .catch(err => {
            return response.status(404).json({
                error : 'Model does not exist'
            })
        });
}


module.exports.getHomeController = getHomeController;
module.exports.postModelController = postModelController;
module.exports.getIndividualModal = getIndividualModal;