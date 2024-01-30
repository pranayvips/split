let click = 0;
let data = "";
if (localStorage.getItem("user")) {
  location.href = "index.html";
}
function show_notification(title, content) {
  document.getElementById("noti-head").textContent = title;
  document.getElementById("noti-text").textContent = content;
  document.getElementsByClassName("noti")[0].style.display = "flex";
  document.getElementsByClassName("noti")[0].style.animationName = "fade-in";
  setTimeout(() => {
    document.getElementsByClassName("noti")[0].style.animationName = "fade-out";
  }, 2550);
  setTimeout(() => {
    document.getElementsByClassName("noti")[0].style.display = "none";
  }, 3000);
}
document.getElementById("next").addEventListener("click", () => {
  if (click == 0) {
    if (document.getElementById("inp-name").children[0].value.length > 1) {
      document.getElementById("next-txt").textContent = "Sign Up !";
      document
        .getElementById("next-path")
        .setAttribute("d", "m4.5 12.75 6 6 9-13.5");
      document.getElementById("inp-name").style.display = "none";
      document.body.style.animation = "fade-in .2s ease-in";
      document.getElementById("inp-pass").style.display = "block";
      click = 1;
      data += document.getElementById("inp-name").children[0].value + ";;";
    } else {
      show_notification("Empty : Name" , "Username Should be greater than 1 character");
    }
  } else {
    if (document.getElementById("inp-pass").children[0].value.length > 3) {
      location.href = "index.html";
      localStorage.setItem("user", data);
    } else {
      show_notification("Empty : Pass", "Password Should be greater than 3 character");
    }
  }
});
