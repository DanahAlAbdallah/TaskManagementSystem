import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ContactSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(value);
      },
      message: 'Please fill a valid email address',
    },
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = model('Contact', ContactSchema);

export default Contact;
