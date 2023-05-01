import { setImagePath } from './data.js';
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
        let imagePath = setImagePath(req.params.name);
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
       
// API Routes
// get all items
   app.get('/api/cats', (req, res, next) => { 
    Cat.find({})
      .then(cats => {
        if (!cats) {
          res.status(500).json({message : "Database error"});
        } else {
          res.status(200).json({cats, message : "Retrieval Successful"});
        }
      })
      .catch(err => {
        res.status(500).json({message: "Database error"});
      });
  });

  // get single item
  app.get('/api/cats/:name', (req, res, next) => { 
    let name = req.params.name;
    Cat.findOne({name: name})
      .then(cat => {
        if (!cat) {
          res.status(404).json({message : `We don't have records for ${name}`});
        } else {
          res.status(200).json({message : `Returned records for ${name}`, cat});
        }
      })
      .catch(err => {
        res.status(500).json({message: "Database error"});
      });
  });

   // creates new record or updates existing record if name exists in db
   app.post('/api/add/', (req, res, next) => {
          Cat.updateOne(
            {name: req.body.name},
            { $set: 
            { age: req.body.age,
              breed: req.body.breed,
              sex: req.body.sex,
              favToys: req.body.favToys,
              isAvailable: req.body.isAvailable,
              temperment: req.body.temperment
            },
             }, 
             {upsert: true}
             ).then((result) => {
                if (result.modifiedCount > 0) {
                 console.log(`Records updated for ${req.body.name}`);
                 res.status(200).json({ message: `1 record updated for ${req.body.name}` });
              } else if(result.upsertedCount !== 0) {
                 console.log(`New record created for ${req.body.name}`);
                 res.status(200).json({ message: `1 record created for ${req.body.name}` });
                }   
             }).catch((err) => {
                 res.status(500).json({message: "Database error"});
             });
         })
 
  // Delete item by name
  app.get('/api/delete/', (req, res) => {
          Cat.deleteOne({name: req.body.name})
            .then((result) => {
              if (result.deletedCount > 0) {
                console.log(result.deletedCount);
                res.status(200).json({ deletedCount: result.deletedCount, message: `Cat ${req.body.name} has been deleted`});
            } else if (result.deletedCount === 0) {
                console.log(result.deletedCount);
                res.status(404).json({ deletedCount: result.deletedCount, message: `This cat is not in our databse. No records have been deleted`});
            } else {
                res.status(500).json({message: "Database error"});
              }
            })
            .catch((err) => {
              res.status(500).json({message: "Database error"});
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
    }) 
    }); 
      

    app.use((req,res) => {
       res.type('text/plain'); 
       res.status(404);
       res.send('404 - Not found');
      });


};