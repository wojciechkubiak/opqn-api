import Exams from "./../models/exams";
import Protege from "./../models/protege";

// date of last exam for user
exports.getLastExamDate = (require, result, next) => {
  const id = parseInt(require.params.id);

  Exams.findAll({
    limit: 1,
    attributes: ["date"],
    order: [["date", "DESC"]],
    where: {
      id: id,
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
  const id = parseInt(require.params.id);

  Exams.findAll({
    where: {
      id: id,
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
  const id = parseInt(require.params.id);
  
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
  const id = parseInt(require.body.id);

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
      where: {
        id: id,
      },
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

  Exams.destroy({
    where: {
      id: id,
    },
  })
    .then((res) => {
      result.send(`Deleted ${res}`);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};
