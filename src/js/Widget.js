// TODO: write code here

// comment this to pass build

export class Widget {
    constructor(element) {
        this.element = element;
        this.input = this.element.querySelector('.input');
        this.submit = this.element.querySelector('.submit');
        this.images = this.element.querySelectorAll('.card-image-item');
        this.errorPaySystem = document.createElement('div');
        this.errorValidation = document.createElement('div');
        this.errorPaySystem.classList.add('error');
        this.errorPaySystem.textContent = 'Данная карта не принадлежит ни к одной из используемых платежных систем! Попробуйте другую!';
        this.errorValidation.classList.add('error');
        this.errorValidation.textContent = 'Недействительный номер карты!';


        this.onInput = this.onInput.bind(this);
        this.element.addEventListener('input', this.onInput);

        this.onSubmit = this.onSubmit.bind(this);
        this.element.addEventListener('submit', this.onSubmit);
    }

    showErrorPaySystem() {
        this.element.appendChild(this.errorPaySystem);
    }

    deleteErrorPaySystem() {
        if (this.errorPaySystem.parentElement) {
            this.errorPaySystem.parentElement.removeChild(this.errorPaySystem);
        }
    }

    showErrorValidation() {
        this.element.appendChild(this.errorValidation);
    }

    deleteErrorValidation() {
        if (this.errorValidation.parentElement) {
            this.errorValidation.parentElement.removeChild(this.errorValidation);
        }
    }

    definePaySystem(value) {
        if (value.length == 0) {
            this.deleteErrorPaySystem();
            this.deleteErrorValidation();
            this.images.forEach(image => {
                image.classList.remove('active')
            })
        }
        if (value.startsWith('2')) {
            this.images[3].classList.add('active')
        }
        else if (value.startsWith('3')) {
            this.images[2].classList.add('active')
        }
        else if (value.startsWith('4')) {
            this.images[0].classList.add('active')
        }
        else if (value.startsWith('5')) {
            this.images[1].classList.add('active')
        } else if (value.length >= 1 && !value.startsWith('2') && !value.startsWith('3') && !value.startsWith('4') && !value.startsWith('5')) {
            this.showErrorPaySystem();
        }
    }

    onInput(e) {
        e.preventDefault();
        const value = this.input.value;
        this.definePaySystem(this.input.value);
    }

    luhnCheck(value) {
        const number = value.toString();
        const digits = number.replace(/\D/g, "").split("").map(Number);
        let sum = 0;
        let isSecond = false;
        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = digits[i];
            if (isSecond) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isSecond = !isSecond;
        }
        return sum % 10 === 0;
    }

    onSubmit(e) {
        e.preventDefault();

        const value = this.input.value;

        if (this.luhnCheck(value)) {
            this.deleteErrorValidation();
            this.input.classList.add('valid');
            this.input.classList.remove('invalid');
            this.input.value = '';
        } else {
            this.input.classList.add('invalid');
            this.input.classList.remove('valid');
            this.showErrorValidation();
        }
    }
}