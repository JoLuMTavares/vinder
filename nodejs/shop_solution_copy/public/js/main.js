let thumbnailcontainerObj = document.getElementById('thumbnailcontainer');
let productdetailsObj = document.getElementById('productdetails');
let cartSet = document.querySelector(".cart");
let products = [];
var finalPrice = 0;

let cart = localStorage.getItem('cart');
if(!cart) {
    localStorage.setItem('cart', JSON.stringify([]));
}

document.addEventListener('click', function (event) {
    if(event.target.matches('.thumbnail-container')) {
        let id = event.target.getAttribute('data-id');
        showProductDetails(id);
    }
}, false);

function showProductDetails(id) {
    let index = 0;
    for(let i=0; i<products.length; i++) {
        if(products[i].id === id) {
            index = i;
            break;
        }
    }
    
    // index should point the right position in the array
    thumbnailcontainerObj.style.display = 'none';
    productdetailsObj.style.display = 'block';

    var productImgDiv = document.createElement('div');
    productImgDiv.setAttribute("id","product-image");
    productImage.src = product[index].imgurl;

    var productImage = document.createElement('img');
    productImgDiv.className("product-image");

    var productnameObj = document.createElement('div');
    productnameObj.setAttribute("id", "productname");
    productnameObj.innerHTML = products[index].name;

    let productdescriptionObj = document.getElementById('productdescription'); 
    productdescriptionObj.innerHTML = products[index].description;

    let productimageObj = document.getElementById('productimage');
    productimageObj.src = products[index].imgurl;    

    let priceObj = document.getElementById('price');
    priceObj.innerHTML = products[index].price;

    let totalamountObj = document.getElementById('totalamount');
    totalamountObj.innerHTML = 1 * products[index].price;
    let quantityObj = document.getElementById('quantity');
    quantityObj.value = "1";
    quantityObj.oninput = function() {
        totalamountObj.innerHTML = (products[index].price * quantityObj.value).toFixed(2);
    }

    let btnaddcartObj = document.getElementById('btnaddcart');
    btnaddcart.onclick = function() {
        let cart = JSON.parse(localStorage.getItem('cart'));

        products[index].quantity = quantityObj.value;
        cart.push(products[index]);
        localStorage.setItem('cart', JSON.stringify(cart));
        delete products[index].quantity;
        showCart();

    }
}

/*
function showCart() {
    

    var finalArray = [];
    var currentElem = "";
    var completeElem = "";

    var stringElem = "";

    var p1 = 0, p2 = 0;

    var thePrice = "";

    // Price of all items together
    var finalPrice = 0;

    // One single variable to get the right div
    var cartSet = document.querySelector(".cart");


    for (var i = 0; i < localStorage.length; i++) {

        var currentElement = localStorage.getItem(localStorage.key(i));
        console.log('​showCart -> currentElement', currentElement);

        var itemsArray = currentElement.split("},");
        console.log('​showCart -> itemsArray', itemsArray);

        for (var j = 0; j < itemsArray.length-1; j++) {
            currentElem = itemsArray[j];

            // var completeElem = currentElem.splice(currentElem.length-1, 0, "}");
            completeElem = currentElem.concat("}");
            finalArray.push(completeElem);
            
        }
        currentElem = itemsArray[itemsArray.length-1];
        var finalElem = currentElem.substr(0, currentElem.length-1);
        finalArray.push(finalElem);
        console.log('​showCart -> ', finalArray);
        
    }

    for (var k = 0; k < finalArray.length; k++) {
        stringElem = finalArray[k];
        console.log('​stringElem', stringElem);

        // First position of the String "name" (the key from the first element)
        p1 = stringElem.indexOf("name");

        // First position of the String "description"
        p2 = stringElem.indexOf("description");

        // Now we get the needed name of the item
        var nameElem = stringElem.substr(p1+7, p2-12);
        console.log('​nameElem', nameElem);

        // This is only here because some strings persists on keeping at
        // least one of the quotation marks
        var nameElemNoExtra = nameElem.replace(/['"]+/g, '');
        console.log('​nameElemNoExtra', nameElemNoExtra);

        p1 =  stringElem.indexOf("price");

        p2 = stringElem.indexOf("imgurl");

        thePrice = stringElem.substring(p1+8, p2-3);
        console.log('​thePrice', thePrice);

        var realPrice = parseFloat(thePrice);

        p1 = stringElem.indexOf("imgurl");

        p2 = stringElem.indexOf("category");

        var imgUrl = stringElem.substring(p1+9, p2-3);
        console.log('​imgUrl', imgUrl);

        p1 = stringElem.indexOf("quantity");

        p2 = stringElem.indexOf("}");

        var quantity = parseInt(stringElem.substring(p1+11, p2-1));
        console.log('​quantity', quantity);

        var totalPrice = quantity * realPrice;
        console.log('​totalPrice', totalPrice);

        // Next, variables for the html representation

        var cartItem = document.createElement("div");
        cartItem.className = "cart-item"

        var cartImg = document.createElement("div"); 
        cartImg.className = "cart-image";

        var theImage = document.createElement("img");
        theImage.className = "cart-picture";
        theImage.src = imgUrl;

        cartImg.appendChild(theImage);

        cartItem.appendChild(cartImg);        
        

        var itemDescription = document.createElement("div"); 
        itemDescription.className = "cart-description";


        var itemQuantity = document.createElement("span");
        itemQuantity.className = "cart-quantity";
        itemQuantity.innerHTML = quantity;

        var itemName = document.createElement("span");
        itemName.className = "cart-productname";
        itemName.innerHTML = nameElemNoExtra;
        
        var itemAmount = document.createElement("span");
        itemAmount.className = "cart-amount";
        itemAmount.innerHTML = totalPrice;


        var removeItemButton = document.createElement("button");

        removeItemButton.className = "remove-item";

        removeItemButton.innerHTML = "Remove";

        itemDescription.appendChild(itemQuantity);
        itemDescription.appendChild(itemName);
        itemDescription.appendChild(itemAmount);
        itemDescription.appendChild(removeItemButton);

        cartItem.appendChild(itemDescription);
        // console.log('​cartItem', cartItem);
        

        cartSet.appendChild(cartItem);        
        
        finalPrice += totalPrice;
        
    }

    var separator = document.createElement("hr");
    separator.className = "cart-break";

    var buyDiv = document.createElement("div");
    buyDiv.className = "cart-buy";

    var finalPriceHtml = document.createElement("span");
    finalPriceHtml.className = "cart-totalamount";
    finalPriceHtml.innerHTML = finalPrice;
    console.log('​finalPrice', finalPrice);

    buyDiv.innerHTML = 'Total Amount: <span class="cart-totalamount">'+ finalPrice +'</span> €' + 
                        '<button class="btnpurchaseorder">Buy Now</button>';

    cartSet.appendChild(separator);
    cartSet.appendChild(buyDiv);

    var hideButton = document.createElement("button");
    hideButton.className = "hide-cart";
    hideButton.innerHTML = "Hide cart";

    hideButton.addEventListener("click", hideCart);

    cartSet.appendChild(hideButton);
    // console.log('​showCart -> currentElement', currentElement);
    console.log('​cartSet', cartSet);
    
    cartSet.style.display = "block";
    var products =  document.querySelector(".thumbnail-container");
    products.style.display = "none";

}

*/

