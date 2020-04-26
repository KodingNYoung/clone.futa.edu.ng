const button= document.querySelector(".toggle");
const container= document.querySelector(".nav-container");
const dropItems = document.querySelectorAll(".dropitems");
const plus = document.querySelectorAll(".plus");
// declaration of vatiable for the carousel
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const boxNav = document.querySelector(".carousel__nav");
const boxes = Array.from(boxNav.children);

// for the automatic slide
let currentIndex = 0,
	time = 5000;

// ------------------------------------------------------
// set the width of the track to contain all slides
track.style.width = `${slides.length *100}%`;

//getting the width size of the slides(both image and text)
const slideSize = slides[0].getBoundingClientRect().width;

//arrange my slide side by side
const positionSlide = (slide, index) =>{
	slide.style.left = (slideSize * index) + "px";
};
slides.forEach(positionSlide);

// ------------------------------------------------------
// event listeners

// to the burger dropdown
button.addEventListener("click", dropTheNavBar);

// to the container and delegate to plus
container.addEventListener("click", delegateToPlus);

//to the containers of the navigation buttons under the slide
boxNav.addEventListener("click", checkTheClickedButton)

// to the window when ever it loads
window.onload = changeSlide;

// ------------------------------------------------------
// functions
// drop the nav bar
function dropTheNavBar(){
    container.classList.toggle("new_nav-container");
    // toggle the burger
	button.classList.toggle("toggled");
}
// delegate the event of the ul to the plus
function delegateToPlus(e){
	// make sure that the targeted element is the plus 
	if (e.target.className === "plus"){
		// effect the drop down
		dropTheItems(e);
	}
}
// drop the plus dropdown items
function dropTheItems(e){
	e.target.parentNode.nextElementSibling.classList.toggle("second-order_dropdown");
}
// check the clicked btn
function checkTheClickedButton(e){
	let targetedBox; 
	// make sure the targeted box is the indicator btn
	if (e.target.className.includes("btn-text") || e.target.className.includes("hole")){
		targetedBox = e.target.parentNode;
	}else if(e.target.className.includes("carousel__indicator")){
		targetedBox = e.target;
	}else{
		return;
	}

	moveToTargetedSlide(targetedBox);	
}
// move to the targeted slide
function moveToTargetedSlide(targetedBox){
	if (targetedBox.className === "carousel__indicator"){
		const currentSlide = track.querySelector(".current-slide");
		const currentBox = boxNav.querySelector(".current-slide");
		const targetedIndex = boxes.findIndex(function(box){		//box => box === targetedBox);
			return box === targetedBox}); 
		const targetedSlide = slides[targetedIndex];
		moveToSlide(track, currentSlide, targetedSlide);
		moveToBox(currentBox, targetedBox);
	}
}
// to move the slide when prompted
function moveToSlide(track, currentSlide, targetedSlide){
	track.style.transform = "translateX(-"+ targetedSlide.style.left + ")";
	currentSlide.classList.remove("current-slide");
	targetedSlide.classList.add("current-slide");
}
// to move the highlight on the nav buttons
function moveToBox(currentBox, targetedBox){
	currentBox.classList.remove("current-slide");
	targetedBox.classList.add("current-slide");
}
// automatically change slide with constant delay!
function changeSlide(){
	const currentSlide = track.querySelector(".current-slide");
	const currentBox = boxNav.querySelector(".current-slide");
	const targetedBox = boxes[currentIndex];
	const targetedSlide = slides[currentIndex];

	moveToSlide(track, currentSlide, targetedSlide);
	moveToBox(currentBox, targetedBox);

	if (currentIndex < slides.length - 1){
		currentIndex++
	}else{
		currentIndex = 0;
	}

	setTimeout(changeSlide, time)
}



