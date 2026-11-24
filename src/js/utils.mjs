// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function alertMessage(message, scroll = true) {
  const main = document.querySelector("main");
  if (!main) {
    throw new Error("Cannot display an alert without a main element.");
  }

  const alert = document.createElement("div");
  const alertText = document.createElement("p");
  const closeButton = document.createElement("button");
  const messageText =
    typeof message === "string"
      ? message
      : (message?.message ?? message?.error ?? JSON.stringify(message));

  alert.classList.add("alert");
  alert.setAttribute("role", "alert");
  alertText.textContent = String(messageText);
  closeButton.classList.add("alert__close");
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Dismiss message");
  closeButton.textContent = "×";
  alert.append(alertText, closeButton);
  alert.addEventListener("click", (event) => {
    if (event.target === closeButton) {
      alert.remove();
    }
  });
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}
