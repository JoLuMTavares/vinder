
var productManagement = function () {
    
  


    let thumbnailcontainerObj = document.getElementById('thumbnailcontainer');
    let productdetailsObj = document.getElementById('productdetails');
    let addProductDiv = document.querySelector(".add-product");
    let cartSet = document.querySelector(".cart");
    let products = [];
    let currentProductId = 0;
    var finalPrice = 0;

    // Function to get the right product on the array
    function getProduct(id) {
        for(let i=0; i<products.length; i++) {
            var chosenProduct = "";
            if(products[i]._id === id) {
                chosenProduct = products[i];
                // index = i;
                break;
            }
        }
        return chosenProduct;
    }

    addProductDiv.style.display = "none";

    let cart = localStorage.getItem('cart');
    if(!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    document.addEventListener('click', function (event) {
        if(event.target.matches('.thumbnail')) {
            let id = event.target.getAttribute('data-id');
            ProductManagement.showProductDetails(id);
        }
    });

    document.addEventListener("click", function(event) {
        if (event.target.matches(".add-product-btn")) {
            ProductManagement.addNewProduct();
        } 
    });

    document.addEventListener("click", function(event) {
        if (event.target.matches("#deleteproduct")) {
            let id = event.target.getAttribute('data-id');
            ProductManagement.removeProduct(id);
        } 
    });
/*
    document.addEventListener("click", function (event) {
       if (event.target.matches(".search-product-btn")) {
            let term = event.target.getElementById("searchterm");
            ProductManagement.searchProducts(term); 
       }
    });

    */

   $(".search-product-btn").click(function (event) {
        let term = $(".search-term").val();
        ProductManagement.searchProducts(term); 
        // $("#searchterm").reset(); // Not good here. It reforces page reload.
        event.preventDefault();
   });

   $(".change-product-btn").on(function (event) {
       let id = $("changeproduct").attr("data-id");
        let product = getProduct($("changeproduct").attr("data-id"));
        ProductManagement.showProductDetails(id);
   });

    return {

        init : function () {
            ProductManagement.loadProducts();
        },

        addNewProduct : function () {
            // let title = document.querySelector(".title").value;
            let title = $("#title").val();
            let type = $("#type").val();
            let inserted_price = $("#product-price").val();
            let imgUrl = $("#imageurl").val();
            let product_description = $("#product-description").val();

            var type_id = 0;

            if (type === "book")
                type_id = 1;
            else if (type === "music")
                type_id = 2;
            else if (type === "movie")
                type_id = 3;
            var data = {
                title: title,
                type_id: type_id,
                product_price: inserted_price,
                imgUrl: imgUrl,
                product_description: product_description
            };

            $.ajax({
                method: 'POST',
                url: 'http://localhost:3000/products',
                // dataType: 'content-type/json; charset=utf-8',
                dataType:'json',
                contentType:'application/json',
                data: JSON.stringify(data),
                success: function(data) {
                    
                },
                error: function(err) {

                }
            });
            ProductManagement.loadProducts();
        },

        searchProducts : function (term) {
            addProductDiv.style.display = 'none'; 
            thumbnailcontainerObj.innerHTML = "";
            
            $.ajax({
                method: 'GET',
                url: 'http://localhost:3000/product?term=' + term,
                // dataType: 'content-type/json; charset=utf-8',
                dataType:'json',
                contentType:'application/json',
                success: function(data) {
                    console.log(data);
                    // alert(data);
                    thumbnailcontainerObj.style.display = 'flex';
                    productdetailsObj.style.display = 'none';

                    thumbnailcontainerObj.innerHTML = '';
                    console.log('successfull request');
                    
                    // console.log(xhr.responseText);

                    let products = data;


                    
                    // products = JSON.parse(data);
                    console.log( products );
                    // products = resultObj.products;
                    
                    for(let i=0; i<products.length; i++) {
                        let newThumbnail = document.createElement('div');
                        newThumbnail.className = 'thumbnail';

                        let newThumbnailName = document.createElement('div');
                        newThumbnailName.className = 'thumbnail-name';
                        newThumbnailName.innerHTML = products[i].title;
                    
                        let newThumbnailPrice = document.createElement('div');
                        newThumbnailPrice.className = 'thumbnail-price';
                        newThumbnailPrice.innerHTML = products[i].price + ' €';

                        newThumbnail.appendChild(newThumbnailName);
                        newThumbnail.appendChild(newThumbnailPrice);

                        newThumbnail.style.background = 'url('+products[i].image+') no-repeat center';

                        newThumbnail.setAttribute('data-id', products[i]._id);

                        thumbnailcontainerObj.appendChild(newThumbnail);
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        },

        removeProduct : function  (id) {
            $.ajax({
                method: 'DELETE',
                url: 'http://localhost:3000/product?id=' + id,
                // dataType: 'content-type/json; charset=utf-8',
                dataType:'json',
                contentType:'application/json',
                success: function(data) {
                    console.log(data);
                    alert(data);
                },
                error: function(err) {
                    console.log(err);
                }
            });
            ProductManagement.loadProducts();
        },

        showProductDetails : function (id) {
            productdetailsObj.innerHTML = "";
            console.log(products);
            // let index = 0;
            let chosenProduct = getProduct(id);
            
            // index should point the right position in the array
            thumbnailcontainerObj.style.display = 'none';
            productdetailsObj.style.display = 'block';

            productContainerDiv = document.createElement("div");
            productContainerDiv.setAttribute("class","product-container");
            productContainerDiv.setAttribute("data-id", chosenProduct._id);
            productdetailsObj.appendChild(productContainerDiv);

            var productImgDiv = document.createElement('div');
            productImgDiv.setAttribute("class","product-image");

            var productImage = document.createElement("img");
            productImage.setAttribute("id","productimage");
            productImage.src = chosenProduct.image;

            productImgDiv.appendChild(productImage);

            
            // var productImage = document.createElement('img');
            productContainerDiv.appendChild(productImgDiv);

            var productInfoDiv = document.createElement('div');
            // productInfoDiv.setAttribute("id", chosenProduct.id);
            productInfoDiv.setAttribute("class", "product-infos");
            productContainerDiv.appendChild(productInfoDiv);


            var productnameObj = document.createElement('h2');
            productnameObj.setAttribute("id", "productname");
            productnameObj.innerHTML = chosenProduct.title;
            productInfoDiv.appendChild(productnameObj);

            let productdescriptionObj = document.createElement('div'); 
            productdescriptionObj.setAttribute("id", "productdescription");
            productdescriptionObj.setAttribute("class", "product-description");
            productdescriptionObj.innerHTML = chosenProduct.description;
            productInfoDiv.appendChild(productdescriptionObj);

            // let productimageObj = document.createElement('productimage');
            // productimageObj.src = chosenProduct.image;  
            
            let productBuyDiv = document.createElement('div'); 
            productBuyDiv.setAttribute("id", "product-buy");
            productInfoDiv.appendChild(productBuyDiv);

            let productBInnerDiv = document.createElement('div'); 
            productBuyDiv.appendChild(productBInnerDiv);

            let priceObj = document.createElement('span');
            priceObj.setAttribute("id", "price");
            priceObj.setAttribute("class", "price");
            priceObj.innerHTML = chosenProduct.price;
            productBInnerDiv.appendChild(priceObj);
            productBInnerDiv.append(" X ");

            let quantityObj = document.createElement('input');
            quantityObj.setAttribute("type", "number");
            quantityObj.setAttribute("min", "1");
            quantityObj.setAttribute("max", "9");
            quantityObj.setAttribute("id", "quantity");
            quantityObj.setAttribute("class", "quantity");
            
            quantityObj.value = "1";
            quantityObj.oninput = function() {
                totalamountObj.innerHTML = (chosenProduct.price * quantityObj.value).toFixed(2);
            }
            productBInnerDiv.appendChild(quantityObj);

            // priceObj.appendChild(quantityObj);

            let totalamountObj = document.createElement('span');            
            totalamountObj.setAttribute("id", "totalamount");
            totalamountObj.setAttribute("class", "total-amount");
            totalamountObj.innerHTML = 1 * chosenProduct.price;
            productBInnerDiv.append(" = ");
            productBInnerDiv.appendChild(totalamountObj);

            

            let btnaddcart = document.createElement('button');

            btnaddcart.onclick = function() {
                let cart = JSON.parse(localStorage.getItem('cart'));

                // chosenProduct.quantity = quantityObj.value;
                cart.push(chosenProduct);
                localStorage.setItem('cart', JSON.stringify(cart));
                // delete chosenProduct.quantity;
                showCart();

            }

            btnaddcart.setAttribute("class", "btn-add-cart");
            btnaddcart.setAttribute("id", "btnaddcart");
            btnaddcart.innerHTML = "Add to Cart";
            productBInnerDiv.appendChild(btnaddcart);

            // productBInnerDiv.innerHTML = priceObj + " X " + quantityObj + " = " + totalamountObj;
            let changeDiv = document.createElement("div");
            changeDiv.setAttribute("id", "change-section");

            let changeButton = document.createElement("button");
            changeButton.setAttribute("id","changeproduct");
            changeButton.setAttribute("class","change-product-btn");
            changeButton.setAttribute("data-id", chosenProduct._id);
            // changeButton.setAttribute("onclick", "ProductManagement.showAddProduct("+ chosenProduct +")");
            changeButton.innerHTML = "Change Product";

            changeDiv.appendChild(changeButton);
            productContainerDiv.appendChild(changeDiv);

            let removeDiv = document.createElement("div");
            removeDiv.setAttribute("id", "remove-section");

            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("id","deleteproduct");
            deleteButton.setAttribute("class","delete-product");
            deleteButton.setAttribute("data-id", chosenProduct._id);
            deleteButton.innerHTML = "Remove Product";

            removeDiv.appendChild(deleteButton);
            productContainerDiv.appendChild(removeDiv);

            

        },


        showCart : function () {

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

        },

        showAddProduct : function (product) {
            
            
            if ( product != undefined ) {
                $("#title").val(product.title);
                $("#type").val(product.type);
                $("#product-price").val(product.price);
                $("#imageurl").val(product.image);
                $(".add-product-btn").attr("data-id", product._id);

            }
            thumbnailcontainerObj.style.display = 'none';
            productdetailsObj.style.display = 'none';
            addProductDiv.style.display = 'block';
        },

        removeCartItem : function (id) {
            
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


        },

        hideCart : function () {
            var cartSet = document.querySelector(".cart");
            cartSet.innerHTML = "";
            cartSet.style.display = "none";

            var currProducts =  document.querySelector(".thumbnail-container");
            currProducts.style.display = "flex";
        },

        loadProducts : function (category) {
            addProductDiv.style.display = 'none';  
            /*
            var link = "";

            if (category)
                link = 'http://localhost:3000/products?category=' + category;
            else
                link = 'http://localhost:3000/products';

            $.ajax({
                method: 'GET',
                url: link,
                // dataType: 'content-type/json; charset=utf-8',
                dataType:'json',
                contentType:'application/json',
                success: function(data) {
                    if (data.length > 0) {
                        console.log(data);
                        alert(data);
                        thumbnailcontainerObj.style.display = 'flex';
                        productdetailsObj.style.display = 'none';

                        thumbnailcontainerObj.innerHTML = '';
                        console.log('successfull request');
                        
                        products = JSON.parse(data);
                        console.log( products );
                        // products = resultObj.products;
                        
                        for(let i=0; i<products.length; i++) {
                            let newThumbnail = document.createElement('div');
                            newThumbnail.className = 'thumbnail';

                            let newThumbnailName = document.createElement('div');
                            newThumbnailName.className = 'thumbnail-name';
                            newThumbnailName.innerHTML = products[i].title;
                        
                            let newThumbnailPrice = document.createElement('div');
                            newThumbnailPrice.className = 'thumbnail-price';
                            newThumbnailPrice.innerHTML = products[i].price + ' €';

                            newThumbnail.appendChild(newThumbnailName);
                            newThumbnail.appendChild(newThumbnailPrice);

                            newThumbnail.style.background = 'url('+products[i].image+') no-repeat center';

                            newThumbnail.setAttribute('data-id', products[i].id);

                            thumbnailcontainerObj.appendChild(newThumbnail);
                        }

                    }
                    
                },
                error: function(err) {
                    console.log(err);
                }
            });*/

            
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
                    
                    console.log(xhr.responseText);

                    let response = xhr.responseText;


                    
                    products = JSON.parse(xhr.responseText);
                    console.log( products );
                    // products = resultObj.products;
                    
                    for(let i=0; i<products.length; i++) {
                        let newThumbnail = document.createElement('div');
                        newThumbnail.className = 'thumbnail';

                        let newThumbnailName = document.createElement('div');
                        newThumbnailName.className = 'thumbnail-name';
                        newThumbnailName.innerHTML = products[i].title;
                    
                        let newThumbnailPrice = document.createElement('div');
                        newThumbnailPrice.className = 'thumbnail-price';
                        newThumbnailPrice.innerHTML = products[i].price + ' €';

                        newThumbnail.appendChild(newThumbnailName);
                        newThumbnail.appendChild(newThumbnailPrice);

                        newThumbnail.style.background = 'url('+products[i].image+') no-repeat center';

                        newThumbnail.setAttribute('data-id', products[i]._id);

                        thumbnailcontainerObj.appendChild(newThumbnail);
                    }
                }
            }

            xhr.send();
        }
    }
};

var ProductManagement = productManagement();

$(document).ready(function () {

    ProductManagement.init();

// $(".navi-right").on

});