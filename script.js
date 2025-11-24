// Переработанный скрипт с современными эффектами

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    initParticles();
    initThemeToggle();
    initAnimations();
    initButtonEffects();
    initStatsCounter();
    initParallax();
    initKeyboardShortcuts();
    initConfettiEffect();
    initTypingEffect();
    initProgressBar();
    
    // Анимация появления элементов при загрузке страницы
    const elements = document.querySelectorAll('.logo, .subtitle, .link-button, .thanks-section, .stats-section');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Система частиц на Canvas
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 100 };
    
    // Установка размера canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Создание частиц
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Отскок от краев
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            
            // Взаимодействие с мышью
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 5;
                    this.y -= Math.sin(angle) * force * 5;
                }
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Создание массива частиц
    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    createParticles();
    
    // Соединение частиц линиями
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Анимация
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Отслеживание мыши
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
}

// Переключатель темы
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Проверка сохраненной темы
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Эффект при переключении
        themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }
}

// Анимации элементов
function initAnimations() {
    // Плавная анимация волнистых линий
    const wavyLines = document.querySelectorAll('.wavy-line');
    wavyLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Анимация логотипа при загрузке
    const logo = document.querySelector('.logo-image');
    if (logo) {
        setTimeout(() => {
            logo.style.animation = 'logo-float 6s ease-in-out infinite';
        }, 500);
    }
}

// Эффекты для кнопок
function initButtonEffects() {
    const buttons = document.querySelectorAll('.link-button');
    
    buttons.forEach(button => {
        // Улучшенный hover эффект
        button.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            createRipple(this);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Эффект клика с частицами
        button.addEventListener('click', function(e) {
            createClickParticles(e, this);
            playClickSound();
        });
    });
}

// Создание эффекта пульсации при клике
function createRipple(button) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(59, 130, 246, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Создание частиц при клике
function createClickParticles(event, element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        particle.style.boxShadow = '0 0 10px currentColor';
            
            document.body.appendChild(particle);
            
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 80 + Math.random() * 40;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let opacity = 1;
            let scale = 1;
        let currentX = x;
        let currentY = y;
        
        function animate() {
            currentX += vx * 0.1;
            currentY += vy * 0.1;
                opacity -= 0.02;
                scale -= 0.01;
                
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
                particle.style.opacity = opacity;
                particle.style.transform = `scale(${scale})`;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                particle.remove();
            }
                }
            
            requestAnimationFrame(animate);
        }
    }

// Звуковой эффект при клике
function playClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.15);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
        // Игнорируем ошибки аудио
    }
}

// Счетчик статистики
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Параллакс эффект (улучшенный, без дёрганности)
function initParallax() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    let rafId = null;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 20;
        targetY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        if (!rafId) {
            rafId = requestAnimationFrame(updateParallax);
        }
    });
    
    function updateParallax() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        
        mainContent.style.transform = `perspective(1000px) rotateY(${currentX * 0.1}deg) rotateX(${-currentY * 0.1}deg)`;
        
        if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
            rafId = requestAnimationFrame(updateParallax);
        } else {
            rafId = null;
        }
    }
}

// Добавление CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: currentColor; }
    }
`;
document.head.appendChild(style);

// Плавная загрузка страницы
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

// Горячие клавиши
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K для переключения темы
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) themeToggle.click();
        }
        
        // Escape для сброса анимаций
        if (e.key === 'Escape') {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.style.transform = '';
            }
        }
    });
}

// Эффект конфетти при клике на логотип
function initConfettiEffect() {
    const logo = document.querySelector('.logo-image');
    if (!logo) return;
    
    let clickCount = 0;
    let lastClickTime = 0;
    
    logo.addEventListener('click', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastClickTime < 1000) {
            clickCount++;
        } else {
            clickCount = 1;
        }
        lastClickTime = currentTime;
        
        createConfetti(e.clientX, e.clientY);
        
        // Секретный эффект при 5 кликах подряд
        if (clickCount >= 5) {
            createMegaConfetti();
            clickCount = 0;
        }
    });
    
    function createMegaConfetti() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createConfetti(
                    window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                    window.innerHeight / 2 + (Math.random() - 0.5) * 200
                );
            }, i * 100);
        }
    }
    
    function createConfetti(x, y) {
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
        const confettiCount = 30;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            confetti.style.opacity = '1';
            
            document.body.appendChild(confetti);
            
            const angle = (Math.PI * 2 * i) / confettiCount;
            const velocity = 5 + Math.random() * 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            const rotation = Math.random() * 360;
            const rotationSpeed = (Math.random() - 0.5) * 10;
            
            let currentX = x;
            let currentY = y;
            let currentRotation = rotation;
            let opacity = 1;
            let gravity = 0.3;
            
            function animate() {
                currentX += vx;
                currentY += vy + gravity;
                currentRotation += rotationSpeed;
                opacity -= 0.02;
                gravity += 0.2;
                
                confetti.style.left = currentX + 'px';
                confetti.style.top = currentY + 'px';
                confetti.style.transform = `rotate(${currentRotation}deg)`;
                confetti.style.opacity = opacity;
                
                if (opacity > 0 && currentY < window.innerHeight + 100) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            }
            
            requestAnimationFrame(animate);
        }
    }
}

// Эффект печатания для заголовка благодарности
function initTypingEffect() {
    const thanksTitle = document.querySelector('.thanks-title');
    if (!thanksTitle) return;
    
    const originalText = thanksTitle.textContent;
    thanksTitle.textContent = '';
    thanksTitle.style.borderRight = '2px solid';
    thanksTitle.style.animation = 'blink 1s infinite';
    
    let index = 0;
    function type() {
        if (index < originalText.length) {
            thanksTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(type, 50);
        } else {
            setTimeout(() => {
                thanksTitle.style.borderRight = 'none';
                thanksTitle.style.animation = '';
            }, 1000);
        }
    }
    
    // Запускаем после загрузки страницы
    setTimeout(type, 2000);
}

// Прогресс бар загрузки
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
        width: 0%;
        z-index: 10001;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => progressBar.remove(), 500);
            }, 300);
        }
        progressBar.style.width = progress + '%';
    }, 100);
}

