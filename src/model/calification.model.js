const { Pool } = require('pg');

const pool = new Pool(
  {
    user:process.env.PG_USER,
    host:process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME,
    port: process.env.PG_PORT
});

function fecha(){
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const today = '"'+year.toString()+'-'+month.toString()+'-'+day.toString()+'"';
  return today
}

const createCalification = async (req, res) => {
    console.log(fecha)
    const { user_ID, rate, item_ID} = req.body;
    const response = await pool.query('INSERT INTO public.calification("user_ID", rate, "item_ID", date) VALUES ($1, $2, $3, $4)', [user_ID, rate, item_ID, fecha()]);
    res.json({
      message: 'Calification Added successfully',
      body: {
        calification: {user_ID, rate, item_ID}
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
  res.json(`Calification ${ID_calification} deleted Successfully`);
};

const getCalificationById = async (req, res) => {
  const ID_calification = parseInt(req.params.id);
  const response = await pool.query('SELECT * FROM public.calification WHERE "ID_calification" = $1', [ID_calification]);
  res.json(response.rows);
};

const editCalification = async (req, res) => {
  const id = parseInt(req.params.id);
  const { ID_calification, user_ID, rate, item_ID} = req.body;
  const response = await pool.query('UPDATE public.calification SET "ID_calification" = $1, "user_ID" = $2, rate = $3, "item_ID" = $4, date = $5 WHERE "ID_calification" = $6', [ID_calification, user_ID, rate, item_ID, fecha(), id]);
  res.json('Calification Updated Successfully');
}

const getRatingAverageById = async (req,res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query('SELECT rate FROM public.calification WHERE "item_ID" = $1', [id]);
  const suma = response.rows.reduce((acumulador, elemento) => acumulador + elemento.rate, 0);
  const promedio = suma /response.rowCount;
  res.json(promedio);
}


module.exports = {createCalification, 
  allCalification,
  deleteCalification,
  getCalificationById,
  editCalification,
  getRatingAverageById
};