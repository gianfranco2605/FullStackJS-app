import express  from "express";
const router = express.Router();
import {  registrar, profilo, confermare, autenticazione } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

router.post('/', registrar);

router.get('/confermare/:token', confermare);

router.post("/login", autenticazione);

// Custom middelware


router.get('/profilo', checkAuth, profilo);

export default router;