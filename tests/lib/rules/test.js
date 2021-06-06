const rule = require("../../../lib/rules/map"), 
	RuleTester = require("eslint").RuleTester;
const ruleTester = new RuleTester();

ruleTester.run("map", rule, {
    valid: [],
    invalid: [
        {
            code: "_.map([], () => {})",
            errors: [{ message: "error" }]
        },
        {
            code: "_.map([], fn)",
            errors: [{ message: "error" }]
        }
    ]
});