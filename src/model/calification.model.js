const pool = require("./index");

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
  const ID_PERSONA = parseInt(req.params.idPersona);
  const ID_ITEM = parseInt(req.params.idPersona.idItem);
  console.log(ID_PERSONA,ID_ITEM);
  const response = await pool.query('SELECT * FROM public.calification WHERE "user_ID" = $1 AND "item_ID"=$2', [ID_PERSONA,ID_ITEM]);
  res.json(response.rows);
};

const editCalification = async (req, res) => {
  const id = parseInt(req.params.id);
  const { user_ID, rate, item_ID} = req.body;
  const response = await pool.query('UPDATE public.calification SET  "user_ID" = $1, rate = $2, "item_ID" = $3, date = $4 WHERE "ID_calification" = $5', [user_ID, rate, item_ID, fecha(), id]);
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