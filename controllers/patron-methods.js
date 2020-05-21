import Protege from "./../models/protege";
import Patron from "./../models/patron";
import Exams from "./../models/exams";
import sequelize from "sequelize";

exports.getPatronsData = (require, result, next) => {
  const id = require.user.id;

  Patron.findAll({
    attributes: ["id"],
    include: [
      {
        model: Protege,
        offset: 0,
        limit: 7,
        attributes: [
          "firstname",
          "lastname"
        ],
        
        include: [
          {
            model: Exams,
            separate: true,
            attributes: [
              "weight",
              "glucose",
              "pressure",
              "date"
            ],
            order: [["date", "DESC"]],
          }
        ],
        where: {
          patronId: id
        }
      },
    ],
  })
    .then((patron) => {
      result.status(200).json(patron);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};
