// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {
    $w('CustomElement').forEach((el) => {
        el.on('gsmHeight', (event) => {
            const data = (event && event.detail) || {};
            const rawHeight = Number(data.height);
            if (!Number.isFinite(rawHeight)) {
                return;
            }

            el.height = Math.max(800, Math.ceil(rawHeight));
        });
    });
});
