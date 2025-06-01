// -------- THEME MODE --------
function updateTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}
updateTheme();
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
});

// -------- GAME DATA --------
const languageDatabase = [
    { language: 'Spanish', langCode: 'es', sample: 'Buenos días, ¿cómo estás hoy? Espero que tengas un día maravilloso.' },
    { language: 'French', langCode: 'fr', sample: 'Bonjour, comment allez-vous aujourd\'hui? J\'espère que vous passez une belle journée.' },
    { language: 'German', langCode: 'de', sample: 'Guten Tag, wie geht es Ihnen heute? Ich hoffe, Sie haben einen wunderbaren Tag.' },
    { language: 'Italian', langCode: 'it', sample: 'Buongiorno, come stai oggi? Spero che tu abbia una giornata meravigliosa.' },
    { language: 'Portuguese', langCode: 'pt', sample: 'Bom dia, como está hoje? Espero que tenha um dia maravilhoso.' },
    { language: 'Dutch', langCode: 'nl', sample: 'Goedendag, hoe gaat het vandaag met je? Ik hoop dat je een geweldige dag hebt.' },
    { language: 'Swedish', langCode: 'sv', sample: 'God dag, hur mår du idag? Jag hoppas att du får en underbar dag.' },
    { language: 'Norwegian', langCode: 'no', sample: 'God dag, hvordan har du det i dag? Jeg håper du får en fantastisk dag.' },
    { language: 'Danish', langCode: 'da', sample: 'Goddag, hvordan har du det i dag? Jeg håber, du får en vidunderlig dag.' },
    { language: 'Finnish', langCode: 'fi', sample: 'Hyvää päivää, miten voit tänään? Toivon, että sinulla on ihana päivä.' },
    { language: 'Greek', langCode: 'el', sample: 'Καλημέρα, πώς είσαι σήμερα; Ελπίζω να έχεις μια υπέροχη μέρα.' },
    { language: 'Russian', langCode: 'ru', sample: 'Добрый день, как вы себя чувствуете сегодня? Надеюсь, у вас замечательный день.' },
    { language: 'Polish', langCode: 'pl', sample: 'Dzień dobry, jak się masz dzisiaj? Mam nadzieję, że masz wspaniały dzień.' },
    { language: 'Czech', langCode: 'cs', sample: 'Dobrý den, jak se dnes máte? Doufám, že máte nádherný den.' },
    { language: 'Hungarian', langCode: 'hu', sample: 'Jó napot, hogy vagy ma? Remélem, csodálatos napod van.' },
    { language: 'Romanian', langCode: 'ro', sample: 'Bună ziua, cum ești astăzi? Sper că ai o zi minunată.' },
    { language: 'Turkish', langCode: 'tr', sample: 'Merhaba, bugün nasılsın? Harika bir gün geçirmeni dilerim.' },
    { language: 'Arabic', langCode: 'ar', sample: 'مرحبا، كيف حالك اليوم؟ أتمنى أن يكون يومك رائعا.' },
    { language: 'Hindi', langCode: 'hi', sample: 'नमस्ते, आज आप कैसे हैं? मुझे आशा है कि आपका दिन बहुत अच्छा हो।' },
    { language: 'Japanese', langCode: 'ja', sample: 'こんにちは、今日の調子はどうですか？素晴らしい一日をお過ごしください。' },
    { language: 'Korean', langCode: 'ko', sample: '안녕하세요, 오늘 어떻게 지내세요? 좋은 하루가 되길 바랍니다.' },
    { language: 'Chinese', langCode: 'zh-CN', sample: '你好，今天好吗？希望你有美好的一天。' },
    { language: 'Vietnamese', langCode: 'vi', sample: 'Xin chào, hôm nay bạn thế nào? Chúc bạn một ngày tuyệt vời.' },
    { language: 'Thai', langCode: 'th', sample: 'สวัสดี คุณเป็นอย่างไรบ้างวันนี้? ขอให้คุณมีวันที่ยอดเยี่ยม.' },
    { language: 'Indonesian', langCode: 'id', sample: 'Halo, apa kabar hari ini? Semoga Anda memiliki hari yang indah.' },
    { language: 'Tagalog', langCode: 'tl', sample: 'Kumusta, kamusta ka ngayon? Sana ay magkaroon ka ng magandang araw.' },
    { language: 'Swahili', langCode: 'sw', sample: 'Habari, hali yako ikoje leo? Natumaini una siku nzuri.' },
    { language: 'Icelandic', langCode: 'is', sample: 'Góðan dag, hvernig hefur þú það í dag? Ég vona að þú eigir frábæran dag.' },
    { language: 'Welsh', langCode: 'cy', sample: 'Helo, sut ydych chi heddiw? Gobeithio bod gennych ddiwrnod gwych.' },
    { language: 'Irish', langCode: 'ga', sample: 'Dia dhuit, conas atá tú inniu? Tá súil agam go mbeidh lá iontach agat.' }
];
const commonPhrases = {
    'es': 'Hola, buenos días',         'fr': 'Bonjour, comment ça va',
    'de': 'Hallo, guten Tag',          'it': 'Ciao, buongiorno',
    'pt': 'Olá, bom dia',              'nl': 'Hallo, goedendag',
    'sv': 'Hej, god dag',              'no': 'Hei, god dag',
    'da': 'Hej, goddag',               'fi': 'Hei, hyvää päivää',
    'el': 'Γειά σου, καλημέρα',        'ru': 'Привет, добрый день',
    'pl': 'Cześć, dzień dobry',        'cs': 'Ahoj, dobrý den',
    'hu': 'Szia, jó napot',            'ro': 'Salut, bună ziua',
    'tr': 'Merhaba, iyi günler',       'ar': 'مرحبا، صباح الخير',
    'hi': 'नमस्ते, शुभ दिन',           'ja': 'こんにちは、おはようございます',
    'ko': '안녕하세요, 좋은 아침입니다',     'zh-CN': '你好，早上好',
    'vi': 'Xin chào, chào buổi sáng',  'th': 'สวัสดี, สวัสดีตอนเช้า',
    'id': 'Halo, selamat pagi',        'tl': 'Kumusta, magandang umaga',
    'sw': 'Jambo, habari za asubuhi',  'is': 'Halló, góðan daginn',
    'cy': 'Helo, bore da',             'ga': 'Dia dhuit, maidin mhaith'
};

