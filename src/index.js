let express = require('express');
const app = express();
const port = 8000;
let db = require('./db/dbconn')

const path=  require("path");


const templatePath = path.join(__dirname,"./views");

app.set("view engine","hbs");
app.set("views",templatePath);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get("/",async(req,res)=>{
    var sql1 = "select * from Inventory";
    const [data, field] = await db.query(sql1);
    res.render("CRUD",{data});
    
});

app.post("/delete",async(req,res)=>{
    
    var sql2 = "DELETE FROM Inventory WHERE id = ?";
    const [data1, field1] = await db.query(sql2,[req.body.button]);

    var sql1 = "select * from Inventory";
    const [data, field] = await db.query(sql1);
    res.render("CRUD",{data});
    
})

app.post("/AddUpdate",async(req,res)=>{
    
    var sql2 = "select * from Inventory where id = ?";
    const [data1, field1] = await db.query(sql2,[req.body.button]);

    if(data1.length === 0){
        var sql2 = "INSERT INTO Inventory (ItemName, Quantity) VALUES (?, ?)";
        const [data2, field2] = await db.query(sql2,[req.body.Item,req.body.Quantity]);
    }
    else{
        var sql2 = "UPDATE Inventory SET ItemName = ?, Quantity = ? WHERE id = ?";
        const [data2, field2] = await db.query(sql2,[req.body.Item,req.body.Quantity,req.body.button]);
    }


    var sql1 = "select * from Inventory";
    const [data, field] = await db.query(sql1);
    res.render("CRUD",{data});
    
})

app.post("/update",async(req,res)=>{
    
    var sql2 = "select * from Inventory where id = ?";
    const [data1, field1] = await db.query(sql2,[req.body.button]);

    var name = data1[0].ItemName;
    var quantity = data1[0].Quantity;
    var id = data1[0].id;
    console.log(id);
    
    // var sql2 = "INSERT INTO Inventory (ItemName, Quantity) VALUES (?, ?)";
    // const [data2, field2] = await db.query(sql2,[req.body.Item,req.body.Quantity]);
    var sql1 = "select * from Inventory";
    const [data, field] = await db.query(sql1);
    res.render("CRUD",{data,name,quantity,id});
    
})

app.listen(port,()=>{
    console.log(`server listening at ${port}`);
});
