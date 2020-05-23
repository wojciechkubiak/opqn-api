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
        attributes: [
          "firstname",
          "lastname"
        ],
        include: [
          {
            model: Exams,
            // separate: true,
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

exports.signProtege = (require, result, next) => {
  const firstname = require.body.firstname;
  const lastname = require.body.lastname;
  const patron = result.user.id;

  Protege.update(
      { patronId: patron },
      { where: {
        $and: [
          {
            firstname: { $eq: firstname},
            lastname: { $eq: lastname},
            patronId: { $eq: null}
          }
        ]
      }}
  )
      .then(res => result.send(res))
      .catch(error => result.status(400).json({ error: error }));
}