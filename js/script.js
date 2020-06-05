//1. when the burger icon is clicked, toggle the nav-container a class of full_nav-container, and the burger a class of toggled

//2. When the plus is clicked, toggled the class of second-order_dropdown on the inner drop items, and toggle the class of minus on the plus div

// CAROUSEL - BANNER
//3.set the width of the slide track.

// 4. Add event listener to the buttons, translate to the targeted slide and move the pointer to the targeted button

// 5. Every 5 seconds, move to the next slide, irrespective of the button pressed

// CAROUSEL - PROGRAMMES AND ACIVITIES
// 6. Set the width of the track to 100% * number of slides

// 7. get the width of each slide and reset the width of the track to number of slides * (width of slide + margin left and right)

// 8. when a button is clicked, get the width of a slide ATM

// 9. set the scrollLeft property of the slide to the (width of slide + margin left and right) value

// +ve for right button, -ve for left

// --------------------------------------------
//UI variables
// NAVBAR
// the burger
const burgerIcon = document.querySelector(".burger-icon");
// the nav container
const navContainer = document.querySelector(".nav-container"); 

// CAROUSEL SLIDE
// an array of the slides
const carouselSlides = document.querySelectorAll(".slide");
// the carousel track
const carouselTrack = document.querySelector(".carousel__track");
// the button containers
const carouselButtonContainer = document.querySelector(".carousel__nav");
// an array of carousel nav btns
const carouselBtns = Array.from(document.querySelectorAll(".carousel__indicator"));

// PROGRAMMES AND ACTIVITIES CAROUSEL
// the programme section
const program = document.getElementById("programmes");
// the track
const programTrack = program.querySelector(".slideshow__track");
// array of slide
const programSlides = program.querySelectorAll(".slideshow");
// the header area
const programHeader = program.querySelector(".programmes__heading");
// the track container
const trackContainer = program.querySelector(".programme_slideshow");

// OUR SCHOOLS
// get the school div
const schools = document.getElementById("schools");
// the track container
const schoolTrackContainer = schools.querySelector(".schools_slideshow");
// the track
const schoolTrack = schools.querySelector(".slideshow__track");
// the slides array
const schoolSlides = schools.querySelectorAll(".slideshow");
// the header of the section
const schoolHeader = schools.querySelector(".schools__heading");

// JOURNALS
// journals section
const journals = document.getElementById("journals");
// get the track
const journalTrack = journals.querySelector(".journal__track");
// array of slide
const journalSlideArray = journals.querySelectorAll(".journal-slide");
const journalContainer = journals.querySelector(".journals_slideshow");
const arrowContainer = journals.querySelector(".journals__arrows");

// THE ARROW UP BUTTON
const arrowUp = document.querySelector(".arrow-up");


// -------------------------------------------
// specific functions
// set the width of slide track
const setTrackWidth = (slidesArray,track) => {
	track.style.width = `${slidesArray.length * 100}%`;
}
// get the width of a slide
const getSlideWidth = (slide) => {
	const width = slide.getBoundingClientRect().width;

	return width;
}
// arrange slide side by side to the right
const setSlidesOnTrack = (slides) => {
	slides.forEach((slide, index) => {
		slide.style.left = `${getSlideWidth(slide) * index}px`;
		slide.style.width = "100%";
	})
}

// set and reset the track width for the programmes and activities
const setTrack = (slides, track) => {
	// set track width for programmes and activties
	setTrackWidth(slides, track);

	// get width of each slide
	const slideWidth = getSlideWidth(slides[0]);
	// get the margin left and right
	const margin = slides[0].offsetLeft *2;

	// reset Track width
	track.style.width = `${(slideWidth + margin) * slides.length}px`;
}

