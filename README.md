# 04-Web-APIs

## Description
Week 4 of Columbia Engineering Coding Bootcamp has us implementing a timed, multiple choice quiz, with a high score list. The purpose is to explore the use of the localStorage Web API, to persist high scores through page loads.

Of course the DOM or Document Object Model is an API for HTML.  So we use two APIs in this challenge assignment.

For a demonstration please browse to my Github pages:
[https://chrispobrien.github.io/04-Web-APIs/]

Objectives include:

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

```
GIVEN I am taking a code quiz
WHEN I click the Start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

* For this exercise, I chose to store the question titles, the multiple-choice question answers, and the correct answer, in an object list
* For a real quiz I would not store the right answer in a location that could be viewed by the user
* The high score list has a "Go Back" button that could resume a quiz in progress. I chose to void the quiz and "Go Back" to the introduction, if a quiz was in progress.

## Installation

Using git, issue the command:

```sh
git clone https://github.com/chrispobrien/04-Web-APIs.git
```

This creates the folder 04-Web-APIs within which you will find an index.html file, an assets folder, containing a css folder, a js folder, and an images folder.

The css folder contains one file, style.css, containing the stylesheet for this project.

The js folder contains one file, script.js, containing the JavaScript for this project.

The images folder contains the animated gif supplied by the Bootcamp to demonstrate the intended function of this project.

[![Quiz Demonstration][demo]](./assets/images/04-web-apis-homework-demo.gif)

It also contains a screen shot of a quiz question.

## Usage

Since this is a classroom exercise, I would recommend simply opening the index.html file in a browser on your local machine. Click the button labeled "Generate Password".

[![Web APIs][screenshot]](./assets/images/04-web-apis.png)

## Credits

The demo image is provided by Columbia Coding Bootcamp/Trilogy. All other content is my own solution to this problem.

## License

© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.


<!-- MARKDOWN LINKS & IMAGES -->
[demo]: ./assets/images/04-web-apis-homework-demo.gif
[screenshot]: ./assets/images/04-web-apis.png
