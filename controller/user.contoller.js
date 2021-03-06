const mongoose = require('mongoose');
const User = mongoose.model('users');
const gavatar = require('gravatar');

const userController = {
    createUser: async (req, res) => {
        try {
            const { firstName, lastName, email, birthday, occupation, salary, gender, links } = req.body;
            if(!firstName || !lastName || !email) {
                return res.status(422).send({ message: 'Fields empty!' });
            }
            const avatar = gavatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            const newUser = new User({ firstName, lastName, email, avatar, birthday, occupation, salary, gender, links });
            const savedUser = await newUser.save()
            if(savedUser) {
               res.status(201).send(savedUser) 
            }
        } catch(e) {
            res.status(500).send({ message: e.message })
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await User.find()
            if(users) {
                res.status(200).send(users)
            }
        } catch(err) {
            res.status(500).send({ message: err.message })
        }
    },
    getUser: async (req, res) => {},
    updateUser: async (req, res) => {},
    deleteUser: async (req, res) => {}
}

module.exports = userController;