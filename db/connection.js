const mysql = require('mysql2');

const connection = mysql.createConnection({

    host: "localhost",
    user: "aluno_medio",
    password: "@lunoSenai23.",
    database: "system_books"
});

module.exports = connection;