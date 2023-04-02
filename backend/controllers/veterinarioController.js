import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
    const { email } = req.body;
    //Prevent duplicate users
    const essisteUser = await Veterinario.findOne({email});
    
    if(essisteUser) {
        const error = new Error("Usuario gia registrato");
        return res.status(400).json({msg: error.message});
    }

    try {
        const veterinario = new Veterinario(req.body);
        const veterinarioSave = await veterinario.save();

        res.json(veterinarioSave);
    } catch (error) {
        console.log(error);
        
    }
    
};

const profilo = (req, res) => {
    res.json({ msg: "showing profile"})
};

const confermare = async (req, res) => {
    const { token } = req.params

    const UserConferma = await Veterinario.findOne({token});

    if(!UserConferma) {
        const error = new Error("Token non valito")
        return res.status(404).json({msg: error.message})
    }

    try {
        UserConferma.token = null;
        UserConferma.confermato = true;
        await UserConferma.save();
        res.json({msg: "User Confermato Corretamente"});    
    } catch (error) {
        console.log(error);
        
    }

    
};

const autenticazione = async (req,res) => {
    const { email, password } = req.body;

    // User exists?
    const user = await Veterinario.findOne({email});
    if(!user) {
        const error = new Error("User not exist")
        return res.status(404).json({msg: error.message})
    }
    //prove if the user is conferm
    if(!user.confermato){
        const error = new Error("Tuo account non è stato confermato");
        return res.status(403).json({msn: error.message});
    }
    
    //Auntenticare User
    if(await user.comprovarePassword(password)) {
        // console.log(user);0
        //Autenticate
        res.json({ token: generarJWT(user.id) });
    }else {
        const error = new Error("Password sbagliata");
        return res.status(403).json({msn: error.message});
    }
}

export { registrar, profilo, confermare, autenticazione };