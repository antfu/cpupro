discovery.view.define('loc-badge', {
    view: 'badge',
    className: 'function-loc',
    data: 'function or $ | marker("function").object |? { ..., text: loc }',
    whenData: 'text',
    content: 'html:text.split(/:/).join(`<span class="delim">:</span>`)',
    postRender(el, _, data) {
        if (data.module.path && data.module.path.match(/^\/|file:\/\/|[a-z]:/i)) {
            const query = new URLSearchParams();
            query.set('file', data.module.path);
            el.target = '_blank';
            el.href = 'https://localfile.link?' + query;
        }
    }
}, { tag: false });
