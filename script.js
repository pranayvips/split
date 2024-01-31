let name_input_box = document.getElementById("name-input");
let member_container = document.getElementsByClassName("member-container")[0];
let payment_container = document.getElementsByClassName("payment")[0];
let payment_input = document.getElementById("pay-val");
let payer_name = document.getElementById("payer");
let LOGED_IN = 0;
function update_set_data() {
  if (LOGED_IN) {
    let name = JSON.stringify(friends_list);
    let data = JSON.stringify(friends_list_log);
    localStorage.setItem("name", name);
    localStorage.setItem("data", data);
  }
}

var friends_list = {};
var friends_list_log = {};
function check_log_in() {
  let datas = localStorage.getItem("user");
  if (datas) {
    document.getElementsByClassName("log-ele")[0].textContent =
      datas.split(";;")[0];
    document.getElementsByClassName(
      "log-ele"
    )[1].innerHTML = `<span class="log-ele">Signed In </span><br />:)`;
    document.getElementsByClassName("signup")[0].remove();
    document.getElementsByClassName("del-sign")[0].style.display = "flex";
    LOGED_IN = 1;
    if (localStorage.getItem("name")) {
      friends_list = JSON.parse(localStorage.getItem("name"));
      friends_list_log = JSON.parse(localStorage.getItem("data"));
      for (let i in friends_list) {
        add_friend_name(i);
        document.getElementById(i + "-mem").textContent = friends_list[i];
        // console.log(document.getElementById(i + "-mem").textContent)
      }
      update_per_person(1);
    }
  } else {
    show_notification(
      "Not Signed In",
      "Your data will not be saved. Sign up to use this feature"
    );
  }
}
check_log_in();

