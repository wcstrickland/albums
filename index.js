
// ************** REQUIREMENTS AND INTITIALIZATION *************

const express = require('express');
const methodOverride = require('method-override'); // import method override to allow put and other requests from body
const ejsMate = require('ejs-mate'); //import ejs engine allowing for layouts rather than partials
const app = express(); // running app
const path = require('path'); // import path module to get access to file paths
const ip = require('ip');
const fs = require('fs');
const { spawn } = require("child_process");
const visit = spawn( "google-chrome-stable", [`${ip.address()}:8080`])
//const visit2 = spawn("google-chrome-stable", [`${ip.address()}:8080`])
app.set('views', path.join(__dirname, 'views')); // set view path
app.set('view engine', 'ejs'); // set view engine
app.engine('ejs', ejsMate); // add engine

// ******************* MIDDLEWARES *********************

app.use(express.urlencoded({ extended: true })); // middle ware that parses post requests payloads incoming via DOM body
app.use(methodOverride('_method')); // middle ware that allows put request to be served via DOM body
app.use(express.static(path.join(__dirname, 'public'))); // serves static assets

// ********* MONGOOSE CONNECTION (uri:string, options:object) ***********

// HOME
app.get('/', async (req, res, next) => {
    try {
        const albums = fs.readdirSync(`./public/`);
        const stripAlbums = albums.map(x => x.replace('"', ''))
        const albumsList = [];
        for (let album of stripAlbums) {
            let albumObj = {};
            albumObj.name = album;
            const pics = fs.readdirSync(`./public/${album}`);
            albumObj.pics = pics.map(x => x.replace('"', ''))
            albumsList.push(albumObj);
        }
        console.log("Home Page hit")
        res.render('home', { albumsList });
    } catch (e) {
        next();
    }
})

app.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const albumPics = fs.readdirSync(`./public/${id}`);
        const stripPics = albumPics.map(x => x.replace('"', ''))
        const albums = fs.readdirSync(`./public/`);
        const stripAlbums = albums.map(x => x.replace('"', ''))
        const albumsList = [];
        for (let album of stripAlbums) {
            let albumObj = {};
            albumObj.name = album;
            const pics = fs.readdirSync(`./public/${album}`);
            albumObj.pics = pics.map(x => x.replace('"', ''))
            albumsList.push(albumObj);
        }
        console.log(id)
        res.render('pics/pics', { stripPics, id, albumsList })
    } catch (e) {
        next();
    }
})


// ERROR ROUTES :positionally must come last as they catch requests that
// 'fall through' to them

// ERROR HANDLER
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Something went wrong...';
    res.send(err)
});

// LISTENER
app.listen(8080, () => {
    console.log(`visit @ ${ip.address()}:8080`);
});
