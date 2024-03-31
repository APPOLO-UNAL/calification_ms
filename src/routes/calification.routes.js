const { Router } = require('express');
const {
    createCalification, 
    allCalification,
    deleteCalification,
    getCalificationById,
    editCalification,
    getRatingAverageById
} = require( "../model/calification.model");

const router = Router();

router.post("/api/v1/calification/add",createCalification);
router.get("/api/v1/calification/all", allCalification);
router.get("/api/v1/calification/itemUser/:idPersona/:idItem", getCalificationById)
router.delete("/api/v1/calification/:idPersona/:idItem", deleteCalification);
router.patch("/api/v1/calification/:idPersona/:idItem", editCalification);
router.get("/api/v1/calification/average/:id", getRatingAverageById)

module.exports = router;
