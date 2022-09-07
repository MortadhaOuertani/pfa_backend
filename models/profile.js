const mongoose = require('mongoose')

const Schema = mongoose.Schema;

 const profile = new Schema({
        user:{
            type: Schema.Types.ObjectId,
            ref:"users",
            required:true,
        
    },
    city:"string",
    bio:"string",
    recomended:"string",

},
{
    timestamps:true,
}

);

module.exports=mongoose.model('profile',profile)