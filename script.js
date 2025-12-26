// Select elements
const body = document.querySelector("body");
const gridContainer = document.querySelector(".grid-container");

// Fetch all products
async function getAllProduct() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    gridContainer.innerHTML = data
      .map((item) => `
          <div class="product-card">
            <img src="${item.image}" width="80" />
            <h3 style="font-size:18px; font-family:sans-serif">${item.title}</h3>
            <p style=" font-weight:bold">Price: $${item.price}</p>
            <span style="font-size:14px; font-family:sans-serif">$${item.description.slice(0,130)}...</span>
            <div style="display:flex; column-gap:12px">
            <span style="padding-top:20px; padding-left:90px"><button class="update">Update</button>
            <button class="delete">Delete</button></span>
            </div>
          </div>
        `
      )
      
      .join("");
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}

// Create a new product
async function createProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Laptop Backpack",
        price: 15.99,
        description:
          "Color may vary slightly. Body build varies, check product description for size info.",
        category: "men's wear",
        image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
        rating: {
          rate: 10.0,
          count: 500,
        },
      }),
    });
    const data = await response.json();
    console.log("Product created:", data);
  } catch (error) {
    console.log("Error creating product:", error);
  }
}
//update product
async function updateProduct(productId) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
    "title": "Mens Cotton shirts",
    "price": 57.99,
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    "rating": {
      "rate": 4.7,
      "count":500
        },
      }),
    });

    const data = await response.json();
    console.log("Product updated:", data);
  } catch (error) {
    console.log("Error updating product:", error);
  }
}

// Delete product
async function deleteProduct(productId) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`,
      {
        method: "DELETE",
      }
   );

    const data = await response.json();
    console.log("Product deleted:", data);
  } catch (error) {
    console.log("Error deleting product:", error);
  }
}

function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const title = product.querySelector("h3").innerText.toLowerCase();

    if (title.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}
// Call function
getAllProduct();
createProducts();
updateProduct(3);
deleteProduct(1);

