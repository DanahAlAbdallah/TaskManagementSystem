import mongoose, { SchemaTypes } from 'mongoose';
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: String,
  body: String,
  priority: String,
  projectId: { 
    type : Schema.Types.ObjectId,
    ref : 'Project',
    required : true
  },
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
  isDone: Boolean,
  tags: [String],
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
});

const task = model('task', taskSchema);
export default task;