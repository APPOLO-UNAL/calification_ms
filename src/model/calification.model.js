const { Pool } = require('pg');


const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME,
    port: process.env.PG_PORT
});

const createCalification = async (req, res) => {
      const { name, email } = req.body;
      const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
      res.json({
        message: 'User Added successfully',
        body: {
          user: {name, email}
      }
  })
};

module.exports = {createCalification};