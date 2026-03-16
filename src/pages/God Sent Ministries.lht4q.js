// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixWindow from 'wix-window';

$w.onReady(function () {
    const readPayload = (event) => {
        if (!event || typeof event !== 'object') {
            return {};
        }

        if (event.detail && typeof event.detail === 'object') {
            return event.detail;
        }

        if (event.data && typeof event.data === 'object') {
            return event.data;
        }

        return event;
    };

    const applyHeight = (el, event) => {
        const data = readPayload(event);
        const rawHeight = Number(data.height);
        if (!Number.isFinite(rawHeight)) {
            return;
        }

        el.height = Math.max(800, Math.ceil(rawHeight));
    };

    const applyNavigate = (el, event) => {
        const detail = readPayload(event);
        const offsetTop = Number(detail.offsetTop);
        if (!Number.isFinite(offsetTop)) {
            return;
        }

        el.scrollTo()
            .then(() => wixWindow.scrollBy(0, Math.max(0, Math.ceil(offsetTop) - 80), { scrollAnimation: true }))
            .catch(() => {});
    };

    $w('CustomElement').forEach((el) => {
        el.on('gsmHeight', (event) => applyHeight(el, event));
        el.on('gsmheight', (event) => applyHeight(el, event));
        el.on('gsmNavigate', (event) => applyNavigate(el, event));
        el.on('gsmnavigate', (event) => applyNavigate(el, event));
    });
});
