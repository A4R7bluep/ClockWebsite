// function setOpacity(wheel, time, maximum) {
//     // if (!(wheel == "second")) {
//     // }
//     time -= 1;

//     var wholeWheel = document.querySelectorAll(`#${wheel} > p`);

//     for (let i = 0; i < maximum; i++) {
//         wholeWheel[i].style.opacity = "0";
//     }

//     if (wholeWheel[time] == wholeWheel[0]) {
//         wholeWheel[time].style.opacity = "1";
//         wholeWheel[time + 1].style.opacity = "0.5";
//     }

//     else if (wholeWheel[time] == wholeWheel[wholeWheel.length - 1]) {
//         wholeWheel[time - 1].style.opacity = "0.5";
//         wholeWheel[time].style.opacity = "1";
//     }

//     else {
//         wholeWheel[time - 1].style.opacity = "0.5";
//         wholeWheel[time].style.opacity = "1";
//         wholeWheel[time + 1].style.opacity = "0.5";
//     }
// }

var color = "#ff0080";

function openColorPicker() {
    var window = document.getElementById("colorpick");

    if (window.style.display == "block") {
        window.style.display = "none";
    }
    else {
        window.style.display = "block";
    }
}

function setColor() {
    var picker = document.getElementById("picker");
    color = picker.value;
    openColorPicker();
}

function resetColor() {
    color = "#ff0080";
    openColorPicker();
}

async function canvas(seconds, minutes, hours) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    var viewWidth = document.documentElement.clientWidth
    var viewHeight = document.documentElement.clientHeight

    /// Draw Clock Face
    canvas.width = viewWidth
    canvas.height = viewHeight
    ctx.strokeStyle = color;
    ctx.lineWidth = 10

    let vw = Math.max(document.documentElement.clientWidth, window.innerWidth)

    if (vw < 1000) {ctx.lineWidth = 5}

    ctx.beginPath()
    ctx.arc(viewWidth / 2, viewHeight / 2, vw/12, -Math.PI/2, (((seconds - 1) / 60) * 2 * Math.PI) -Math.PI/2)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(viewWidth / 2, viewHeight / 2, vw/8, -Math.PI/2, (((minutes - 1) / 60) * 2 * Math.PI) -Math.PI/2)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(viewWidth / 2, viewHeight / 2, vw/5, -Math.PI/2, (((hours - 1) / 24) * 2 * Math.PI) -Math.PI/2)
    ctx.stroke()
}

function setTextOpacity(wheel, time, maximum) {
    // if (!(wheel == "second")) {
    // }
    time -= 1;

    var wholeWheel = document.querySelectorAll(`#${wheel} > p`);

    for (let i = 0; i < maximum; i++) {
        wholeWheel[i].style.opacity = "0.25";
    }

    wholeWheel[time].style.opacity = "1";
}

function setYearValue(yearNum) {
    let years = document.querySelectorAll("#year > p");
    for (i = -5; i <= 5; i++) {
        years[i + 5].innerHTML = Number(yearNum) + i;
    }
}

function setDateText() {
    const date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes() + 1;
    let seconds = date.getSeconds() + 1;

    if ((seconds / 10).toString().split(".")[0] === "0") {
        seconds = `0${seconds}`
    }

    // var fulldate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    // document.getElementById("clock").innerHTML = fulldate;
    setYearValue(year);
    document.getElementById("month").style.translate = `0px ${(30 - month) * 5}vw`;
    document.getElementById("day").style.translate = `0px ${(30 - day) * 5}vw`;
    document.getElementById("year").style.translate = `0px ${(30 - 6) * 5}vw`;
    document.getElementById("hour").style.translate = `0px ${(30 - hours) * 5}vw`;
    document.getElementById("minute").style.translate = `0px ${(30 - minutes) * 5}vw`;
    document.getElementById("second").style.translate = `0px ${(30 - seconds) * 5}vw`;

    setTextOpacity("month", month, 12);
    setTextOpacity("day", day, 31);
    setTextOpacity("year", 6, 11);
    setTextOpacity("hour", hours, 24);
    setTextOpacity("minute", minutes, 60);
    setTextOpacity("second", seconds, 60);

    canvas(seconds, minutes, hours)
}


setDateText()
setInterval(setDateText, 1);
