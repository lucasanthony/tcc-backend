const mongoose = require('mongoose');

module.exports = async () => {
    let BD_URL;
    if (process.env.NODE_ENV === "prod") {
        BD_URL = process.env.BD_PROD;
    } else if (process.env.NODE_ENV === "dev") {
        BD_URL = process.env.BD_DEV;
    } else {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = new MongoMemoryServer();
        const uri = await mongod.getUri();
        BD_URL = uri;
    }

    mongoose.set('useFindAndModify', false);
    mongoose.connection.on('connected', () => {
        console.log('Conectado com o banco de dados!');
    })

    mongoose.connection.on('error', (err) => {
        console.log("Erro na conexão com o banco de dados: " + err);
    });

    mongoose.connect(BD_URL, {
        useNewUrlParser: true,
        poolSize: 5,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
}