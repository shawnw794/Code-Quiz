var triviaGame = {

    init: function() {
        //global vars
        var questionCount = -1;
        var correct = 0;
        var wrong = 0;
        var missed = 0;
        var userResponse = "";
        var x = "";
        var progress = "";
        $(".stats-row").hide();
        this.initialDom(correct, wrong, missed);
        //event listener
        var clicked = "";
        $("body").on("click", ".btn", function() {
            clicked = $(this).attr("id");
            questionCount++;
            triviaGame.handleClicks(clicked, questionCount);
        });
        $("body").on("click", "h4", function() {
            clicked = $(this).attr("id");
            triviaGame.handleClicks(clicked, questionCount, correct, wrong, missed);
            setTimeout(4000);
        });
    },
    handleClicks: function(getClicked, questionCount, correct, wrong, missed) {
        if (getClicked === "yes") {
            $("#yes-btn").hide();
            $("#no-btn").hide();
            this.writeQandA(questionCount);
        }
        if (getClicked === "no") {
            $("#yes-btn").hide();
            $("#no-btn").hide();
            $("#game-photo").attr("src", "https://gifimage.net/wp-content/uploads/2017/11/goofy-gif-4.gif");
        }
        if (getClicked === "a0") {
            userResponse = 0;
            this.checkAnswer(userResponse, questionCount, correct, wrong, missed);
        }
        if (getClicked === "a1") {
            userResponse = 1;
            this.checkAnswer(userResponse, questionCount, correct, wrong, missed);
        }
        if (getClicked === "a2") {
            userResponse = 2;
            this.checkAnswer(userResponse, questionCount, correct, wrong, missed);
        }
        if (getClicked === "a3") {
            userResponse = 3;
            this.checkAnswer(userResponse, questionCount, correct, wrong, missed);
        }
        if (getClicked === "next") {
            this.writeQandA(questionCount);
        }
        if (getClicked === "finish") {
            this.resetGame();
        }
        if (getClicked === "playagain-yes") {
            location.reload();
        }
        if (getClicked === "playagain-no") {
            $("#question-row").hide();
            $("#stats-row").hide();
            $("#stats-correct-value").hide();
            $("#stats-wrong-value").hide();
            $("#stats-missed-value").hide();
            $("#stats-text").hide();
            $("#stats-text2").hide();
            $("#stats-text3").hide();
            $("#game-result").hide();
            $("#playagainquestion").hide();
            $("#playagainyes-btn").hide();
            $("#playagainno-btn").hide();
            $("#img-result").attr("src", "https://gifimage.net/wp-content/uploads/2017/11/goofy-gif-4.gif");
        }
    },
    initialDom: function(correct, wrong, missed) {
        $(".answer-container").hide();
        $("#timer-holder").hide();
        $("#stats").hide();
        $("#questions").text("Are you ready to play Shawn's Trivia Game?");
        $("#yes-btn").append("<button type='button' id='yes' class='btn btn-success'>Yes</button>");
        $("#no-btn").append("<button type='button' id='no' class='btn btn-danger'>No</button>");
        $("#stats-correct-value").text(correct);
        $("#stats-wrong-value").text(wrong);
        $("#stats-missed-value").text(missed);
    },
    writeQandA: function(questionCount) {
        var counter = 200;
        var clock;
        $("#continue-btn").hide();
        $("#game-photo").hide();
        var n = parseInt(questionCount);
        $(".answer-container").show();
        $(".stats-row").show();
        $("#stats").show();

        if (questionCount < questions.length) {
            this.timer(counter, clock, questionCount);
            $('#questions').text("Question " + (n + 1) + ": " + questions[n].question);
            $("#a0").text(questions[n].answers[0]);
            $("#a1").text(questions[n].answers[1]);
            $("#a2").text(questions[n].answers[2]);
            $("#a3").text(questions[n].answers[3]);
            $("#timer-holder").show();
        } else {
            this.resetGame();
        }
    },
    checkAnswer: function(uR, questionCount, correct, wrong, missed, counter) {
        clearInterval(countdown);
        correct = parseInt($("#stats-correct-value").text());
        wrong = parseInt($("#stats-wrong-value").text());
        missed = parseInt($("#stats-missed-value").text());
        $("#game-photo").show();
        $("#continue-btn").show();
        x = questionCount;
        var rightAnswer = questions[x].correctA;

        if (uR === rightAnswer) {
            $(".answer-container").hide();
            $("#questions").text("Ah-hic! You're right!");
            $("#game-photo").attr("src", "http://barkpost.com/wp-content/uploads/2014/04/Goofy-gif.gif");
            correct += 1;
        } else {
            $(".answer-container").hide();
            $("#questions").text("Oh gosh! That's wrong!");
            $("#game-photo").attr("src", "https://media.giphy.com/media/4ADaU1Q10Wh0I/giphy.gif");
            wrong += 1;
            counter = counter - 20;
        }
        // counter = 30;

        $("#timer-holder").hide();
        progress = x * 10 + 10;
        $("#update-progress").attr("aria-valuenow", progress);
        $("#update-progress").attr("style", "width:" + progress + "%");
        $("#update-progress").text(progress + "% complete")
        $("#stats-correct-value").text(correct);
        $("#stats-wrong-value").text(wrong);
        $("#stats-missed-value").text(missed);
        if (questionCount < 9) {
            $("#continue-btn").html("<button type='button' id='next' class='btn btn-success'>Next Question</button>");
        } else if (questionCount === 9) {
            $("#continue-btn").html("<button type='button' id='finish' class='btn btn-success'>Finish Game</button>");

        }
    },
    timesUp: function(questionCount, countdown) {
        clearInterval(countdown);
        $("#game-photo").show();
        $("#continue-btn").show();
        x = questionCount;
        correct = parseInt($("#stats-correct-value").text());
        wrong = parseInt($("#stats-wrong-value").text());
        missed = parseInt($("#stats-missed-value").text());
        $("#continue-btn").html("<button type='button' id='next' class='btn btn-success'>Next Question</button>");
        $("#timer-holder").hide();
        progress = x * 10 + 10;
        missed++;
        $(".answer-container").hide();
        $("#questions").text("OMG! You're so slow!");
        $("#game-photo").attr("src", "http://ak-hdl.buzzfed.com/static/2015-04/27/13/imagebuzz/webdr10/anigif_optimized-19983-1430157577-28.gif");
        $("#update-progress").attr("aria-valuenow", progress);
        $("#update-progress").attr("style", "width:" + progress + "%");
        $("#update-progress").text(progress + "% complete")
        $("#stats-correct-value").text(correct);
        $("#stats-wrong-value").text(wrong);
        $("#stats-missed-value").text(missed);
    },
    timer: function(counter, clock, questionCount) {
        countdown = setInterval(thirtySeconds, 1000);

        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(countdown);
                triviaGame.timesUp(questionCount, countdown);
            }
            if (counter > 0) {
                counter--;
            }
            $("#timer").html(counter);
        }
    },
    resetGame: function() {
        $("#finish").hide();
        $("#progress-area").hide();
        $("#questions").text("Game Over! Here are your stats");
        $("#game-photo").hide();
        //$(".stats-row").attr("style", "margin-top: -12.5vh");
        $("#stats-correct-value").attr("style", "margin-top: -10vh!important");
        $("#stats-wrong-value").attr("style", "margin-top: -10vh!important");
        $("#stats-missed-value").attr("style", "margin-top: -10vh!important");
        $("#stats-text").attr("style", "margin-top: -10vh!important");
        $("#stats-text2").attr("style", "margin-top: -10vh!important");
        $("#stats-text3").attr("style", "margin-top: -10vh!important");
        correct = parseInt($("#stats-correct-value").text());
        console.log(correct);
        if (correct === 10) {
            $("#game-result").text("You are Goof-Tastic!");
        }
        if (correct >= 7 && correct < 10) {
            $("#game-result").text("Amazing! Almost there.");

        }
        if (correct > 5 && correct < 7) {
            $("#game-result").text("Go back and watch the movie one more time.");

        }
        if (correct <= 5) {
            $("#game-result").text("Wow! You've never watched the movie.");

        }
        $(".answer-container").hide();
        $("#timer-holder").hide();
        $("#stats").hide();
        $("#playagainquestion").text("Want to play again?");
        $("#playagainyes-btn").append("<button type='button' id='playagain-yes' class='btn btn-success'>Yes</button>");
        $("#playagainno-btn").append("<button type='button' id='playagain-no' class='btn btn-danger'>No</button>");

    }
}
var questions = [{
    "question": "Who are the principle father-son duo for this movie?",
    "answers": ["Pete and P.J.", "Goofy and Max", "George and Astro", "Barney and Bam-Bam"],
    "correctA": 1
}, {
    "question": "Who is Max's high school crush?",
    "answers": ["Minnie", "Juliette", "Roxanne", "Marge"],
    "correctA": 2
}, {
    "question": "Where does Goofy decides to take Max for a family trip?",
    "answers": ["Las Vegas, Nevada", "Lake Destiny, Idaho", "Los Angeles, California", "Dallas, Texas"],
    "correctA": 1
}, {
    "question": "Goofy's family trip was inspired for his fondess for ______.",
    "answers": ["Camping", "Hiking", "Bird Watching", "Fishing"],
    "correctA": 3
}, {
    "question": "What was the name of the soup that Goofy and Max while traveling",
    "answers": ["Hi, Dad Soup", "Chicken Soup", "Vegetable Soup", "Goof Troop Soup"],
    "correctA": 0
}, {
    "question": "What entertainment did Goofy take Max to that reminded him of a young Max?",
    "answers": ["Wrestlemania", "Monster Truck Rally", "Nascar Talladega", "Powerline Concert"],
    "correctA": 1
}, {
    "question": "Who is the name of the artist(s) that Max imitates in the beginning of the movie?",
    "answers": ["Powerline", "California Raisins", "Brass Knuckleheads", "The Rattling Rocks"],
    "correctA": 0
}, {
    "question": "What was the name of the fishing technique that Goofy taught max?",
    "answers": ["The Zipline", "Fly Fisherman", "The Perfect Cast", "Saffron & Paprika"],
    "correctA": 2
}, {
    "question": "What happens when Goofy puts Max in charge telling directions for the road trip?",
    "answers": ["Max guided them safely to Lake Detiny.", "Max loses the map during the trip.", "Max was never put in charge of the map.", "Max changed the directions to get to a concert."],
    "correctA": 3
}, {
    "question": "What song did both Goofy and Max dance to on stage with Powerline?",
    "answers": ["Stand Out", "Eye to Eye", "Cosmos Rocker", "Je T'Aime"],
    "correctA": 1
}]

triviaGame.init();