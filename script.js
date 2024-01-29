let name_input_box = document.getElementById("name-input");
let member_container = document.getElementsByClassName("member-container")[0];
let payment_container = document.getElementsByClassName("payment")[0];
let payment_input = document.getElementById("pay-val");
let payer_name = document.getElementById("payer");

const friends_list = {};
const friends_list_log = {};
function add_friend_name() {
  let val = name_input_box.value;
  if (val in friends_list) {
    show_notification(
      "Error: Already there",
      "The name you entered has already been entered"
    );
  } else if (val.length > 0) {
    friends_list[val] = 0;
    friends_list_log[val] = [];
    add_member(val);
    add_member_payement(val);
    name_input_box.value = "";
  } else {
    show_notification(
      "Error; Empty box",
      "The Name should be greater than 1 character"
    );
  }
}
document.getElementById("friend-add").addEventListener("click", () => {
  add_friend_name();
});
name_input_box.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    add_friend_name();
  }
});
document.getElementById("back").addEventListener("click", () => {
  page(1);
});

function add_member_payement(name) {
  let member = document.createElement("div");
  member.setAttribute("title", name);

  let p_name = document.createElement("p");
  p_name.appendChild(document.createTextNode(name));
  member.appendChild(p_name);
  member.setAttribute("class", "member " + name + "-pay");
  member.addEventListener("click", () => {
    member.classList.toggle("member-clicked");
    update_selected_count();
  });
  payment_container.appendChild(member);
}
function add_member(name) {
  var container = document.createElement("div");
  container.setAttribute("title", name);
  container.setAttribute("class", "member " + name + "-mem");

  // Create the name section
  var nameDiv = document.createElement("div");
  nameDiv.classList.add("name");

  var nameSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  nameSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  nameSvg.setAttribute("fill", "none");
  nameSvg.setAttribute("viewBox", "0 0 24 24");
  nameSvg.setAttribute("stroke-width", "1.5");
  nameSvg.setAttribute("stroke", "currentColor");

  var namePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  namePath.setAttribute("stroke-linecap", "round");
  namePath.setAttribute("stroke-linejoin", "round");
  namePath.setAttribute(
    "d",
    "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
  );

  nameSvg.appendChild(namePath);

  var nameParagraph = document.createElement("p");
  nameParagraph.textContent = name;

  nameDiv.appendChild(nameSvg);
  nameDiv.appendChild(nameParagraph);

  // Create the current value section
  var currentValueDiv = document.createElement("div");
  currentValueDiv.classList.add("current-value");

  var valueSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  valueSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  valueSvg.setAttribute("fill", "none");
  valueSvg.setAttribute("viewBox", "0 0 24 24");
  valueSvg.setAttribute("stroke-width", "1.5");
  valueSvg.setAttribute("stroke", "currentColor");

  var valuePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  valuePath.setAttribute("stroke-linecap", "round");
  valuePath.setAttribute("stroke-linejoin", "round");
  valuePath.setAttribute(
    "d",
    "M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  );

  valueSvg.appendChild(valuePath);

  var valueParagraph = document.createElement("p");
  valueParagraph.classList.add("pranay-mem");
  valueParagraph.setAttribute("title", "Current Status");
  valueParagraph.textContent = "0.0";
  valueParagraph.setAttribute("id", name + "-mem");

  currentValueDiv.appendChild(valueSvg);
  currentValueDiv.appendChild(valueParagraph);

  // Create the action section
  var actionDiv = document.createElement("div");
  actionDiv.classList.add("action");

  function createSvgElement(icon, title) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("fill", "none");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("stroke", "currentColor");

    if (title) {
      var svgTitle = document.createElement("title");
      svgTitle.textContent = title;
      svg.appendChild(svgTitle);
    }

    var svgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    svgPath.setAttribute("stroke-linecap", "round");
    svgPath.setAttribute("stroke-linejoin", "round");
    svgPath.setAttribute("d", icon);

    svg.appendChild(svgPath);

    return svg;
  }

  var showTransactionsSvg = createSvgElement(
    "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
    "Past Transactions"
  );
  showTransactionsSvg.addEventListener("click", () => {
    create_desc_table();
    transaction_update(name);
    page(2);
    document.getElementById("tran-name").textContent = name;
  });
  actionDiv.appendChild(showTransactionsSvg);

  var newPaymentSvg = createSvgElement(
    "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z",
    "New Payment"
  );
  newPaymentSvg.addEventListener("click", () => {
    selected_person = name;
    payer_name.textContent = name;
    page(0);
  });
  actionDiv.appendChild(newPaymentSvg);

  var deleteUserSvg = createSvgElement(
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0",
    "Delete User"
  );
  deleteUserSvg.addEventListener("click", () => {
    if (confirm("Are you sure to delete user " + name + " ?")) {
      delete friends_list[name];
      delete friends_list_log[name];
      container.remove();
      document.getElementsByClassName(name + "-pay")[0].remove();
    }
  });
  actionDiv.appendChild(deleteUserSvg);

  // Append everything to the container
  container.appendChild(nameDiv);
  container.appendChild(currentValueDiv);
  container.appendChild(actionDiv);
  container.addEventListener("click", () => {
    // ASK THE PERSON TO SELECT ONE THAT IS TO PAY OR TO SHOW THE DETAILS ABOUT THAT USER
  });
  member_container.appendChild(container);
}

