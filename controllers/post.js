const posts = require("../db/post.json");
const path = require('path');
const kebabCase = require('lodash/kebabCase');
const fs = require("fs");


function index(req, res) {
    res.format({
        html: () => {
            const html = [];

            html.push("<h1>Lista dei post</h1>");
            html.push("<ul>");

            for (const post of posts) {
                const tagsHtml = post.tags.map(tag => `<span>${tag}</span>`).join(', ');
                html.push(`<li>
                    <h3>${post.title}</h3>
                    <img src="/imgs/${post.image}" alt="" style="width: 100px">
                    <p>${post.content}</p>
                    <p>${tagsHtml}</p>
                </li>`);
            }

            html.push("</ul>");
            res.send(html.join(""));
        },

        json: () => {
            res.type("json").send({
                totalElements: posts.length,
                list: posts
            });
        }
    });
};

function create(req, res) {
    // Se desideri gestire il formato di risposta in base all'header "Accept", puoi riutilizzare il codice commentato qui sotto
    const acceptHeader = req.headers.accept;
    if (acceptHeader && acceptHeader.includes('text/html')) {
      res.send('<h1>Creazione nuovo post</h1>');
    } else {
      res.status(406).send('Richiesta non accettata');
    }

    // Altrimenti, se vuoi solo restituire un messaggio
    // res.send("create andato a buon fine");
};

function store(req, res) {

    newPost = {
        ...req.body,
        slug: kebabCase(req.body.title),
        // image: req.file,
    } ;

    posts.push(newPost);

    const json = JSON.stringify(posts, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "..", "db", "post.json"), json);

    res.format({
        html: () => {
            res.redirect("/");
        },
        json: () => {
            res.json(newPost);
        },
        default: () => {
            res.status(406).send('Formato non accettato');
        }
    })
};

function show(req, res) {
    
    const slug = req.params.slug;
    const post = posts.find((p) => p.slug === slug);

    post.image_url = `/imgs/${post.image}`

    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post non trovato');
    }
};

function download(req, res) {
    const slug = req.params.slug;

    // Trova il post corrispondente allo slug
    const post = posts.find((p) => p.slug === slug);

    if (post) {

      const imagePath = path.join(__dirname, `../public/imgs/${post.image}`);

      // Invia l'immagine al client
      res.download(imagePath);
    } else {
        // Se il post non è stato trovato, ritorna un errore 404
        res.status(404).send('Post non trovato');
    }
};

function destroy(req, res) {
    const slug = req.params.slug;
    // Trova l'indice del post da eliminare
    const postIndex = posts.findIndex((_p) => _p.slug === slug);

    if (postIndex !== -1) {
        // Rimuovi il post dall'array
        posts.splice(postIndex, 1);
        res.send('Post eliminato');
    } else {
        res.status(404).send('Post non trovato');
    }   
}


module.exports = {
    index,
    show,
    create,
    download,
    store, 
    destroy
};
