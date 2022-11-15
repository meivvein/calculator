const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


class Calculator {
    constructor(displayLast, displayMain) {
        this.displayLast = displayLast;
        this.displayMain = displayMain;
        this.clear();
    }

    appendNumber(number) {
        if (number === '.' && this.currentNumber.includes('.')) return;
        this.currentNumber += number.toString();
    }

    clear() {
        this.lastNumber = '';
        this.currentNumber = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentNumber = this.currentNumber.slice(0, -1);
        this.updateDisplay();
    }

    calculate() {
        if (this.lastNumber === '' || this.currentNumber === '' || isNaN(this.currentNumber)) return;
        const lastNumber = parseFloat(this.lastNumber);
        const currentNumber = parseFloat(this.currentNumber)
        let result;
        switch (this.operation) {
            case '+':
                result = lastNumber + currentNumber;
                break;

            case '−':
                result = lastNumber - currentNumber;
                break;

            case '×':
                result = lastNumber * currentNumber;
                break;

            case '÷':
                result = lastNumber / currentNumber;
                break;
        
            default:
                return;
        }
        this.currentNumber = result.toString();
        this.lastNumber = '';
        this.operation = undefined;
    }

    makeOperation(operation) {
        this.calculate();
        this.operation = operation;
        if (this.currentNumber === '' || isNaN(this.currentNumber)) return;
        this.lastNumber = this.currentNumber;
        this.currentNumber = ''
    }

    makeAction(action) {
        this.calculate();
        if (this.currentNumber === '' || isNaN(this.currentNumber)) return;
        const number = parseFloat(this.currentNumber)
        let result;
        switch (action) {
            case 'x²':
                result = Math.pow(number, 2)
                break;

            case '√x':
                result = Math.sqrt(number)
                break;
                
            case 'x!':
                if (number !== parseInt(this.currentNumber) || number < 0) {
                    this.clear();
                    this.displayMain.innerText = 'Syntax Error';
                    return;
                }
                result = 1;
                if (number !== 0) {
                    for (let i = 1; i <= number; i++) {
                        result *= i;
                        if (result === Infinity) {
                            this.clear();
                            this.displayMain.innerText = 'Infinity';
                            return;
                        }
                    }
                }
                break;
                
            case 'log x':
                result = Math.log2(number)
                break;
        
            default:
                return;
        }
        this.currentNumber = result.toString();
        calculator.updateDisplay();
    }

    updateDisplay() {
        if (this.lastNumber !== '') {
            this.displayLast.innerText = `${this.lastNumber} ${this.operation}`;
        } else {
            this.displayLast.innerText = '';
        }
        this.displayMain.innerText = this.currentNumber;
    }
}


const calculator = new Calculator($('[data-display-last]'), $('[data-display-main]'));


document.addEventListener('DOMContentLoaded', () => {

    // Number buttons
    $$('[data-number]').forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        });
    });

    // Operation buttons
    $$('[data-operation]').forEach(button => {
        button.addEventListener('click', () => {
            calculator.makeOperation(button.innerText);
            calculator.updateDisplay();
        });
    });

    // Action buttons
    $$('[data-action]').forEach(button => {
        button.addEventListener('click', () => {
            calculator.makeAction(button.innerText);
        });
    });

    // Equals button
    $('[data-equals]').addEventListener('click', () => {
        calculator.calculate();
        calculator.updateDisplay();
    });

    // Clear button
    $('[data-clear]').addEventListener('click', () => {
        calculator.clear();
    });
    
    // Delete button
    $('[data-delete]').addEventListener('click', () => {
        calculator.delete()
    });

});