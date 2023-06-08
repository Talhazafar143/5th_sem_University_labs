import express from 'express'
import cookieparser from "cookie-parser";
import cors from "cors";
const app = express()
app.use(cookieparser())
app.use(cors());
let shared_counter = 0;
let counters = {};
app.get('/page1', function (req, res) {
    shared_counter++
    return res.send(
      `
      <form method="get">
      <p>Shared_Value :${shared_counter}</p>
      <button type="submit">Update Counter</button>
      </form>
      `
    )
});

app.get('/page2', function (req, res) {
  let ID = req?.cookies?.ID || Math.floor(Math.random()*999).toString()
  console.log("User_ID",ID)
  let Private_counter = counters[ID] || 0
  console.log(counters)
  counters[ID] = (parseInt(Private_counter) + 1).toString()
  res.cookie('ID', ID)
  ;
  return res.send(
    `
    <form method="get">
    <p>Private_Value :${Private_counter}</p>
    <button type="submit">Update Value</button>
    </form>
    `
  )
});
app.get('/page3', (req, res) => {
    var expire = req.cookies.ExpiredPage;
    if (!expire || expire < new Date()) {
        var date = new Date();
        date.setSeconds(date.getSeconds() + 5);
        res.cookie('ExpiredPage', date);
        res.send(`<p>Page will expire after ${ date }</p>`);
    } else {
        res.send("Page Expired...!!!");
    }
  });

app.listen(8000, function () {
    console.log("Listening on port 8000 ...");
});