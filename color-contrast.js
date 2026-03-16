(function() {
    var fgEl = document.getElementById('ccrFg');
    var bgEl = document.getElementById('ccrBg');
    var fgHexEl = document.getElementById('ccrFgHex');
    var bgHexEl = document.getElementById('ccrBgHex');
    var previewEl = document.getElementById('ccrPreview');
    var previewTextEl = document.getElementById('ccrPreviewText');
    var ratioEl = document.getElementById('ccrRatio');
    var aaNormalEl = document.getElementById('ccrAaNormal');
    var aaLargeEl = document.getElementById('ccrAaLarge');
    var aaaNormalEl = document.getElementById('ccrAaaNormal');
    var aaaLargeEl = document.getElementById('ccrAaaLarge');
    var fgLumEl = document.getElementById('ccrFgLum');
    var bgLumEl = document.getElementById('ccrBgLum');

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16)
        };
    }

    function linearize(c) {
        c = c / 255;
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }

    function relativeLuminance(r, g, b) {
        return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
    }

    function contrastRatio(l1, l2) {
        var lighter = Math.max(l1, l2);
        var darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
    }

    function setBadge(el, passed) {
        if (!el) return;
        el.textContent = passed ? 'Pass' : 'Fail';
        el.className = 'ccr-badge ' + (passed ? 'pass' : 'fail');
    }

    function update() {
        var fgHex = fgHexEl ? fgHexEl.value.trim() : '#000000';
        var bgHex = bgHexEl ? bgHexEl.value.trim() : '#ffffff';

        if (!/^#[0-9a-fA-F]{6}$/.test(fgHex)) fgHex = fgEl ? fgEl.value : '#000000';
        if (!/^#[0-9a-fA-F]{6}$/.test(bgHex)) bgHex = bgEl ? bgEl.value : '#ffffff';

        var fg = hexToRgb(fgHex);
        var bg = hexToRgb(bgHex);

        var fgLum = relativeLuminance(fg.r, fg.g, fg.b);
        var bgLum = relativeLuminance(bg.r, bg.g, bg.b);
        var ratio = contrastRatio(fgLum, bgLum);
        var ratioRounded = Math.round(ratio * 100) / 100;

        if (previewEl) { previewEl.style.background = bgHex; }
        if (previewTextEl) { previewTextEl.style.color = fgHex; }

        if (ratioEl) ratioEl.textContent = ratioRounded.toFixed(2) + ':1';
        setBadge(aaNormalEl, ratio >= 4.5);
        setBadge(aaLargeEl, ratio >= 3);
        setBadge(aaaNormalEl, ratio >= 7);
        setBadge(aaaLargeEl, ratio >= 4.5);

        if (fgLumEl) fgLumEl.textContent = fgLum.toFixed(4);
        if (bgLumEl) bgLumEl.textContent = bgLum.toFixed(4);
    }

    if (fgEl) {
        fgEl.addEventListener('input', function() {
            if (fgHexEl) fgHexEl.value = fgEl.value;
            update();
        });
    }
    if (bgEl) {
        bgEl.addEventListener('input', function() {
            if (bgHexEl) bgHexEl.value = bgEl.value;
            update();
        });
    }
    if (fgHexEl) {
        fgHexEl.addEventListener('input', function() {
            var v = fgHexEl.value.trim();
            if (/^#[0-9a-fA-F]{6}$/.test(v) && fgEl) fgEl.value = v;
            update();
        });
    }
    if (bgHexEl) {
        bgHexEl.addEventListener('input', function() {
            var v = bgHexEl.value.trim();
            if (/^#[0-9a-fA-F]{6}$/.test(v) && bgEl) bgEl.value = v;
            update();
        });
    }

    update();
})();
