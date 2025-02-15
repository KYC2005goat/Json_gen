// Load product count from localStorage or start from 1
let productCount = localStorage.getItem("productCount") ? parseInt(localStorage.getItem("productCount")) : 1;

function generateUniqueId() {
    return Date.now() + Math.floor(Math.random() * 1000); // Unique ID
}

function generateImageName() {
    let imageName = `product${productCount}.jpg`;
    productCount++; // Increment count
    localStorage.setItem("productCount", productCount); // Save updated count
    return imageName;
}

function getImagePath(input) {
    if (input.files.length > 0) {
        return "uploads/" + generateImageName(); // Generate unique filename
    }
    return null;
}

function generateJSON() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    
    let mainImage = getImagePath(document.getElementById("mainImage"));
    let images = [
        getImagePath(document.getElementById("image1")),
        getImagePath(document.getElementById("image2")),
        getImagePath(document.getElementById("image3"))
    ].filter(img => img !== null);

    let productData = {
        id: generateUniqueId(),
        name: name,
        price: price,
        description: description,
        image: mainImage,
        images: images
    };

    document.getElementById("jsonOutput").textContent = JSON.stringify(productData, null, 4);
    return productData;
}

function downloadJSON() {
    let jsonData = generateJSON();
    let blob = new Blob([JSON.stringify(jsonData, null, 4)], { type: "application/json" });
    saveAs(blob, "product.json");
}