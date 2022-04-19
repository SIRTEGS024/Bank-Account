// BUSINESS LOGIC
function Bank() {
  this.accounts = {};
  this.currentId = 2209146835;
}
Bank.prototype.assignID = function () {
  this.currentId += 1268;
  return this.currentId;
};
Bank.prototype.addAccount = function (account) {
  account.id = this.assignID();
  this.accounts[account.id] = account
}
Bank.prototype.deleteAccount = function (id) {
  if (this.accounts[id] === undefined) {
    return false;
  }
  delete this.accounts[id];
  return true;
};

Bank.prototype.findAccount = function (id) {
  if (this.accounts[id] != undefined) {
    return this.accounts[id];
  }
  return false;
};

function account(name, balance) {
  this.name = name
  this.balance = balance
  this.history = ["Credit:$"+ balance]
  }

account.prototype.makeDeposit = function (amount) {
  $("#warn").hide();
  this.balance += parseInt(amount);
  this.history.push("Credit:$" + amount);
}
account.prototype.makeWithdrawl = function (amount) {
  if (amount > this.balance) {
    $("#warn").show();
  } else {
    $("#warn").hide();
    this.balance -= parseInt(amount);
    this.history.push("Debit:$" + amount);
  }
}
account.prototype.getHistory = function () {
  let output = "";
  for(let i=0; i<this.history.length; i++) {
    if(this.history[i].toString().includes("Debit")){
      output += "<span class='negative'>" + this.history[i] + "</span>";
    } else {
      output +=  this.history[i];
    }
    if(i < this.history.length-1) {
      output += ", ";
    }
  }
  return output;
}

let bank = new Bank();

function displayAccount(bank) {
  let accList = $("#accSelect");
  let accHTML = "";
  Object.keys(bank.accounts).forEach(function (key) {
    const account = bank.findAccount(key);
    accHTML += "<option id=" + account.id + ">" + account.name + "</option>";
  });
  accList.html(accHTML);
}
function showAccount(accountId) {
  const account = bank.findAccount(accountId);
  $("#balanceDisp").show();
  $("#accName").html(account.name);
  $("#accNum").html(account.id);
  $("#curBal").html("$" + account.balance);
  $("#accHistory").html(account.getHistory());
}
function getSelectedAccount() {
  return parseInt($("#accSelect").children(":selected").attr("id"));
}

// UI
$(document).ready(function () {
  $("input:radio[value=new]").click(function () {
    $("#current").hide();
    $("#new").fadeIn("slow");
  });
  $("input:radio[value=current]").click(function () {
    $("#current").fadeIn("slow");
    $("#new").hide();
  });
});

$(document).ready(function () {
  $(".newAccForm").submit(function (event) {
    event.preventDefault();
    let name = $("#inputName").val();
    let deposit = parseInt($("#initialDeposit").val());
    if (deposit < 1000) {
      $("#balanceDisp").hide();
      $("#warn2").show();
    } else {
      $("#warn2").hide();
    let newAccount = new account(name, deposit);
    bank.addAccount(newAccount);
    $("#inputName").val("");
    $("#initialDeposit").val("");
    displayAccount(bank);
    showAccount(getSelectedAccount());
    }
  });


  $("#transactionForm").submit(function (event) {
    event.preventDefault();
    let deposit = $("#newDeposit").val();
    let withdraw = $("#newWithdraw").val();
    $("#newDeposit").val("");
    $("#newWithdraw").val("");
    if (getSelectedAccount()) {
      if (deposit) {
        bank.findAccount(getSelectedAccount()).makeDeposit(deposit);
      }
      if (withdraw) {
        bank.findAccount(getSelectedAccount()).makeWithdrawl(withdraw);
      }
      showAccount(getSelectedAccount());
    }
  });
  $("#accSelect").change(function () {
    showAccount(getSelectedAccount());
  });
});
