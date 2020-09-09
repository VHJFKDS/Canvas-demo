var ctx = document.getElementById('canvas')
var context = ctx.getContext('2d')
var lineCap = ['round'];

var using = false
var eraserEnable = false
var lastPoint = { x: undefined, y: undefined }

setCanvasSize()
autoSetCanvasSize()




//Listen to user
eraser.onclick = function () {
    eraserEnable = !eraserEnable
}
ctx.onmousedown = function (a) {
    var x = a.clientX
    var y = a.clientY
    if (eraserEnable) {
        using = true
        context.clearRect(x-5, y-5, 10, 10)
    } else {
        using = true
        lastPoint = { "x": x, "y": y }
        drawCircle(x, y, 1)

    }



}
ctx.onmousemove = function (a) {
    var x = a.clientX
    var y = a.clientY
    if (eraserEnable) {
        if(using){
            context.clearRect(x-5, y-5, 10, 10)
        }
    } else {
        if (using) {
            var newPoint = { "x": x, "y": y }
            drawCircle(x, y, 1)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
        }
        
    }

}
ctx.onmouseup = function (a) {
    using = false

}
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.stroke()

}
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1)
    context.lineWidth = 7
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()

}


//Set canvas size
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