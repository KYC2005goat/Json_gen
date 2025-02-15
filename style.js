function previewImage(input, previewId) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(previewId).src = e.target.result;
            document.getElementById(previewId).style.display = "block";
        };
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById("mainImage").addEventListener("change", function() { previewImage(this, "mainPreview"); });
document.getElementById("image1").addEventListener("change", function() { previewImage(this, "preview1"); });
document.getElementById("image2").addEventListener("change", function() { previewImage(this, "preview2"); });
document.getElementById("image3").addEventListener("change", function() { previewImage(this, "preview3"); });

function generateJSON() {
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;
    var mainImage = document.getElementById("mainPreview").src;
    var images = [
        document.getElementById("preview1").src,
        document.getElementById("preview2").src,
        document.getElementById("preview3").src
    ].filter(src => src !== ""); 

    var productData = {
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
    var jsonData = generateJSON();
    var blob = new Blob([JSON.stringify(jsonData, null, 4)], { type: "application/json" });
    saveAs(blob, "product.json");
}
