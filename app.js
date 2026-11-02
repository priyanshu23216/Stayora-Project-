import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 }  from 'uuid';
import methodOverride from 'method-override';
import { faker } from '@faker-js/faker';
import mySQL from 'mysql2';
import expressLayouts from 'express-ejs-layouts';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname(__filename);

const app = express();

const connection = mySQL.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'STAYORA',
    password : 'sentinels@@33##**9uh',
    dateStrings : true
});
const images = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
];
let locations = [
    { location: 'Laxmi Nagar', pincode: '110092' },
    { location: 'Preet Vihar', pincode: '110092' },
    { location: 'Dwarka', pincode: '110075' },
    { location: 'Rohini', pincode: '110085' },
    { location: 'Saket', pincode: '110017' },
    { location: 'Malviya Nagar', pincode: '110017' },
    { location: 'Janakpuri', pincode: '110058' },
    { location: 'Vasant Kunj', pincode: '110070' },
    { location: 'Uttam Nagar', pincode: '110059' },
    { location: 'Rajouri Garden', pincode: '110027' },
    { location: 'Pitampura', pincode: '110034' },
    { location: 'Mayur Vihar', pincode: '110091' },
    { location: 'Kalkaji', pincode: '110019' },
    { location: 'Karol Bagh', pincode: '110005' },
    { location: 'Model Town', pincode: '110009' }
];

let price = faker.number.int({ min: 1000, max: 10000 });


let getListings = () => {
    let selectedLocation = faker.helpers.arrayElement(locations);
    let price = faker.number.int({ min: 8000, max: 50000 });

    return [
    uuidv4(),
    faker.company.name(),
    faker.lorem.paragraph(),
    faker.helpers.arrayElement(images),
    faker.helpers.arrayElement(['hotel', 'resort', 'hostel', 'guesthouse']),
    faker.number.int({ min: 1, max: 5 }),
    price,
    selectedLocation.location,
    'Delhi',
    selectedLocation.pincode,
    null,
    null
];

};

let data = [];

for (let i = 0; i < 100; i++) {
    data.push(getListings());
}

let query = `INSERT INTO PROPERTIES (ID, TITLE, DESCRIPTION, IMAGE, PROPERTY_TYPE, BHK, BATHROOMS, FURNISHING, PRICE, SECURITY_DEPOSIT, LOCATION, CITY, STATE, PINCODE, LATITUDE, LONGITUDE) VALUES ?`;

connection.query(query, [data], (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`LISTINGS INSERTED SUCCESSFULLY`);
    }
});

