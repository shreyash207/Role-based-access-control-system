const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const Role = require('../constant/Role');

// Get all blog posts (any authenticated user can access)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.status(200).json(blogPosts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


// Get blog post by ID (any authenticated user can access)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(200).json(blogPost);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


// Create blog post (only admins can create blog posts)
router.post('/', authMiddleware, roleMiddleware([Role.ADMIN]), async (req, res) => {
    const { title, content } = req.body;
    try {
        const newBlogPost = new BlogPost({ title, content, author: req.user.id });
        await newBlogPost.save();
        res.status(201).json(newBlogPost);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


// Update blog post (only admins can update blog posts)
router.put('/:id', authMiddleware, roleMiddleware([Role.ADMIN]), async (req, res) => {
    const { title, content } = req.body;
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) return res.status(404).json({ msg: 'Post not found' });

        blogPost.title = title || blogPost.title;
        blogPost.content = content || blogPost.content;
        await blogPost.save();

        res.status(200).json(blogPost);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


// Delete blog post (only admins can delete blog posts)
router.delete('/:id', authMiddleware, roleMiddleware([Role.ADMIN]), async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) return res.status(404).json({ msg: 'Post not found' });

        await BlogPost.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Post removed successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
