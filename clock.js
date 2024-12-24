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


async function canvas(seconds, minutes, hours) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    var viewWidth = document.documentElement.clientWidth
    var viewHeight = document.documentElement.clientHeight
    
    canvas.width = viewWidth
    canvas.height = viewHeight
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 10

    ctx.beginPath()
    ctx.arc(viewWidth/2, viewHeight/2, 150, 0, ((seconds - 1) / 60) * 2 * Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(viewWidth/2, viewHeight/2, 250, 0, ((minutes - 1) / 60) * 2 * Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(viewWidth/2, viewHeight/2, 300, 0, ((hours - 1) / 60) * 2 * Math.PI)
    ctx.stroke()
}

function setOpacity(wheel, time, maximum) {
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

function setDate() {
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
    document.getElementById("month").style.translate = `0px ${(30 - month) * 100}px`;
    document.getElementById("day").style.translate = `0px ${(30 - day) * 100}px`;
    document.getElementById("year").style.translate = `0px ${(30 - 6) * 100}px`;
    document.getElementById("hour").style.translate = `0px ${(30 - hours) * 100}px`;
    document.getElementById("minute").style.translate = `0px ${(30 - minutes) * 100}px`;
    document.getElementById("second").style.translate = `0px ${(30 - seconds) * 100}px`;

    setOpacity("month", month, 12);
    setOpacity("day", day, 31);
    setOpacity("year", 6, 11);
    setOpacity("hour", hours, 24);
    setOpacity("minute", minutes, 60);
    setOpacity("second", seconds, 60);

    canvas(seconds, minutes, hours)
}


setDate()
setInterval(setDate, 1);
