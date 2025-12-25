document.addEventListener('DOMContentLoaded', () => {
    // Buat elemen kursor
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // Buat elemen follower kursor
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    // Variabel untuk posisi kursor
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let isHovering = false;

    // Update posisi kursor
    const updateCursor = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update posisi kursor utama
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

        // Update posisi follower dengan delay untuk efek mengikuti
        if (!isHovering) {
            followerX += (mouseX - followerX) / 6;
            followerY += (mouseY - followerY) / 6;
            
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        }

        // Efek saat mengarahkan ke elemen interaktif
        const target = e.target;
        if (target.matches('a, button, .interactive, [data-cursor-hover]')) {
            cursor.classList.add('hover');
            isHovering = true;
            
            // Posisi follower tepat di belakang kursor utama saat hover
            cursorFollower.style.left = `${mouseX}px`;
            cursorFollower.style.top = `${mouseY}px`;
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
        } else {
            cursor.classList.remove('hover');
            isHovering = false;
            cursorFollower.style.transform = 'translate(-50%, -50%)';
        }
    };

    // Efek saat mengklik
    const handleClick = () => {
        cursor.classList.add('click');
        setTimeout(() => cursor.classList.remove('click'), 300);
    };

    // Efek saat mouse bergerak
    const handleMouseMove = (e) => {
        updateCursor(e);
        
        // Efek partikel saat mouse bergerak
        if (Math.random() > 0.7) {
            const particle = document.createElement('div');
            particle.classList.add('cursor-particle');
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            document.body.appendChild(particle);
            
            // Hapus partikel setelah animasi selesai
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    // Sembunyikan kursor default
    document.body.style.cursor = 'none';

    // Style untuk partikel
    const style = document.createElement('style');
    style.textContent = `
        .cursor-particle {
            position: fixed;
            width: 4px;
            height: 4px;
            background-color: #333;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            animation: particleFade 1s ease-out forwards;
            mix-blend-mode: difference;
        }

        @keyframes particleFade {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(
                    ${Math.random() * 100 - 50}px, 
                    ${Math.random() * 100 - 50}px
                ) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
