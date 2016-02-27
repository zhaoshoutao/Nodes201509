/*
 * utils.js 存储的是我们项目中常用的公共的方法
 */
var utils = {
    //listToArray:把类数组转换为数组(兼容所有的浏览器)
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }
};
