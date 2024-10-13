import { Widget } from "./Widget";

describe("Widget", () => {
  let widget;
  let element;
  let input;
  let images;
  beforeEach(() => {
    element = document.createElement("div");
    element.innerHTML = `
      <input class="input" type="text">
      <div class="card-images">
        <img class="card-image-item" src="./img/visa.png" alt="Visa">
        <img class="card-image-item" src="./img/creditcard-mastercard.png" alt="Mastercard">
        <img class="card-image-item" src="./img/credit-american-express.png" alt="American Express">
        <img class="card-image-item" src="./img/icons8-мир-48.png" alt="Мир">
      </div>
  `;
    document.body.appendChild(element);
    widget = new Widget(element);
    input = element.querySelector(".input");
    images = element.querySelectorAll(".card-image-item");
  });

  test("should define pay system based on the first symbol in input", () => {
    widget.definePaySystem("22222");
    expect(images[3].classList.contains("active")).toBe(true);
    widget.definePaySystem("33333");
    expect(images[2].classList.contains("active")).toBe(true);
    widget.definePaySystem("44444");
    expect(images[0].classList.contains("active")).toBe(true);
    widget.definePaySystem("55555");
    expect(images[1].classList.contains("active")).toBe(true);
  });

  test("should remove 'active' class from all images when the input is empty", () => {
    widget.definePaySystem("22222");
    expect(images[3].classList.contains("active")).toBe(true);
    widget.definePaySystem("");
    images.forEach(image => {
      expect(image.classList.contains("active")).toBe(false);
    });
  });

  test("should show error if the first digit is not 2, 3, 4, or 5", () => {
    widget.definePaySystem("11111");
    expect(widget.errorPaySystem.textContent).toContain(
      "Данная карта не принадлежит ни к одной из используемых платежных систем! Попробуйте другую!"
    );
  });

  test("should check the invalidity of card number using Lugn algorithm", () => {
    expect(widget.luhnCheck('55478965612145')).toBe(false);
  })

  test("should check the validity of card number using Lugn algorithm", () => {
    expect(widget.luhnCheck('5062821234567892')).toBe(true);
  })

  test("should add 'invalid' class to input if card number in invalid", () => {
    const invalidCardNumber = '55478965612145';
    widget.input.value = invalidCardNumber;
    const event = new Event('submit');
    widget.element.dispatchEvent(event);
    expect(widget.input.classList.contains('invalid')).toBe(true);
    expect(widget.errorValidation.parentElement).toBe(widget.element);
  });

  test("should add 'valid' class to input if card number in valid", () => {
    const validCardNumber = '5062821234567892';
    widget.input.value = validCardNumber;
    const event = new Event('submit');
    widget.element.dispatchEvent(event);
    expect(widget.input.value).toBe('');
    expect(widget.input.classList.contains('valid')).toBe(true);
  });

  test("should show error if card number in invalid", () => {
    const invalidCardNumber = '55478965612145';
    widget.input.value = invalidCardNumber;
    const event = new Event('submit');
    widget.element.dispatchEvent(event);
    expect(widget.errorValidation.textContent).toContain(
      "Недействительный номер карты!"
    );
  })

  afterEach(() => {
    document.body.removeChild(element);
  });
})