// -------- GAME STATE --------
let currentStreak = 0;
let bestStreak = 0;
let currentQuestion = null;
let currentOptions = [];
let gameMode = 'text';
let audioAvailable = true;

// -------- DOM ELEMENTS --------
const languageSample   = document.getElementById('language-sample');
const optionsContainer = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText     = document.getElementById('feedback-text');
const currentStreakElement = document.getElementById('current-streak');
const bestStreakElement = document.getElementById('best-streak');
const continueBtn      = document.getElementById('continue-btn');
const newGameBtn       = document.getElementById('new-game-btn');
const audioNotice      = document.getElementById('audio-notice');
const textModeBtn      = document.getElementById('text-mode-btn');
const audioModeBtn     = document.getElementById('audio-mode-btn');

// -------- UTILS --------
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function createTTSUrl(langCode) {
    const phrase = commonPhrases[langCode] || 'Hello';
    const encodedText = encodeURIComponent(phrase);
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${langCode}&client=tw-ob`;
}
function updateModeToggle() {
    textModeBtn.setAttribute('aria-pressed', 'false');
    audioModeBtn.setAttribute('aria-pressed', 'false');
    textModeBtn.querySelector('span:last-child').classList.remove('opacity-100');
    audioModeBtn.querySelector('span:last-child').classList.remove('opacity-100');
    if (gameMode === 'text') {
        textModeBtn.setAttribute('aria-pressed', 'true');
        textModeBtn.querySelector('span:last-child').classList.add('opacity-100');
    } else {
        audioModeBtn.setAttribute('aria-pressed', 'true');
        audioModeBtn.querySelector('span:last-child').classList.add('opacity-100');
    }
}
function celebrateStreak(streak) {
    if (streak % 5 === 0 && streak > 0 && window.confetti) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#7155FF', '#10B981', '#3B82F6']
        });
    }
}

// -------- GAME LOGIC --------
function generateQuestion() {
    const randomIndex = Math.floor(Math.random() * languageDatabase.length);
    currentQuestion = languageDatabase[randomIndex];

    languageSample.textContent = currentQuestion.sample;
    languageSample.classList.add('animate-fade-in');
    setTimeout(() => languageSample.classList.remove('animate-fade-in'), 300);

    // Set up audio
    const audioElement = document.getElementById('language-audio');
    const playButton = document.getElementById('play-audio');
    audioNotice.textContent = '';
    audioNotice.classList.add('hidden');
    if (audioAvailable) {
        const ttsUrl = createTTSUrl(currentQuestion.langCode);
        audioElement.src = ttsUrl;
        playButton.disabled = false;
        playButton.classList.remove('opacity-50');
        playButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071a1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243a1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clip-rule="evenodd" />
            </svg>
            Play Audio
        `;
    } else {
        playButton.disabled = true;
        playButton.classList.add('opacity-50');
        playButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Audio Unavailable
        `;
        languageSample.classList.remove('hidden');
        if (gameMode === 'audio') {
            audioNotice.textContent = 'Audio is unavailable. Using text mode instead.';
            audioNotice.classList.remove('hidden');
        }
    }
    if (gameMode === 'text') {
        languageSample.classList.remove('hidden');
        playButton.classList.add('hidden');
        audioNotice.classList.add('hidden');
    } else {
        languageSample.classList.add('hidden');
        playButton.classList.remove('hidden');
        playButton.classList.remove('bg-gray-200', 'hover:bg-gray-300', 'text-gray-700', 'dark:bg-dark-800', 'dark:hover:bg-dark-700', 'dark:text-gray-200');
        playButton.classList.add('bg-primary-500', 'hover:bg-primary-600', 'text-white');
        if (!audioAvailable) {
            languageSample.classList.remove('hidden');
            audioNotice.textContent = 'Audio is unavailable. Showing text as fallback.';
            audioNotice.classList.remove('hidden');
        } else {
            setTimeout(() => {
                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        playButton.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            Pause Audio
                        `;
                    }).catch(error => {
                        audioNotice.textContent = 'Click "Play Audio" to hear the language';
                        audioNotice.classList.remove('hidden');
                    });
                }
            }, 500);
        }
    }
    let wrongOptions = languageDatabase
        .filter(item => item.language !== currentQuestion.language)
        .map(item => item.language);
    wrongOptions = shuffleArray(wrongOptions).slice(0, 3);
    currentOptions = [currentQuestion.language, ...wrongOptions];
    currentOptions = shuffleArray(currentOptions);
    optionsContainer.innerHTML = '';
    currentOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-button p-4 text-base font-medium rounded-xl shadow-md dark:shadow-lg bg-white dark:bg-dark-850 hover:bg-gray-50 dark:hover:bg-dark-800 transition-all duration-200 animate-scale-in';
        button.style.animationDelay = `${Math.random() * 0.2}s`;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
    feedbackContainer.classList.add('hidden');
}
function checkAnswer(selectedLanguage) {
    feedbackContainer.classList.remove('hidden');
    if (selectedLanguage === currentQuestion.language) {
        currentStreak++;
        currentStreakElement.textContent = currentStreak;
        currentStreakElement.parentElement.classList.add('animate-bounce-once');
        setTimeout(() => currentStreakElement.parentElement.classList.remove('animate-bounce-once'), 500);
        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
            bestStreakElement.textContent = bestStreak;
            bestStreakElement.parentElement.classList.add('animate-bounce-once');
            setTimeout(() => bestStreakElement.parentElement.classList.remove('animate-bounce-once'), 500);
        }
        celebrateStreak(currentStreak);
        feedbackContainer.className = 'my-6 p-5 rounded-2xl text-center glass-card animate-scale-in bg-correct-50 dark:bg-correct-900/20 border border-correct-200 dark:border-correct-800';
        feedbackText.className = 'text-lg font-medium text-correct-700 dark:text-correct-300';
        feedbackText.textContent = `Correct! That was ${currentQuestion.language}.`;
        continueBtn.classList.remove('bg-primary-500', 'hover:bg-primary-600');
        continueBtn.classList.add('bg-correct-500', 'hover:bg-correct-600');
    } else {
        currentStreak = 0;
        currentStreakElement.textContent = currentStreak;
        feedbackContainer.className = 'my-6 p-5 rounded-2xl text-center glass-card animate-scale-in bg-incorrect-50 dark:bg-incorrect-900/20 border border-incorrect-200 dark:border-incorrect-800';
        feedbackText.className = 'text-lg font-medium text-incorrect-700 dark:text-incorrect-300';
        feedbackText.textContent = `Oops! That was ${currentQuestion.language}.`;
        continueBtn.classList.remove('bg-primary-500', 'hover:bg-primary-600');
        continueBtn.classList.add('bg-incorrect-500', 'hover:bg-incorrect-600');
        Array.from(optionsContainer.children).forEach(button => {
            if (button.textContent === currentQuestion.language) {
                button.classList.add('bg-correct-500', 'text-white', 'dark:bg-correct-600');
            }
            if (button.textContent === selectedLanguage) {
                button.classList.add('bg-incorrect-500', 'text-white', 'dark:bg-incorrect-600', 'animate-shake');
            }
        });
    }
    const audioElement = document.getElementById('language-audio');
    if (!audioElement.paused) audioElement.pause();
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
        button.classList.add('opacity-75');
    });
}
function startNewGame() {
    currentStreak = 0;
    currentStreakElement.textContent = '0';
    generateQuestion();
}
function continueGame() {
    continueBtn.classList.remove('bg-correct-500', 'hover:bg-correct-600', 'bg-incorrect-500', 'hover:bg-incorrect-600');
    continueBtn.classList.add('bg-primary-500', 'hover:bg-primary-600');
    generateQuestion();
}
function setupAudioPlayback() {
    const audioElement = document.getElementById('language-audio');
    const playButton = document.getElementById('play-audio');
    playButton.addEventListener('click', () => {
        if (audioElement.paused) {
            const playPromise = audioElement.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    playButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        Pause Audio
                    `;
                    if (audioElement.readyState < 3) playButton.classList.add('animate-pulse-slow');
                    audioAvailable = true;
                }).catch(error => { handleAudioError(); });
            }
        } else {
            audioElement.pause();
            playButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071a1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243a1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clip-rule="evenodd" />
                </svg>
                Play Audio
            `;
            playButton.classList.remove('animate-pulse-slow');
        }
    });
    audioElement.addEventListener('playing', () => {
        playButton.classList.remove('animate-pulse-slow');
    });
    audioElement.addEventListener('ended', () => {
        playButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071a1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243a1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clip-rule="evenodd" />
            </svg>
            Play Audio
        `;
    });
    audioElement.addEventListener('error', () => { handleAudioError(); });
}
function handleAudioError() {
    audioAvailable = false;
    if (gameMode === 'audio') languageSample.classList.remove('hidden');
    audioNotice.textContent = 'Audio unavailable due to browser restrictions. Using text mode instead.';
    audioNotice.classList.remove('hidden');
    const playButton = document.getElementById('play-audio');
    playButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        Audio Unavailable
    `;
    playButton.disabled = true;
    playButton.classList.add('opacity-50');
    playButton.classList.remove('animate-pulse-slow');
}
function setupGameModeSwitching() {
    textModeBtn.addEventListener('click', () => {
        if (gameMode !== 'text') {
            gameMode = 'text';
            updateModeToggle();
            startNewGame();
        }
    });
    audioModeBtn.addEventListener('click', () => {
        if (gameMode !== 'audio') {
            gameMode = 'audio';
            updateModeToggle();
            if (!audioAvailable) {
                audioNotice.textContent = 'Audio is unavailable. Using text mode instead.';
                audioNotice.classList.remove('hidden');
            }
            startNewGame();
        }
    });
    updateModeToggle();
}

// -------- EVENT LISTENERS --------
continueBtn.addEventListener('click', continueGame);
newGameBtn.addEventListener('click', startNewGame);
setupAudioPlayback();
setupGameModeSwitching();
generateQuestion();
