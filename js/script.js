'use strict';

// Data
const account1 = {
  owner: 'Catalin P',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Beatrice C',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2211,
};

const account3 = {
  owner: 'Stefan Stefan Cristian',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3311,
};

const account4 = {
  owner: 'Vasile P',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4411,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    // empty the container
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;

    // insert new child element 'html' right afterbegin of the parent element 'containerMovements'
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // with the beforeend the order of the movements would be inverted.
    // each new element would simply be added after the previous one
  });
};

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  labelBalance.textContent = `${balance} EUR`;
};

function calcDisplaySummary(acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((intere, i, arr) => {
      return intere >= 1;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  labelSumInterest.textContent = `${interest}€`;
}

const createUsernames = function (accs) {
  // modify the objects so the elements that already exist in the accounts array // loop over accounts
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((word) => word[0]) // create a new simple array wich only contains the initials of names it is used on
      .join('');
  });
};
createUsernames(accounts);

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (event) {
  // Prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // optional chaining '?.' if currentAccount exists
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(
      ' '[0]
    )}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display movements
    displayMovements(currentAccount.movements);

    // Display balance
    calcDisplayBalance(currentAccount.movements);

    // Display summary
    calcDisplaySummary(currentAccount);
  }
});
