// ../controllers/user.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;


const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: 'Utilisateur créé !', user: newUser });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};

const login = async (req, res) => {
    try {
        console.log(JWT_KEY);
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            return;
        }
        const token = jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: '24h' });
        res.status(200).json({ userId: user.id, token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};

module.exports = {
    signup,
    login,
};
