function isOperator(token) {
  return ['+', '-', '*', '/'].includes(token);
}
function getPrecedence(op) {
  switch (op) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
    default:
      return 0;
  }
}
function infixToPostfix(tokens) {
  const output = [];
  const operatorStack = [];
  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      output.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== '('
      ) {
        output.push(operatorStack.pop());
      }
      operatorStack.pop();
    } else if (isOperator(token)) {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        getPrecedence(operatorStack[operatorStack.length - 1]) >=
          getPrecedence(token)
      ) {
        output.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  }
  while (operatorStack.length) {
    output.push(operatorStack.pop());
  }
  return output;
}
function evaluatePostfix(postfix) {
  const stack = [];
  for (const token of postfix) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          if (b === 0) {
            return 'Cannot divide by zero';
          }
          stack.push(a / b);
          break;
      }
    }
  }
  return stack[0];
}
module.exports = function calculateExpression(exp) {
  const tokens = exp.match(/\d+(\.\d+)?|\+|\-|\*|\/|\(|\)/g) || [];
  const postfix = infixToPostfix(tokens);
  return evaluatePostfix(postfix);
};
//# sourceMappingURL=evaluateExpression.js.map
