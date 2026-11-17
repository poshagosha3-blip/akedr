
// Анимация появления элементов при прокрутке
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Музыка
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');

async function startMusic() {
    try {
        await music.play();
        musicLabel.textContent = 'Музыканы өшіру';
        musicToggle.querySelector('.music-icon').textContent = 'Ⅱ';
    } catch (error) {
        musicLabel.textContent = 'Музыканы қосу';
        console.log('Музыканы қосу мүмкін болмады:', error);
    }
}

function stopMusic() {
    music.pause();
    musicLabel.textContent = 'Музыканы қосу';
    musicToggle.querySelector('.music-icon').textContent = '♫';
}

// Музыканы қосу/өшіру батырмасы
musicToggle.addEventListener('click', async () => {
    if (music.paused) {
        await startMusic();
    } else {
        stopMusic();
    }
});

// Сыйлықты ашу
const openBtn = document.getElementById('openGift');
const certificate = document.getElementById('certificate');
const closeBtn = document.getElementById('closeGift');

openBtn.addEventListener('click', () => {

    // Музыка осы басудан кейін бірден басталады
    startMusic();

    // Конверт анимациясы
    openBtn.classList.add('opened');

    setTimeout(() => {
        certificate.classList.add('visible');
        certificate.setAttribute('aria-hidden', 'false');

        certificate.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 750);
});

// Сертификатты жабу
closeBtn.addEventListener('click', () => {

    certificate.classList.remove('visible');
    certificate.setAttribute('aria-hidden', 'true');

    openBtn.classList.remove('opened');

    document.getElementById('gift').scrollIntoView({
        behavior: 'smooth'
    });
});
