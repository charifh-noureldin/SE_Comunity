const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
const publicVapidKey =
    'BPsc2o7uWm_r9GsJOQOCvOc1AncWzDW6DDe_1XOqf-mpbniVZWMe_eEylN8RB7O3qAcy-FHKNvh18yTdCE5Tt6Q';
const privateVapidKey =
    '7qeW19Rj2m3DM_s6MgWtsrVMsKiL--kvks7RJQAVJL4';

webpush.setVapidDetails('mail:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({ title: 'Push Test' });

    // Pass object into senNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));

});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));