discovery.view.define('package-badge', {
    view: 'badge',
    data: `(module.package or package or $).marker("package") |? {
        ...,
        text: title,
        match: #.filter
    }`,
    whenData: true,
    className: '=`package subject-badge subject-badge_type__${object | registry or type}`',
    content: 'text-match'
}, { tag: false });

discovery.view.define('module-badge', {
    view: 'badge',
    data: `(module or $).marker("module") |? {
        ...,
        text: object | packageRelPath or path or name,
        prefix: object.package | path and name != '(script)' and type not in ['node', 'deno'] and name,
        match: #.filter
    }`,
    whenData: true,
    className: '=`module subject-badge subject-badge_type__${object.package | registry or type}`',
    content: 'text-match'
}, { tag: false });

discovery.view.define('function-badge', {
    view: 'badge',
    data: `(function or $).marker("function") |? {
        $name: object.name;
        ...,
        text: $name,
        prefix: object.module |
            package.type in ["node", "deno"]
                ? packageRelPath
                : (package | name not in ["(script)", "(compiled script)", $name] and name),
        match: #.filter
    }`,
    whenData: true,
    className: '=`function subject-badge subject-badge_type__${object.module.package | registry or type}`',
    content: 'text-match'
}, { tag: false });