const checkForScroll = () => {
    if (window.scrollY  >= 400){
        arrowUp.style.display = "block";
    }else{
        arrowUp.style.display = "none";
    }
}
// load all specific functions
const loadFuncs = () => {
	// CAROUSEL
	// set the slides on the tracks
	setSlidesOnTrack(carouselSlides);

	// set the track width
	setTrackWidth(carouselSlides, carouselTrack);

	// PROGRAMMES AND ACTIVTIES
	// set track width for programmes and activties
	setTrack(programSlides, programTrack);

	// OUR SCHOOLS
	// set the track width
	setTrack(schoolSlides, schoolTrack);

	// JOURNAL
	// set the TRACK width
	setTrack(journalSlideArray, journalTrack);

	// check the window scroll for the arrow up btn
	checkForScroll();
}

setInterval(loadFuncs, 10);

// to get the index an item in an array
const getIndex = (item, array) => {
	const index = array.findIndex((arrayItem) => arrayItem === item);

	return index;
}

// go to targeted slide
const moveToSlideandBtn = (track, targetedSlide, targetedBtn, prevSlide,prevBtn) => {

	// translate the track to the left property of the targeted slide
	track.style.transform = `translateX(-${targetedSlide.style.left})`;

	// add the current-slide class to the targeted slide and btn
	targetedSlide.classList.add("current-slide");
	targetedBtn.classList.add("current-slide");

	// remove the current-slide class from the previous slide and btn
	prevSlide.classList.remove("current-slide");
	prevBtn.classList.remove("current-slide");


}
// --------------------------------------------
//function to load event listeners
// enhancing the swipe effect
const swipeEffect = (track) => {
    let mouseDown = false, clickedX, scrollLeftValue;

    track.addEventListener("mousedown", (e) => {
        // when the mouse is pressed down
        mouseDown = true;
        
        // get the offset of the clicked point from the left border of the track
        clickedX = e.pageX - track.offsetLeft;
        
        // get the initial value of the scrollLeft in the track
        scrollLeftValue = track.scrollLeft;
    });

    track.addEventListener("mouseup", () => {
        // when the mouse is left up
        mouseDown = false;
    })
    track.addEventListener("mouseleave", () => {
        // when the cursor leaves the track region
        mouseDown = false;
    })

    track.addEventListener("mousemove", (e) => {
		e.preventDefault();
        // when the mouse is moved, and the mouseDown value is true
        if (!mouseDown) return;

        // get the offset of the instant point from the left border of the track
        const movedX = e.pageX - track.offsetLeft;
        
        // get the amount moved from the clicked point and multiply it by 2 to increase flunency of the slider
        const distantToMove = (movedX - clickedX) *2;

        // set the scrollLeft property of the track to increment by the distantToMove value
        track.scrollLeft += -distantToMove;
    })
}

const loadEventListener = () => {
	// to the document whenever it loads
	document.addEventListener("DOMContentLoaded", handleAutoCarousel);

	// NAVBAR
	// to the burger icon
	burgerIcon.addEventListener("click", showNav);

	// to the nav container, then delegate to the pluses
	navContainer.addEventListener("click", dropInnerItems)

	// CAROUSEL
	// to the button container, then delegate to each buttons
	carouselButtonContainer.addEventListener("click", handleButtonEvent);

	// PROGRAMMES AND ACTIVTITES
	// to the programm header and delegate to each btn
	programHeader.addEventListener("click", handleClickOnHeader);

	// to the track container for swipe effect
	swipeEffect(trackContainer);

	// SCHOOLS
	// event listener to the header, then delegate to the btns
	schoolHeader.addEventListener("click", handleClickOnHeader);

	// to the track container for swipe effect
	swipeEffect(schoolTrackContainer);

	//JOURNALS
	// event listener to the header, then delegate to the btns
	arrowContainer.addEventListener("click", handleClickOnHeader);

	// to the track container for swipe effect
	swipeEffect(journalContainer);

	// on the arrowUP btn
	arrowUp.addEventListener("click", () => {
		window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'});
	})
}

