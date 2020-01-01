'use stricrt'

{
  const question = document.getElementById('question');
  const chocies = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');


  const quizSet = shuffle([
    { q: '世界で一番大きな湖は?', c: ['カスピ海', 'ヴィクトリア湖', '琵琶湖'] },
    { q: '2の８乗は', c: ['256', '64', '1024'] },
    { q: '次の内、最初にリリースされた言語？', c: ['Python', 'javaScript', 'HTML'] },
  ]);
  let currentNum = 0;
  let isAnswered = false;
  let score = 0;


  function shuffle(arr) {
    let i = arr.lenght - 1;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    // if (isAnswered === true) {
    if (isAnswered) {
      return
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {

    isAnswered = false;

    question.textContent = quizSet[currentNum].q;
    while (chocies.firstChild) {
      chocies.removeChild(chocies.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(chocie => {
      const li = document.createElement('li');
      li.textContent = chocie;
      li.addEventListener('click', () => {
        checkAnswer(li);
      })
      chocies.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      console.log(`Score : ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score : ${score} / ${quizSet.length}`; 
      result.classList.remove('hidden'); 
    } else {
      currentNum++;
      setQuiz();
    }
  });
}