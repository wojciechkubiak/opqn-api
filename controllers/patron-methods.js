import Protege from "./../models/protege";
import Patron from "./../models/patron";
import Exams from "./../models/exams";
const Op = Sequelize.Op;

import sequelize from "sequelize";
import Sequelize from "sequelize";

exports.getPatronsData = (require, result, next) => {
  const id = require.user.id;

  Patron.findAll({
    where: {
      patronId: id
    },
    attributes: ["id"],
    include: [
      {
        model: Protege,
        attributes: [
            "firstname",
            "lastname",
            "mail",
            "phone"
        ],
        include: [
          {
            model: Exams,
            as: 'exams',
            attributes: [
              "date",
              "weight",
              "glucose",
              "pressure",
              "protegeId"
            ],
            order: [["date", "DESC"]],
            limit: 1,
          }
        ]
      }
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