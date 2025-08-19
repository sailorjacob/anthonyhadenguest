// Dynamic Balloon Background Randomizer
// Randomly positions and rotates balloon faces on page load

document.addEventListener('DOMContentLoaded', function() {
    // Balloon face URLs - black lines for light backgrounds, white lines for dark
    const blackLineBalloons = [
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/1.png',
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/2.png',
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/3.png',
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/4.png',
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/5.png',
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/7.png'
    ];

    const whiteLineBalloons = [
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/8.png',
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/9.png',
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/10.png',
        'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/havensvgs/balloon%20faces/11.png'
    ];

    // Random helper functions
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomBalloon(balloonArray) {
        return balloonArray[Math.floor(Math.random() * balloonArray.length)];
    }

    // Corner positioning options for dramatic cropping
    const cornerPositions = [
        { top: '-30%', left: '-30%', transform: 'rotate(-15deg)' },
        { top: '-30%', right: '-30%', transform: 'rotate(15deg)' },
        { bottom: '-30%', left: '-30%', transform: 'rotate(15deg)' },
        { bottom: '-30%', right: '-30%', transform: 'rotate(-15deg)' },
        { top: '-20%', left: '20%', transform: 'rotate(-25deg)' },
        { top: '-20%', right: '20%', transform: 'rotate(25deg)' },
        { bottom: '-20%', left: '30%', transform: 'rotate(20deg)' },
        { bottom: '-20%', right: '30%', transform: 'rotate(-20deg)' }
    ];

    function randomizeBalloon(balloonElement, balloonArray) {
        if (!balloonElement) return;

        // Get random balloon image
        const balloonUrl = getRandomBalloon(balloonArray);
        
        // Get random position
        const position = cornerPositions[Math.floor(Math.random() * cornerPositions.length)];
        
        // Apply random rotation (additional to position rotation)
        const extraRotation = getRandomInt(-10, 10);
        const currentRotation = position.transform.match(/rotate\(([^)]+)\)/);
        const baseRotation = currentRotation ? parseInt(currentRotation[1]) : 0;
        const finalRotation = baseRotation + extraRotation;

        // Apply styles
        balloonElement.style.backgroundImage = `url(${balloonUrl})`;
        balloonElement.style.top = position.top || 'auto';
        balloonElement.style.bottom = position.bottom || 'auto';
        balloonElement.style.left = position.left || 'auto';
        balloonElement.style.right = position.right || 'auto';
        balloonElement.style.transform = `rotate(${finalRotation}deg)`;
        
        // Random scale for variety
        const scale = getRandomFloat(0.8, 1.2);
        balloonElement.style.transform += ` scale(${scale})`;
    }

    // Apply random balloons to each section
    const heroBalloon = document.getElementById('hero-balloon');
    const aboutBalloon = document.getElementById('about-balloon');
    const signatureBalloon = document.getElementById('signature-balloon');
    const quoteBalloon = document.getElementById('quote-balloon');

    // Light sections use black-line balloons
    if (heroBalloon) randomizeBalloon(heroBalloon, blackLineBalloons);
    if (aboutBalloon) randomizeBalloon(aboutBalloon, blackLineBalloons);
    if (signatureBalloon) randomizeBalloon(signatureBalloon, blackLineBalloons);
    
    // Dark section uses white-line balloons
    if (quoteBalloon) randomizeBalloon(quoteBalloon, whiteLineBalloons);

    console.log('🎈 Balloon backgrounds randomized!');
});
