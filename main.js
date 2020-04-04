var canvas = document.getElementById('xxx');
var ctx = canvas.getContext('2d');
var lineWidth = 5
setCanvasSize()
autoSetCanvasSize()

listenToUser(canvas)

var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function () {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function(){
    var url = canvas.toDataURL("image/png")
    console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href=url
    a.download = 'image'
    a.target = '_blank'
    a.click()
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

        canvas.ontouchstart = function (aa) {
            var x = aa.touches[0].clientX
            var y = aa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 5)
                lastPoint = { "x": x, "y": y }
            }
        }
        canvas.ontouchmove = function (aa) {
            var x = aa.touches[0].clientX
            var y = aa.touches[0].clientY
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
        canvas.onmousedown = function (aa) {
            var x = aa.clientX
            var y = aa.clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 3)
                lastPoint = { "x": x, "y": y }
            }
        }

        canvas.onmousemove = function (aa) {
            var x = aa.clientX
            var y = aa.clientY
            if (eraserEnabled) {
                if (using) {
                    ctx.clearRect(x - 5, y - 5, 10, 10)
                }
            } else {
                if (using) {
                    var newPoint = { "x": x, "y": y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    // drawCircle(x, y, 3)
                    lastPoint = newPoint
                }
            }
        }
        canvas.onmouseup = function (z) {
            using = false
        }
    }

    red.onclick = function () {
        ctx.fillStyle = 'red'
        ctx.strokeStyle = 'red'
        red.classList.add('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }
    green.onclick = function () {
        ctx.fillStyle = 'green'
        ctx.strokeStyle = 'green'
        green.classList.add('active')
        blue.classList.remove('active')
        red.classList.remove('active')
    }
    blue.onclick = function () {
        ctx.fillStyle = 'blue'
        ctx.strokeStyle = 'blue'
        blue.classList.add('active')
        green.classList.remove('active')
        red.classList.remove('active')
    }

    thin.onclick = function () {
        lineWidth = 5
    }
    thick.onclick = function () {
        lineWidth = 10
    }
    
    

    function drawCircle(x, y, radius) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()
    }
}
