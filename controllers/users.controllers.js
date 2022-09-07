const UserModel = require("../models/users.models");
const ValidateRegister = require("../validation/validator");
const Validatelogin = require("../validation/validator.login");
const jwt = require("jsonwebtoken")


const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = "Email already in use";
          res.status(404).json(errors);
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
          req.body.password = hash;
          req.body.role = "USER";
          await UserModel.create(req.body);
          res.status(200).json({ message: "success" });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const login = async (req, res) => {
      
    const {errors,isValid}=Validatelogin(req.body)

    try {
        if(!isValid){
res.status(404).json(errors)
        }
        else{
            UserModel.findOne({ email: req.body.email }).then((user) => {
                if (!user) {
                    errors.email="user not found"
                  res.status(404).json(errors);
                } else {
                    bcrypt.compare(req.body.password,user.password).then(isMatch=>{
                        if(!isMatch){
                            errors.password="incorrect password"
                            res.status(404).json(errors)
                        }
                        else{
                            const token = jwt.sign({ 
                                id:user._id,
                                name:user.name,
                                email:user.email,
                                role:user.role
                             },"HDYQQS3", {expiresIn:"5h"});
                             res.status(200).json({message:"succes",token:token})
                        }
                    })
                }
              })
        }



  } catch (error) {
    res.status(404).json(error.message);
  }
};
const Test = (req,res)=>{
    res.send("welcome user")
}

const admin = (req,res)=>{
  res.send("welcome admin")
}

module.exports = {
  register,
  login,
  Test,
  admin
};
