let url = "https://striveschool-api.herokuapp.com/api/product/";

let options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzQxMzE2NzgsImV4cCI6MTY3NTM0MTI3OH0.5IT0FosoJiXR-elc6fN4G7t3-5onkxZpzsGlMVbuMyQ",
  },
};

const params = new URLSearchParams(location.search);
const id = params.get("id");
console.log(params);

window.onload = async () => {
  //   if (res.ok) {

  if (id !== null) {
    let res = await fetch(url + id, options);
    let { name, brand, imageUrl, price, description } = await res.json();
    document.querySelector("#eventName").value = name;
    document.querySelector("#eventBrand").value = brand;
    document.querySelector("#eventImage").value = imageUrl;
    document.querySelector("#eventPrice").value = price;
    document.querySelector("#eventDescription").value = description;
  }
};

const handleNewEvent = async (submitEvent) => {
  try {
    submitEvent.preventDefault();
    const name = document.querySelector("#eventName").value;
    const brand = document.querySelector("#eventBrand").value;
    const imageUrl = document.querySelector("#eventImage").value;
    const price = document.querySelector("#eventPrice").value;
    const description = document.querySelector("#eventDescription").value;
    let newEvent = { name, brand, imageUrl, price, description };
    console.log(newEvent);

    let options = {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: new Headers({
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzQxMzE2NzgsImV4cCI6MTY3NTM0MTI3OH0.5IT0FosoJiXR-elc6fN4G7t3-5onkxZpzsGlMVbuMyQ",
      }),
    };

    let res = await fetch(url, options);
    let resJson = await res.json();
    document.getElementById("success-alert").classList.add("d-block");
  } catch (err) {
    console.log(err);
    document.getElementById("danger-alert").classList.add("d-block");
  }
};

const handleEditEvent = async (submitEvent) => {
  try {
    submitEvent.preventDefault();
    const editedEvent = {
      name: document.querySelector("#eventName").value,
      brand: document.querySelector("#eventBrand").value,
      imageUrl: document.querySelector("#eventImage").value,
      price: document.querySelector("#eventPrice").value,
      description: document.querySelector("#eventDescription").value,
    };
    const res = await fetch(url + id, {
      method: "PUT",

      headers: new Headers({
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzQxMzE2NzgsImV4cCI6MTY3NTM0MTI3OH0.5IT0FosoJiXR-elc6fN4G7t3-5onkxZpzsGlMVbuMyQ",
      }),
      body: JSON.stringify(editedEvent),
    });
    let changed = await res.json();
    document.getElementById("success-alert").classList.add("d-block");
  } catch (err) {
    console.log(err);
    document.getElementById("danger-alert").classList.add("d-block");
  }
};
