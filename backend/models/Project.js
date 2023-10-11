import mongoose, { SchemaTypes }  from 'mongoose';
const { Schema, model } = mongoose;

const ProjectSchema = new Schema({
  title : {
    type : String,
    required : true
},
  team_members : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  team_leader : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
    },
    related_tasks : {
    type : Schema.Types.ObjectId,
    ref : 'task'
  },
  createdAt : Date
});

const ProjectModel = model('Project', ProjectSchema);
export default ProjectModel;