let sidebar_click = 0;
function sidebar_do() {
  if (sidebar_click == 0) {
    document.getElementsByClassName("sidebar")[0].style.display = "block";
    document.getElementsByClassName("screen")[0].style.paddingLeft = "18%";
    sidebar_click = 1;
  } else {
    document.getElementsByClassName("sidebar")[0].style.display = "none";
    document.getElementsByClassName("screen")[0].style.paddingLeft = "0";
    sidebar_click = 0;
  }
}
document
  .getElementsByClassName("sidebar-logo")[0]
  .addEventListener("click", () => {
    sidebar_do();
  });
// function add_member(name, to) {
//   let member = document.createElement("div");
//   member.setAttribute("title", name);

//   let p_name = document.createElement("p");
//   p_name.appendChild(document.createTextNode(name));
//   member.appendChild(p_name);

//   if (to == 0) {
//     member.setAttribute("class", "member");
//     let p_status = document.createElement("p");
//     p_status.appendChild(document.createTextNode("0.0"));
//     p_status.setAttribute("class", name + "-mem");
//     member.appendChild(p_status);
//     member.addEventListener("click", () => {
//       selected_person = member.getAttribute("title");
//       payer_name.textContent = member.getAttribute("title");
//       page(0);
//     });
//     member_container.appendChild(member);
//   } else {
//     member.setAttribute("class", "member " + name + "-pay");
//     member.addEventListener("click", () => {
//       member.classList.toggle("member-clicked");
//       update_selected_count();
//     });
//     payment_container.appendChild(member);
//   }
// }

let selected_person = "";
let selected_count = 0;
function update_selected_count() {
  let i = document.getElementsByClassName("member-clicked").length;
  document.getElementsByClassName("payment-select-text")[0].textContent =
    i + " Selected";
  selected_count = i;
}

function calculations() {
  let per_person = payment_input.value / selected_count;
  let list_of_person = document.getElementsByClassName("member-clicked");
  let if_there = 0;
  friends_list_log[selected_person].push(["Spent ", payment_input.value]);
  for (let i = 0; i < list_of_person.length; i++) {
    friends_list[list_of_person[i].getAttribute("title")] =
      parseFloat(friends_list[list_of_person[i].getAttribute("title")]) -
      per_person;
    friends_list_log[list_of_person[i].getAttribute("title")].push([
      'Recieved from "' +
        selected_person +
        '" <br > On total transaction of ' +
        payment_input.value,
      -per_person,
    ]);
    if (list_of_person[i].getAttribute("title") == selected_person) {
      if_there = 1;
    }
  }
  if (if_there) {
    friends_list_log[selected_person].pop();
    friends_list_log[selected_person].push(["Spent own money", -per_person]);
  }

  friends_list[selected_person] =
    parseFloat(friends_list[selected_person]) + parseFloat(payment_input.value);
  payment_input.value = "";
  update_per_person();
}

