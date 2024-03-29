//config incial
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const cookieSession = require("cookie-session")
const app = express()


//Cors config
const corsOpitions = {
    origin: "http://localhost:3002"
}


app.use(cors(corsOpitions))

// middleware
app.use(
    express.urlencoded({
        extended: true,
    })
)


app.use(
    cookieSession({
        name: "cinemax-session",
        keys: ["COOKIE_SECRET"], // deve usar como variável de ambiente secreta
        httpOnly: true
    })
)
// Analisar solicitações do tipo de conteúdo - aplicativo/json
app.use(express.json())

// Analisar solicitações do tipo de conteúdo - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// rotas da API
const userRoute = require('./src/routes/userRoute')
const filmeRoute = require('./src/routes/filmeRoute')
const salaRoute = require('./src/routes/salaRoute')
const bilheteRoute = require('./src/routes/bilheteRoute')
const pipocaRoute = require('./src/routes/pipocaRoute')
const carrinhoRoute = require('./src/routes/carrinhoRoute')

app.use('/user', userRoute)
app.use('/filme', filmeRoute)
app.use('/sala', salaRoute)
app.use('/bilhete', bilheteRoute)
app.use('/pipoca', pipocaRoute)
app.use('/carrinho', carrinhoRoute)

// rotaincial / endpoint
app.get('/', (req, res) => {

    //mostra req
    res.json({ message: 'Oi Express cinema aqui!' })
})


// Definindo porta
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server está ativo na porta ${PORT}.`);
});

const db  = require('./src/models')
const Role = db.role;

db.mongoose
    .connect(`mongodb+srv://${db.DB_USER}:${db.DB_PASSWORD}@apicluster.kz5bzvm.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectamos com sucesso')
		initial();
    })
    .catch((err) => console.log(err));


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}