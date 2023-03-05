'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
// Labels
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
// Containers
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
// Buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
// Inputs
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
//====================
// User Login
//====================
// Function to Creating short names
const toDilutedName = name => {
  let dilutedName = '';
  const splittedName = name.split(' ');
  for (let i = 0; i < splittedName.length; i++)
    dilutedName += splittedName[i][0].toLowerCase();
  return dilutedName;
};

btnLogin.onclick = e => {
  e.preventDefault();
  // Variables
  const userName = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  // Loop on
  accounts.forEach(acc => {
    // Variables
    let currentBalance = acc.movements.reduce((a, b) => a + b, 0);
    const html = acc => {};
    // Check Username and Password While User Login
    if (userName === toDilutedName(acc.owner) && pin === acc.pin) {
      // Replacing Data in main App container
      // Welcome And Current Balance
      labelWelcome.textContent = `Welcome, Dear ${acc.owner.split(' ')[0]}`;
      labelBalance.textContent = `${currentBalance}€`;
      // Movements History
      acc.movements.forEach(mov => {
        // console.log(mov);
        // Rows will appear here
        containerMovements.insertAdjacentHTML(
          'afterbegin',
          `<div class="movements__row">
          <div class="movements__type movements__type--deposit">2 deposit</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `
        );
      });
    }
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
  });
};
