const mkdirp = require('mkdirp');
const fs = require('fs');
const request = require('request');
const path = require('path');
const imagePath = "./storage/images";


let Service = {};

Service.save_from_uri = function (uri, info_type, info_id, image_name, cb) {
    request.head(function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        const path = _create_storage_path(info_type, info_id, image_name);

        request(uri).pipe(fs.createWriteStream(path)).on('close', cb);

    }, uri);
};

Service.save_from_file = function (file, info_type, info_id, image_name, cb) {
    const path = _create_storage_path(info_type, info_id, image_name);

    mkdirp(path + "/system" , function (err) {
        if (err)
            console.error(err)
        else {
             fs.createReadStream(file.path).pipe(fs.createWriteStream(path + "/" + image_name)).on('close', cb);
        }
    });
};

_create_storage_path = function (info_type, info_id) {
    let path;

    switch (info_type) {
        case 'team':
            path = imagePath + "/team_info_season/" + info_id;
            break;
        default:
            path = imagePath + "/user_info_season/" + info_id;
    }

    return path;
};

module.exports = Service;
