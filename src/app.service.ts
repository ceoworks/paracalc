import { Injectable } from '@nestjs/common';

function isOperand(token: string) {
  return token == '+' || token == '-' || token == '*' || token == '/';
}
function hasPrecedence(op1, op2) {
  if (op2 == '(' || op2 == ')') {
    return false;
  }
  if ((op1 == '*' || op1 == '/') && (op2 == '+' || op2 == '-')) {
    return false;
  } else {
    return true;
  }
}

function applyOp(op: string, b: number, a: number) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b == 0) {
        document.write('Cannot divide by zero');
      }
      return a / b;
  }
  return 0;
}

function isDigit(token: string) {
  return token >= '0' && token <= '9';
}

@Injectable()
export class AppService {
  calculateExpression(exp: string): number {
    const tokens = exp.split('');
    const values: number[] = [];
    const ops = [];

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] == ' ') {
        continue;
      }

      if (isDigit(tokens[i])) {
        let probableNumber = '';
        while (i < tokens.length && isDigit(tokens[i])) {
          probableNumber = probableNumber + tokens[i++];
        }
        values.push(parseInt(probableNumber, 10));
        i--;
      } else if (tokens[i] == '(') {
        ops.push(tokens[i]);
      } else if (tokens[i] == ')') {
        while (ops[ops.length - 1] != '(') {
          values.push(applyOp(ops.pop(), values.pop(), values.pop()));
        }
        ops.pop();
      } else if (isOperand(tokens[i])) {
        while (
          ops.length > 0 &&
          hasPrecedence(tokens[i], ops[ops.length - 1])
        ) {
          values.push(applyOp(ops.pop(), values.pop(), values.pop()));
        }
        ops.push(tokens[i]);
      }
    }
    while (ops.length > 0) {
      values.push(applyOp(ops.pop(), values.pop(), values.pop()));
    }
    return values.pop();
  }
}
