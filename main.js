// for sass
// import "./style.scss";

// variables
const adviceButtonEl = document.querySelector(".advice-box__button");
const adviceTextEl = document.querySelector(".advice-box__text");
const spinnerEl = document.querySelector("#spinner");

const renderAdviceHTML = (id, advice) => {
  adviceTextEl.innerHTML = `
            <p class="advice-box__title">Advice # <span class="advice-box__number">${id}</span></p>
            <h1 class="advice-box__advice">"${advice}"</h1>
    `;
};

const removeSpinner = () => {
  spinnerEl.remove();
};

const fetchAdvice = async () => {
  // spinnerEl.classList.remove("spinner-hide");

  spinnerEl.style.display = "inline-block";

  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    if (!res.ok) {
      return;
    }

    // spinnerEl.classList.add("spinner-hide");
    spinnerEl.style.display = "none";
    adviceButtonEl.blur();

    const data = await res.json();
    const { id, advice } = data.slip;

    renderAdviceHTML(id, advice);
  } catch (err) {
    console.log(err.message);
  }
};

fetchAdvice();

adviceButtonEl.addEventListener("click", fetchAdvice);