function showCart() {

    cartSet.style.display = "block";
    thumbnailcontainerObj.style.display = "none";
    productdetailsObj.style.display = "none";

    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log('​showCart -> cart', cart);

    var cartItem = "";

    if (cart.length === 0) 
        cartSet.innerHTML = "<h2> You don't have any items on the cart.</h2>";
    else {
        cartSet.innerHTML = "";
        for (let i = 0; i < cart.length; i++) {

            var amount = cart[i].price * cart[i].quantity;

            cartItem = `<div class="cart-item" data-id="${cart[i].id}">
                                <div>
                                    <img src="${cart[i].imgurl}" alt="" class="cart-picture">
                                </div>
                                <div class="cart-description">
                                    <div>
                                        <span class="cart-quantity">${cart[i].quantity}</span> x
                                        <span class="cart-productname">${cart[i].name}</span>:
                                        <span class="cart-amount">${amount} €</span>
                                        <button class="remove-item" onclick="removeCartItem(${cart[i].id});">Remove</button>
                                    </div>
                                </div>
                            </div>
                                    `;
            finalPrice += amount;
            cartSet.innerHTML += cartItem;
        }
    }
    cartSet.innerHTML += `<hr class="cart-break">
                            <div class="cart-buy">
                                Total Amount: <span class="cart-totalamount" id="carttotalamount">${finalPrice}</span> € 
                                <button class="btnpurchaseorder">Buy Now</button>
                            </div> 
                            `;

}

function removeCartItem(id) {
    
    let elem = document.querySelector(`#cart div [data-id="${id}"]`);
    elem.parentNode.removeChild(elem);

    let cart = JSON.parse(localStorage.getItem("cart"));
    let removeIndex = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            removeIndex = i;
            break;
        }
        else 
            total += cart[i].quantity * cart[i].price;
    }
    cart.splice(removeIndex, 1);
    let cartTotalAmountObj = document.getElementById("cart-totalamount");
    cartTotalAmountObj.innerHTML = total;
    localStorage.setItem("cart", JSON.stringify(cart));


}

function hideCart() {
    var cartSet = document.querySelector(".cart");
    cartSet.innerHTML = "";
    cartSet.style.display = "none";

    var products =  document.querySelector(".thumbnail-container");
    products.style.display = "flex";
}

function loadProducts(category) {
    let xhr = new XMLHttpRequest();
    if(category) {
        xhr.open('GET', 'http://localhost:3000/product?category='+category);
    }
    else {
        xhr.open('GET', 'http://localhost:3000/product');        
    }

    xhr.onload = function() {
        if(xhr.status === 200) {
            thumbnailcontainerObj.style.display = 'flex';
            productdetailsObj.style.display = 'none';

            thumbnailcontainerObj.innerHTML = '';
            console.log('successfull request');
            let resultObj = JSON.parse(xhr.responseText);
            console.log( resultObj );
            products = resultObj.products;
        
            /* to create a div like this: 
                    <div class="thumbnail">
                        <div class="thumbnail-name">Goodfellas</div>
                        <div class="thumbnail-price">19.99 €</div>
                    </div>
            */
            
            for(let i=0; i<products.length; i++) {
                let newThumbnail = document.createElement('div');
                newThumbnail.className = 'thumbnail';

                let newThumbnailName = document.createElement('div');
                newThumbnailName.className = 'thumbnail-name';
                newThumbnailName.innerHTML = products[i].name;
            
                let newThumbnailPrice = document.createElement('div');
                newThumbnailPrice.className = 'thumbnail-price';
                newThumbnailPrice.innerHTML = products[i].price + ' €';

                newThumbnail.appendChild(newThumbnailName);
                newThumbnail.appendChild(newThumbnailPrice);

                newThumbnail.style.background = 'url('+products[i].imgurl+') no-repeat center';

                newThumbnail.setAttribute('data-id', products[i].id);

                thumbnailcontainerObj.appendChild(newThumbnail);
            }
        }
    }

    xhr.send();
}

loadProducts();