// server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();


app.prepare()
    .then(() => {
        const server = express();

        server.get('*', (req, res) => {
            if (req.url.includes('/api')) {
                return app.render(req, res, '/404');
            }
            return handle(req, res);
        });

        server.post('*', async (req, res) => {
            return handle(req, res);
        });

        server.listen(process.env.PORT || 3000, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    });