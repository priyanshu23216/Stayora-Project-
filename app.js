import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 }  from 'uuid';
import methodOverride from 'method-override';
import { faker } from '@faker-js/faker';
import mySQL from 'mysql2';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname(__filename);

const app = express();

const connection = mySQL.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'AIRBNB',
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


let getListings = ( )=>{
    return [
        uuidv4(),
        faker.internet.password(),
        faker.lorem.words(4),
        faker.lorem.paragraph(),
        faker.helpers.arrayElement( images ),
        faker.number.int({ min : 1000 , max : 10000}),
        faker.location.city(),
        faker.location.country()
    ]
};

// let data = [ ];

// for ( let i = 0 ; i < 3000 ; i ++){
//     data.push( getListings() );
// };

// let query = "INSERT INTO LISTINGS ( ID , PASSWORD , TITLE , DESCRIPTION , IMAGE , PRICE , LOCATION , COUNTRY)  VALUE ? ";

// connection.query( query , [ data ] , ( err , result)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
// });

app.set( 'view engine' , 'ejs');
app.set( 'views' , path.join( __dirname , 'views' ) );
app.use( express.static( path.join( __dirname , 'public' )));
app.use( express.urlencoded({extended : true }));
app.use(express.json());
app.use(methodOverride('_method'));



app.get('/' , ( req , res)=>{
    let q = "SELECT * FROM LISTINGS";
    connection.query( q , ( error , result)=>{
        if(error){
            res.send("Error 404 Listings Not Found");
        }else{
            res.render( 'listings.ejs' , { result } );
        }
    });
});
app.get('/stayora/listing/create' ,( req , res)=>{
    res.render('create.ejs');
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

    let query = 'INSERT INTO LISTINGS ( ID , PASSWORD , TITLE , DESCRIPTION , IMAGE , PRICE , LOCATION , COUNTRY) VALUE ( ? , ? , ? , ? , ? , ? , ? , ?)';
    
    connection.query( query ,[ newID , password , title , description , image , price , location , country] , ( err , result)=>{
        if(err){
            console.log(err);
        }else{
            const msg1 = 'Registration Successful!✅';
            const msg2 = 'Thank you for registering with us. We are excited to have you onboard!'
            res.render("message.ejs" , { msg1 , msg2 });
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
            res.render('list.ejs' , { result } );
        }
    });
});

app.listen(3000 , ()=>{
    console.log("server is listening on port 3000 ");
});





