// Math.random() * (max - min) + min;

const firstInput = document.getElementById('input-first')
const secondInput = document.getElementById('input-second')
const btn = document.getElementById('btn')

let number = Math.random() * (secondInput.value - firstInput.value) + firstInput.value;

console.log(number);
