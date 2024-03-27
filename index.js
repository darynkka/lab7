let hero_ul = document.getElementById('hero-ul');
hero_ul.className = "hero-list";
let productList = [];

function addProduct() {
    const product_name = document.getElementById('product-name').value;
    const product_price = document.getElementById('product-price').value;
    const product_img = document.getElementById('product-img').files[0];
    if (product_name && product_price && product_img) {
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

    const item_name = document.createElement('span'); 
    item_name.className = "item-name";
    item_name.textContent = pr_name;

    const item_price = document.createElement('span'); 
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
    document.getElementById('product-form').style.display = 'block';
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-img').value = '';
});

document.getElementById('save-btn').addEventListener('click', () => {
    document.getElementById('product-form').style.display = 'none';
    addProduct();
});

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

const filter_text = document.getElementById('filter-input');
let filter_btn = document.getElementById("filter-btn");
function filterProducts() {
    const items = document.querySelectorAll('.product-item');

    items.forEach(item => {
        const itemName = item.querySelector('.item-name').textContent.toLowerCase();
        const shouldShow = itemName.includes(filter_text.value.toLowerCase()); 
        item.style.display = shouldShow ? 'flex' : 'none'; 
    });
}
filter_btn.addEventListener('click', () => {
    filter_text.style.display = 'flex';
    filterProducts();
});


document.getElementById('total-price-btn').addEventListener('click', calculateTotalPrice);

function calculateTotalPrice() {
    let total = 0;
    const item_prices = document.querySelectorAll('.item-price');
    item_prices.forEach(item_price => {
        total += parseFloat(item_price.textContent);
    });
    alert(`Total price: ${total}`);
}

function displayAll() {
    const items = document.querySelectorAll('.product-item');
    items.forEach(item => {
        item.style.display = 'flex';
    });
}
document.getElementById('display-btn').addEventListener('click', displayAll);
