const express = require('express');
const app = express();
const PORT = 3000;

// Définir EJS comme moteur de rendu
app.set('view engine', 'ejs');

// Servir les fichiers statiques (CSS, images, etc.) depuis le dossier public
app.use(express.static('public'));

// Route pour la page de profil
app.get('/profile', (req, res) => {
  const user = {
    name: 'yosra regaieg',
    age: 21,
    occupation: 'Software Engineer',
    hobbies: ['Coding', 'Gaming', 'Hiking', 'Reading']
  };
  
  res.render('profile', { user });
});

// Page d'accueil simple (bonus pour éviter Cannot GET /)
app.get('/', (req, res) => {
  res.send(`
    <h1 style="text-align:center; margin-top:100px;">
      Profil disponible ici → <a href="/profile">/profile</a>
    </h1>
  `);
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  console.log(`Ouvre cette URL → http://localhost:${PORT}/profile`);
});