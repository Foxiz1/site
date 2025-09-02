// Добавление интерактивности и анимаций

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов при загрузке страницы
    const elements = document.querySelectorAll('.logo, .subtitle, .link-button, .etc-text');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Эффект параллакса для фона
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.body.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });

    // Анимация при наведении на кнопки
    const buttons = document.querySelectorAll('.link-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Эффект пульсации для логотипа
    const logo = document.querySelector('.logo');
    setInterval(() => {
        logo.style.transform = 'scale(1.05)';
        setTimeout(() => {
            logo.style.transform = 'scale(1)';
        }, 200);
    }, 3000);

    // Анимация волнистых линий
    const wavyLines = document.querySelectorAll('.wavy-line');
    wavyLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
    });

    // Добавление звукового эффекта при клике (опционально)
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Создаем простой звуковой эффект
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });

    // Эффект частиц при клике
    document.addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
    });

    function createParticles(x, y) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#8b5cf6';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            document.body.appendChild(particle);
            
            const angle = (i / 5) * Math.PI * 2;
            const velocity = 50 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let opacity = 1;
            let scale = 1;
            
            const animate = () => {
                const currentX = parseFloat(particle.style.left);
                const currentY = parseFloat(particle.style.top);
                
                particle.style.left = (currentX + vx * 0.1) + 'px';
                particle.style.top = (currentY + vy * 0.1) + 'px';
                
                opacity -= 0.02;
                scale -= 0.01;
                
                particle.style.opacity = opacity;
                particle.style.transform = `scale(${scale})`;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(particle);
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    // Добавление эффекта свечения для боковых декораций
    const sideDecorations = document.querySelectorAll('.side-decoration');
    sideDecorations.forEach(decoration => {
        decoration.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) drop-shadow(0 0 10px #8b5cf6)';
        });
        
        decoration.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });

    // Анимация загрузки страницы
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});
