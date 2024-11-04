const buttons = document.querySelectorAll('.button');

const display = document.querySelector('.display');

let currentNumber = '0';
let operator = '';
let previousNumber = '';
let hasDecimal = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    if (button.classList.contains('number')) {
      if (currentNumber === '0') {
        currentNumber = buttonValue;
      } else {
        currentNumber += buttonValue;
      }
      if (currentNumber.length > 14) {
        currentNumber = currentNumber.slice(0, 14);
      }
      display.textContent = currentNumber;
    }

    if (button.classList.contains('operation') && buttonValue !== '=') {
      previousNumber = currentNumber;
      currentNumber = '0';
      operator = buttonValue;
    }

    if (button.classList.contains('function')) {
      switch (buttonValue) {
        case 'AC':
          currentNumber = '0';
          operator = '';
          previousNumber = '';
          hasDecimal = false;
          break;
        case '+/-':
          currentNumber = (parseFloat(currentNumber) * -1).toString();
          break;
        case '%':
          currentNumber = (parseFloat(currentNumber) / 100).toString();
          break;
        case '.':
          if (!hasDecimal) {
            currentNumber += '.';
            hasDecimal = true;
            document.querySelector('.button.dot').disabled = true;
          }
          break;
      }
      if (currentNumber.length > 14) {
        currentNumber = currentNumber.slice(0, 14);
      }
      display.textContent = currentNumber;
    }

    if (buttonValue === '=') {
      if (previousNumber && operator) {
        let result = eval(`${previousNumber} ${operator} ${currentNumber}`);

        result = parseFloat(result.toFixed(7));
        
        if (currentNumber.length > 14) {
          currentNumber = currentNumber.slice(0, 14);
        }
        display.textContent = currentNumber;
        previousNumber = '';
        operator = '';
        hasDecimal = false;
        document.querySelector('.button.dot').disabled = false;
      }
    }
  });
});
