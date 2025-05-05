// array of items
// render dynamically by slicing
// render page no.
let productImage ="image.png";
let products = [
  { name: "Pen", price: 10, image: productImage },
  { name: "Notebook", price: 25, image: productImage },
  { name: "Pencil", price: 5, image: productImage },
  { name: "Eraser", price: 2, image: productImage },
  { name: "Ruler", price: 15, image: productImage },
  { name: "Marker", price: 30, image: productImage },
  { name: "Highlighter", price: 12, image: productImage },
  { name: "Glue", price: 20, image: productImage },
  { name: "Scissors", price: 18, image: productImage },
  { name: "Tape", price: 8, image: productImage },
  { name: "Stapler", price: 22, image: productImage },
  { name: "Folder", price: 12, image: productImage },
  { name: "Paper Clips", price: 4, image: productImage },
  { name: "Notebook", price: 10, image: productImage },
];

const tableBody = document.getElementById("tableBody");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNo");

pageNo = 1;
itemsPerPage = 4;
function renderItems(pageNo){
  tableBody.innerHTML="";
  const startIndex = (pageNo - 1) * itemsPerPage;
  const enIndex = startIndex + itemsPerPage;
  const displayProducts = products.slice(startIndex,enIndex);
  
  displayProducts.forEach((product) => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td> ${product.name} </td>
    <td> ${product.price} </td>   
    <td> <img src="${product.image}" alt="image" width="50px"> </td>   
    `;
    tableBody.appendChild(row);
  });

  pageNumber.textContent = `Page ${pageNo} of ${products.length}`;

  prevBtn.disabled = pageNo === 1;
  nextBtn.disabled = pageNo * itemsPerPage >= products.length;
}

prevBtn.addEventListener("click",()=>{
  if(pageNo > 1){
    pageNo--;
  }
  renderItems(pageNo);
});

nextBtn.addEventListener("click", () => {
  if (pageNo*itemsPerPage < products.length) {
    pageNo++;
  }
  renderItems(pageNo);
});

renderItems(pageNo);