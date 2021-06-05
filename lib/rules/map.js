module.exports = {
	"map": {
		create: (context) => {
			return {
				CallExpression: (node) => {
					const { callee } = node;

					if (
						callee.object && 
						callee.object.name === '_'  && 
						callee.property && 
						callee.property.name === 'map'
					) {
						if (node.arguments[0] && (node.arguments[0].type === 'ArrayExpression')) {
							context.report({
								node,
								message: 'Внимание! Заменить на Array#map(fn())?',
								fix: (fixer) => {
									const arrArgumentToMove = node.arguments[0].elements;
									const functionNode = node.arguments[1];
									const functionNodeText = context.getSourceCode().getText(functionNode);
									return fixer.replaceText(node,`[${[...arrArgumentToMove.map(item => item.value)]}].map(${functionNodeText})`);
								},
							});
						}
					}
				},
			};
		},
	}
};