import Patron from "./../models/patron";
import 'dotenv/config';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.registerPatron = (require, result, next) => {
    const data = {
        firstname: require.body.firstname,
        lastname: require.body.lastname,
        mail: require.body.mail,
        password: require.body.password,
    }

    Patron.findOne({
        where: {
            mail: require.body.mail
        }
    })
    .then(() => {
        bcrypt.hash(require.body.password, 10, (error, hash) => {
            data.password = hash;
            Patron.create(data)
            .then(patron => {
                result.json({status: `${patron.firstname} ${patron.lastname} - created`})
            })
            .catch(error => {
                result.send(`${error} - failed`)
            })
        })
    })
    .catch(error => {
        result.send(error);
    })
}

exports.loginPatron = (require, result, next) => {
    Patron.findOne({
        where: {
            mail: require.body.mail
        }
    })   
    .then(patron => {
        if(patron) {
            if(bcrypt.compareSync(require.body.password, patron.password)) {
                let token = jwt.sign(patron.dataValues, process.env.LOCAL_KEY || process.env.HR_KEY, {
                    expiresIn: "7d"
                })
                result.json({token: token, id: patron.id})
            } else {
                result.status(400).json({error: "Wrong password"})
            }
        } else {
            result.status(400).json({error: "Login not found"})
        }
    })
    .catch(error => {
        result.status(400).json({error: "No data send"});
    })
}