let hero_ul = document.getElementById('hero-ul');
hero_ul.className = "hero-list";
let productList = [];

function addProduct() {
    const product_name = document.getElementById('product-name').value;
    const product_price = document.getElementById('product-price').value;
    const product_img = document.getElementById('product-img').files[0];
    if (product_name && product_price && product_img !== " ") {
        addProductToList(product_name, product_price, product_img);
        productList.push({name: product_name, price: product_price, image: product_img});
    }
    else {
        alert("Invalid input. Please fill all the fields");
    }
}
function addProductToList(pr_name, pr_price, pr_image) {
    const item = document.createElement('li');
    item.className = "product-item";

    const item_img = document.createElement('img');
    item_img.src = URL.createObjectURL(pr_image);
    item_img.className = "item-img";

    const item_name = document.createElement('span'); // Змінив на <span>, щоб текст не можна було редагувати
    item_name.className = "item-name";
    item_name.textContent = pr_name;

    const item_price = document.createElement('span'); // Змінив на <span>, щоб текст не можна було редагувати
    item_price.className = "item-price";
    item_price.textContent = pr_price;

    const delete_btn = document.createElement('button');
    delete_btn.textContent = "Delete product";
    delete_btn.className = "item-delete";

    delete_btn.addEventListener('click', function() {
        item.remove(); 
        const index = productList.findIndex(product => product.name === pr_name &&
        product.price === pr_price && product.image === pr_image);
        if (index !== -1) {
            productList.splice(index, 1);
        }
    });

    item.appendChild(item_img);
    item.appendChild(item_name);
    item.appendChild(item_price);
    item.appendChild(delete_btn);

    hero_ul.appendChild(item);
}
let add_button = document.getElementById('add-btn');

add_button.addEventListener('click', ()=> {
    addProduct();
})

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('item-name') || target.classList.contains('item-price')) {
        const item = target.closest('.product-item');
        const itemNameElement = item.querySelector('.item-name');
        const itemPriceElement = item.querySelector('.item-price');
        
        const newName = prompt("Enter new name:", itemNameElement.textContent);
        const newPrice = prompt("Enter new price:", itemPriceElement.textContent);
        
        if (newName !== null && newPrice !== null) {
            itemNameElement.textContent = newName;
            itemPriceElement.textContent = newPrice;
        }
    }
});


