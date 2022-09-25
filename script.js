function getContactCardTemplate(element) {
  if (!element.backgroundImage) {
    element.backgroundImage = "TitleImg.jpeg";
  }

  let connectedText = "Connect";
  if (element.isConnected) {
    connectedText = "Pending";
  }

  return `<button class="remove">x</button>
<img class="title-img" src="${element.backgroundImage}?q=${
    element.name.first + element.name.last
  }">
<img class="profile-img" src="${element.picture}">
<div class="profile-name">${element.name.first} ${element.name.last}</div>
<div class="profile-jobname">${element.title}</div>
<div class="mutul-connections">${element.mutualConnections}</div>
<button class="connect">${connectedText}</button>`;
}

fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=80")
  .then((response) => response.json())
  .then((data) => {
    const contactList = document.getElementById("contact-list");

    data.forEach((element) => {
      const contactCard = document.createElement("div");
      contactCard.className = "contact-card";
      contactCard.innerHTML = getContactCardTemplate(element);
      contactList.appendChild(contactCard);
      addRemoveAction(contactCard);
      addConnectAction(contactCard, element);
    });
  });

function addConnectAction(contactCard, element) {
  contactCard
    .getElementsByClassName("connect")[0]
    .addEventListener("click", () => {
      if (element.isConnected) {
        element.mutualConnections -= 1;
        element.isConnected = false;
      } else {
        element.mutualConnections += 1;
        element.isConnected = true;
      }

      contactCard.innerHTML = getContactCardTemplate(element);
      addConnectAction(contactCard, element);
      addRemoveAction(contactCard);
    });
}

function addRemoveAction(contactCard) {
  contactCard
    .getElementsByClassName("remove")[0]
    .addEventListener("click", () => {
      fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
        .then((response) => response.json())
        .then((data) => {
          contactCard.innerHTML = getContactCardTemplate(data[0]);
          addRemoveAction(contactCard);
          addConnectAction(contactCard, data[0]);
        });
    });
}
