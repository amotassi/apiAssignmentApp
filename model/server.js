/*let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://amotassi:1rONTEAM@cluster0.53jlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(uri, options)
    .then(() => {
            console.log("Connecté à la base MongoDB assignments dans le cloud !");
            console.log("at URI = " + uri);
            console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
        },
        err => {
            console.log('Erreur de connexion: ', err);
        });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

const prefix = '/api';

app.route(prefix + '/assignments')
    .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
    .get(assignment.getAssignment)
    .delete((req, res) => {
        assignment.deleteAssignment(req, res).catch(error => {
            console.error('Error deleting assignment:', error);
            res.status(500).send('Internal Server Error');
        });
    });

app.route(prefix + '/assignments')
    .post(assignment.postAssignment)
    .put(assignment.updateAssignment);

app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;

 */

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://amotassi:1rONTEAM@cluster0.53jlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(uri, options)
    .then(() => {
            console.log("Connecté à la base MongoDB assignments dans le cloud !");
            console.log("at URI = " + uri);
            console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
        },
        err => {
            console.log('Erreur de connexion: ', err);
        });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

const prefix = '/api';

app.route(prefix + '/assignments')
    .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
    .get(assignment.getAssignment)
    .delete(async (req, res) => {
        try {
            await assignment.deleteAssignment(req, res);
        } catch (error) {
            console.error('Error deleting assignment:', error);
            res.status(500).json({ message: 'Erreur interne du serveur', error });
        }
    });


app.route(prefix + '/assignments')
    .post(assignment.postAssignment)
    .put(assignment.updateAssignment);

app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;