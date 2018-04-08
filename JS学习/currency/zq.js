var zq = {
    getStyle: function (obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
    },
    doMove: function (obj, attr, dir, target, endFn) {
        dir = parseInt(zq.getStyle(obj, attr)) < target ? dir : -dir;
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var speed = parseInt(zq.getStyle(obj, attr)) + dir;
            if (speed > target && dir > 0 || speed < target && dir < 0) {
                speed = target;
            }
            obj.style[attr] = speed + 'px';
            if (speed == target) {
                clearInterval(obj.timer);
                /*
                if (endFn){
                    endFn();
                }
                */
                endFn && endFn();
            }
        }, 30)
    },
    shake: function (obj, attr, endFn) {
        if (obj.onOff) return;
        obj.onOff = true;
        var pos = parseInt(zq.getStyle(obj, attr));
        var arr = [];
        var num = 0;
        for (var i = 20; i > 0; i -= 2) {
            arr.push(i, -i);
        }
        arr.push(0);
        clearInterval(obj.shake);
        obj.shake = setInterval(function () {
            obj.style[attr] = pos + arr[num] + 'px';
            num++;
            if (num === arr.length) {
                clearInterval(obj.shake);
                endFn && endFn();
                obj.onOff = false;
            }
        }, 50)
    }
};