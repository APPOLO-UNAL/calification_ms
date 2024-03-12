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
router.get("/api/v1/calification/:id", getCalificationById)
router.delete("/api/v1/calification/:id", deleteCalification);
router.put("/api/v1/calification/:id", editCalification);
router.get("/api/v1/calification/average/:id", getRatingAverageById)

module.exports = router;
