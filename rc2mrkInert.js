var mysql = require("mysql");
const mrkd = require("./rc2mrkdata_cfg");
var cfg = require("./config");
var con =cfg.localmysql;
const period_no = 14;
const r4xg='..';
let cnt = 0;
let item = "SELECT substring(si_id,-3),substring(item,3) FROM tblgr group by substring(si_id,-3),substring(item,3) ;";
let rcsql = "SELECT a.rc_id,a.si_id,b.s_item,a.rank,a.number,a.classno,a.name,a.rc,a.grk,a.note FROM sport_rc a INNER JOIN sport_item b on a.si_id=b.si_id  ORDER BY a.si_id,rc";
let fdsql = "SELECT a.frc_id,a.fi_id,b.f_item,a.rank,a.number,a.classno,a.name,a.rc,a.grk,a.note   FROM field_rc a INNER JOIN field_item b on a.fi_id=b.fi_id ORDER BY a.fi_id,length(rc) desc,rc desc";
let tbl2sql = "SELECT spno,item,name,classno,si_id,rc FROM tbl2 ORDER BY si_id,spno,seat;";
con.connect(function (err) {
    if (err) throw err;
    con.query(rcsql, function (err, res, fields) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let ri = res[i];
            let rcc = ri.rc; rcc = rcc ? rcc.replace(/'/g, "`") : "";
            let spno = isNaN(ri.number) ? (cnt++) : ri.number;
            console.log("insert into sport_history(si_id,spno,period_no,sp_item,classno,name,rc,sp_rank,note,r4xg)values");
            console.log("(", ri.si_id, ",", spno, ",", period_no, ",'" + ri.s_item + "','" + ri.classno + "','" + ri.name + "','" + rcc + "','" + ri.rank + "','" + ri.note + "'", ",'..');");
        }
    });
    con.query(fdsql, function (err, res, fields) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let ri = res[i];
            let rcc = ri.rc; rcc = rcc ? rcc.replace(/'/g, "`") : "";
            let spno = isNaN(ri.number) ? (cnt++) : ri.number;
            console.log("insert into sport_history(si_id,spno,period_no,sp_item,classno,name,rc,sp_rank,note,r4xg)values");
            console.log("(", ri.fi_id, ",", spno, ",", period_no, ",'" + ri.f_item + "','" + ri.classno + "','" + ri.name + "','" + rcc + "','" + ri.rank + "','" + ri.note + "', '..');");
        }
    });
    con.query(tbl2sql, function (err, res, fields) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {            
            let ri = res[i];
            let rcc = ri.rc; rcc = rcc ? rcc.replace(/'/g, "`") : "";
            if (ri.rc == '0' || ri.rc == "") { } else {
                console.log("insert into sport_history(si_id,spno,period_no,sp_item,classno,name,rc,r4xg)values");
                console.log("(", ri.si_id, ",", ri.spno, ",", period_no, ",'" + ri.item + "(預賽)'", ",'" + ri.classno + "'", ",'" + ri.name + "'", ",'" + rcc + "'", ", '..');");
            }
        }
    });
});
