const form = document.querySelector("form");
const inputName = document.getElementById("inputName");
const inputFirstname = document.getElementById("inputFirstname");
const inputDelivery = document.getElementById("inputDelivery");
const inputUnitPrice = document.getElementById("inputUnitPrice");
const inputQty = document.getElementById("inputQty");

function checkForErrors() {
  if (isNotLongEnough(inputName.value)) {
    return "Le nom doit avoir au moins 3 caratères.";
  } else if (isNotLongEnough(inputFirstname.value)) {
    return "Le prénom doit avoir au moins 3 caratères.";
  } else if (isNotIn8Days()) {
    return "Merci de choisir une date de livraison dans au moins 8 jours.";
  }
  return "";
}

function isNotLongEnough(s) {
  if (s.length < 3) {
    return true;
  }
  return false;
}

function isNotIn8Days() {
  let earliestDate =
    Math.floor(Date.parse(new Date()) / 1000 / 60 / 60 / 24) + 8;
  let pickedDate = Math.floor(
    Date.parse(inputDelivery.value) / 1000 / 60 / 60 / 24
  );
  if (pickedDate < earliestDate) {
    return true;
  }
  return false;
}

function mafonction(event) {
  event.preventDefault();
  const msg = document.createElement("aside");
  if (form.lastChild.nodeName == "ASIDE") {
    form.removeChild(form.lastChild);
  }
  if ((msg.textContent = checkForErrors()) !== "") {
    msg.style.color = "var(--crm-alert)";
    form.appendChild(msg);
  } else {
    msg.style.color = "var(--crm-primary)";
    let total = parseInt(inputQty.value) * parseInt(inputUnitPrice.value);
    if (total < 1001) {
        msg.textContent = `Merci ${inputName.value.toUpperCase()} ${inputFirstname.value.toUpperCase()}, votre demande a été transmise au service des achats.`
    } else {
        msg.textContent = `${inputName.value.toUpperCase()} ${inputFirstname.value.toUpperCase()}, votre demande a été transmise au service financier pour validation.`
    }
    form.appendChild(msg);
  }
}

form.addEventListener("submit", mafonction);
