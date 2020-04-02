var canvas = document.getElementById('xxx');
var ctx = canvas.getContext('2d');
setCanvasSize()
autoSetCanvasSize()

listenToUser(canvas)

var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}


/****第一部分：设置窗口****/
function autoSetCanvasSize() {
    window.onresize = function () {
        setCanvasSize()
    }
}
function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}



/******第二部分:监听mouse事件******/
function listenToUser(canvas) {
    var using = false
    var lastPoint = { x: undefined, y: undefined }

    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 5)
                lastPoint = { "x": x, "y": y }
            }
        }
        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (eraserEnabled) {
                if (using) {
                    ctx.clearRect(x - 5, y - 5, 10, 10)
                }
            } else {
                if (using) {
                    var newPoint = { "x": x, "y": y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    drawCircle(x, y, 5)
                    lastPoint = newPoint
                }
            }
        }
        canvas.ontouchend = function () {
            using = false
        }

    } else {
        //非触屏设备
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 5)
                lastPoint = { "x": x, "y": y }
            }
        }

        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (eraserEnabled) {
                if (using) {
                    ctx.clearRect(x - 5, y - 5, 10, 10)
                }
            } else {
                if (using) {
                    var newPoint = { "x": x, "y": y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    drawCircle(x, y, 5)
                    lastPoint = newPoint
                }
            }
        }
        canvas.onmouseup = function (z) {
            using = false
        }
    }



    function drawCircle(x, y, radius) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.strokeStyle = "black"
        ctx.lineWidth = 10
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()
    }
}
