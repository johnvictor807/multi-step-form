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
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const nameValid = document.querySelector("#name-err");
const emailValid = document.querySelector("#email-err");
const phoneValid = document.querySelector("#phone-err");
const selectPlan = document.querySelectorAll(".thumbnails");

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
    validateForm();
    {
      if (
        name.value.trim() === "" ||
        !isValidEmail(email.value) ||
        isNaN(phone.value) ||
        phone.value == ""
      ) {
        validateForm();
      } else {
        if (count < 3) {
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
      }
    }
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

//Form validation section
function validateForm() {
  if (name.value.trim() === "") {
    nameValid.style.display = "block";
    name.style.border = "1px, solid, hsl(354, 84%, 57%)";
  } else {
    nameValid.style.display = "none";
    name.style.cssText = "";
  }
  if (!isValidEmail(email.value)) {
    emailValid.style.display = "block";
    email.style.border = "1px, solid, hsl(354, 84%, 57%)";
  } else {
    emailValid.style.display = "none";
    email.style.cssText = "";
  }
  if (isNaN(phone.value) || phone.value == "") {
    phoneValid.style.display = "block";
    phone.style.border = "1px, solid, hsl(354, 84%, 57%)";
  } else {
    phoneValid.style.display = "none";
    phone.style.cssText = "";
  }
}

function isValidEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateFormB() {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");

  if (
    !name.value.trim() == "" &&
    isValidEmail(email.value) &&
    typeof phone.value == "number"
  ) {
  }
}
