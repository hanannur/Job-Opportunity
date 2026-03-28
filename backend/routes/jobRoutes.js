import express from 'express';
import axios from 'axios';

const router = express.Router();

// @route   GET api/jobs
// @desc    Get jobs from TheMuse API
router.get('/', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`https://www.themuse.com/api/public/jobs?page=${page}`);
        
        // Transform the data to match frontend expectations if necessary, or just send array
        res.json(response.data);
    } catch (err) {
        console.error('Error fetching jobs:', err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
