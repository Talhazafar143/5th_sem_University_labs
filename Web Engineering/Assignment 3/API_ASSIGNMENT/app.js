//Prepared By: TALHA ZAFAR , MUAZ SHAHAZAD , HASSAN AKHTAR
//CRUD USING REST API'S
//Tested in Postman

const express=require("express");
const app=express();
const port =8000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))
var hotel = [
    { OrderId: 5, ItemName: "Pizza", Price: 999.9 },
    { OrderId: 10, ItemName: "Zinger", Price: 249.9 },
    { OrderId: 15, ItemName: "Fries", Price: 79.9 }
];

app.get("/hotel", function (req, res) {
    res.send(hotel)
});

app.post("/hotel", function (req, res) {
    console.log("req.query :" + JSON.stringify(req.query));
    console.log("req.body  :" + JSON.stringify(req.body));

    if (!req.body.ItemName || !req.body.Price) {
        res.status(404);
        res.send("***INCOMPLETE Providing Data***");
    } else {

        hotel.push({ OrderId: hotel.length + 1, ItemName: req.body.ItemName, Price: parseInt(req.body.Price) });
        res.send("**Items Succesfully Added**");
    }
});
app.delete("/hotel/:OrderId", function (req, res) {
    var std = hotel.find(function (stdt) {
        return stdt.OrderId == parseInt(req.params.OrderId);
    });
    console.log(req.params.OrderId);
    if (!std) {
        res.status(404);
        res.send("For Deletion! **Items Not Found**");
    }else{
        var index=hotel.indexOf(std);
        console.log(hotel.splice(index, 1)); 
        res.send(JSON.stringify(hotel));
    }
});
    app.put("/hotel/:OrderId", function (req, res) {
    
    var std = hotel.find(function (stdt) {
        return stdt.OrderId == parseInt(req.params.OrderId);
    });
    if (!std) {
        res.status(404);
        res.send(" For Deletion! **Items Not Found**");
    }else{
        
        std.ItemName=req.body.ItemName;
        std.Price=req.body.Price;
        res.send(JSON.stringify(hotel));
    }

});
app.listen(port,()=>{
    console.log(`Server Is Running At LocalHost : ${port}`)
});

