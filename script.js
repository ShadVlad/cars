document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  const select = document.getElementById("cars"),
    output = document.getElementById("output");
  const getData = () => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", "/cars.json");
      request.setRequestHeader("Content-type", "application/json");

      request.addEventListener("readystatechange", () => {
        console.log("request.readyState: ", request.readyState);
        console.log(" request.status: ", request.status);
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const response = JSON.parse(request.responseText);
          console.log("response: ", response);
          //console.log("request: ", request);
          resolve(response);
        } else {
          reject(request.statusText); //output.innerHTML = "Произошла ошибка";
        }
      });
      request.send();
    });
  };

  const outData = (data) => {
    console.log("data: ", data);
    output.innerHTML = "Произошла ошибка";
    data.cars.forEach((item) => {
      //console.log("data.cars: ", data.cars);
      console.log("item: ", item);

      if (item.brand === select.value) {
        console.log("select.value: ", select.value);
        console.log("item.brand: ", item.brand);
        const { brand, model, price } = item;
        console.log("item: ", item);
        output.innerHTML = `Тачка ${brand} ${model} <br>Цена: ${price}$`;
      }
    });
  };

  select.addEventListener("change", () => {
    getData()
      .then(outData)
      .catch((error) => {
        output.innerHTML = "Произошла ошибка";
      });
  });
});
