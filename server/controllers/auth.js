const AuthSchema = require('../models/auth.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async(req, res) => {
    try {
        const{username, password, email} = req.body; 
        
        const user = await AuthSchema.findOne(email);

        if(user){
            return res.status(500).json({msg: "Bu email adresi kullanınlıyor."})
        }
        if(password.lenght < 6){
            return res.status(500).json({msg: "Şifre 6 karakterden uzun olmalı"}) 
        }

        const passwordHash = await bcrypt.hash(password, 12);
        
        if(isEmail(email)){
            return res.status(500).json({msg: "Email formatında hata var!"})
        }

        const newUser = await AuthSchema.create({username, email, password: passwordHash})

        const token = jwt.sign({id: newUser._id}, "SECRET_KEY", {expiresIn:'1h'})

        return res.status(201).json({
            status:"OK",
            newUser,
            token
        })


    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = request.body
        const user = await AuthSchema.findOne(email)

        if(!user){
            return res.status(500).json({msg: "Böyle bir kullanıcı bulunamadı."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if(!passwordCompare){
            return res.status(500).json({msg: "Yanlış şifre girildi."})
        }

        const token = jwt.sign({id: user._id}, "SECRET_KEY", {expiresIn:'1h'})

        return res.status(200).json({
            status:"OK",
            user,
            token
        })


    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


function isEmail(emailAdress) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex))
        return true;
    else
        return false;
}

module.exports = {register, login};