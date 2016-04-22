var MongoClient = require('mongodb').MongoClient;
var database;
function createOrOpenDatabase(callback) {
    var url = 'mongodb://ondeencontrar:oe123@ds023510.mlab.com:23510/ondeencontrar';
    
    MongoClient.connect(url, function(err, db) {
        //if (!exports.database.category) exports.database.category = db.collection('Categorias');
        //if (!exports.database.company) exports.database.company = db.collection('EmpresasTemp');
        
        if (callback) callback();
        
        database = db;
    });
}

function readResult(req, res, err, result) {
    if (err) {
        res.status(500);
        res.json({ message: "Erro ocorrido: " + JSON.stringify(err) });
    } else {
        if (result) {
            res.json(result);
        }
        else {
            res.status(404);
            if (req.params && req.params.id)
                res.json({ data: req.params.id });
            else
                res.json({});
        }
    }
    
    database.close();
    
    return res;
}

function list(collectionName, req, res) {
    createOrOpenDatabase(function () {
        var collection = database.collection(collectionName);
        
        collection.find({}).toArray(function (err, result) {
            return readResult(req, res, err, result);
        });
    });
}

/*function filterById(db, req, res) {
    createOrOpenDatabase(function () {
        db.find({ id_project: req.params.id }, function (err, result) {
            return readResult(req, res, err, result);
        });
    });
}

function find(db, req, res) {
    createOrOpenDatabase(function () {
        db.findOne({ _id: req.params.id }, function (err, result) {
            return readResult(req, res, err, result);
        });
    });
}

function insert(db, req, res) {
    var object = req.body;
    
    if (object) {
        createOrOpenDatabase(function () {
            db.insert(object, function (err, result) {
                return readResult(req, res, err, result);
            });
        });
    } else {
        res.status(400);
        res.json({ data: "Erro ocorrido: Favor informar os dados." })   
    }
}

function update(db, req, res) {
    if (req.params) {
	   createOrOpenDatabase(function () {
            db.update({ _id: req.params.id }, req.body, function (err, result) {
                return readResult(req, res, err, result);
            });
        });
    } else {
        res.status(400);
        res.json({ data: "Erro ocorrido: ID do objeto não informado." })   
    }
}

function remove(db, req, res) {
    if (req.params) {
        createOrOpenDatabase(function () {
            db.remove({_id: req.params.id}, function (err, result) {
                return readResult(req, res, err, result);
            });
        });
    } else {
        res.status(400);
        res.json({ data: "Erro ocorrido: ID do objeto não informado." })   
    }
}*/

exports.database = {};
exports.createOrOpenDatabase = createOrOpenDatabase;
exports.dal = {};
exports.dal.list = list;
/*exports.dal.filterById = filterById;
exports.dal.find = find;
exports.dal.insert = insert;
exports.dal.update = update;
exports.dal.delete = remove;*/