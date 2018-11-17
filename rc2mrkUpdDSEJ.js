//rc2mrkUref.js
var mysql = require("mysql");
var cfg = require("./config");
var con = cfg.infomysql;
data = [
    /*
    5	,"eschool1011",
    6	,"eschool1112",
    7	,"eschool1213",
    8	,"eschool1314",
    9	,"eschool1415",
    10	,"eschool1516",
    11	,"eschool1617",
    12	,"eschool1718"*/
    13, "eschool"
];
function get_spno(classno, seat) {
    let fix0 = 0;
    ABCDE = classno.substring(classno.length - 1, classno.length)
    if (classno.startsWith("SG1")) fix0 = 1000;
    if (classno.startsWith("SG2")) fix0 = 2000;
    if (classno.startsWith("SG3")) fix0 = 3000;
    if (classno.startsWith("SC1")) fix0 = 4000;
    if (classno.startsWith("SC2")) fix0 = 5000;
    if (classno.startsWith("SC3")) fix0 = 6000;
    if (classno.startsWith("P6")) fix0 = 7000;
    if (classno.startsWith("P5")) fix0 = 8000;
    if (classno.startsWith("P4")) fix0 = 9000;
    if (ABCDE == "A") fix0 += 100;
    if (ABCDE == "B") fix0 += 200;
    if (ABCDE == "C") fix0 += 300;
    if (ABCDE == "D") fix0 += 400;
    if (ABCDE == "E") fix0 += 500;
    return fix0 + Number(seat);
}
con.connect(function (err) {
    if (err) throw err;
    for (let h = 0; h < data.length / 2; h++) {
        let peroid_no = data[h * 2];
        let dbname = data[h * 2 + 1];
        let sql = "select curr_class,curr_seat,dsej_ref,stud_ref from " + dbname + ".studinfo where curr_class>'P3';";
        con.query(sql, function (err, res, fields) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                let ri = res[i];
                let spno = get_spno(ri.curr_class, ri.curr_seat);
                console.log("# ", ri.curr_class, ri.curr_seat, spno);
                console.log("update sport_history set dsej_ref=", "'" + ri.dsej_ref + "',stud_ref='" + ri.stud_ref + "' where spno=", spno, " and period_no=", peroid_no, " and r4xg='.';");
            }
        });
    }
});
