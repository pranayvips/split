let name_input_box = document.getElementById("name-input");
let member_container = document.getElementsByClassName("member-container")[0];
let payment_container = document.getElementsByClassName("payment")[0];
let payment_input = document.getElementById("pay-val");
let payer_name = document.getElementById("payer");

const friends_list = {};

name_input_box.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    // friends_list.push(name_input_box.value);
    let val = name_input_box.value;
    if (val.length > 0) {
      friends_list[val] = 0;
      add_member(val, 0);
      add_member(val, 1);
      name_input_box.value = "";
    } else {
      alert("The Name should be greater than 1 character");
    }
  }
});
document.getElementById("back").addEventListener("click", () => {
  page(1);
});

function add_member(name, to) {
  let member = document.createElement("div");
  member.setAttribute("title", name);

  let p_name = document.createElement("p");
  p_name.appendChild(document.createTextNode(name));
  member.appendChild(p_name);

  if (to == 0) {
    member.setAttribute("class", "member");
    let p_status = document.createElement("p");
    p_status.appendChild(document.createTextNode("0.0"));
    p_status.setAttribute("class", name + "-mem");
    member.appendChild(p_status);
    member.addEventListener("click", () => {
      selected_person = member.getAttribute("title");
      payer_name.textContent = member.getAttribute("title");
      page(0);
    });
    member_container.appendChild(member);
  } else {
    member.setAttribute("class", "member " + name + "-pay");
    member.addEventListener("click", () => {
      member.classList.toggle("member-clicked");
      update_selected_count();
    });
    payment_container.appendChild(member);
  }
}

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
  for (let i = 0; i < list_of_person.length; i++) {
    friends_list[list_of_person[i].getAttribute("title")] =
      parseFloat(friends_list[list_of_person[i].getAttribute("title")]) -
      per_person;
  }
  friends_list[selected_person] =
    parseFloat(friends_list[selected_person]) + parseFloat(payment_input.value);
  payment_input.value = "";
  update_per_person();
}

document.getElementById("send").addEventListener("click", () => {
  if (selected_count == 0) {
    alert("Atleast select one person to proceed");
  } else if (payment_input.value == "") {
    alert("First write some amount");
  } else {
    calculations();
  }
});

function update_per_person() {
  let ele;
  for (let i in friends_list) {
    ele = document.getElementsByClassName(i + "-mem")[0];

    ele.textContent = String(friends_list[i]).substring(0,5);
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
    console.log(clas);
    if (clas.includes("member-clicked")) {
      i.setAttribute("class", clas.replace("member-clicked", ""));
      console.log(i);
    }
  }
}

function page(num) {
  if (num == 0) {
    document.getElementsByClassName("member-container")[0].style.display =
      "none";
    document.getElementsByClassName("payment")[0].style.display = "grid";
  } else {
    document.getElementsByClassName("member-container")[0].style.display =
      "grid";
    document.getElementsByClassName("payment")[0].style.display = "none";
  }
}
