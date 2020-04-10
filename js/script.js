var button= document.querySelector(".toggle");
var container= document.querySelector(".nav-container");
var dropItems = document.querySelectorAll(".dropitems");
var plus = document.querySelectorAll(".plus");
// declaration of vatiable for the carousel


button.addEventListener("click", function(){
    container.classList.toggle("new_nav-container");
    // toggle the burger
    button.classList.toggle("toggled")
})

function addClass(){
	Array.prototype.slice.call(plus).forEach(function(i){
		i.addEventListener("click", function(clicking){
            console.log(clicking.target.parentNode.nextElementSibling);
			clicking.target.parentNode.nextElementSibling.classList.toggle("second-order_dropdown");
		});
	});
}













addClass();
