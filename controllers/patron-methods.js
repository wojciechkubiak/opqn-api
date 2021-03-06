import Protege from "./../models/protege";
import Patron from "./../models/patron";
import Exams from "./../models/exams";
const Op = Sequelize.Op;

import sequelize from "sequelize";
import Sequelize from "sequelize";

exports.getPatronsData = (require, result, next) => {
  const id = require.user.id;

  Patron.findAll({
    attributes: ["id"],
    include: [
      {
        model: Protege,
        attributes: [
          "id",
          "firstname",
          "lastname",
          "mail",
          "phone"
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
            order: [["date", "ASC"]],
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
  const phone = require.body.phone;
  const patron = require.user.id;

        Protege.update({
            patronId: patron
          }, {
            where: {
              [Op.and]: [{
                  patronId: {
                    [Op.eq]: null
                  },
                  phone: {
                    [Op.eq]: phone
                  }
              }]
            }
          }
          )
      .then(res => {
        if(res === undefined) {
            result.status(400).json({ error: "Wrong phone" });
        } else {
            result.json({ status: res })
        }
      })
      .catch(error => result.status(400).json({ error: error }));
}