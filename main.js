console.log("OKAYYY")


// ==========
// CURSOR
// ==========


const cursor = document.querySelector(".cursor");
const cursorHoverElements = document.querySelectorAll(".cursor-hover");

cursorHoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});


// ==========
// GENERATE RANDOM ANIMATION DELAY FOR THE IMAGES ".people-img"
// ==========


// Get all elements with the class "people-img"
const peopleImages = document.querySelectorAll('.people-img');
        
// Function to generate random animation-delay values
function generateRandomAnimationDelays() {
    return Math.random() * 2 + 's'; // Random delay between 0s and 2s
}

// Apply random animation-delay values to each element
peopleImages.forEach((img) => {
    img.style.animationDelay = generateRandomAnimationDelays();
});

// RANDOMLY PLACE ITEMS
// ;(() => {
//     "use strict";
//     const TRIES_PER_BOX = 50;
//     const randUint = range => Math.random() * range | 0;
//     const placing  = [...document.querySelectorAll(".people-wrapper")].map(el => Bounds(el, 24));
//     const fitted = [];
//     const areaToFit = Bounds();
//     var maxTries = TRIES_PER_BOX * placing.length;
//     while (placing.length && maxTries > 0) {
//         let i = 0;
//         while (i < placing.length) {
//             const box = placing[i];
//             box.moveTo(randUint(areaToFit.w - box.w), randUint(areaToFit.h - box.h));
//             if (fitted.every(placed => !placed.overlaps(box))) {
//                 fitted.push(placing.splice(i--, 1)[0].placeElement());
//             } else { maxTries-- }
//             i++;
//         }
//     } 
//     function Bounds(el, pad = 0) {   
//         const box = el?.getBoundingClientRect() ?? {
//             left: 0, top: 0, 
//             right: innerWidth, bottom: innerHeight, 
//             width: innerWidth, height: innerHeight
//         };
//         return {
//             l: box.left - pad, 
//             t: box.top - pad, 
//             r: box.right + pad, 
//             b: box.bottom + pad,
//             w: box.width + pad * 2,
//             h: box.height + pad * 2,
//             overlaps(bounds) { 
//                 return !(
//                     this.l > bounds.r || 
//                     this.r < bounds.l || 
//                     this.t > bounds.b || 
//                     this.b < bounds.t
//                 ); 
//             },
//             moveTo(x, y) {
//                 this.r = (this.l = x) + this.w;
//                 this.b = (this.t = y) + this.h;
//                 return this;
//             },
//             placeElement() {
//                 if (el) {
//                     el.style.top = (this.t + pad) + "px";
//                     el.style.left = (this.l + pad) + "px";
//                     el.classList.add("placed");
//                 }
//                 return this;
//             }
//         };
//     }
//     })();


$(document).ready(function() {
    setTimeout(function() {
        function getRandomPositionWithLimit($container, $element, maxTries, maxOverlap, $middleBlkTxt) {
            var containerWidth = $container.width() - $element.width();
            var containerHeight = $container.height() - $element.height();
            var tries = 0;
          
            while (tries < maxTries) {
              var left = Math.floor(Math.random() * containerWidth);
              var top = Math.floor(Math.random() * containerHeight);
          
              $element.css({
                left: left + "px",
                top: top + "px",
              });
          
              if (
                !checkOverlap($element, $container.find(".people-wrapper").not($element), maxOverlap) &&
                !checkOverlap($element, $middleBlkTxt, maxOverlap)
              ) {
                return; // Positioning successful
              }
          
              tries++;
            }
          
            // If maximum tries reached, add a class to the element
            $element.addClass("not-placed");
            console.warn("Maximum tries reached, positioning may not be optimal.");
          }
          
          function checkOverlap($element, elements, maxOverlap) {
            var elementRect = $element[0].getBoundingClientRect();
          
            for (var i = 0; i < elements.length; i++) {
              var otherRect = elements[i].getBoundingClientRect();
              if (
                elementRect.left < otherRect.right + maxOverlap &&
                elementRect.right > otherRect.left - maxOverlap &&
                elementRect.top < otherRect.bottom + maxOverlap &&
                elementRect.bottom > otherRect.top - maxOverlap
              ) {
                return true; // Overlapping
              }
            }
          
            return false; // Not overlapping
          }
          
          $(document).ready(function() {
            var $container = $(".section-people");
            var $elements = $container.find(".people-wrapper");
            var $middleBlkTxt = $(".middle-blk-txt");
          
            var screenWidth = window.innerWidth;
            var maxOverlap;
          
            if (screenWidth < 768) {
              maxOverlap = 5;
            } else if (screenWidth >= 768 && screenWidth < 1024) {
              maxOverlap = 5;
            } else if (screenWidth >= 1024 && screenWidth < 1440) {
              maxOverlap = 5;
            } else {
              maxOverlap = 5;
            }
          
            $elements.each(function(index, element) {
              getRandomPositionWithLimit($container, $(element), 100, maxOverlap, $middleBlkTxt);
            });
          });
    }, 3000); // Delay set to 3000 milliseconds, but the code will wait for the document to be fully loaded
  });


  



// =================
// RANDOMIZE THE APPEARANCE OF LOGOS
// =================



// Get all the divs with the class "logos-ribbon-item-wrapper"
const wrappers = document.querySelectorAll(".logos-ribon-item-wrapper");

// Function to generate a random order value within the range of the number of images
function getRandomOrder(max) {
  return Math.floor(Math.random() * max);
}

wrappers.forEach((wrapper) => {
  // Get all the child elements with the class "logo-partner" within the current wrapper
  const logoPartners = Array.from(wrapper.querySelectorAll(".logo-partner"));

  // Randomize the order of the images
  const imageCount = logoPartners.length;
  const orderValues = Array.from({ length: imageCount }, (_, index) => index);
  for (let i = 0; i < imageCount; i++) {
    const randomIndex = getRandomOrder(imageCount);
    [orderValues[i], orderValues[randomIndex]] = [orderValues[randomIndex], orderValues[i]];
  }

  // Apply the random order values to the images
  logoPartners.forEach((logo, index) => {
    logo.style.order = orderValues[index];
  });

});





// =================
// SCRIPT TO OPEN A NEW URL AFTER SUBMITTIMG FORM
// =================

  document.addEventListener('DOMContentLoaded', function () {
    // Assuming your form has an ID of "yourForm" and the redirect URL is stored in the "custom-redirect" attribute
    var form = document.getElementById('lead-magnet-form');

    form.addEventListener('submit', function (event) {
      // Get the form's action (redirect URL)
      var redirectUrl = form.getAttribute('custom-redirect');

      // Open the redirect URL in a new tab after a slight delay to allow the form to be submitted
      setTimeout(function () {
        window.open(redirectUrl, '_blank');
      }, 2000); // Adjust the delay as needed (in milliseconds)

      // Optionally, you can submit the form data asynchronously if needed
      // Example using fetch API:
      // fetch(form.getAttribute('action'), {
      //   method: form.getAttribute('method'),
      //   body: new FormData(form),
      // });

      // The form will be submitted as usual
    });
  });
