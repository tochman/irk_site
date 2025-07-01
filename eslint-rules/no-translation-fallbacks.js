// ESLint rule to detect fallback strings in i18next t() function calls
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow fallback strings in i18next t() function calls',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      noFallbackInTranslation: 'Do not use fallback strings in t() function calls'
    }
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.name === 't' && 
          node.arguments.length > 1 &&
          node.arguments[0].type === 'Literal' &&
          node.arguments[1].type === 'Literal'
        ) {
          context.report({
            node,
            messageId: 'noFallbackInTranslation',
          });
        }
      }
    };
  }
};
