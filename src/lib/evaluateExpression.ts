function isOperator(token: string): boolean {
  return ['+', '-', '*', '/'].includes(token);
}

function getPrecedence(op: string): number {
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

function infixToPostfix(tokens: string[]): string[] {
  const output: string[] = [];
  const operatorStack: string[] = [];

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
        output.push(operatorStack.pop()!);
      }
      operatorStack.pop(); // Remove '('
    } else if (isOperator(token)) {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        getPrecedence(operatorStack[operatorStack.length - 1]) >=
          getPrecedence(token)
      ) {
        output.push(operatorStack.pop()!);
      }
      operatorStack.push(token);
    }
  }

  while (operatorStack.length) {
    output.push(operatorStack.pop()!);
  }

  return output;
}

function evaluatePostfix(postfix: string[]): number {
  const stack: number[] = [];

  for (const token of postfix) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;
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
          if (b === 0) throw new Error('Cannot divide by zero');
          stack.push(a / b);
          break;
      }
    }
  }

  return stack[0];
}

module.exports = function calculateExpression(exp: string): number {
  const tokens = exp.match(/\d+(\.\d+)?|\+|\-|\*|\/|\(|\)/g) || [];
  const postfix = infixToPostfix(tokens);
  return evaluatePostfix(postfix);
};
