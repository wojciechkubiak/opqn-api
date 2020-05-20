import Protege from "./../models/protege";
import Patron from "./../models/patron";
import Exams from "./../models/exams";
import sequelize from "sequelize";

exports.getPatronsData = (require, result, next) => {
  const id = require.user.id;

  Patron.findAll({
    //   limit: 2,
    attributes: ["id"],
    include: [
      {
        model: Protege,
        attributes: [
          "firstname",
          "lastname"
        ],
        include: [
          {
            model: Exams,
            attributes: [
              "weight",
              "glucose",
              "pressure",
              "date"
            ],
            limit: 2,
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
