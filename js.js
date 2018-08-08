 
var box = document.getElementById('box');
var items = box.children;
// 定义每一列之间的间隙 为10像素
var gap = 10;

window.onload = function() {
    // 一进来就调用一次
    waterFall();
    // 封装成一个函数
    function waterFall() {
        // 1- 确定列数  = 页面的宽度 / 图片的宽度
        var pageWidth = getClient().width;
        var itemWidth = items[0].offsetWidth;
        var columns = parseInt(pageWidth / (itemWidth + gap));
        var arr = [];
        for (var i = 0; i < items.length; i++) {
            if (i < columns) {
                // 2- 确定第一行
                items[i].style.top = 0;
                items[i].style.left = (itemWidth + gap) * i + 'px';
                arr.push(items[i].offsetHeight);

            } else {
                // 其他行
                // 3- 找到数组中最小高度  和 它的索引
                var minHeight = arr[0];
                var index = 0;
                for (var j = 0; j < arr.length; j++) {
                    if (minHeight > arr[j]) {
                        minHeight = arr[j];
                        index = j;
                    }
                }
                // 4- 设置下一行的第一个盒子位置
                // top值就是最小列的高度 + gap
                items[i].style.top = arr[index] + gap + 'px';
                // left值就是最小列距离左边的距离
                items[i].style.left = items[index].offsetLeft + 'px';

                // 5- 修改最小列的高度 
                // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                arr[index] = arr[index] + items[i].offsetHeight + gap;
            }
        }
    }
    // 页面尺寸改变时实时触发
    window.onresize = function() {
        waterFall();
    };
    // 当加载到最后一张的时
    window.onscroll = function() {
        if (getClient().height + getScrollTop() >= items[items.length - 1].offsetTop) {
            // 模拟 ajax 获取数据    
            var datas = [
                  " image/1.jpg",
                 " image/2.jpg",
                " image/3.jpg",
                " image/4.jpg",
                " image/5.jpg",
               " image/6.jpg",
               " image/7.jpg",
               " image/8.jpg",
                " image/9.jpg",
                " image/10.jpg",
               " image/5.jpg",
                " image/6.jpg",
                " image/1.jpg",
                " image/1.jpg",
                " image/7.jpg",
                " image/3.jpg",
                " image/6.jpg"

               
            ];
            for (var i = 0; i < datas.length; i++) {
                var div = document.createElement("div");
                div.className = "item";
                div.innerHTML = '<img src="' + datas[i] + '" alt="">';
                box.appendChild(div);
            }
            waterFall();
        }

    };
};

// clientWidth 处理兼容性
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}
// scrollTop兼容性处理
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}