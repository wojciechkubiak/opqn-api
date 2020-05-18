import Exams from "./../models/exams";
import Protege from "./../models/protege";
import sequelize from "sequelize";

// date of last exam for user
exports.getLastExamDate = (require, result, next) => {
  const id = require.user.id;

  Exams.findAll({
    limit: 1,
    attributes: ["date"],
    order: [["date", "DESC"]],
    where: {
      protegeId: id,
    },
  })
    .then((exam) => {
      result.status(200).json(exam);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};

// all exams for user
exports.getAllExams = (require, result, next) => {
  const id = require.user.id;

  const date = new Date().getWeek();

  Exams.findAll({
    limit: 5,
    order: [["date", "DESC"]],
    where: {
      protegeId: id
      // $and: [
      //   sequelize.where(sequelize.fn('WEEK', sequelize.col('date')), 21),
      //   { protegeId: id }
      // ]
    },
  })
    .then((exams) => {
      result.status(200).json(exams);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};

// last exam for user
exports.getLastExam = (require, result, next) => {
  const id = require.user.id;
  
  Exams.findAll({
    include: [{
      model: Protege,
      where: {protegeId: id},
      limit: 1,
      order: [["date", "DESC"]],
    }]
  })
    .then((exams) => {
      result.status(200).json(exams);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};

// post exam for user
exports.postExam = (require, result, next) => {
  const weight = require.body.weight;
  const glucose = require.body.glucose;
  const pressure = require.body.pressure;
  const date = require.body.date;
  const id = require.user.id;

  Exams.create({
    weight: weight,
    glucose: glucose,
    pressure: pressure,
    date: date,
    protegeId: id,
  })
    .then((exam) => {
      result.status(200).json(exam);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};

// put exam for exam id
exports.editExam = (require, result, next) => {
  const id = parseInt(require.params.id);
  const userId = require.user.id;
  const upWeight = require.body.weight;
  const upGlucose = require.body.glucose;
  const upPressure = require.body.pressure;
  const date = require.body.date;

  Exams.update(
    {
      weight: upWeight,
      glucose: upGlucose,
      pressure: upPressure,
      date: date,
    },
    {
      where: sequelize.and(
        { id: id },
        { protegeId: userId }
      ),
    }
  )
    .then((res) => {
      result.send(`Updated ${res}`);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};

// delete exam
exports.deleteExam = (require, result, next) => {
  const id = parseInt(require.params.id);
  const userId = require.user.id;

  Exams.destroy({
    where: sequelize.and(
      { id: id},
      { protegeId: userId}
    )
  })
    .then((res) => {
      result.send(`Deleted ${res}`);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};
