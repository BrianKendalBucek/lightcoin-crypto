class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let sum = 0;
    for (const transaction of this.transactions) {
      sum += transaction.value;
    }

    return sum;
    }


  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      console.log("No funds to withdraw");
    }
  }
}


class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount
  }

}

class Withdrawal extends Transaction {

  isAllowed() {
    if(this.amount > this.account.balance) {
      return false;
    }

    return true;
  }
  get value() {
    return -this.amount;
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(40.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

const t3 = new Deposit(70.00, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);

console.log(myAccount.transactions);
