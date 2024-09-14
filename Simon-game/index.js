var arr = ["green", "red", "yellow", "blue"];
var level = 1;
var assumearr = [];
var realarr = [];

// basic code
$(".btn").click(function () {
    $("h1").hide();
    var buttonclass = this.id;
    addanimation(buttonclass);
    addsound(buttonclass);
    if (realarr.length === assumearr.length) {
        realarr = [];
        setTimeout(function() {
            assumedarray();
        }, 1000);

    }
});

// adding animation
function addanimation(buttonclass) {
    $("." + buttonclass).addClass("pressed");
    setTimeout(function () {
        $("." + buttonclass).removeClass("pressed");
    }, 100);
}

//adding sounds
function addsound(buttonclass) {
    var audio = new Audio("sounds/" + buttonclass + ".mp3");
    audio.play();
}

// making assumed array that can create by own
function assumedarray() {
    if (level > 0 && level <= 20) {
        var randomnumber = Math.floor(Math.random() * 4);
        assumearr.push(arr[randomnumber]);
        for (let i = 0; i < assumearr.length; i++) {  
            playSequenceWithDelay(i);
        }
        enableUserClick();
    }
}

// Function to play the sequence with a delay
function playSequenceWithDelay(index) {
    setTimeout(function () {
        addanimation(assumearr[index]);
        addsound(assumearr[index]);
    }, index * 600); 
}

// Enableuser to store the real user input
function enableUserClick() {
    $(".btn").off("click").on("click", function () {
        var clickedbutton = this.id;
        realarr.push(clickedbutton);
        addanimation(clickedbutton);
        addsound(clickedbutton);

        // checking
        if (realarr.length === assumearr.length) {
            checkUserInput();
        }
    });
}

// Check the user input
function checkUserInput() {
    for (let i = 0; i < assumearr.length; i++) {
        if (assumearr[i] !== realarr[i]) {
            var wrongsound = new Audio("sounds/wrong.mp3");
            wrongsound.play();

            // Reset game or show some failure feedback
            level = 1;
            $("h6").text("you-failed");
            assumearr = [];
            return;
        }
    }
    
    // If user input is correct move to the next level
    level++;
    $("h6").text("level-"+level);
    realarr = [];
    setTimeout(assumedarray, 1000); // Start next round 
}
