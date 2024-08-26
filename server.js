/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('combined'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.send('Hello remote world!\n');
});

app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!\n`);
});

app.post('/data', (req, res) => {
    const data = req.body;
    res.json({
        message: 'Data received',
        data: data
    });
});

app.get('/health', (req, res) => {
    res.send('OK\n');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
