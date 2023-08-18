let questionIndex = 0;
let waiting = false;
let score = 0;

const createQuestion = (i) => {
    const question = questions[i]
    createContent(question)
    createOptions(question)
}

const resetElement = (id) => {
    const el = document.getElementById(id);
    while (el.firstChild) el.removeChild(el.firstChild);
    return el;
}

const onOptionClicked = (option, optionDiv) => {
    const question = questions[questionIndex]
    if(waiting) return;
    console.debug(option.id)
    waiting = true;
    if(option.id === question.answer) {
        console.debug('正解');
        optionDiv.classList.add('correct');
        score ++;
    } else {
        const answer = document.getElementById('option-' + question.answer);
        answer.classList.add('correct');
        optionDiv.classList.add('incorrect');
    }
    const answerButton = document.getElementById('answer-button');
    answerButton.className = 'show';
}

const onNextQuestionClicked = () => {
    waiting = false;
    const answerButton = document.getElementById('answer-button')
    answerButton.className = 'hide';
    if(questionIndex === questions.length - 1) {
        resetElement('options-container')
        const contentEl =  resetElement('content-container');
        const contentDiv = document.createElement('div');
        const button = document.createElement('button');
        button.textContent = 'もう一回';
        button.addEventListener('click', () => {
          main()
        })
        contentDiv.appendChild(button);
        contentEl.appendChild(contentDiv);
        return;
    }
    questionIndex ++;
    createQuestion(questionIndex);
}

const updateScore = (score) => {
  const scoreEl = document.getElementById('score');
  scoreEl.textContent = score;
}

const createContent = (question) => {
    const contentEl = resetElement('content-container');
    const contentDiv = document.createElement('div');
    const contentText = document.createElement('p');
    contentText.textContent = question.content;
    contentDiv.appendChild(contentText);
    // 画像がある場合は表示
    if (question.image) {
        const imageElement = document.createElement('img');
        imageElement.src = question.image;
        contentDiv.appendChild(imageElement);
    }
    contentEl.appendChild(contentDiv);
    return contentEl;
}

const createOptions = (question) => {
    const optionsEl = resetElement('options-container');
    question.options.forEach(option => {
        const optionDiv = createOption(option)
        optionDiv.addEventListener('click', () => {
            onOptionClicked(option, optionDiv)
            updateScore(score);
        })

        optionsEl.appendChild(optionDiv);
    });

    return optionsEl;
}

const createOption = (option) => {
    // 質問を表示するためのdivを作成
    const optionDiv = document.createElement('div');
    optionDiv.id = 'option-' + option.id;
    optionDiv.className = 'option-item';

    // 質問テキストを表示
    const optionText = document.createElement('p');
    optionText.textContent = option.description;
    optionDiv.appendChild(optionText);
    return optionDiv;
}

const main = () => {
  questionIndex = 0;
  score = 0;
  createQuestion(questionIndex);
  updateScore(score);
}

main()

