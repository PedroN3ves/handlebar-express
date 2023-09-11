const express = require("express");
const exphbs = require("express-handlebars");
const connection = require('./db/connection');
const port = 3003;



const app = express(); // utilizando express boy

// configurando a template engine handlebars 
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');


app.use(express.urlencoded({extension: true}));
app.use(express.static('public'));
app.use(express.json());


app.get("/", (request, response) => {
    // ao acessar a rota principal vai ser retornada a pagina home.
    return response.render("home");
});

app.post("/books/insertbook", (req, res) => {
    const {title, pages_number} = req.body;

    const sql = `INSERT INTO books(title, pages_number) VALUES('${title}', ${pages_number});`;

    connection.query(sql, (error) => {
        if(error){
            console.error(error)
        }

        res.redirect('/');
    });
});

app.get('/books', (req, res) => {
    const sql = `SELECT * FROM books`;

    connection.query(sql, (error, data) => {
        error ? console.error(error) : console.log();

        const books = data;

        return res.render('books', {books});
    });
});

app.get("/books/:id", (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM books WHERE id = ${id};`;

    connection.query(sql, (error, data) => {
        error ? console.error(error) : console.log();

        const book = data[0];

        return res.render('book', {book})
    });
});

app.get("/books/edit/:id", (req, res) => {
    const {id} = req.params;

    const sql = `SELECT * FROM books WHERE id = ${id};`;

    connection.query(sql, (error, data) => {
        error ? console.error(error) : console.log();

        const book = data[0];

        return res.render('editbook', {book})
    });
});

app.post('/books/update/:id', (req,res) => {

    const {id} = req.params;
    const {title, pages_number} = req.body;

    const sql = `UPDATE books SET title = '${title}', pages_number = ${pages_number} WHERE id = ${id} `;

    connection.query(sql, (error) => {
        error ? console.error(error) : console.log();

        return res.redirect('/books')
    });
});

app.post('/books/remove/:id', (req, res) => {
    const {id} = req.params;

    const sql = `DELETE FROM books WHERE id = ${id}`;

    connection.query(sql, (error) => {
        error ? console.error(error) : console.log();

        return res.redirect('/books');
    });
});


    // verificando algum erro que possa a ver
connection.connect((error) => {     
    error ? console.error(error) : console.log();
        // caso nenhum erro seja encontrado vai ser retornado essa mensagem no console(terminal).
    console.log("Mysql está conetado");

    app.listen(port, () => console.log(`Server running on port ${port}`));
});

