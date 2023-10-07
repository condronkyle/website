function changeColor() {
    var colors = ["#FF5733", "#33FF57", "#3357FF"];
    var currentColor = document.body.style.backgroundColor;
    var newColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
    document.body.style.backgroundColor = newColor;
}

