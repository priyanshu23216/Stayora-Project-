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
    database : 'USER',
    password : 'sentinels@@33##**9uh',
    dateStrings : true
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

app.listen(3000 , ()=>{
    console.log("server is listening on port 3000 ");
});





