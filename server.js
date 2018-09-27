'use strict'

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { blogPost } = require('./models');


const app = express();

app.use(morgan('common'));
app.use(express.json());


app.get('/posts', (req, res) => {
	blogPost
		.find()
		.then(posts => {
			res.json(posts.map(post => post.serialize()));
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'something went terribly wrong' });
		});
});
