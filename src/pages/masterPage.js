// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Auto-resize any custom element that reports its content height.
    $w('CustomElement').forEach((el) => {
        el.on('gsmHeight', (event) => {
            const data = (event && event.detail) || {};
            const rawHeight = Number(data.height);
            if (!Number.isFinite(rawHeight)) {
                return;
            }

            el.height = Math.max(800, Math.ceil(rawHeight));
        });

        el.on('gsmNavigate', (event) => {
            const detail = (event && event.detail) || {};
            const offsetTop = Number(detail.offsetTop);
            if (!Number.isFinite(offsetTop)) {
                return;
            }

            el.scrollTo()
                .then(() => wixWindow.scrollBy(0, Math.max(0, Math.ceil(offsetTop) - 80), { scrollAnimation: true }))
                .catch(() => {});
        });
    });
});
