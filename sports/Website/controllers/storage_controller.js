const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const path = require('path');

let Service = {};

// User DB Interactions

Service.retrieve_image = function (req, res) {
    //Removing query in the images with the '?' Split
    const file_path = path.join(__dirname, '../storage' + req.url.split('?')[0]);

    res.sendFile(file_path);
};

module.exports = Service;