// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {
    // Auto-resize any custom element that reports its content height.
    $w('CustomElement').forEach((el) => {
        el.onMessage((event) => {
            const data = (event && event.data) || {};
            const rawHeight = Number(data.height);
            if (data.type !== 'gsm-home-page-height' || !Number.isFinite(rawHeight)) {
                return;
            }

            el.height = Math.max(800, Math.ceil(rawHeight));
        });
    });
});
