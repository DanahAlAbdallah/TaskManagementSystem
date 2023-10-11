import mongoose, { SchemaTypes } from 'mongoose';

const { Schema, model } = mongoose;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const UserSchema = new Schema({
  first_name : {
    type: String,
    required: true,
    minlength: 3,
    match: [/^[A-Za-z]+$/,'First name should be only alphabets and of min-length 3'] 
  },

  last_name : {
    type: String,
    required: true,
    minlength: 3,
    match: [/^[A-Za-z]+$/, 'Last name should be only alphabets and of min-length 3'] 
  },

  Email :{ 
    type : String,
    required : true,
    unique : true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

},
  age : Number,
  isAdmin: Boolean,

  password : {
     type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long.'],
    match: [
      /^(?=.*[A-Z])(?=.*\d).*$/,
      'Password must contain at least one uppercase letter and one digit.',
    ],
},

  gender :  {
    type: String,
  enum:['Male','Female']
 },
 
projects_assigned: { 
    type : Schema.Types.ObjectId,
    ref : 'Project'
}
});

const User = model('User', UserSchema);
export default User;
