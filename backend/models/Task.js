import mongoose, { SchemaTypes } from 'mongoose';
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: String,
  body: String,
  priority: String,
  author: { 
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  assigned_userId: {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  tags: [String],
  createdAt: Date,
  updatedAt: Date
});

const task = model('task', taskSchema);
export default task;