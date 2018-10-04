'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const authorSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	userName: {
		type: String,
		unique: true
	}
});

const commentSchema = mongoose.Schema({ content: String });

const blogPostSchema = mongoose.Schema({
	title: String,
	content: String,
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
	comments: [commentSchema]
});

blogPostSchema.pre('find', function(next) {
	this.populate('author');
	next();
});

blogPostSchema.pre('findOne', function(next) {
	this.populate('author');
	next();
});

blogPostSchema.virtual('authorName').get(function() {
	return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
	return {
		id: this._id,
		author: this.authorName,
		content: this.content,
		title: this.title,
		comments: this.comments
	};
};

const Author = mongoose.model('Author', authorSchema, 'Authors');
const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'BlogPosts');

module.exports = { Author, BlogPost };



