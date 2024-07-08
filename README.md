## Quiz APP

clone the code from github to a folder then open with visual studio code
```bash
git clone https://github.com/anandhuRaveendran/quiz-app.git
```
Change directory to quiz-app.
```bash
cd quiz-app
```

## Getting Started

First install the packages:
```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

the localhost will display the quiz interface .

Each questions have 4 options and a countdown of 10sec. 

after clicking the option it will show the next button enabled ,so you can navigate to next question
or when the time is up automattically moves to the next question.

finally it will display how much points you got and summary of the whole quiz with details of correct answer,
selected option and if its correct answer it will display in green colour and if its wrong colour will be red.

and you can see 2 buttons ,one for restart the quiz another one for share.

when share button clicks the social media links will dsplay on the screen and you can select any platform for share.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
