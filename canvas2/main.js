var ctx = document.getElementById('canvas')
var context = ctx.getContext('2d')
var lineCap = ['round'];

var using = false
var eraserEnable = false
var lastPoint = { x: undefined, y: undefined }
var lineWidth = 4

setCanvasSize()
autoSetCanvasSize()
listenToUser(ctx)



//Listen to user
function listenToUser(ctx) {


    if (document.body.ontouchstart !== undefined) {
        //Mobile
        ctx.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            drawCircle(x, y, 1)
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }
        }
        ctx.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (eraserEnable) {
                if (using) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                }
            } else {
                if (using) {
                    var newPoint = { "x": x, "y": y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    // drawCircle(x, y, 5)
                    lastPoint = newPoint
                }
            }
        }
        ctx.ontouchend = function () {
            using = false
        }
    } else {
        //PC
        ctx.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            drawCircle(x, y, 1/2)

            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }

        }
        ctx.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (!using) { return }
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        ctx.onmouseup = function (a) {
            using = false
        }

    }
}



function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
    context.stroke()
    
}
function drawLine(x1, y1, x2, y2) {
    context.lineCap = lineCap;
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
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

//tool
eraser.onclick = function () {
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function () {
    eraserEnable = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
}
download.onclick = function () {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'image'
    a.target = '_blank'
    a.click()
}


//backgroundChange
grid.onclick = function () {
    canvas.style.background = "url(../img/grid.png) center no-repeat"
    canvas.style.backgroundSize = "cover"
}
white.onclick = function () {
    canvas.style.background = "white"
}

//thickness change
thin.onclick = function () {
    lineWidth = 4
    sizes.classList.remove('active')
}
midline.onclick = function () {
    lineWidth = 7
    sizes.classList.remove('active')
}
thick.onclick = function () {
    lineWidth = 10
    sizes.classList.remove('active')
}
var sizesStatus = 1
function sizesChange() {
    if (sizesStatus === 1) {
        document.getElementById('thickness').style.display = "block"
        sizesStatus = 0
    } else if (sizesStatus === 0) {
        document.getElementById('thickness').style.display = "none"
        sizesStatus = 1

    }
}

//color change
let colorTags = document.querySelectorAll('.palette > li')
// function findMe(){
    for (let i = 0; i < colorTags.length; i++) {
        colorTags[i].onclick = function () {
            colorTags[i].classList.add('active')
            let color = window.getComputedStyle(colorTags[i],'null').backgroundColor
            context.fillStyle = color
            context.strokeStyle = color
            let brotherAnMe = colorTags[i].parentNode.children
            for (let j = 0; j < brotherAnMe.length; j++) {
                if (brotherAnMe[j] != colorTags[i]) {
                    brotherAnMe[j].classList.remove('active')
                }
            }
        }
    }
    
    console.log(colorPicker.value)
// colorPicker.addEventList('input',updateFirst)
// colorPicker.addEventList('change',watchColorPicker)
// function watchColorPicker(event){

// }