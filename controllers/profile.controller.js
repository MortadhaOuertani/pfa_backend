const { json } = require("express")
const profilemodel = require("../models/profile")
const ValidateProfile =require("../validation/profile")

const addprofile = async(req,res)=>{
const {errors,isValid}=ValidateProfile(req.body)
try {
    if(!isValid){
        res.status(404).json(errors)

    }
    else{
        profilemodel.findOne({user:req.user.id})
        .then(async(profile)=>{
            if(!profile){
                req.body.user=req.user.id
                await profilemodel.create(req.body)
                res.status(200).json({message:"succsess"})
            }
            else{
                await profilemodel.findOneAndUpdate({_id:profile._id},req.body,{new:true})
                .then(result=>{
                    res.status(200).json(result)
                })
            }
        })
    }
} catch (error) {
    res.status(404).json(error.message)
}}



const findallprofiles = async(req,res)=>{
    try {
       const data = await profilemodel.find().populate('user',["name","email","role"])
        res.status(200).json(data)
       
    } catch (error) {
        res.status(404).json(error.message)
    }

}


const findsingleprofile = async(req,res)=>{
    try {
        const data = await profilemodel.findOne({profile:req.user.id}).populate('user',["name","email","role"])
         res.status(200).json(data)
        
     } catch (error) {
         res.status(404).json(error.message)
     }
 }


const deleteprofile = async(req,res)=>{
    try {
        await profilemodel.findOneAndRemove({_id:req.params.id})
         res.status(200).json({message:"deleted"})
        
     } catch (error) {
         res.status(404).json(error.message)
     }
}




module.exports={
    addprofile,
    findallprofiles,
    findsingleprofile,
    deleteprofile
}