// Cкопіюй код з минулого уроку
document.addEventListener('DOMContentLoaded', () => {

    // ===== Питання на тему Minecraft =====
    const questions = [
        {
            question: "Хто головний бос світу?",
            answers: ["Єдиноріг", "Дракон", "Чат джпт", "Анімешник", "Наш вчитель", "Я"],
            correct: 4
        },
        {
            question: "Кого боїться Алергетик?",
            answers: ["Зомбі", "Скелета", "Вовка", "Кота", "Робота(Артема)", "Вчительку"],
            correct: 3
        },
        {
            question: "Скільки заліза грам потрібно для створення телефона?",
            answers: ["125", "20", "15", "60", "40", "67"],
            correct: 4
        },
        {
            question: "На якій планеті появляються люди?",
            answers: ["Небеса", "Китай", "Енд", "Печери", "Марс", "Земля"],
            correct: 5
        },
         {
            question: "Найкраща країна світу?",
            answers: ["Китай", "Україна", "США", "Португалія", "Коломия", "Всі відповіді правильні"],
            correct: 0
        },
         {
            question: "Яка найкраща гра (для мене)?",
            answers: ["Роблокс", "Бравл Старс", "Калькулятор", "Майнкрафт", "Клеш рояль", "Хованки"],
            correct: 1
        },
         {
            question: "Який найкращий мем?",
            answers: ["67", "52", "Скала Джонсон", "З котами", "Нема такого", "Брейнроти"],
            correct: 4
        },
         {
            question: "Як звати найкращу людину світу?",
            answers: ["Саша", "Валентин", "Артем", "Ілон", "Не знаю", "Іван"],
            correct: 0
        },
         {
            question: "Яка найпопулярніша тварина?",
            answers: ["Кіт", "Собака", "Єнот", "Папуга", "Рибка", "Хом'як"],
            correct: 1
        },
         {
            question: "Ти хто?",
            answers: ["Собака", "Людина", "Хтось", "Напевне відома персона", "Створіння", "Робот"],
            correct: 1
        }
    ];



    // ===== Отримання елементів =====
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const scoreDisplay = document.querySelector('#score-display');
    const timerDisplay = document.querySelector('#timer');

    let questionIndex = 0;
    let score = 0;
    let timer = 20;
    let interval;

    // ===== Показ запитання =====
    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;

        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        }
    }

    // ===== Перевірка відповіді =====
    function checkAnswer(button, i) {
        clearInterval(interval);

        if (i === questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        scoreDisplay.innerText = ` Бали: ${score}`;

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });

        setTimeout(nextQuestion, 1000);
    }

    // ===== Перехід до наступного запитання =====
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    // ===== Показ результату =====
    function showResult() {
        clearInterval(interval);
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }

    // ===== Старт гри =====
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        scoreDisplay.innerText = ` Бали: 0`;
        showQuestion(questions[questionIndex]);
    }

    // ===== Таймер =====
    function startTimer() {
        timer = 20;
        timerDisplay.innerText = `⏱ Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `⏱ Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
                setTimeout(nextQuestion, 500);
            }
        }, 1000);
    }

    // ===== Слухачі подій =====
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});
