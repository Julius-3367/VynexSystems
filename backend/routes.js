import express from 'express';
const router = express.Router();

// Handle the services request
router.get('/services', (req, res) => {
    console.log('Services endpoint hit'); // Log when endpoint is accessed
    const services = [
        'Custom Software Development',
        'Mobile Application Development',
        'Web Development',
        'Web Hosting Services',
        'Software Consulting',
        'UI/UX Design',
        'DevOps Solutions',
        'Digital Marketing',
        'Data Analysis',
        'HR System',
        'ERP System'
    ];
    res.json({ services });
});

// Handle the contact request
router.get('/contact', (req, res) => {
    console.log('Contact endpoint hit'); // Log when endpoint is accessed
    const contact = {
        email: 'vynexsystems@gmail.com',
        phone: '+254741585248',
        address: 'Nairobi, Kenya'
    };
    res.json(contact);
});

export default router;