app.set( 'view engine' , 'ejs');
app.set( 'views' , path.join( __dirname , 'views' ) );
app.use( express.static( path.join( __dirname , 'public' )));
app.use( express.urlencoded({extended : true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('layout', 'layouts/boilerplate.ejs');



app.get('/' , ( req , res)=>{
    let q = "SELECT * FROM PROPERTIES";
    connection.query( q , ( error , result)=>{
        if(error){
            res.send("Error 404 Listings Not Found");
        }else{
            res.render( 'listings.ejs' , { result , style : 'listings'} );
        }
    });
});
app.get('/stayora/listing/create' ,( req , res)=>{
    res.render('create.ejs' , { style : 'create' , hideHostButton : true});
});

app.post('/stayora/listing/add' ,( req , res)=>{
    const newID = uuidv4();
    const password = req.body.PASSWORD;
    const title = req.body.TITLE;
    const description = req.body.DESCRIPTION;
    let image = "";
    if( req.body.IMAGE !== ""){
        image = req.body.IMAGE; 
    }else{
        image = 'https://images.unsplash.com/photo-1722421492323-eaf9c401befe?q=80&w=802&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D';
    };
    const price = req.body.PRICE;
    const location = req.body.LOCATION;
    const country = req.body.COUNTRY;

    let query = 'INSERT INTO PROPERTIES ( ID , PASSWORD , TITLE , DESCRIPTION , IMAGE , PRICE , LOCATION , COUNTRY) VALUE ( ? , ? , ? , ? , ? , ? , ? , ?)';
    
    connection.query( query ,[ newID , password , title , description , image , price , location , country] , ( err , result)=>{
        if(err){
            console.log(err);
        }else{
            const msg1 = 'Registration Successful!✅';
            const msg2 = 'Thank you for registering with us. We are excited to have you onboard!'
            res.render("message.ejs" , { msg1 , msg2 , style : 'message' });
        }
    });
});


app.get('/stayora/listing/:id' , ( req , res)=>{
    const id = req.params.id;
    let q = `SELECT * FROM LISTINGS WHERE ID = ?`;
    connection.query( q , [id] ,( err , result)=>{
        if(err){
            console.log(err);
        }else{
            res.render('list.ejs' , { result , style : 'list' } );
        }
    });
});
app.get('/stayora/listing/edit/:id' , ( req , res)=>{
    const id = req.params.id;
    let q = `SELECT * FROM LISTINGS WHERE ID = ?`;
    connection.query( q , [id] ,( err , result)=>{
        if(err){
            console.log(err);
        }else{
            res.render('verify.ejs' , { result , style : 'verify' } );
        }
    }); 
});

app.post( '/stayora/listing/edit/verify' ,( req , res)=>{
    const id = req.body.ID;
    const enteredPass = req.body.PASSWORD;

    let q = `SELECT * FROM LISTINGS WHERE ID = ?`;
    connection.query( q , [id] ,( err , result)=>{
        if(err){
            console.log(err);
        }else{
            if ( enteredPass !== result[0].PASSWORD ){
                let format = 'edit'
                res.render('warning.ejs' , { id , format , style : 'warning' } );
            }else{
                res.render('edit.ejs' , { result , style : 'edit' });
            }
        }
    }); 
});

app.post( '/stayora/listing/edit/add' , ( req , res)=>{
    const id = req.body.ID;
    const passWord = req.body.PASSWORD;
    const title = req.body.TITLE;
    const description = req.body.DESCRIPTION;
    const imageURL = req.body.IMAGE;
    const price = req.body.PRICE;
    const location = req.body.LOCATION;
    const country = req.body.COUNTRY;

    if( passWord.trim() != "" ){
        let q = 'UPDATE LISTINGS SET PASSWORD = ? , TITLE = ? , DESCRIPTION = ? , IMAGE = ?, PRICE = ?, LOCATION = ?, COUNTRY = ? WHERE ID = ?';
        connection.query( q , [ passWord , title , description , imageURL , price , location , country , id] , ( err , result)=>{
            if(err){
                res.send("Some error occured");
            }else{
                res.redirect('/');
            };
        });
    }else{
        let q = 'UPDATE LISTINGS SET TITLE = ? , DESCRIPTION = ? , IMAGE = ?, PRICE = ?, LOCATION = ?, COUNTRY = ? WHERE ID = ?';
        connection.query( q , [title , description , imageURL , price , location , country , id] , ( err , result)=>{
            if(err){
                res.send("Some error occured");
            }else{
                res.redirect('/');
            };
        });
    };
});

app.get( '/stayora/listing/delete/:id' ,( req , res)=>{
    const id = req.params.id;
    res.render('delete.ejs' , { id , style : 'delete'});
});

app.post( '/stayora/listing/delete/verify' , ( req , res)=>{
    const id = req.body.ID;
    const enteredPass = req.body.PASSWORD;

    let q = `SELECT * FROM LISTINGS WHERE ID = ?`;
    connection.query( q , [id] ,( err , result)=>{
        if(err){
            console.log(err);
        }else{
            if ( enteredPass !== result[0].PASSWORD ){
                let format = 'delete'
                res.render('warning.ejs' , { id , format , style : 'warning' } );
            }else{
                res.render('destroy.ejs' , { id , style : 'destroy'} );
            }
        }
    }); 
});

app.delete( '/stayora/list/delete/:id' , ( req , res)=>{
    const id = req.params.id;
    let q = 'DELETE FROM LISTINGS WHERE ID = ?'
    connection.query( q , [ id ] , ( err , result)=>{
         if(err){
         console.log(err);
         res.send('Some error occured Please Try Again');
         }else{
        res.redirect('/');
     };
     });

});

app.listen(3000 , ()=>{
    console.log("server is listening on port 3000 ");
});





