var button= document.querySelector(".toggle");
var container= document.querySelector(".nav-container");
var dropItems = document.querySelectorAll(".dropitems");
var plus = document.querySelectorAll(".plus");
// declaration of vatiable for the carousel
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const boxNav = document.querySelector(".carousel__nav");
const boxes = Array.from(boxNav.children);



//getting th width size of the slides(both image and text)
const slideSize = slides[0].getBoundingClientRect().width;


function moveToSlide(track, currentSlide, targetedSlide){
	track.style.transform = "translateX(-"+ targetedSlide.style.left + ")";
	currentSlide.classList.remove("current-slide");
	targetedSlide.classList.add("current-slide");
}
function moveToBox(currentBox, targetedBox){
	currentBox.classList.remove("current-slide");
	targetedBox.classList.add("current-slide");
}

button.addEventListener("click", function(){
    container.classList.toggle("new_nav-container");
    // toggle the burger
    button.classList.toggle("toggled");
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

//arrange my slide side by side
const positionSlide = (slide, index) =>{
	slide.style.left = (slideSize * index) + "px";
};


slides.forEach(positionSlide);

//when i click the nav indicator move to dat slide
boxNav.addEventListener("click", function(e){
	const targetedBox = e.target.closest('button');
	
	if (targetedBox){
		const currentSlide = track.querySelector(".current-slide");
		const currentBox = boxNav.querySelector(".current-slide");
		const targetedIndex = boxes.findIndex(function(box){		//box => box === targetedBox);
			return box === targetedBox}); 
		const targetedSlide = slides[targetedIndex];
		
		moveToSlide(track, currentSlide, targetedSlide);
		moveToBox(currentBox, targetedBox);
	}else return;
})

//automatically change slide with constant delay!


