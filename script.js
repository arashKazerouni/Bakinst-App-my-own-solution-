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
let onlineUserName, arrayOfInputs, currentAccount, currentBalance, counter;
let isSort = false;

let sortedMovements = [];
// Function to Creating short names
const toDilutingName = name => {
  let dilutedName = '';
  const splittedName = name.split(' ');
  for (let i = 0; i < splittedName.length; i++)
    dilutedName += splittedName[i][0].toLowerCase();
  return dilutedName;
};
// Function to get current balance
const getCurrentBalance = acc => acc.movements.reduce((a, b) => a + b, 0);

// Function to Reset inputs
const resetInputs = array => {
  array.forEach(input => {
    input.value = '';
    input.blur();
  });
};
// Function to Show the movements
const showMovements = acc => {
  let sumIn = 0;
  let sumOut = 0;
  let sumInterest = 0;
  containerMovements.innerHTML = '';
  containerApp.style.opacity = 100;
  currentBalance = getCurrentBalance(acc);
  labelBalance.textContent = `${currentBalance}€`;
  counter = 1;
  const movements = isSort ? sortedMovements : acc.movements;
  movements.forEach(mov => {
    const checkDeposit = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${checkDeposit}">${counter++} ${checkDeposit}</div>
    <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // =======================
    // Calculate Sums
    // =======================
    mov > 0 ? (sumIn += mov) : (sumOut -= mov);
    labelSumIn.textContent = `${sumIn}€`;
    labelSumOut.textContent = `${sumOut}€`;
    if (mov > 0) sumInterest += (mov * acc.interestRate) / 100;
    labelSumInterest.textContent = `${sumInterest}€`;
  });
};
// Functions to Calculate Sums
const calculateSums = acc => {};
// ==================================================
// User Login (when click on login button)
// ==================================================
btnLogin.onclick = e => {
  e.preventDefault();
  const userName = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  // Loop on Acoounts
  accounts.forEach(acc => {
    // Check Username and Password While User Login
    if (userName === toDilutingName(acc.owner) && pin === acc.pin) {
      // Welcome And Current Balance
      onlineUserName = userName;
      currentAccount = acc;
      labelWelcome.textContent = `Welcome, Dear ${acc.owner.split(' ')[0]}`;
      // Movements History
      showMovements(acc);
    }
    arrayOfInputs = [inputLoginUsername, inputLoginPin];
    resetInputs(arrayOfInputs);
  });
};
// ==================================================
// Transfering Money
// ==================================================
btnTransfer.onclick = e => {
  e.preventDefault();
  const user = inputTransferTo.value;
  let amount = Number(inputTransferAmount.value);
  accounts.forEach(acc => {
    currentBalance = getCurrentBalance(currentAccount);
    if (
      toDilutingName(acc.owner) === user &&
      amount > 0 &&
      amount <= currentBalance &&
      user !== onlineUserName
    ) {
      acc.movements.push(amount);
      currentAccount.movements.push(-amount);
      showMovements(currentAccount);
    }
  });
  arrayOfInputs = [inputTransferTo, inputTransferAmount];
  resetInputs(arrayOfInputs);
};
// ==================================================
// Requesting Loan
// ==================================================
btnLoan.onclick = e => {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if (loan > 0) currentAccount.movements.push(loan);
  showMovements(currentAccount);
  inputLoanAmount.value = '';
};
// ==================================================
// Closing Account
// ==================================================
btnClose.onclick = e => {
  e.preventDefault();
  const userName = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  if (userName === onlineUserName && pin === currentAccount.pin) {
    console.log('ok');
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
  }
  arrayOfInputs = [inputCloseUsername, inputClosePin];
  resetInputs(arrayOfInputs);
};
// ==================================================
// Sorting Movements
// ==================================================
btnSort.onclick = e => {
  e.preventDefault();
  isSort = !isSort;
  if (isSort)
    sortedMovements = [...currentAccount.movements].sort((a, b) => a - b);
  showMovements(currentAccount);
};
