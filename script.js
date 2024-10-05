//--------------------visibility of the cart--------------//

var sidebarVisible = false;
    // Function to toggle sidebar visibility
    function sidebar() {
        var cart = document.getElementById("sidebar");
        if (!sidebarVisible) {
            cart.style.display = "block";
            sidebarVisible = true;
        } else {
            cart.style.display = "none";
            sidebarVisible = false;
        }
    }

    // Function to check if the sidebar is open
    function isSidebarOpen() {
        return sidebarVisible;
    }

    // Event listener to hide sidebar when clicking outside
    document.body.addEventListener("click", function(event) {
        var cart = document.getElementById("sidebar");
        var target = event.target;
        if (!cart.contains(target) && isSidebarOpen()) {
            cart.style.display = "none";
            sidebarVisible = false;
        }
    });

//---------------function to add to cart----------------//

        function addToCart(itemName, amount) {
            var cart = document.getElementById("sidebar");
            var grandTotal = parseFloat(document.getElementById("grandTotal").textContent.split("₹")[1]);
            var existingItem = cart.querySelector("p[data-item='" + itemName + "']");
            
            if (existingItem) {
                var quantity = parseInt(existingItem.getAttribute("data-quantity")) + 1;
                var totalAmount = parseFloat(existingItem.getAttribute("data-amount")) + amount;
                existingItem.setAttribute("data-quantity", quantity);
                existingItem.setAttribute("data-amount", totalAmount);
                existingItem.textContent = itemName + " (x" + quantity + ") - ₹" + totalAmount.toFixed(2);
            } else {
              
                var newItem = document.createElement("p");
                var totalAmount = amount;
                newItem.textContent = itemName + " (x1) - ₹" + totalAmount.toFixed(2);
                newItem.setAttribute("data-item", itemName);
                newItem.setAttribute("data-quantity", 1);
                newItem.setAttribute("data-amount", totalAmount);

                cart.appendChild(newItem);
            }
// Update grand total
grandTotal += amount;
document.getElementById("grandTotal").textContent = "Grand Total: ₹" + grandTotal.toFixed(2);

            var clickCount = document.getElementById("clickCount");
            clickCount.textContent = parseInt(clickCount.textContent) + 1;
           
    alert("Item successfully added to the cart.");
        }
//---------------function to Place the Order----------------//
        function placeOrder() {
            var clickCount = document.getElementById("clickCount");
            var itemCount = parseInt(clickCount.textContent);
            var grandTotalElement = document.getElementById("grandTotal");
            var grandTotalText = grandTotalElement.textContent;
        
            if (itemCount === 0) {
                alert("Your cart is empty. Please add items before placing an order.");
                return; 
            }
        
            alert("Your Order placed successfully. Thanks for ordering!");
        
            var cart = document.getElementById("sidebar");
            var items = cart.querySelectorAll("p[data-item]");
            
            // Collect ordered items and grand total
            var orderDetails = "Ordered Products:\n";
            items.forEach(function(item) {
                orderDetails += "- " + item.textContent + "\n";
                item.parentNode.removeChild(item);
            });
            
            orderDetails += "\n" + grandTotalText;
        
            // Reset the total ordered count
            clickCount.textContent = "0";
            grandTotalElement.textContent = "Grand Total: ₹0.00";
        
            // Create a Blob with the order details
            var blob = new Blob([orderDetails], { type: 'text/plain' });
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'order-details.txt';
            
            // Append link to the document and simulate a click to download the file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        

  //----------------To clear the Cart ----------------//
  function clearCart() {
    var cart = document.getElementById("sidebar");
    var items = cart.querySelectorAll("p[data-item]");
  
    if (items.length === 0) {
      alert("There are no products to clear from the cart.");
      return;
    }
  
    items.forEach(function(item) {
      item.parentNode.removeChild(item);
    });
  
    // Reset the grand total, Reset the total ordered count
    clickCount.textContent = "0";
    grandTotal = 0;
    document.getElementById("grandTotal").textContent = "Grand Total: ₹0.00";
    alert("The Cart is Cleared Sucessfully.");
  }
  
        
        
        function toggleSidebar() {
            var sidebar = document.getElementById("sidebar");
            var sidebarVisible = sidebar.style.left === "0px"; 
        
            if (!sidebarVisible) {
                sidebar.style.left = "0"; 
            } else {
                sidebar.style.left = "-600px"; 
            }
        }
        

        function goToTop() {
    
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        
  //-----------------------------------------------------//

  // JavaScript function to perform a linear search on recipes
  function searchProduct() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let productCards = document.querySelectorAll('.product-card');
    
    // Boolean to track if a match is found
    let found = false;
    let foundIndex = -1;
    
    // Remove previous highlights and reset display
    productCards.forEach(card => {
        card.classList.remove('highlight');
        card.classList.remove('traverse-highlight');
        card.style.display = "block"; 
    });
    
    // Function to visually indicate traversal and search
    function traverseAndSearch(index) {
        if (index < productCards.length) {
            let card = productCards[index];
            let productTitle = card.querySelector('h3').textContent.toLowerCase();
            
            // Highlight the traversed card
            card.classList.add('traverse-highlight');
            
            // Check if the search term matches the product title
            if (productTitle.includes(searchInput)) {
                found = true;
                foundIndex = index; 
                card.classList.add('highlight'); 
                setTimeout(() => {
                    alert(`Product Found at Position ${foundIndex + 1}`); 
                }, 300);
                return; 
            }
            
            setTimeout(() => {
                card.classList.remove('traverse-highlight'); 
                traverseAndSearch(index + 1); 
            }, 300); 
        } else {
            if (!found) {
                alert("No product found for your search.");
            }
        }
    }
   
    traverseAndSearch(0);
}
