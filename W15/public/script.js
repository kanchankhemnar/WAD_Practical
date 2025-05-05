fetch("/products")
  .then((res) => res.json())
  .then((data) => {
    const ul = document.getElementById("ulList");
    data.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `
  <div style="border:1px solid gray; padding:10px; margin:10px; border-radius:8px;">
    <strong>Name:</strong> ${product.name} <br>
    <strong>Price:</strong> ${product.price} <br>
    <img src="${product.image}" alt="image" width="100">
  </div>
`;

      // li.textContent = product.name;
      ul.appendChild(li);
    });
  })
  .catch((err) => console.log("err"));
