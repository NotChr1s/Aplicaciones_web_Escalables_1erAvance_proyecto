const express = require('express');
const cors = require('cors');
const connectDB = require('./database');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8081;

        this.gamesPath = '/api/games';
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        this.middlewares();
        this.routes();
        connectDB();
    }

    routes(){

        this.app.use(this.gamesPath, require('../routes/games.routes'));
        this.app.use(this.usersPath, require('../routes/users.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));

        this.app.get('/', (req, res) => {
            res.json({ 
                message: 'Hello World!' 
            });
        });
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    listen(){
        this.app.listen(this.port , () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}

module.exports = Server;