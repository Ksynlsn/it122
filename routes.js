//import * as data from './data.js';
import { Cat } from "./models/Cat.js";

export default (app) => {
    app.get('/', (req, res, next) => {
        Cat.find({}).lean()
        .then((cats) => {
            res.render('./pages/home', { cats }); 
        })
        .catch(err => next(err));
        });
    

    app.get('/details/:name', (req, res, next) => {
        console.log(req.params.name);
        let imagePath = `/images/${req.params.name}.jpeg`;
        Cat.findOne({ "name": req.params.name }).lean()
        .then((cat) => {
            if (!cat) {
                res.render('./pages/error');
            } else { 
                res.render('./pages/details', { cat: cat, path: imagePath });
            }
        })
        .catch((err) => {
            console.error(err);
            next(err);
            });
        });
       

    app.get('/about', (req,res) => {
       res.type('text/plain');
       res.send('About page');
      });

    // delete object in db based on object 'name'
    app.get('/delete/:name', (req, res) => {
    let name = req.params.name;
    Cat.findOne({name: name})
        .then(found => {
        if (!found) {
        res.send(`The cat ${name} is not in our databse`);
            } else {
            Cat.deleteOne({name: name})
            .then(() => {
        res.send(`Records for ${name} have been deleted`);
    }) 
    .catch((err) => {
        res.send('404 Error');
    });
    }
    }) // close callback
    }); // close app.get
      

    app.use((req,res) => {
       res.type('text/plain'); 
       res.status(404);
       res.send('404 - Not found');
      });


};