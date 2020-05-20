import Protege from "./../models/protege";

exports.getProtegeName = (require, result, next) => {
  const id = require.user.id;

  Protege.findOne({
    attributes: ["firstname", "lastname"],
    where: {
      id: id,
    },
  })
    .then((protege) => {
      result.status(200).json(protege);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
};

// update protege
exports.editProtege = (require, result, next) => {
    const id = require.user.id;
  
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
    const id = require.params.id;
    
    const patronId = require.user.id;
  
    Protege.update(
      {
        patronId: patronId,
      },
      {
        where: {
          id: id,
        },
      }
    ).then((res) => {
      result.send(`Updated ${res}`);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
  };
  
  // delete protege patron (null)
  exports.deleteFromGroup = (require, result, next) => {
    const id = require.params.id;
  
    Protege.update(
      {
        patronId: null,
      },
      {
        where: {
          id: id,
        }
      }
    ).then((res) => {
      result.send(`Updated ${res}`);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
  };
  