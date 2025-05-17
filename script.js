document.addEventListener('DOMContentLoaded', () => {
    const gradientPreviewArea = document.getElementById('gradientPreviewArea');
    const randomizeBtn = document.getElementById('randomizeGradientBtn');
    const cssCodeElement = document.getElementById('gradientCssCode');
    const copyCssBtn = document.getElementById('copyCssBtn');
    const color1HexElement = document.getElementById('color1Hex');
    const color2HexElement = document.getElementById('color2Hex');
    const colorChip1 = document.getElementById('colorChip1');
    const colorChip2 = document.getElementById('colorChip2');
    const currentYearElement = document.getElementById('currentYear');

    // Icon SVGs for copy button
    const copyIconSvg = copyCssBtn.querySelector('.copy-icon-svg');
    const copiedIconSvg = copyCssBtn.querySelector('.copied-icon-svg');

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    let currentColor1 = '#FFFFFF';
    let currentColor2 = '#000000';
    let currentAngle = 'to right';
    const gradientAngles = [
        'to right', 'to left', 'to bottom', 'to top',
        'to bottom right', 'to bottom left', 'to top right', 'to top left',
        '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg'
    ];

    function getLuminance(hexColor) {
        const rgb = parseInt(hexColor.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >>  8) & 0xff;
        const b = (rgb >>  0) & 0xff;
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function setTextColorBasedOnBackground(hexColor, textElement, chipElement) {
        const luminance = getLuminance(hexColor);
        if (luminance > 140) { // Adjusted threshold for better contrast
            textElement.style.color = '#222222';
            textElement.style.textShadow = 'none';
            chipElement.style.borderColor = 'rgba(0,0,0,0.1)'; // Subtle border for light chips
        } else {
            textElement.style.color = '#FFFFFF';
            textElement.style.textShadow = '0 1px 2px rgba(0,0,0,0.4)';
            chipElement.style.borderColor = 'transparent';
        }
    }
    
    function generateVibrantHexColor() {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 30) + 70; // Saturation: 70-100%
        const l = Math.floor(Math.random() * 30) + 50; // Lightness: 50-80% (avoid too dark/light)
        return hslToHex(h, s, l);
    }

    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        
        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
    }

    function updateGradient() {
        currentColor1 = generateVibrantHexColor();
        let attempts = 0;
        do {
            currentColor2 = generateVibrantHexColor();
            attempts++;
        } while (
            (Math.abs(getLuminance(currentColor1) - getLuminance(currentColor2)) < 60 || // Luminance diff
            colorDistance(hexToRgb(currentColor1), hexToRgb(currentColor2)) < 100) && // Color distance
            attempts < 20
        );

        currentAngle = gradientAngles[Math.floor(Math.random() * gradientAngles.length)];
        const gradientCss = `linear-gradient(${currentAngle}, ${currentColor1}, ${currentColor2})`;
        
        gradientPreviewArea.style.background = gradientCss;
        
        colorChip1.style.backgroundColor = currentColor1;
        color1HexElement.textContent = currentColor1;
        setTextColorBasedOnBackground(currentColor1, color1HexElement, colorChip1);

        colorChip2.style.backgroundColor = currentColor2;
        color2HexElement.textContent = currentColor2;
        setTextColorBasedOnBackground(currentColor2, color2HexElement, colorChip2);
        
        cssCodeElement.textContent = `background: ${gradientCss};`;
    }

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r:0,g:0,b:0}; // Fallback
    }

    function colorDistance(rgb1, rgb2) { // Euclidean distance
        let rDiff = rgb1.r - rgb2.r;
        let gDiff = rgb1.g - rgb2.g;
        let bDiff = rgb1.b - rgb2.b;
        return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
    }


    if (randomizeBtn) {
        randomizeBtn.addEventListener('click', updateGradient);
    }

    if (copyCssBtn) {
        copyCssBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(cssCodeElement.textContent)
                .then(() => {
                    copyIconSvg.style.display = 'none';
                    copiedIconSvg.style.display = 'inline-block';
                    copyCssBtn.classList.add('copied');
                    setTimeout(() => {
                        copyIconSvg.style.display = 'inline-block';
                        copiedIconSvg.style.display = 'none';
                        copyCssBtn.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy CSS: ', err);
                    alert('Failed to copy CSS. Please copy manually.');
                });
        });
    }
    updateGradient();
});
