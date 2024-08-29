import express, { Request, Response } from 'express';

import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';

// Here we use the file we get from the firebase console
const serviceAccount = require('./config/YOUR_FILE.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://your-project-id.firebaseio.com" // if we use a database
});

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world, TypeScript!');
});

app.post('/send-notification', async (req: Request, res: Response) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).send('Title and body are required');
    }

    const message = {
        notification: {
            title,
            body,
        },
        topic: 'all',
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        res.status(200).send('Notification sent successfully to topic "all"');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send notification');
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
