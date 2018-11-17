var mysql = require("mysql");
const mrkd = require("./rc2mrkdata");
var cfg = require("./config");
var con =cfg.localmysql;
const period_no = 14;
let cnt = 0;
let item = "SELECT substring(si_id,-3),substring(item,3) FROM sportday2017.tblgr group by substring(si_id,-3),substring(item,3) ;";
let rcsql = "select a.rc_id,a.si_id,b.s_item,a.rank,a.number,a.classno,a.name,a.rc,a.grk,a.note from sport_rc a inner join sport_item b on a.si_id=b.si_id  order by a.si_id,rc";
let fdsql = "select a.frc_id,a.fi_id,b.f_item,a.rank,a.number,a.classno,a.name,a.rc,a.grk,a.note   from field_rc a inner join field_item b on a.fi_id=b.fi_id order by a.fi_id,length(rc) desc,rc desc";
let tbl2sql = "select spno,item,name,classno,si_id,rc from tbl2 order by si_id,spno,seat;";
con.connect(function (err) {
    if (err) throw err;
    con.query(rcsql, function (err, res, fields) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            //let mrk=mrkd.rc2mrk(res[i].rc_id,res[i].si_id,res[i].rc);
            //console.log("#'"+res[i].s_item+"',",res[i].classno,res[i].name,res[i].si_id,"'"+res[i].rc+"',",mrk);
            let ri = res[i];
            let rcc = ri.rc; rcc = rcc ? rcc.replace(/'/g, "`") : "";
            let spno = isNaN(ri.number) ? (cnt++) : ri.number;
            console.log("insert into sphistory(si_id,spno,period_no,sp_item,classno,name,rc,sp_rank,note)values");
            console.log("(", ri.si_id, ",", spno, ",", period_no, ",'" + ri.s_item + "','" + ri.classno + "','" + ri.name + "','" + rcc + "','" + ri.rank + "','" + ri.note + "'", ");");
        }
    });
    con.query(fdsql, function (err, res, fields) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            //let mrk=mrkd.rc2mrk(res[i].frc_id,res[i].fi_id,res[i].rc);     
            //console.log("#'"+res[i].f_item+"',",res[i].classno,res[i].name,res[i].fi_id,"'"+res[i].rc+"',",mrk);
            let ri = res[i];
            let rcc = ri.rc; rcc = rcc ? rcc.replace(/'/g, "`") : "";
            let spno = isNaN(ri.number) ? (cnt++) : ri.number;
            console.log("insert into sphistory(si_id,spno,period_no,sp_item,classno,name,rc,sp_rank,note)values");
            console.log("(", ri.fi_id, ",", spno, ",", period_no, ",'" + ri.f_item + "','" + ri.classno + "','" + ri.name + "','" + rcc + "','" + ri.rank + "','" + ri.note + "');");
        }
    });
    con.query(tbl2sql, function (err, res, fields) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            //let mrk=mrkd.tbl2mrk(res[i].spno,res[i].si_id,res[i].rc);
            //console.log("#'"+res[i].item+"',",res[i].spno,res[i].classno,res[i].name,res[i].si_id,"'"+res[i].rc+"',",mrk);
            let ri = res[i];
            let rcc = ri.rc; rcc = rcc ? rcc.replace(/'/g, "`") : "";
            if (ri.rc == '0' || ri.rc == "") { } else {
                console.log("insert into sphistory(si_id,spno,period_no,sp_item,classno,name,rc)values");
                console.log("(", ri.si_id, ",", ri.spno, ",", period_no, ",'" + ri.item + "(預賽)'", ",'" + ri.classno + "'", ",'" + ri.name + "'", ",'" + rcc + "'", ");");
            }
        }
    });
});
