// importação das dependências do servidor node
// inicialização do express
const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');

const app = express ();
const userRoutes = require ('./routes/user-route');
const artistRoutes = require ('./routes/artist-route');
const genreRoutes = require ('./routes/genre-route');
const albumRoutes = require ('./routes/album-route');
const trackRoutes = require ('./routes/track-route');

// permitir parsing dos pedidos de http vindos pelo body

app.use (bodyParser.json ());
app.use (cors());

//rotas e chamadas de api
app.use ('/user', userRoutes);
app.use ('/artist', artistRoutes);
app.use ('/genre', genreRoutes);
app.use ('/album', albumRoutes);
app.use ('/track', trackRoutes);

//iniciar node server
const port = process.env.PORT || 3000;
app.listen (port,() => {
    console.log (`\x1b[32m(PLAIN) Server listening on port ${port}\x1b[0m.`);
});
