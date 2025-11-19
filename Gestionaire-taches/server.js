const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuration EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Données des tâches
let tasks = [
  { id: 1, title: "Apprendre Express", done: true },
  { id: 2, title: "Maîtriser EJS", done: false },
  { id: 3, title: "Rendre un TP parfait", done: false }
];

// Routes d'affichage
app.get('/', (req, res) => {
  res.render('index', { user: "yosra", tasks });
});

app.get('/tasks', (req, res) => {
  res.render('tasks', { tasks });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// API + Formulaire ajout tâche (avec validation)
app.post('/api/tasks', (req, res) => {
  const title = req.body.title?.trim();
  if (!title) {
    return res.status(400).send(`
      <div style="text-align:center; margin-top:100px; font-family:Arial;">
        <h2 style="color:red;">Erreur : le titre de la tâche est obligatoire !</h2>
        <p><a href="/tasks" style="color:#5a67d8; font-size:1.2em;">Retour aux tâches</a></p>
      </div>
    `);
  }
  tasks.push({
    id: tasks.length + 1,
    title: title,
    done: false
  });
  res.redirect('/tasks');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Application prête → http://localhost:${PORT}`);
  console.log(`Accueil → http://localhost:${PORT}/`);
  console.log(`Tâches  → http://localhost:${PORT}/tasks`);
});