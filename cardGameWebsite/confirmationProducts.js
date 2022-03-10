"use strict";

window.addEventListener("load", function() {
	var formData = location.search.slice(1);
	formData = formData.replace(/\+/g, " ");
	formData = decodeURIComponent(formData);
	var formFields = formData.split(/[&=]/g);
	console.log(formFields);
	
	var productForm = document.forms.productForm;
	
	productForm.elements.orderDate.value = formFields[1];
	productForm.elements.productName.value = formFields[5];
	productForm.elements.productPrice.value = formFields[3];
	productForm.elements.productQuantity.value = formFields[7];
	productForm.elements.costOfAllProducts.value = formFields[11];
	productForm.elements.salesTax.value = formFields[13];
	productForm.elements.finalTotal.value = formFields[15];
	
});