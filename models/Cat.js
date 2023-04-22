import mongoose from 'mongoose';
import { connectionString } from "../credentials.js";
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git


mongoose.connect(connectionString, {
    dbName: 'class-projects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const catSchema = new Schema({
 name: { type: String, required: true },
 age: Number,
 breed: String,
 sex: String,
 temperment: String,
 favToys: Array,
 isAvailable: Boolean
});

export const Cat = mongoose.model('Cat', catSchema);