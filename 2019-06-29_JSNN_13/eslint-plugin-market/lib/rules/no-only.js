module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Disallow «only» in makeSuite',
            category: 'Possible Errors',
        },
        fixable: 'code',
        schema: [],
    },
    create(context) {
        return {
            'CallExpression[callee.name=makeSuite][arguments.0]'(node) {
                const firstArgNode = node.arguments[0];

                if (
                    typeof firstArgNode.value === 'string' &&
                    firstArgNode.value.toLowerCase().includes('only')
                ) {
                    context.report({
                        node,
                        message: "Don't use «only»",
                        loc: firstArgNode.loc,
                        fix(fixer) {
                            const raw = firstArgNode.raw;

                            return fixer.replaceText(
                                firstArgNode,
                                `${raw.replace(/only/ig, '')}`
                            );
                        },
                    });
                }
            },
        };
    },
};