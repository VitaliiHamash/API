var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



var file = require('file-system');
var task;
var todo;

//обробка даних з сховища
file.readFile('storage.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    task = JSON.parse(data);
});

app.get('/', function (req, res) {
    res.send('Hello API');
});
//app.get('/'... і app.get('/home'... це різні посилання
//після додавання нових роутів або після редагування існуючих потрібно перезавантажити сервер
app.get('/home', function (req, res) {
    res.send(task);
});


app.post('/home', function (req, res) {
    var todos = {
        id: task.length,
        task: req.body.task,
        description:""
    }
    task.push(todos);
    let data = JSON.stringify(task);

    file.writeFile("storage.json", data);
    console.log(req.body);
    res.send(todos);
})

//динамічний параметр
app.get('/description/:id', function (req, res) {
    console.log(req.params);

    todo = task.find(function (todo) {
        return todo.id === +req.params.id;

    });
    res.send(todo)
});

app.listen(3012, function () {
    console.log('API app started')


});





function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({nope: true});
    } else {
        next();
    }
}
app.use(ignoreFavicon);