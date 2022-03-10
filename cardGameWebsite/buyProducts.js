"use strict";

window.addEventListener("load", function(){
	var productForm = document.forms.productForm;
	productForm.elements.productDay.value = new Date().toDateString();
	
	productForm.elements.products.onchange = productOrder;
	productForm.elements.quantityProducts.onchange = productOrder;
	
});

function productOrder() {
	var product = productForm.elements.products.selectedIndex;
	var productCost = productForm.elements.products.options[product].value;
	var quantity = productForm.elements.quantityProducts.value;
	
	productForm.elements.basePrice.value = formatUS(productCost);
	
	var productTotal = productCost * quantity; 
	productForm.elements.priceOfAll.value = formatUS(productTotal);
	
	var tax = (productTotal * 0.11);
	productForm.elements.salesTax.value = formatUS(tax);
	
	var total = tax + productTotal;
	productForm.elements.finalTotal.value = formatUS(total);
	
	productForm.elements.productName.value = productForm.elements.products.options[product].text;
		
}

function formatUS(val) {
	return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}


