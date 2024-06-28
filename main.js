import "./style.css";

const stepOne = document.querySelector("#right-side-1");
const stepTwo = document.querySelector("#select-plan");
const stepThree = document.querySelector("#add-ons");
const stepFour = document.querySelector("#summary");
const submit = document.querySelector("#thank-you");
const bottom = document.querySelector(".bottom");
const backButton = document.querySelector(".back-btn");
const headers = document.querySelectorAll("h1");
const moYr = document.querySelector(".month-year");
const monthly = document.querySelector("#thumb");
const yearly = document.querySelector("#thumb2");
const monthth = document.querySelectorAll(".monnth");
const yeaar = document.querySelectorAll(".yeaar");
const monthRadio = document.querySelector("#month");
const yearRadio = document.querySelector("#year");

let group = [stepOne, stepTwo, stepThree, stepFour, submit];

let count = 0;

yeaar.forEach((e) => (e.style.display = "none"));

yearly.style.display = "none";

backButton.style.display = "none";
group[count].style.display = "block";
headers[count].style.cssText =
  "background: hsl(206, 94%, 87%); color: hsl(213, 96%, 18%); font-weight: bold";

function nextPage(event) {
  if (event.target.className == "next-btn") {
    if (count <= 2) {
      headers[count].style = "none";
      headers[count + 1].style.cssText =
        "background: hsl(206, 94%, 87%); color: hsl(213, 96%, 18%); font-weight: bold";
    }
    group[count].style.display = "none";
    group[count + 1].style.display = "block";
    if (group[2].style.display == "block") {
      if (yearRadio.checked) {
        yeaar.forEach((e) => (e.style.display = "block"));
        monthth.forEach((e) => (e.style.display = "none"));
      } else if (monthRadio.checked) {
        yeaar.forEach((e) => (e.style.display = "none"));
        monthth.forEach((e) => (e.style.display = "block"));
      }
    }
    backButton.style.display = "block";
    if (count > 2) {
      bottom.style.display = "none";
    }
    count++;
  } else if (event.target.className == "back-btn") {
    if (count > 0) {
      headers[count].style = "none";
      headers[count - 1].style.cssText =
        "background: hsl(206, 94%, 87%); color: hsl(213, 96%, 18%); font-weight: bold";
    }
    group[count].style.display = "none";
    group[count - 1].style.display = "block";
    count--;
    if (count == 0) {
      backButton.style.display = "none";
    }
  }
}

function monthYear(e) {
  if (e.target.id == "month") {
    yearly.style.display = "none";
    monthly.style.display = "flex";
  } else if (e.target.id == "year") {
    monthly.style.display = "none";
    yearly.style.display = "flex";
  }
}

bottom.addEventListener("click", nextPage);
moYr.addEventListener("click", monthYear);
