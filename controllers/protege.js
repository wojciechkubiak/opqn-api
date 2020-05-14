import Protege from "./../models/protege";
import "dotenv/config";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerProtege = (require, result, next) => {
  const data = {
    firstname: require.body.firstname,
    lastname: require.body.lastname,
    mail: require.body.mail,
    password: require.body.password,
    birthday: require.body.birthday,
    phone: require.body.phone,
    idpatron: require.body.idpatron,
  };

  Protege.findOne({
    where: {
      mail: require.body.mail,
    },
  })
    .then(() => {
      bcrypt.hash(require.body.password, 10, (error, hash) => {
        data.password = hash;
        Protege.create(data)
          .then((protege) => {
            result.json({
              status: `${protege.firstname} ${protege.lastname} - created`,
            });
          })
          .catch((error) => {
            result.send(`${error} - failed`);
          });
      });
    })
    .catch((error) => {
      result.send(error);
    });
};

exports.loginProtege = (require, result, next) => {
  Protege.findOne({
    where: {
      mail: require.body.mail,
    },
  })
    .then((protege) => {
      if (protege) {
        if (bcrypt.compareSync(require.body.password, protege.password)) {
          let token = jwt.sign(
            protege.dataValues,
            process.env.LOCAL_KEY || process.env.HR_KEY,
            {
              expiresIn: 1440,
            }
          );
          Protege.findOne({
            attributes: ['id'],
            where: {
              mail: require.body.mail
            }
          }).then(id => {
            result.status(200).json({token: token, id: id});
          })
          .catch(error => {
            result.status(400).json({error: error})
          });

        } else {
          result.status(400).json({ error: "Wrong password" });
        }
      } else {
        result.status(400).json({ error: "Login not found" });
      }
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};
