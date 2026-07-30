const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbResult = await pool.query('SELECT NOW() as db_time');
    res.json({
      status: 'healthy',
      service: 'egarrage-backend-api',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        db_time: dbResult.rows[0].db_time
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      service: 'egarrage-backend-api',
      error: error.message,
      database: { connected: false }
    });
  }
});

// GET Imported Cars
app.get('/api/cars', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM imported_cars';
    const values = [];

    if (category && category !== 'All') {
      query += ' WHERE category = $1';
      values.push(category);
    }
    query += ' ORDER BY created_at DESC';

    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching imported cars:', error);
    res.status(500).json({ error: 'Failed to retrieve imported cars' });
  }
});

// GET Auto Parts Catalog
app.get('/api/parts', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM auto_parts WHERE 1=1';
    const values = [];
    let paramIdx = 1;

    if (category && category !== 'All') {
      query += ` AND category = $${paramIdx}`;
      values.push(category);
      paramIdx++;
    }

    if (search) {
      query += ` AND (name ILIKE $${paramIdx} OR compatibility ILIKE $${paramIdx} OR part_number ILIKE $${paramIdx})`;
      values.push(`%${search}%`);
      paramIdx++;
    }

    query += ' ORDER BY created_at DESC';

    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching auto parts:', error);
    res.status(500).json({ error: 'Failed to retrieve auto parts' });
  }
});

// GET Tech Innovations & Tech Cars
app.get('/api/tech', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tech_innovations ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tech innovations:', error);
    res.status(500).json({ error: 'Failed to retrieve tech innovations' });
  }
});

// GET Service Bookings
app.get('/api/services', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM service_bookings ORDER BY created_at DESC LIMIT 20');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching service bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve service bookings' });
  }
});

// POST New Service Booking
app.post('/api/services', async (req, res) => {
  try {
    const { customer_name, email, phone, car_model, service_type, preferred_date, notes } = req.body;

    if (!customer_name || !email || !phone || !car_model || !service_type || !preferred_date) {
      return res.status(400).json({ error: 'All mandatory booking fields are required.' });
    }

    const query = `
      INSERT INTO service_bookings (customer_name, email, phone, car_model, service_type, preferred_date, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [customer_name, email, phone, car_model, service_type, preferred_date, notes || ''];
    const { rows } = await pool.query(query, values);

    res.status(201).json({
      message: 'Service appointment successfully booked!',
      booking: rows[0]
    });
  } catch (error) {
    console.error('Error creating service booking:', error);
    res.status(500).json({ error: 'Failed to process service booking' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`egarrage Backend API listening on port ${PORT}`);
});
