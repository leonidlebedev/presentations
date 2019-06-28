const {RuleTester} = require('eslint');

const rule = require('../../../lib/rules/no-only');

const ruleTester = new RuleTester();

const expectedErrors = [
    {
        message: "Don't use «only»",
        line: 1,
        column: 11,
        endLine: 1,
        endColumn: 26,
    },
];

ruleTester.run('no-only', rule, {
    valid: [
        'makeSuite("Проверка", {})',
        'makeSuite()',
    ],
    invalid: [
        {
            code: 'makeSuite("only Страница", {})',
            errors: expectedErrors,
        },
        {
            code: 'makeSuite("Страница only", {})',
            errors: expectedErrors,
        },
        {
            code: 'makeSuite("Страница Only", {})',
            errors: expectedErrors,
        },
    ],
});