// --------------------------------------------
// event handler funcions
// NAVBAR
// for the burger icon
const showNav = () => {
	// toggle the nav container a class of full_nav-container
	navContainer.classList.toggle("full_nav-container");

	// also, toggle the class of toggled to the burger itself
	burgerIcon.classList.toggle("toggled"); 
}
// for the nav container
const dropInnerItems = (e) => {
	const clickedElement = e.target;

	if (clickedElement.className.includes("horizontal") || clickedElement.className.includes("vertical") || clickedElement.className.includes("plus")){
		let innerItems;
		// check to make sure it's the plus that is been clicked
		if (clickedElement.className.includes("horizontal") || clickedElement.className.includes("vertical")){
			innerItems = clickedElement.parentElement.parentElement.nextElementSibling;
			
			clickedElement.parentElement.classList.toggle("minus");

		}else if(clickedElement.className.includes("plus") ){
			//if it is the plus, drop the inner items
			// get the container of the inner items
			innerItems = clickedElement.parentElement.nextElementSibling;

			clickedElement.classList.toggle("minus");

		}
		innerItems.classList.toggle("second-order_dropdown");
	}
	
}

// CAROUSEL
// for the button container
const handleButtonEvent = (e) => {
	// check if a button is clicked
	const targetedButton = e.target.closest("button");

	// if the clicked item is null, return nothing
	if (targetedButton === null) return;

	// else, get the index of the button in the array of btns
	const targetedIndex = getIndex(targetedButton, carouselBtns),
	// get the targeted slide
		  targetedSlide = carouselSlides[targetedIndex],
	// get the current previous slide and btn
		  prevSlide = carouselTrack.querySelector(".current-slide"),
		  prevBtn = carouselButtonContainer.querySelector(".current-slide");

	
	// move to the slide and btn with the targeted index
	moveToSlideandBtn(carouselTrack, targetedSlide, targetedButton, prevSlide, prevBtn);
}

// for the automatic carousel
const handleAutoCarousel = () => {
	// initialize variable target variable
	let currentIndex = 0;

	const autoMoveToSlideandBtn = () => {
		// get the current slide and btn
		const currentSlide = carouselTrack.querySelector(".current-slide"),
		currentBtn = carouselButtonContainer.querySelector(".current-slide");

		currentIndex += 1 ;
	
		// check if current index is greater than 6
		if (currentIndex > 6){
			currentIndex = 0;
		}
		
		// get the targeted btn and slide
		const targetedSlide = carouselSlides[currentIndex],
			  targetedBtn = carouselBtns[currentIndex];
		
		// move to the slide and btn with the targeted index
		moveToSlideandBtn(carouselTrack, targetedSlide, targetedBtn, currentSlide, currentBtn);
	}

	// run function every 5sec
	setInterval(autoMoveToSlideandBtn, 5000);
}

// PROGRAMMES AND ACTIVITIES

const handleClickOnHeader = (e) => {
	// check if a button is clicked
	const clickedBtn = e.target.closest(".arrows");

	// if the clicked item is null, return nothing
	if (clickedBtn === null) return;

	// get the slides array of the corresponding btns
	let slides = e.target.parentElement.parentElement.nextElementSibling.children[0].children;

	//get the track container
	let trackContainer = e.target.parentElement.parentElement.nextElementSibling;

	// if the arrangement is different 
	if (slides[0] === undefined) {
		slides = e.target.parentElement.previousElementSibling.children[0].children;
		trackContainer =  e.target.parentElement.previousElementSibling;
	}
	// get the width and offset of the first slide
	const totalScroll = getSlideWidth(slides[0]) + (slides[0].offsetLeft * 2);

	// check the clicked btn and move the carousel
	if (clickedBtn.className.includes("left")){
		trackContainer.scrollLeft -= totalScroll;
	}else{
		trackContainer.scrollLeft -= -totalScroll;
	}
}
// run the event listener function
loadEventListener();