function add_friend_name(name = "") {
  if (name == "") {
    let val = name_input_box.value;
    if (val in friends_list) {
      show_notification(
        "Error: Already there",
        "The name you entered has already been entered"
      );
    } else if (val.length > 0) {
      friends_list[val] = 0;
      friends_list_log[val] = [];
      update_set_data();
      add_member(val);
      add_member_payement(val);
      name_input_box.value = "";
    } else {
      show_notification(
        "Error; Empty box",
        "The Name should be greater than 1 character"
      );
    }
  } else {
    add_member(name);
    add_member_payement(name);
    name_input_box.value = "";
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
function add_member(name = "") {
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
  valueParagraph.textContent = "0.0";
  valueParagraph.setAttribute("id", name + "-mem");

  currentValueDiv.appendChild(valueSvg);
  currentValueDiv.appendChild(valueParagraph);
  currentValueDiv.setAttribute("title", "Current Status");
  currentValueDiv.addEventListener("click", () => {
    showValDiv.style.animationName = "fade_in";
    showValDiv.classList.toggle("show-val-dis");
  });

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
    let amt = document.getElementById(name + "-mem").textContent;
    document.getElementById("bal-amt").textContent = amt;
    if (parseFloat(amt) > 0) {
      document.getElementById("bal-amt").style.color = "green";
      document.getElementById("bal-ico").style.color = "green";
    } else if (parseFloat(amt) == 0) {
      document.getElementById("bal-amt").style.color = "#5f3dc3";
      document.getElementById("bal-ico").style.color = "#5f3dc3";
    } else {
      document.getElementById("bal-amt").style.color = "red";
      document.getElementById("bal-ico").style.color = "red";
    }
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
    confirm_box(
      "Delete User",
      "Are you sure to delete user " + name + " ?",
      () => {
        try {
          delete friends_list[name];
          delete friends_list_log[name];
          update_set_data();
          container.remove();
          document.getElementsByClassName(name + "-pay")[0].remove();
        } catch (error) {}
      }
    );
  });
  actionDiv.appendChild(deleteUserSvg);

  // Create parent div
  var showValDiv = document.createElement("div");
  showValDiv.className = "show-val";

  // Create first SVG element
  var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg1.setAttribute("fill", "none");
  svg1.setAttribute("viewBox", "0 0 24 24");
  svg1.setAttribute("stroke-width", "1.5");
  svg1.setAttribute("stroke", "currentColor");

  var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");
  path1.setAttribute(
    "d",
    "M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
  );

  // Append path to svg1
  svg1.appendChild(path1);
  svg1.addEventListener("click", () => {
    showValDiv.style.animationName = "fade_out";
    setTimeout(() => {
      showValDiv.classList.toggle("show-val-dis");
    }, 150);
  });

  // Append svg1 to showValDiv
  showValDiv.appendChild(svg1);

  // Create paragraph element
  var paragraph = document.createElement("p");
  paragraph.setAttribute("align", "center");
  // paragraph.innerHTML = 'In <span>debt</span> of :';
  let spanEle = document.createElement("span");
  spanEle.setAttribute("id", name + "-shw-txt");
  spanEle.appendChild(document.createTextNode("Credit"));
  paragraph.appendChild(spanEle);

  // Append paragraph to showValDiv
  showValDiv.appendChild(paragraph);

  // Create second div
  var secondDiv = document.createElement("div");

  // Create second SVG element
  var svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg2.setAttribute("fill", "none");
  svg2.setAttribute("viewBox", "0 0 24 24");
  svg2.setAttribute("stroke-width", "1.5");
  svg2.setAttribute("stroke", "currentColor");

  var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");
  path2.setAttribute(
    "d",
    "M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  );

  // Append path to svg2
  svg2.appendChild(path2);

  // Append svg2 to secondDiv
  secondDiv.appendChild(svg2);

  // Create paragraph element for the number
  var numberParagraph = document.createElement("p");
  numberParagraph.innerHTML = "0";
  numberParagraph.setAttribute("id", name + "-shw-val");

  // Append numberParagraph to secondDiv
  secondDiv.appendChild(numberParagraph);

  // Append secondDiv to showValDiv
  showValDiv.appendChild(secondDiv);

  // Append everything to the container
  container.appendChild(nameDiv);
  container.appendChild(currentValueDiv);
  container.appendChild(actionDiv);
  container.appendChild(showValDiv);
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
    document.documentElement.style.setProperty("--sidebar-pad", "18%");
    sidebar_click = 1;
  } else {
    document.getElementsByClassName("sidebar")[0].style.display = "none";
    document.documentElement.style.setProperty("--sidebar-pad", "0%");
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
  let payment_value = payment_input.value;
  let per_person = payment_value / selected_count;
  let list_of_person = document.getElementsByClassName("member-clicked");
  let if_there = 0;
  friends_list_log[selected_person].push(["Invested ", payment_value]);
  for (let i = 0; i < list_of_person.length; i++) {
    friends_list[list_of_person[i].getAttribute("title")] =
      parseFloat(friends_list[list_of_person[i].getAttribute("title")]) -
      per_person;
    friends_list_log[list_of_person[i].getAttribute("title")].push([
      'Recieved from "' +
        selected_person +
        '" <br > On total transaction of ' +
        payment_value,
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
    parseFloat(friends_list[selected_person]) + parseFloat(payment_value);
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
    update_set_data();
  }
});

function update_per_person(log = 0) {
  let ele;
  for (let i in friends_list) {
    ele = document.getElementById(i + "-mem");
    let value = parseFloat(friends_list[i]).toFixed(2);
    ele.textContent = value;
    document.getElementById(i + "-shw-val").textContent = value;
    if (value > 0) {
      ele.style.color = "darkgreen";
      ele.parentElement.setAttribute("title", "Credit : " + value);
      ele.parentElement.style.borderColor = "green";
      ele.previousSibling.style.stroke = "green";
      document.getElementById(i + "-shw-txt").textContent = "Credit";
    } else if (value == 0) {
      ele.parentElement.style.borderColor = "#845ef7";
      ele.previousSibling.style.stroke = "#845ef7";
      ele.style.color = "grey";
      document.getElementById(i + "-shw-txt").textContent = "Credit";
      ele.parentElement.setAttribute("title", "Equal");
    } else {
      ele.previousSibling.style.stroke = "red";
      ele.parentElement.style.borderColor = "red";
      ele.style.color = "red";
      document.getElementById(i + "-shw-txt").textContent = "Debt";
      ele.parentElement.setAttribute("title", "Debt : " + value);
    }
  }
  if (log == 0) {
    reset();
    page(1);
  }
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
    if (screen.width < 800) {
      document.getElementById("search").style.animationName =
        "width_animation_out_mob";
      document.getElementById("search").parentElement.style.animationName =
        "width_animation_out_mob";
    } else {
      document.getElementById("search").style.animationName =
        "width_animation_out";
      document.getElementById("search").parentElement.style.animationName =
        "width_animation_out";
    }

    setTimeout(() => {
      document.getElementById("search").parentElement.style.display = "none";
      search_click = 0;
    }, 700);
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
      try {
        let inp_box = document.getElementById("inp-cal");
        let res_box = document.getElementById("res-cal");
        let result = eval(inp_box.value);
        res_box.textContent = inp_box.value;
        inp_box.value = result;
      } catch (Error) {
        show_notification("Got an Error", Error);
      }
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
function cal_show_hide() {
  if (!cal_click) {
    cal_click = 1;
    calculator.style.display = "block";
  } else {
    cal_click = 0;
    calculator.style.display = "none";
    document.getElementById("inp-cal").value = "";
    document.getElementById("res-cal").textContent = "Ans = 0";
  }
}
cal_ico.addEventListener("click", () => {
  cal_show_hide();
});
document.getElementById("cal-top").addEventListener("click", () => {
  cal_show_hide();
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
  all_func_dis();
  all_func_click_dis();
  home_screen.style.display = "flex";
  setTimeout(() => {
    document.getElementsByClassName("sidebar")[0].style.display = "none";
  }, 450);
});
function remove_sidebar() {
  document.getElementsByClassName("sidebar")[0].style.animationName =
    "sidebar_width_mob_1";
  setTimeout(() => {
    document.getElementsByClassName("sidebar")[0].style.display = "none";
  }, 450);
}
document.getElementsByClassName("logo")[0].addEventListener("click", () => {
  remove_sidebar();
});

try {
  document.getElementsByClassName("signup")[0].addEventListener("click", () => {
    location.href = "signup.html";
  });
} catch {}

let sidebar_tab = document.getElementsByClassName("tab");
for (let i of sidebar_tab) {
  i.addEventListener("click", () => {
    if (screen.width < 800) {
      remove_sidebar();
    }
  });
}

let home_screen = document.getElementsByClassName("screen")[0];
let home_click = false;
let about_screen = document.getElementsByClassName("screen-about")[0];
let about_click = false;
let rating_screen = document.getElementsByClassName("rating")[0];
let rating_click = false;
let help_screen = document.getElementsByClassName("help-screen")[0];
let help_click = false;
let spents_screen = document.getElementsByClassName("spents")[0];
let spents_click = false;
function all_func_dis() {
  home_screen.style.display = "none";
  about_screen.style.display = "none";
  rating_screen.style.display = "none";
  help_screen.style.display = "none";
  spents_screen.style.display = "none";
}
function all_func_click_dis() {
  rating_click = false;
  about_click = false;
  help_click = false;
  spents_click = false;
}
document.getElementsByClassName("helper")[0].addEventListener("click", () => {
  all_func_dis();
  if (help_click) {
    help_screen.style.animationName = "fade_out";
    home_screen.style.display = "flex";
    setTimeout(() => {
      help_screen.style.display = "none";
    }, 450);
    help_click = false;
  } else {
    help_screen.style.display = "flex";
    help_screen.style.animationName = "fade_in";
    all_func_click_dis();
    help_click = true;
  }
});

document.getElementsByClassName("everyone")[0].addEventListener("click", () => {
  all_func_dis();
  if (spents_click) {
    spents_screen.style.animationName = "fade_out";
    home_screen.style.display = "flex";
    setTimeout(() => {
      spents_screen.style.display = "none";
    }, 450);
    spents_click = false;
  } else {
    create_tab_load();
    spents_screen.style.display = "block";
    spents_screen.style.animationName = "fade_in";
    all_func_click_dis();
    spents_click = true;
  }
});
document
  .getElementsByClassName("spents-back")[0]
  .addEventListener("click", () => {
    all_func_click_dis();
    spents_screen.style.animationName = "fade_out";
    setTimeout(() => {
      home_screen.style.display = "flex";
      spents_screen.style.display = "none";
    }, 450);
  });

document.getElementsByClassName("about")[0].addEventListener("click", () => {
  all_func_dis();
  if (about_click) {
    about_screen.style.animationName = "fade_out";
    home_screen.style.display = "flex";
    setTimeout(() => {
      about_screen.style.display = "none";
    }, 450);
    about_click = false;
  } else {
    about_screen.style.display = "flex";
    about_screen.style.animationName = "fade_in";
    all_func_click_dis();
    about_click = true;
  }
});

document
  .getElementsByClassName("scr-abt-back")[0]
  .addEventListener("click", () => {
    all_func_click_dis();
    about_screen.style.animationName = "fade_out";
    setTimeout(() => {
      home_screen.style.display = "flex";
      about_screen.style.display = "none";
    }, 450);
  });

document.getElementsByClassName("feedback")[0].addEventListener("click", () => {
  all_func_dis();
  if (rating_click) {
    rating_screen.style.animationName = "fade_out";
    home_screen.style.display = "flex";
    setTimeout(() => {
      rating_screen.style.display = "none";
    }, 450);
    rating_click = false;
  } else {
    rating_screen.style.display = "flex";
    rating_screen.style.animationName = "fade_in";
    all_func_click_dis();
    rating_click = true;
  }
});

document
  .getElementsByClassName("rating-back")[0]
  .addEventListener("click", () => {
    rating_screen.style.animationName = "fade_out";
    all_func_click_dis();
    setTimeout(() => {
      home_screen.style.display = "flex";
      rating_screen.style.display = "none";
    }, 450);
  });

document
  .getElementsByClassName("question-bk")[0]
  .addEventListener("click", () => {
    help_screen.style.animationName = "fade_out";
    all_func_click_dis();
    setTimeout(() => {
      home_screen.style.display = "flex";
      help_screen.style.display = "none";
    }, 450);
  });

// Select all elements with the "i" tag and store them in a NodeList called "stars"
const stars = document.querySelectorAll(".stars i");

// Loop through the "stars" NodeList
stars.forEach((star, index1) => {
  // Add an event listener that runs a function when the "click" event is triggered
  star.addEventListener("click", () => {
    // Loop through the "stars" NodeList Again
    stars.forEach((star, index2) => {
      // Add the "active" class to the clicked star and any stars with a lower index
      // and remove the "active" class from any stars with a higher index
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});

let all_head = document.getElementsByClassName("ques-head");
for (let i of all_head) {
  i.addEventListener("click", () => {
    document
      .getElementById(i.getAttribute("for"))
      .classList.toggle("part-show");
  });
}

let spent_content = document.getElementsByClassName("spent-content")[0];
function createSVG_spent() {
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("xmlns", svgNS);
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke", "currentColor");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute(
    "d",
    "M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  );

  svg.appendChild(path);

  return svg;
}
function spent_tab_creation(name, bal, data) {
  // <div>
  //         <h1>Pranay <span>balacne 12</span></h1>
  //         <ul>
  //           <li>transaction 1</li>
  //           <li>transaction 2</li>
  //         </ul>
  //       </div>
  let div = document.createElement("div");
  let h1 = document.createElement("h1");
  h1.textContent = name;
  let underDiv = document.createElement("nav");
  underDiv.appendChild(createSVG_spent());
  let span = document.createElement("span");
  span.textContent = bal;
  if (parseFloat(friends_list[name]) >= 0) {
    underDiv.style.color = "#40c057";
  } else {
    underDiv.style.color = "#d9480f";
  }
  underDiv.appendChild(span);
  h1.appendChild(underDiv);

  let ul = document.createElement("ul");
  function create_li(data) {
    let li = document.createElement("li");
    li.innerHTML = data[0];
    if (data[0].includes("Invested")) {
      li.style.color = "#40c057";
    } else {
      li.style.color = "#d9480f";
    }
    let spn = document.createElement("span");
    spn.appendChild(createSVG_spent());
    spn.innerHTML += data[1];
    if (parseFloat(data[1]) >= 0) {
      spn.style.color = "green";
    } else {
      spn.style.color = "red";
    }
    li.appendChild(spn);
    ul.appendChild(li);
  }
  for (let i of data) {
    create_li(i);
  }
  div.appendChild(h1);
  div.appendChild(ul);
  spent_content.appendChild(div);
}
function create_tab_load() {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "spent-content");
  spent_content.parentElement.appendChild(newDiv);
  spent_content.remove();
  spent_content = newDiv;
  for (let i in friends_list_log) {
    spent_tab_creation(i, friends_list[i], friends_list_log[i]);
  }
  total_spents();
}
function total_spents() {
  let total_spent = 0;
  let credit = 0;
  let debit = 0;
  let total_credit_now = 0;
  let selector = document.getElementsByClassName("total-spent");
  for (let i in friends_list_log) {
    for (let j of friends_list_log[i]) {
      if (j[1] > 0) {
        total_spent += parseFloat(j[1]);
      }
    }
    if (friends_list[i] >= 0) {
      credit += 1;
      total_credit_now += friends_list[i];
    } else {
      debit -= 1;
    }
  }
  selector[0].textContent = total_spent;
  selector[1].textContent = total_credit_now;
  selector[2].textContent = credit;
  selector[3].textContent = debit;
}

function confirm_close() {
  document.getElementsByClassName("confirm")[0].style.display = "none";
  document.getElementsByClassName("blur")[0].style.display = "none";
}
function confirm_box(head, content, func, argument = 69) {
  document.getElementsByClassName("confirm")[0].style.display = "flex";
  document.getElementsByClassName("blur")[0].style.display = "block";
  document.getElementById("con-head").textContent = head;
  document.getElementById("con-text").textContent = content;

  document.getElementById("con-yes").addEventListener("click", () => {
    if (argument != 69) {
      func(argument);
    } else {
      func();
    }
    confirm_close();
  });
  document.getElementById("con-no").addEventListener("click", () => {
    confirm_close();
  });
}

function action(number) {
  if (number == 0) {
    // delete all data
    friends_list = {};
    friends_list_log = {};
    update_set_data();
    location.reload();
  } else if (number == 1) {
    // just delete the transactions
    for (let i in friends_list) {
      friends_list[i] = 0;
      friends_list_log[i] = [];
    }
    update_per_person(1);
    update_set_data();
  } else if (number == 2) {
    // delete all users
    friends_list = {};
    friends_list_log = {};
    update_set_data();
    location.reload();
  } else if (number == 3) {
    // sign out from this
    localStorage.removeItem("user");
    location.reload();
  }
}
document.getElementsByClassName("del-all")[0].addEventListener("click", () => {
  confirm_box("Delete Data", "Are you sure to delete all the data", action, 0);
});
document.getElementsByClassName("del-user")[0].addEventListener("click", () => {
  confirm_box(
    "Delete Users",
    "Do you want to delete all the user's",
    action,
    2
  );
});
document.getElementsByClassName("delete-trans")[0]
  .addEventListener("click", () => {
    confirm_box(
      "Delete Transactions",
      "Do you want to delete all the transactions by the user",
      action,
      1
    );
  });
document.getElementsByClassName("del-sign")[0].addEventListener("click", () => {
  confirm_box("Sign Out", "Do you want to sign out?", action, 3);
});
