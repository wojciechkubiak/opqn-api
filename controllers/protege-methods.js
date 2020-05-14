import Protege from "./../models/protege";

exports.getProtegeID = (require, result, next) => {
  const mail = require.params.id;

  Protege.findAll({
    limit: 1,
    attributes: [
      "id"
    ],
    where: {
      mail: mail
    }
  })
  .then(data => {
    result.status(200).json(data);
  })
  .catch(error => {
    result.status(400).json({error: error})
  })
}

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
    ).then((res) => {
      result.send(`Updated ${res}`);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
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
        }
      }
    ).then((res) => {
      result.send(`Updated ${res}`);
    })
    .catch((error) => {
      result.status(400).json({ error: error });
    });
  };
  