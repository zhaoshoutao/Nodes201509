var oTab = document.getElementById("tab");//获取tab
var tHead = oTab.tHead;//表格自带属性，获取table下的thead
var tBody = oTab.tBodies[0];//获取table下的所有tbody中的一个
var oThs = tHead.rows[0].cells;//->获取tHend下所有行中的第一行下的所有列
var oTrs = tBody.rows;
//绑定数据
function bindData() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < jsonAry.length; i++) {
        var cur = jsonAry[i];
        cur.sex = cur.sex === 0 ? "男" : "女";

        var oTr = document.createElement("tr");

        for (var key in cur) {
            var oTd = document.createElement("td");
            oTd.innerHTML = cur[key];
            oTr.appendChild(oTd);
        }

        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
}
bindData();

//隔行变色
function changeBg() {
    for (var i = 0; i < oTrs.length; i++) {
        oTrs[i].className = "bg" + (i % 2);
    }
}
changeBg();
//sort排序
function sortList(n) {
    var _this = this;
    _this.flag *= -1;

    //让除了当前列的其他列的flag标识回归初始值-1
    for (var k = 0; k < oThs.length; k++) {
        if (k !== n) {//n是当前列的索引,如果索引不是当前列的索引,证明它是其它列,而其它的列我们都让它的flag初始化为-1,这样每一次乱序后在点击都是按照升序先排序
            oThs[k].flag = -1;
        }
    }

    var ary = utils.listToArray(oTrs);

    ary.sort(function (a, b) {
        var curIn = a.cells[n].innerHTML;
        var nexIn = b.cells[n].innerHTML;
        var curInNum = parseFloat(curIn);
        var nexInNum = parseFloat(nexIn);
        if (isNaN(curInNum) || isNaN(nexInNum)) {
            return (curIn.localeCompare(nexIn)) * _this.flag;
        }
        return (curInNum - nexInNum) * _this.flag;
    });

    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;

    changeBg();
}


//实现点击
for (var i = 0; i < oThs.length; i++) {
    var curTh = oThs[i];
    if (curTh.className === "cursor") {
        curTh.flag = -1;
        curTh.index = i;
        curTh.onclick = function () {
            sortList.call(this, this.index);
        };
    }
}