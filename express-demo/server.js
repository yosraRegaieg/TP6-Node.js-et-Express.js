const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));     // ← NOUVELLE LIGNE
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let tasks = [
  { id: 1, title: 'Apprendre Express', done: true },
  { id: 2, title: 'Maîtriser EJS', done: false },
  { id: 3, title: 'Créer une API', done: false }
];

app.get('/', (req, res) => {
  res.render('index', { user: 'Student', tasks });
});

app.get('/tasks', (req, res) => {
  res.render('tasks', { tasks });
});

app.get('/api/tasks', (req, res) => res.json(tasks));

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    done: false
  };
  tasks.push(newTask);
  res.redirect('/tasks');   // ← Redirection après ajout !
});

app.listen(PORT, () => {
  console.log(`Application complète prête → http://localhost:${PORT}`);
});