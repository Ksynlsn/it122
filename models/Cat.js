import mongoose from 'mongoose';
import { connectionString } from "../credentials.js";
const { Schema } = mongoose;

mongoose.connect(connectionString, {
    dbName: 'class-projects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

const catSchema = new Schema({
 name: { type: String, required: true },
 age: { type: Number, required: false },
 breed: { type: String, required: false },
 sex: { type: String, required: false },
 temperment: { type: String, required: false },
 favToys: { type: Array, required: false },
 isAvailable: { type: Boolean, required: true },
 },
 {
  versionKey: false
  }
);

export const Cat = mongoose.model('Cat', catSchema);