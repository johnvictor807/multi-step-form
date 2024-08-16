import "./style.css";

const stepOne = document.querySelector("#right-side-1");
const stepTwo = document.querySelector("#select-plan");
const stepThree = document.querySelector("#add-ons");
const stepFour = document.querySelector("#summary");
const submit = document.querySelector("#thank-you");
const bottom = document.querySelector(".bottom");
const nextButton = document.querySelector(".next-btn");
const backButton = document.querySelector(".back-btn");
const headers = document.querySelectorAll("h1");
const moYr = document.querySelector("#plan-select");
const monthly = document.querySelector("#thumb1");
const yearly = document.querySelector("#thumb2");
const monthRadio = document.querySelector("#month");
const yearRadio = document.querySelector("#year");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const nameValid = document.querySelector("#name-err");
const emailValid = document.querySelector("#email-err");
const phoneValid = document.querySelector("#phone-err");

let group = [stepOne, stepTwo, stepThree, stepFour, submit];
let count = 0;
let arr = {};

const start = (() => {
  group.forEach((item, i) =>
    i == 0 ? (item.style.display = "block") : (item.style.display = "none")
  );

  yearly.style.display = "none";

  backButton.style.display =
    nameValid.style.display =
    emailValid.style.display =
    phoneValid.style.display =
      "none";

  headers.forEach((h, i) =>
    i == 0
      ? (h.style.cssText =
          "background: hsl(206, 94%, 87%); color: hsl(213, 96%, 18%); font-weight: bold")
      : (h.style.cssText = "")
  );
})();

const moveToNext = function () {
  function nextOne() {
    backButton.style.display = "block";
    headers[count].style.cssText = "";
    headers[count + 1].style.cssText =
      "background: hsl(206, 94%, 87%); color: hsl(213, 96%, 18%); font-weight: bold";

    group[count].style.display = "none";
    group[count + 1].style.display = "block";
  }

  if (count < 3) {
    if (count == 0) {
      if (
        name.value.trim() === "" ||
        !isValidEmail(email.value) ||
        isNaN(phone.value) ||
        phone.value == ""
      ) {
        validateForm();
        return;
      } else {
        validateForm();
        arr.name = name.value;
        arr.phone = phone.value;
        arr.email = email.value;
      }
      nextOne();
    }

    if (count == 1) {
      const thumbs = document.querySelectorAll(".thumbnails");
      checkBorder();
      function checkBorder() {
        let conditionMet = false;
        thumbs.forEach((elem) => {
          const computedStyle = window.getComputedStyle(elem);
          const border = computedStyle.border;
          if (border === "1px solid rgb(2, 41, 90)") {
            conditionMet = true;
            return;
          }
        });
        if (conditionMet) {
          document.querySelector(".addon-month").style.display =
            document.querySelector(".addon-year").style.display = "none";

          monthRadio.checked
            ? (document.querySelector(".addon-month").style.display = "block")
            : (document.querySelector(".addon-year").style.display = "block");
          nextOne();
          count++;
        }
      }
      return;
    }

    if (count == 2) {
      const thumbAddOn = document.querySelectorAll(".addd");
      checkBorder();
      function checkBorder() {
        let conditionMet2 = false;
        thumbAddOn.forEach((elem) => {
          const computedStyle2 = window.getComputedStyle(elem);
          const border = computedStyle2.border;
          if (border === "1px solid rgb(2, 41, 90)") {
            conditionMet2 = true;
            return;
          }
        });
        if (conditionMet2) {
          const html = `<div>
          <div class="sum-stack">
            <div class="added">
              <label for="online">${arr.planName}(${
            arr.planAmount > 20 ? "Yearly" : "Monthly"
          })</label>
              <p class="change-plan">change</a></p>
            </div>
            <p>$${arr.planAmount}/${arr.planAmount > 20 ? "yr" : "mo"}</p>
          </div>
        </div>
        <div>
          <div class="sum-stack">
            <div class="added">
              <label for="online">${arr.addonName}</label>
            </div>
            <p>
             $${arr.addonAmount}/${arr.addonAmount > 15 ? "yr" : "yr"}
            </p>
          </div>
        </div>
        <div>
          <div class="sum-stack">
            <div class="added">
              <label for="online">Total (${
                arr.planAmount > 20 ? "Per Year" : "Per Month"
              })</label>
            </div>
            <p>$${+arr.addonAmount + +arr.planAmount}/yr</p>
          </div>
        </div>`;

          document.querySelector(".finish").innerHTML = html;
          document
            .querySelector(".change-plan")
            .addEventListener("click", function () {
              backButton.style.display = "block";
              headers[count].style.cssText = "";
              headers[count - 2].style.cssText =
                "background: hsl(206, 94%, 87%); color: hsl(213, 96%, 18%); font-weight: bold";

              group[count].style.display = "none";
              group[count - 2].style.display = "block";
              count = count - 2;
            });

          nextOne();
          count++;
        }
      }
      return;
    }
  } else if (count == 3) {
    headers[count].style.cssText = "";
    group[3].style.display = "none";
    group[4].style.display = "block";
    bottom.style.display = "none";
  } else return;
  count++;
};

const moveToPrev = function () {
  if (count >= 1) {
    headers[count - 1].style.cssText =
      "background: hsl(206, 94%, 87%); color: hsl(213, 96%, 18%); font-weight: bold";
    headers[count].style.cssText = "";
    group[count - 1].style.display = "block";
    group[count].style.display = "none";
  }
  if (count == 1) {
    backButton.style.display = "none";
  }
  count--;
};

function movement(event) {
  if (event.target.className == "next-btn") {
    moveToNext();
  } else if (event.target.className == "back-btn") {
    moveToPrev();
  }
}

function toggleMonthYear() {
  if (monthRadio.checked) {
    yearly.style.display = "none";
    monthly.style.display = "flex";
  } else if (yearRadio.checked) {
    yearly.style.display = "flex";
    monthly.style.display = "none";
  }
}

bottom.addEventListener("click", movement);
moYr.addEventListener("change", toggleMonthYear);

function registerClick(e) {
  if (e.target.closest(".thumbnails")) {
    document
      .querySelectorAll(".thumbnails")
      .forEach((e) => (e.style.cssText = ""));

    const indThumb = e.target.closest(".thumbnails");
    indThumb.classList.add("hello");
    indThumb.style.border = "1px solid #02295a";

    const hText = indThumb.querySelector("h4").textContent;
    const pText = indThumb.querySelector(".addamt").textContent;

    arr.planName = hText;
    arr.planAmount = pText.slice(1, 3);
  }
}

function registerAddon(e) {
  if (e.target.closest(".addd")) {
    document.querySelectorAll(".addd").forEach((f) => {
      f.style.cssText = "";
      f.querySelector(".online").checked = false;
    });

    const indThumb = e.target.closest(".addd");
    indThumb.style.border = "1px solid #02295a";
    indThumb.querySelector(".online").checked = true;

    const hText = indThumb.querySelector("label").textContent;
    const pText = indThumb.querySelector(".price").textContent;

    arr.addonName = hText;
    arr.addonAmount = pText.slice(2, 4);
  }
}

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

document.querySelector(".selct").addEventListener("click", registerClick);
document
  .querySelector("#select-addon")
  .addEventListener("click", registerAddon);

document
  .querySelectorAll(".inputs")
  .forEach((e) => e.addEventListener("blur", resetViewportScale));
function resetViewportScale() {
  const viewportMetaTag = document.querySelector('meta[name="viewport"]');
  viewportMetaTag.content = "width=device-width, initial-scale=1.0";
}

console.log(window.innerWidth);
