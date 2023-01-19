let url = "https://striveschool-api.herokuapp.com/api/product/";
let options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzQxMzE2NzgsImV4cCI6MTY3NTM0MTI3OH0.5IT0FosoJiXR-elc6fN4G7t3-5onkxZpzsGlMVbuMyQ",
  },
};

const getEvents = async () => {
  try {
    const res = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      options
    );
    const event = await res.json();
    console.log(event);
    renderEvents(event);
  } catch (err) {
    console.log(err);
  }
};

const renderEvents = (arrayOfEvents) => {
  let row = document.querySelector(".row");
  row.innerHTML = "";
  arrayOfEvents.forEach((singleEvent) => {
    const { name, brand, imageUrl, price, description, _id } = singleEvent;
    console.log(`./back-office.html?id=${_id}`);
    row.innerHTML += `<div class="col mb-4">
    <div class="card h-100">
      <img src="${imageUrl}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${brand}</p>
        <p class="card-text">${price} $</p>
        <a class="btn btn-primary" href='./back-office.html?id=${_id}' role="button">Edit</a>
        <button type="button" class="btn btn-danger" onclick = "deleteEvent('${_id}')">Delete</button>
      </div>
    </div>
  </div>`;
  });
  document.getElementById("loader").classList.add("d-none");
};

const deleteEvent = async (idToDelete) => {
  console.log(idToDelete);
  try {
    let res = await fetch(url + "/" + idToDelete, {
      method: "DELETE",
      headers: options.headers,
    });
    if (res.ok) {
      await getEvents();
    }
  } catch (err) {
    console.log(err);
  }
};

window.onload = getEvents();
