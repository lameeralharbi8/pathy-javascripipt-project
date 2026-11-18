export function setStatus(element, message) {
  if (element) {
    element.textContent = message;
  }
}

export function createElement(tag, text, className = "") {
  const element = document.createElement(tag);
  element.textContent = text;

  if (className) {
    element.className = className;
  }

  return element;
}

export function renderError(element, error) {
  setStatus(element, error.message || "حدث خطأ غير متوقع.");
}

export function clearElement(element) {
  if (element) {
    element.replaceChildren();
  }
}
