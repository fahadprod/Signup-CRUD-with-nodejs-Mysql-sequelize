const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.allUsers = (req, res) => {
      User.findAll().then(data => {
          res.send(data);
      }).catch(err => {
          res.send('error: ' + err)
      });
  }

  exports.oneUser = (req, res) => {
      const id = req.params.id;

      User.findByPk(id)
      .then(data => {
          if(data){
            res.send(data)
          }else{
              res.status(500).send({message : "User not found by this id: " + id})
          }
      }).catch(err => {
        res.status(500).send({
            message: err.message
          });
      });
  }

  exports.deleteUser = (req, res) => {
      const id  = req.params.id;

      User.destroy({
          where : {id : id}
      })
      .then(data => {
          if(data == 1) {
              res.send({
                  message : "User delete successfully"
              })
          }else{
              res.send({
                  message : `Could not delete User with id : ${id} Maybe user not found by this id`
              })
          }
      }).catch(err => {
          res.status(500).send({
              message : "Error Deleting user with id: " + id
          })
      });
  }

  exports.updateUser = (req, res) => {
      const id = req.params.id;

      User.update(req.body,{
          where: {id : id}
      }).then((data) => {
          if(data == 1) {
              res.send({
                  message : "User update Successfully"
              })
          }else{
              res.send({
                  message : `User does not update by id: ${id} Maybe id does not found`
              })
          }
      }).catch((err) => {
          res.status(500).send({
              message : "Error updating user with id: " + id
          })
      });
  }