document.getElementById("send").addEventListener("click", () => {
  if (selected_count == 0) {
    show_notification(
      "Error : No selection",
      "Atleast select one person to proceed"
    );
  } else if (payment_input.value == "") {
    show_notification("Error : Empty box", "First write some amount");
  } else {
    calculations();
  }
});

function update_per_person() {
  let ele;
  for (let i in friends_list) {
    ele = document.getElementById(i + "-mem");
    ele.textContent = String(friends_list[i]).substring(0, 5);
    if (parseFloat(friends_list[i]) > 0) {
      ele.style.color = "darkgreen";
    } else if (parseFloat(friends_list[i]) == 0) {
      ele.style.color = "grey";
    } else {
      ele.style.color = "red";
    }
  }
  reset();
  page(1);
}

function reset() {
  selected_count = 0;
  selected_person = "";
  document.getElementsByClassName("payment-select-text")[0].textContent =
    "0 Selected";
  let clas;
  let ui = payment_container.getElementsByClassName("member");
  for (let i of ui) {
    clas = String(i.getAttribute("class"));
    if (clas.includes("member-clicked")) {
      i.setAttribute("class", clas.replace("member-clicked", ""));
    }
  }
}

function create_ele_desc(desc, amt) {
  var newRow = document.createElement("tr");

  // Create and append the first cell with content "a"
  var cell1 = document.createElement("td");
  cell1.innerHTML = desc;
  newRow.appendChild(cell1);

  // Create and append the second cell with content "h"
  var cell2 = document.createElement("td");
  cell2.textContent = amt;
  if (parseFloat(amt) > 0) {
    cell2.setAttribute("class", "green");
  } else {
    cell2.setAttribute("class", "red");
  }
  newRow.appendChild(cell2);
  document.getElementById("desc").appendChild(newRow);
}
function transaction_update(name) {
  let data = friends_list_log[name];

  for (let i of data) {
    create_ele_desc(i[0], i[1]);
  }
}
function create_desc_table() {
  var myTable = document.createElement("table");
  myTable.setAttribute("id", "desc");
  // Create a new table row
  var newRow = document.createElement("tr");
  newRow.className = "head";

  // Create table header cells and add text
  var descriptionHeader = document.createElement("th");
  descriptionHeader.textContent = "Description";

  var amountHeader = document.createElement("th");
  amountHeader.textContent = "Amount";

  // Append the header cells to the new row
  newRow.appendChild(descriptionHeader);
  newRow.appendChild(amountHeader);

  myTable.appendChild(newRow);
  document.getElementsByClassName("table-div")[0].appendChild(myTable);
}
document.getElementById("trans-back").addEventListener("click", () => {
  page(1);
  document.getElementById("desc").remove();
});

function page(num) {
  if (num == 0) {
    document.getElementsByClassName("member-container")[0].style.display =
      "none";
    document.getElementsByClassName("add-friend")[0].style.display = "none";
    document.getElementsByClassName("payment")[0].style.display = "grid";
  } else if (num == 2) {
    document.getElementsByClassName("transaction")[0].style.display = "flex";
    document.getElementsByClassName("member-container")[0].style.display =
      "none";
    document.getElementsByClassName("add-friend")[0].style.display = "none";
  } else {
    document.getElementsByClassName("member-container")[0].style.display =
      "grid";
    document.getElementsByClassName("add-friend")[0].style.display = "block";
    document.getElementsByClassName("transaction")[0].style.display = "none";
    document.getElementsByClassName("payment")[0].style.display = "none";
  }
}

