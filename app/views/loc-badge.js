discovery.view.define('loc-badge', {
    view: 'badge',
    className: 'function-loc',
    data: 'function or $ | marker("function").object |? { ..., text: loc }',
    whenData: 'text',
    content: 'html:text.split(/:/).join(`<span class="delim">:</span>`)',
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
