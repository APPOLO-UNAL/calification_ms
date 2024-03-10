const { Router } = require('express');
const {createCalification} = require( "../controllers/calification.controllers");

const router = Router();

router.post("/api/v1/calification/add", function(req,res){
    createCalification
});
/*
router.get("/api/v1/calification/all", allCalification);
router.get("/api/v1/calification/:id", renderCalification);
router.put("/api/v1/calification/:id", editCalification);
router.delete("/api/v1/calification/:id", deleteCalification);
*/

module.exports = router;
