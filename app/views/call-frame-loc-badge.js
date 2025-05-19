discovery.view.define('call-frame-loc-badge', {
    view: 'badge',
    className: 'call-frame-loc',
    data: `
        callFrame or $
        | marker("call-frame").object
        | loc and loc != ':0:0' ? { ..., text: loc }
    `,
    whenData: true,
    content: 'html:text.replace(/:/, `<span class="delim">:</span>`)',
    postRender(el, _, data) {
        let useProtocol = false;

        if (data.module.path && data.module.path.match(/^(?:\/|[a-z]:|file:\/\/)/i)) {
            const filepath = data.module.path + data.text;
            if (window.handleOpenInEditor) {
                window.handleOpenInEditor(el, filepath);
            }
            if (useProtocol) {
                el.href = 'localfile://' + filepath;
            } else {
                el.target = '_blank';
                el.href = 'https://localfile.link?' + new URLSearchParams({
                    file: filepath
                }).toString();
            }
        }
    }
}, { tag: false });
