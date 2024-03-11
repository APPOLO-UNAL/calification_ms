const { Pool } = require('pg');

const pool = new Pool(
  {
    user: "postgres",
    host:"localhost",
    password:"Juandi1810",
    database: "calification_db",
    port: 5432
});

const createCalification = async (req, res) => {
      const { ID_calification, user_ID, rate, item_ID, date } = req.body;
      const response = await pool.query('INSERT INTO public.calification("ID_calification", "user_ID", rate, "item_ID", date) VALUES ($1, $2, $3, $4, $5)', [ID_calification, user_ID, rate, item_ID, date]);
      res.json({
        message: 'Calification Added successfully',
        body: {
          calification: {ID_calification, user_ID, rate, item_ID, date}
      }
      })
};

const allCalification = async (req, res) => {
  const response = await pool.query('SELECT "ID_calification", "user_ID", rate, "item_ID", date FROM public.calification;');
  res.status(200).json(response.rows);
};

const deleteCalification = async (req, res) => {
  const ID_calification = parseInt(req.params.id);
  await pool.query('DELETE FROM public.calification WHERE "ID_calification" = $1', [ID_calification]);
  res.json(`User ${ID_calification} deleted Successfully`);
};

const getCalificationById = async (req, res) => {
  const ID_calification = parseInt(req.params.id);
  const response = await pool.query('SELECT * FROM public.calification WHERE "ID_calification" = $1', [ID_calification]);
  res.json(response.rows);
};

const editCalification = async (req, res) => {
  const id = parseInt(req.params.id);
  const { ID_calification, user_ID, rate, item_ID, date } = req.body;
  const response = await pool.query('UPDATE public.calification SET "ID_calification" = $1, "user_ID" = $2, rate = $3, "item_ID" = $4, date = $5 WHERE "ID_calification" = $6', [ID_calification, user_ID, rate, item_ID, date, id]);
  res.json('Calification Updated Successfully');
}


module.exports = {createCalification, 
  allCalification,
  deleteCalification,
  getCalificationById,
  editCalification
};