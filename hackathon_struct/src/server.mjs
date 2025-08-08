import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';



const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

const dbPromise = open({
    filename: './db/warehouse_data.db',
    driver: sqlite3.Database
});

const testDBConnection = async () => {
    try {
        const db = await dbPromise;
        const result = await db.all('SELECT name FROM sqlite_master WHERE type="table"');
        console.log('Connected to DB. Tables:', result);
        const skus = await getAllSkus();
        console.log(skus)

    } catch (err) {
        console.error('Failed to connect to DB:', err);
    }
};

testDBConnection();

export const getAllSkus = async () => {
    const db = await dbPromise;
    return await db.all('SELECT * FROM skus');
};





let timeCheck = {
    previousTimes: []
};

app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
});

app.get('/', (_, res) => {
    res.send('Server is running!');
});

app.get('/getTime', (_, res) => {
    console.log('Updated times:', timeCheck.previousTimes);

    res.json({ previousTimes: timeCheck.previousTimes });

});


app.post('/addTime', (req, res) => {
    const { currentTime } = req.body;
    timeCheck.previousTimes.push(currentTime);
    console.log('Updated times:', timeCheck.previousTimes);
    res.json({ previousTimes: timeCheck.previousTimes });

});

app.post('/removetime', (_, res) => {
    console.log('Times Before Pop:', timeCheck.previousTimes);
    const times_pre_remove = timeCheck.previousTimes;
    const last_time = timeCheck.previousTimes.pop();
    console.log('Removed Time', last_time);
    console.log('Times After Pop:', timeCheck.previousTimes);
    res.json({times_pre_remove, last_time, previousTimes: timeCheck.previousTimes})
})

app.get('/api/skus', async (_, res) => {
    try {
        const db = await dbPromise;
        const skusWithAlerts = await db.all(`
            SELECT
                skus.*,
                alerts.alert_message AS alert_message
            FROM skus
                     LEFT JOIN alerts ON skus.sku_id = alerts.sku_id
        `);
        res.json({ skus: skusWithAlerts });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch SKUs with alerts', details: err.message });
    }
});

app.get('/api/pipeline', async (_, res) => {
    try {
        const db = await dbPromise;
        const pipelineData = await db.all(`
            SELECT *
            FROM production_pipeline
        `);
        res.json({ production_pipeline: pipelineData });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch production pipeline data', details: err.message });
    }
});

app.get('/api/alerts/count', async (_, res) => {
    try {
        const db = await dbPromise;
        const result = await db.get(`SELECT COUNT(*) AS count FROM alerts`);
        res.json({ alertCount: result.count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch alert count', details: err.message });
    }
});








app.listen(port, () => console.log(`Server listening at ${port}`));