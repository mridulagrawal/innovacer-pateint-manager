const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const fs = require('fs');
const JSON_FILE_PATH = './data/patients.json';
const VALID_FILE_TYPES = ['xls', 'xlsx'];

app.use(bodyParser.json());
const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

const isValidExcelFile = (fileName) => {
    if (VALID_FILE_TYPES.indexOf(fileName.split('.')[fileName.split('.').length - 1]) === -1) {
        return false;
    }
    return true;
}

const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
        if (!isValidExcelFile(file.originalname)) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');



// POST end point to will upload the patient files
app.post('/patients', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let exceltojson; //Initialization
    upload(req, res, function (err) {
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ status: false, error: "Something went wrong. Please try after sometime" });
            return;
        }

        if (err) {
            res.json({ status: false, error: err });
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        const fileName = req.file.originalname;
        if (fileName.split('.')[fileName.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }

        try {
            exceltojson({
                input: req.file.path, //the same path where we uploaded our file
                output: null,
                lowerCaseHeaders: true
            }, function (err, result) {
                if (err) {
                    return res.json({ status: false, error: err, data: null });
                }
                fs.readFile(JSON_FILE_PATH, 'utf8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        let obj;
                        if (data) {
                            obj = JSON.parse(data); //now it an object
                            obj = [...obj, ...result];
                        } else {
                            obj = result;
                        }
                        const json = JSON.stringify(obj, null, 2);
                        fs.writeFile(JSON_FILE_PATH, json, 'utf8', () => {
                            res.json({ status: true, error: null, data: result });
                        });
                    }
                });
            });
        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
        try {
            fs.unlinkSync(req.file.path);
        } catch (e) {
            //error deleting the file
        }
    });
});

// GET end point to fetch full patient details
app.get('/patients', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    fs.readFile(JSON_FILE_PATH, 'utf8', function (err, data) {
        let patients = [];
        if (err) {
            res.json({ status: false, error: err, data: [] });
        } else {
            if (data) {
                patients = JSON.parse(data);
            }
        }
        res.json({ status: true, error: null, data: patients });
    });
});

//GET end point per patient id
app.get('/patients/:patientId', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const patientId = req.params.patientId;
    fs.readFile(JSON_FILE_PATH, 'utf8', function (err, data) {
        let result = [];
        let patients = [];
        if (err) {
            res.json({ status: false, error: err, data: {} });
        } else {
            if (data) {
                patients = JSON.parse(data);
                result = patients.filter(obj => obj.id === patientId);
            }
        }
        if (result.length > 0) {
            res.json({ status: true, error: null, data: result[0] });
        } else {
            res.json({ status: false, error: 'Patient not found', data: {} });
        }
    });
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.listen('3001', function () {
    console.log('running on 3001...');
});