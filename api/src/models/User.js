const {mongoose}= require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
})


module.exports = mongoose.model('User',userSchema)
