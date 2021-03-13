const { response } = require('mongoose');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios,total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img').skip(desde).limit(5),
        Usuario.count()
    ]);

    res.status(400).json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuarios = async (req, res = response) => {
    const { email, password } = req.body;  
    try {
        const existeEmail = await Usuario.findOne({ email })
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

const actualizaUsuario = async (req,res=response)=>{
    //Validar toquen y comprobar que es el usuario correcto
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por este id'
            })
        }
        //Actualizaciones
        const {password,google,email,...campos} = req.body;
        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con este email'
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new: true});
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status().json({
            ok:false,
            msg:'Error inesperado'
        })
    }

};

const borrarUsuario= async(req,res=response)=>{
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por este id'
            })
        }     

        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg:'Usuario Eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizaUsuario,
    borrarUsuario
}
