let questionIndex = 0;
let waiting = false;
let score = 0;

const displayQuestions = (i) => {
    const question = getElement('question-container');
    const selects = getElement('selects-container');

    const questionDiv = document.createElement('div');
    const questionText = document.createElement('p');
    questionText.textContent = questions[i].question;
    questionDiv.appendChild(questionText);
    // 画像がある場合は表示
    if (questions[i].image) {
        const imageElement = document.createElement('img');
        imageElement.src = questions[i].image;
        questionDiv.appendChild(imageElement);
    }
    question.appendChild(questionDiv);
    questions[i].selects.forEach(select => {
        // 質問を表示するためのdivを作成
        const selectDiv = document.createElement('div');
        selectDiv.id = 'question-' + select.id;
        selectDiv.className = 'select-item';

        // 質問テキストを表示
        const selectText = document.createElement('p');
        selectText.textContent = select.description;
        selectDiv.appendChild(selectText);

        selectDiv.addEventListener('click', () => {
            if(waiting) return;
            console.debug(select.id)
            waiting = true;
            if(select.id == questions[i].answer) {
                console.debug('正解');
                selectDiv.classList.add('correct');
                score ++;
            } else {
                const answer = document.getElementById('question-' + questions[i].answer);
                answer.classList.add('correct');
                selectDiv.classList.add('incorrect');
            }
            const answerButton = document.getElementById('answer-button');
            answerButton.className = 'show';
            updateScore(score);
        })

        selects.appendChild(selectDiv);
    });
}

const getElement = (id) => {
    const el = document.getElementById(id);
    el.innerHTML = '';
    return el;
}

const onNextQuestionClicked = () => {
    waiting = false;
    const answerButton = document.getElementById('answer-button')
    answerButton.className = 'hide';
    if(questionIndex == questions.length - 1) {
        getElement('selects-container')
        const question =  getElement('question-container');
        const questionDiv = document.createElement('div');
        const button = document.createElement('button');
        button.textContent = 'もう一回';
        button.addEventListener('click', () => {
          main()
        })
        questionDiv.appendChild(button);
        question.appendChild(questionDiv);
        return;
    }
    questionIndex ++;
    displayQuestions(questionIndex);
}

const updateScore = (score) => {
  const scoreEl = document.getElementById('score');
  scoreEl.textContent = score;
}

const main = () => {
  questionIndex = 0;
  score = 0;
  displayQuestions(questionIndex);
  updateScore(score);
}

main()

