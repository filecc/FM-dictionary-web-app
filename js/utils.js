/* Fixing the height of the application window on iPhone */
export const setAppHeight = () => {
  document.documentElement.style.setProperty(
    '--app-height',
    `${window.innerHeight}px`,
  );
};

/* Add the specified classes to the given HTML element */
export function addClasses(element, classes) {
  classes.forEach((_class) => element.classList.add(_class));
}

/* Adds the specified ID to the given HTML element */
export function addID(element, id) {
  element.setAttribute('id', id);
}

/* Creates a new HTML element with an object in input */
export function createChild(props = {}) {
  let newElement;
  Object.entries(props).forEach(([key, value]) => {
    switch (key) {
      case "tag":
        newElement = document.createElement(value);
        break;
      case "id":
        newElement.setAttribute("id", value);
        break;
      case "classes":
        addClasses(newElement, value);
        break;
      case "text":
        newElement.textContent = value;
        break;
      default:
        newElement.setAttribute(key, value);
        break;
    }
    /* Add the specified classes to the given HTML element */
    function addClasses(element, classes) {
      classes.forEach((_class) => element.classList.add(_class));
    }
  });

  return newElement;
}

/* Remove the specified classes to the given HTML element */
export function removeClasses(element, classes) {
  classes.forEach((_class) => element.classList.remove(_class));
}

/* Toggle the specified classes to the given HTML element */
export function toggleClasses(element, classes) {
  classes.forEach((_class) => element.classList.toggle(_class));
}

/* Adds the desired attribute to the given element */
export function addAttributes(element, props) {
  const { ...rest } = props;
  Object.entries(rest).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

// function to get a random number, extreme included
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}