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
          result.json({ token: token });
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

// update protege
exports.editProtege = (require, result, next) => {
  const id = parseInt(require.params.id);

  const upFirstname = require.body.firstname;
  const upLastname = require.body.lastname;
  const upBirthday = require.body.birthday;
  const upPhone = require.body.phone;

  Protege.update(
    {
      firstname: upFirstname,
      lastname: upLastname,
      birthday: upBirthday,
      phone: upPhone,
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

// set protege patron
exports.insertIntoGroup = (require, result, next) => {
  const id = parseInt(require.params.id);

  const patronId = require.body.patronId;

  Protege.update(
    {
      patronId: patronId,
    },
    {
      where: {
        id: id,
      },
    }
  );
};

// delete protege patron (null)
exports.deleteFromGroup = (require, result, next) => {
  const id = parseInt(require.params.id);

  Protege.update(
    {
      patronId: null,
    },
    {
      where: {
        id: id,
      },
    }
  );
};
