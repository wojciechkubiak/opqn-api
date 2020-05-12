const path = require("path");
const jwt = require("jsonwebtoken");
import 'dotenv/config';

const express = require("express");

const PatronCtrl = require("../controllers/patron");
const ProtegeCtrl = require("../controllers/protege");

const router = express.Router();

const auth = (require, result, next) => {
    const header = require.headers["authorization"];

    if(!header) {
        return result.status(401).send({Acces: `Denied`});
    }

    try {
        const data = jwt.verify(header, process.env.LOCAL_KEY || process.env.HR_KEY);
        require.user = data;
        next();
    } catch(e) {
        result.status(400).send({data: `${header}`});
    }
}

router.post('/register-patron', PatronCtrl.registerPatron);
router.post('/login-patron', PatronCtrl.loginPatron);
router.post('/register-protege', ProtegeCtrl.registerProtege);
router.post('/login-protege', ProtegeCtrl.loginProtege);

module.exports = router;