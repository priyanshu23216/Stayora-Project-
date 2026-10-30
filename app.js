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
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
];

let getListings = ( )=>{
    return [
        faker.lorem.words(4),
        faker.lorem.paragraph(),
        faker.helpers.arrayElement( images ),
        faker.number.int({ min : 1000 , max : 10000}),
        faker.location.city(),
        faker.location.country()
    ]
};

let data = [ ];

for ( let i = 0 ; i < 3000 ; i ++){
    data.push( getListings() );
};

let query = "INSERT INTO LISTINGS ( TITLE , DESCRIPTION , IMAGE , PRICE , LOCATION , COUNTRY)  VALUE ? ";

connection.query( query , [ data ] , ( err , result)=>{
    if(err){
        console.log("some error occured");
    }else{
        console.log(result);
    }
});

app.set( 'view engine' , 'ejs');
app.set( 'views' , path.join( __dirname , 'views' ) );
app.use( express.static( path.join( __dirname , 'public' )));
app.use( express.urlencoded({extended : true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/' , ( req , res ) =>{
    res.send("Server started");
});

app.get('/listings' , ( req , res)=>{
    let q = "SELECT * FROM LISTINGS";
    connection.query( q , ( error , result)=>{
        if(error){
            res.send("Error 404 Listings Not Found");
        }else{
            res.render( 'listings.ejs' , { result } );
        }
    });
});

app.listen(3000 , ()=>{
    console.log("server is listening on port 3000 ");
});





