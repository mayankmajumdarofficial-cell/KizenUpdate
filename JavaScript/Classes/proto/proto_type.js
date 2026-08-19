let name  ="Mayank";
console.log(Object().__proto__);
let person =()=> {
    this.name = name;
}
console.log(name.split("").reverse().join(""));
console.log(name.split("").map((char) => char.toLowerCase()).join("*"));


class Bank {
  // Private Properties and Methods
  #percentageInProfit = 1.5;
  #calculatePercentage() {
    console.log(
      `Your income will be calculated by ${this.#percentageInProfit} * ${this.balance}`
    );
  }
  // Private Properties and Methods

  static bankCode = 'CBIN0078';
  static getBankCode() {
    return `Bank Code: ${this.bankCode}`;
  }

  constructor(name, mobile, email, amount = 0) {
    this.__accountHolderName = name;
    this.mobile = mobile;
    this._email = email;
    this.balance = amount;
  }

  get accountHolderName() {
    return this.__accountHolderName;
  }

  set email(emailvalue) {
    this._email = emailvalue;
  }

  get email() {
    return this._email;
  }

  deposit(amount) {
    this.balance += Number(amount);
    console.log(
      `Amount of Rs. ${amount} is Deposited by ${this.__accountHolderName}`
    );
    console.log(Object());
    this.sendDepositEmail(9000);
  }
  checkBalance() {
    console.log(`Your balance is ${this.balance}`);
  }
  withdraw(amount) {
    if (amount !== undefined && amount !== 0) {
      if (this.balance <= 0 || this.balance < amount) {
        console.log('Insufficient Balance');
        // console.log(InsufficientFundEmail.call(this, amount));
      } else {
        this.balance -= amount;
        console.log(`Amount Withdrawn : Rs ${amount}`);
        console.log(this);

        let sendEmail = this.sendWithdrawEmail.bind(
          this,
          amount,
          this.accountHolderName
        );
        console.log(sendEmail());
      }
    } else {
      console.log(`Please Enter amount to Withdraw(----AMOUNT-----)`);
    }
  }
  getPercentage() {
    console.log(`The Percetage is ${this.#percentageInProfit}`);
    this.#calculatePercentage();
  }
  checkBankProfile() {
    console.log(`Account Holder = ${this.accountHolderName} `);
    console.log(`Mobile no. = ${this.mobile}`);
    console.log(`Email = ${this.email}`);
    console.log(`Account Balance = ${Number(this.balance)}`);
  }
}

Bank.prototype.sendDepositEmail = function (amount) {
  console.log(this);
    return `To ${this.accountHolderName},\n    This is to inform you that amount of Rs.${amount} is deposited`;
};

Bank.prototype.sendWithdrawEmail = function (amount, name) {
  return `To ${name},\n    This is to inform you that amount of Rs.${amount} is withdrawn | Available Balance is ${this.balance}`;
}

Bank.prototype.InsufficientFundEmail = function (amount) {
  return `To ${this.accountHolderName},\n    You're trying to withdraw Balance then available Rs .${amount}`;
}

let obj1 = new Bank('Raj', '5959561000', 'raj45@gmail.com', 522000);

obj1.deposit(9000);
console.log('Calling');

console.log(obj1.sendDepositEmail(90000));
console.log(obj1.sendWithdrawEmail(90000, 'Raj'));
console.log(obj1.InsufficientFundEmail(90000));
