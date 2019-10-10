var bubbles = [];
var n = -1;
var i, j = 0;

//This code gets run only once
function setup() {
    bubbles = [];
    generateBubbles();
    n = bubbles.length;
    i = 0;
    j = 0;
}

//This code gets run at the speed defined in ms in printer.js
// where it says "window.setInterval(draw, 20);" the 20 is time in ms
function draw() {
    clearCanvas();
    sortBubbles();
    drawBubbles();
    drawRedBox();
}

//This function generates bubbles. It will generate bubbles until there is no more room.
function generateBubbles() {
    var count = 0;
    var exit = false;
    while (count <= height && !exit) {
        var nextSize = random(5, 100);

        //If there is no more room calculate the exact size of the last bubble.
        if (count + nextSize > height) {
            nextSize = height - count;
            exit = true;
        }
        bubbles.push({
            size: nextSize,
            colour: randomColour()
        });
        count += bubbles[bubbles.length - 1].size;
    }
}

//Complete the bubble sort portion of this bubble sort visualization
//Please note... these weird if statements are just for loops that have been
//broken up so that one step occurs each animation cycle
function sortBubbles() {
    var itemA = 0;
    var itemB = 0;
    if (i < n) {
        if (j < (n - i - 1)) {
            //Values for graphical output
            itemA = bubbles[j].size;
            itemB = bubbles[j + 1].size;

            if (bubbles[j].size > bubbles[j + 1].size) {
                var temp = bubbles[j];
                bubbles[j] = bubbles[j + 1];
                bubbles[j + 1] = temp;
            }
            j += 1;
        } else {
            j = 0;
            i += 1;
        }
    }
}

//Displays the bubbles in the current order down the center of the screen
function drawBubbles() {
    var curHeight = 0;
    for (var x of bubbles) {
        circle(width / 2, curHeight + x.size / 2, x.size / 2, x.colour);
        curHeight += x.size;
    }
}

//Find where (physically) the current bubbles are. Find how wide the wider bubble is.
//Draw a red box around it
function drawRedBox() {
    var cnt = 0;
    var maxWidth = Math.max(itemA, itemB);
    for (var x = 0; x < j - 1; x++) {
        cnt += bubbles[x].size;
    }
    rect(width / 2 - (maxWidth / 2), cnt, maxWidth, itemA + itemB, "red");
}
