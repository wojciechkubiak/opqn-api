const path = require("path");
const jwt = require("jsonwebtoken");
import 'dotenv/config';

const express = require("express");

const PatronCtrl = require("../controllers/patron");
const ProtegeCtrl = require("../controllers/protege");
const ExamsCtrl = require("../controllers/exams");
const ExamsMethodCtrl = require("../controllers/protege-methods");
const PatronMethodCtrl = require("../controllers/patron-methods");

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
router.get('/exams', auth, ExamsCtrl.getAllExams);
router.get('/last-exam-date', auth, ExamsCtrl.getLastExamDate);
router.get('/last-exam', auth, ExamsCtrl.getLastExam);
router.post('/add-exam', auth, ExamsCtrl.postExam);
router.put('/edit-exam/:id', auth, ExamsCtrl.editExam);
router.delete('/delete-exam/:id', auth, ExamsCtrl.deleteExam);
router.put('/edit-protege/', auth, ExamsMethodCtrl.editProtege);
router.put('/group-protege/:id', auth, ExamsMethodCtrl.insertIntoGroup);
router.put('/delete-protege/:id', auth, ExamsMethodCtrl.deleteFromGroup);
router.get('/patron-proteges', auth, PatronMethodCtrl.getPatronsData);
router.get('/protege-data', auth, ExamsMethodCtrl.getProtegeName);
router.put('/sign-protege', auth, PatronMethodCtrl.signProtege);
router.get('/last-protege-exam/:id', auth, ExamsCtrl.getLastProtegeExam);

module.exports = router;