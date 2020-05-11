const button= document.querySelector(".toggle");
const navContainer= document.querySelector(".nav-container");
const dropItems = document.querySelectorAll(".dropitems");
const plus = document.querySelectorAll(".plus");
// declaration of vatiable for the carousel
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const boxNav = document.querySelector(".carousel__nav");
const boxes = Array.from(boxNav.children);
// variables for the program and activities
const programTrack = document.querySelector(".slideshow__track");
const slidesArray = Array.from(programTrack.children);
let count = 0;
let amountOfTranslateNum = 0;

// for the automatic slide
let currentIndex = 0,
	time = 5000;

// ------------------------------------------------------
// set the width of the track to contain all slides
function setWidthOfSlide(array, track){
	// set the width of the track to contain all slides
	track.style.width = `${array.length *100}%`;	
};
//get the width of the slides and arrange them width after width
function getWidthOfSlidesAndArrangeThem(slides){
	// get with of one slide
	const slideSize = slides[0].getBoundingClientRect().width;

	//arrange my slide side by side
	slides.forEach(function (slide, index){
		slide.style.left = (slideSize * index) + "px";
	})
}
// set width of the program track
function setProgramTrack(array,track){
	// get the width of the first slide
	// const slideWidth = array[0].getBoundingClientRect().width;
	// console.log(slideWidth)
	//set the width of the track to the the array length * width of slide
	track.style.width = `${array.length *280}px`;
}
function runFunctions(){
	//arrange the track
	getWidthOfSlidesAndArrangeThem(slides);

	// set width for carousel track
	setWidthOfSlide(slides, track);

	setProgramTrack(slidesArray,programTrack)
}

runFunctions();
// ------------------------------------------------------
// event listeners

// to the burger dropdown
button.addEventListener("click", dropTheNavBar);

// to the NAV container and delegate to plus
navContainer.addEventListener("click", delegateToPlus);

//to the containers of the navigation buttons under the slide
boxNav.addEventListener("click", checkTheClickedButton)

// to the window when ever it loads
document.addEventListener("DOMContentLoaded", changeSlideAutomatically);

// to the arrow container
document.querySelector('.programmes__heading-arrows').addEventListener('click', checkTheArrowClicked);
// ------------------------------------------------------
// functions
// NAVBAR
// drop the nav bar
function dropTheNavBar(){
    navContainer.classList.toggle("new_nav-container");
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
// END OF FUNCTIONS FOR NAVBAR

//CAROUSEL  
// check the clicked carousel btn
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
		const targetedIndex = boxes.findIndex(function(box){
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
function changeSlideAutomatically(){
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

	setTimeout(changeSlideAutomatically, time)
}
// END OF FUNCTIONS FOR THE CAROUSEL

// PROGRAMMES AND ACTIVITES
function checkTheArrowClicked(e){
	// get the width of display
	let displayWidth = Number(document.querySelector(".programme_slideshow").getBoundingClientRect().width);

	// get the width of track
	const widthOfTrack = Number(document.querySelector(".slideshow__track").style.width.split("px")[0]);

	if (e.target.className.includes("arrow-right") && (amountOfTranslateNum + displayWidth <= widthOfTrack) ){
		// if the left arrow is clicked and the amount of translate + the width of container is not greater than the track width
		amountOfTranslateNum += 280;
	}else if (e.target.className.includes("arrow-left") && amountOfTranslateNum > 0){
		// if its the right arrow and the count is less than zero
		amountOfTranslateNum -= 280;
		// console.log(amountOfTranslateNum);
	}

	// translate the track
	programTrack.style.transform = `translateX(-${amountOfTranslateNum}px)`;
}


function checkForSlide(){
	// get the width of display
	let displayWidth = Number(document.querySelector(".programme_slideshow").getBoundingClientRect().width);

	// get the width of track
	const widthOfTrack = Number(document.querySelector(".slideshow__track").style.width.split("px")[0]);
	
	if (amountOfTranslateNum + displayWidth > widthOfTrack) {
		amountOfTranslateNum = widthOfTrack - displayWidth;
	}else if(amountOfTranslateNum < 0){
		amountOfTranslateNum = 0;
	}
	// translate the track
	programTrack.style.transform = `translateX(-${amountOfTranslateNum}px)`;	


	// console.log(widthOfTrack);

	// getWidthOfSlidesAndArrangeThem(slides);
}
setInterval(checkForSlide, 10);