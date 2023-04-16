import * as data from './data.js';

export default (app) => {
    app.get('/', (req,res) => {
        //res.render('./pages/home', { name: req.query.name });
        res.render('./pages/home', { cats: data.getAll() });
       });
    
    app.get('/details/:name', (req, res) => {
        console.log(req.params.name);
        let name = req.params.name;
        let imagePath = `/images/${name}.jpeg`;
        let result = data.getItem(name);
        // res.render('./pages/details', { cat: data.getItem(req.params.name) });
        res.render('./pages/details', {name: name, result: result, imagePath: imagePath});
        });
       
    app.get('/about', (req,res) => {
       res.type('text/plain');
       res.send('About page');
      });
      
    app.use((req,res) => {
       res.type('text/plain'); 
       res.status(404);
       res.send('404 - Not found');
      });

     // whatever value passed in will get attatched to the req object
    // app.get('/cats/:name', (req, res) => {
    //     console.log(req.params.name);
    //     res.send(`Welcome ${req.params.name}!`);
    //     });
      
};