let search_click = 0;
document.getElementById("search-ico").addEventListener("click", () => {
  if (!search_click) {
    document.getElementById("search").parentElement.style.display = "flex";
    document.getElementById("search").style.animationName =
      "width_animation_in";
    document.getElementById("search").parentElement.style.animationName =
      "width_animation_in";
    search_click = 1;
  } else {
    document.getElementById("search").style.animationName =
      "width_animation_out";
    document.getElementById("search").parentElement.style.animationName =
      "width_animation_out";
    setTimeout(() => {
      document.getElementById("search").parentElement.style.display = "none";
      search_click = 0;
    }, 800);
  }
});

function calculator_button(val, cat) {
  let but = document.createElement("button");
  but.appendChild(document.createTextNode(val));
  if (cat == 0) {
    but.setAttribute("class", "cal-num");
    but.addEventListener("click", () => {
      inp_cal.value += val;
    });
  } else if (cat == 1) {
    but.setAttribute("class", "cal-equ");
    but.addEventListener("click", () => {
      let inp_box = document.getElementById("inp-cal");
      let res_box = document.getElementById("res-cal");
      let result = eval(inp_box.value);
      res_box.textContent = inp_box.value;
      inp_box.value = result;
    });
  }
  button_ele.appendChild(but);
}
function show_notification(title, content) {
  document.getElementById("noti-title").textContent = title;
  document.getElementById("noti-text").textContent = content;
  document.getElementsByClassName("notification")[0].style.display = "flex";
  setTimeout(() => {
    document.getElementsByClassName("notification")[0].style.display = "none";
  }, 3000);
}
let button_ele = document.getElementsByClassName("button")[0];
let inp_cal = document.getElementById("inp-cal");
let move_cal = document.getElementsByClassName("move")[0];
let calculator = document.getElementsByClassName("calculator")[0];
let cal_ico = document.getElementById("cal-ico");
let isDown = false;
let offset = [0, 0];
let button_cal = [
  "7",
  "8",
  "9",
  "+",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  ".",
  "*",
  "0",
  "/",
  "=",
];
for (let i of button_cal) {
  if (i == "=") {
    calculator_button(i, 1);
  } else {
    calculator_button(i, 0);
  }
}

move_cal.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    isDown = true;
    offset = [
      calculator.offsetLeft - e.clientX,
      calculator.offsetTop - e.clientY,
    ];
  },
  true
);
move_cal.addEventListener(
  "mouseup",
  function () {
    isDown = false;
  },
  true
);
document.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      if (mousePosition.y < 73) {
        mousePosition.y = 80;
      }
      calculator.style.left = mousePosition.x + offset[0] + "px";
      calculator.style.top = mousePosition.y + offset[1] + "px";
    }
  },
  true
);
let cal_click = 0;
cal_ico.addEventListener("click", () => {
  if (!cal_click) {
    cal_click = 1;
    calculator.style.display = "block";
  } else {
    cal_click = 0;
    calculator.style.display = "none";
    document.getElementById("inp-cal").value = "";
    document.getElementById("res-cal").textContent = "Ans = 0";
  }
});

document.getElementsByClassName("mob-set")[0].addEventListener("click", () => {
  mob_click = 1;
  document.getElementsByClassName("sidebar")[0].style.display = "block";
  document.getElementsByClassName("sidebar")[0].style.animationName =
    "sidebar_width_mob";
});

document.getElementsByClassName("mob-home")[0].addEventListener("click", () => {
  document.getElementsByClassName("sidebar")[0].style.animationName =
    "sidebar_width_mob_1";
  setTimeout(() => {
    document.getElementsByClassName("sidebar")[0].style.display = "none";
  }, 450);
});
