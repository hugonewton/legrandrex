///////////////////////////////
/// GSAP DEFAULTS
///////////////////////////////

gsap.defaults({
  ease: "power2.out",
  duration: 0.2,
});

CustomEase.create(
  "customBack",
  "M0,0 C0.126,0.382 0.139,1.139 0.352,1.197 0.668,1.282 0.862,1.11 1,1"
);

console.log("hello");


///////////////////////////////
/// CURSOR ANIMATION
///////////////////////////////


document.addEventListener("DOMContentLoaded", () => {
  const cursorFull = document.querySelector(".cursor-inner-full");
  const cursorStroke = document.querySelector(".cursor-inner-stroke");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let fullX = 0, fullY = 0;
  let strokeX = 0, strokeY = 0;

  document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
  });

  function animateCursor() {
      // Smooth interpolation for .cursor-inner-full (85% smoothness)
      fullX += (mouseX - fullX) * 0.85;
      fullY += (mouseY - fullY) * 0.85;

      // Smooth interpolation for .cursor-inner-stroke (10% smoothness)
      strokeX += (mouseX - strokeX) * 0.10;
      strokeY += (mouseY - strokeY) * 0.10;

      gsap.set(cursorFull, { x: fullX, y: fullY });
      gsap.set(cursorStroke, { x: strokeX, y: strokeY });

      requestAnimationFrame(animateCursor);
  }

  animateCursor();
});


///////////////////////////////
/// HEO BULLET LINKS
///////////////////////////////

const heroBulletWrap = document.querySelectorAll(".hero_bullet_link");

heroBulletWrap.forEach(function (el) {
let svgOne = el.querySelector(".hero_bullet_svg:nth-of-type(1)");
let svgTwo = el.querySelector(".hero_bullet_svg:nth-of-type(2)");
let line = el.querySelector(".hero_bullet_line");
let tlHeroBullet = gsap.timeline({ paused: true });

      tlHeroBullet
      .to(svgOne,{
            rotate: 360,
            opacity: 0,
            duration: .6,
          })
      .to(svgTwo,{
            rotate: 360,
            opacity: 1,
            duration: .6,
          }, '<')
      .to(line,{
            width: "100%",              
            duration: .5,            
          }, '<')
          
        ;

el.addEventListener("mouseenter", function () {
  tlHeroBullet.play(); //  tl_in on mouseenter
});

el.addEventListener("mouseleave", function () {
  tlHeroBullet.reverse(); // tl_out on mouseleave
});
});


///////////////////////////////
/// NAVBAR ON SCROLL
///////////////////////////////

let lastScroll = 0;
let isScrollingUp = false;

window.addEventListener("scroll", function () {
const currentScroll = window.pageYOffset;

if (currentScroll > lastScroll && !isScrollingUp) {
  // User is scrolling down
  isScrollingUp = true;
  gsap.to(".navbar_wrap", { y: "-150%", duration: 0.5 });
} else if (currentScroll < lastScroll && isScrollingUp) {
  // User is scrolling up
  isScrollingUp = false;
  gsap.to(".navbar_wrap", { y: 0, duration: 0.5 });
}

lastScroll = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});



let tlFixedVideo = gsap.timeline({ paused: true });

tlFixedVideo
  .set(".video_fixed_wrap", { display: "flex" })
  .from(".video_fixed_wrap", { opacity: 0, duration: 0.2 })
  .from(".video_fixed_contain", { scale: 0.5, opacity: 0, duration: 0.2 }, "<");

const fixedVideoBtns = document.querySelectorAll('[data-id="fixedVideoBtn"]'); // Select all buttons
const closeButton = document.querySelector('.video_fixed_close_button');
const videoFixedWrap = document.querySelector('.video_fixed_wrap');
const youtubeIframe = document.querySelector(".video_fixed_contain iframe"); // Select YouTube iframe

// Function to open video
function openVideo() {
  tlFixedVideo.play();
}

// Attach event listener to all buttons with data-id="fixedVideoBtn"
fixedVideoBtns.forEach((btn) => {
  btn.addEventListener("click", openVideo);
});

// Function to close video
function closeVideo() {
  tlFixedVideo.reverse();

  // Stop the YouTube video by resetting its src
  if (youtubeIframe) {
      const iframeSrc = youtubeIframe.src; // Save current src
      youtubeIframe.src = ""; // Empty it to stop the video
      youtubeIframe.src = iframeSrc; // Restore original src
  }
}

// Close button event listener
if (closeButton) {
  closeButton.addEventListener("click", closeVideo);
}

// Background click closes video
if (videoFixedWrap) {
  videoFixedWrap.addEventListener("click", (event) => {
      if (event.target === videoFixedWrap) {
          closeVideo();
      }
  });
}




//////////////////
// CTA TERTIARY (Only Above 991px)
//////////////////

// const ctaTertiaryWraps = document.querySelectorAll(".cta_tertiary_wrap");
// const ctaTimelines = new Map();

// function applyCTAAnimations() {
//   if (window.innerWidth > 991) {
//     ctaTertiaryWraps.forEach(function (el) {
//       if (!ctaTimelines.has(el)) {
//         let svg = el.querySelector(".cta_tertiary_svg");
//         let line = el.querySelector(".cta_tertiary_line");
      
//         let tlCtaTertiary = gsap.timeline({ paused: true });

//         tlCtaTertiary
//           .from(line, { width: 0 })
//           .from(svg, { rotate: 180, opacity: 0 }, '<');

//         // Store timeline reference
//         ctaTimelines.set(el, tlCtaTertiary);

//         el.addEventListener("mouseenter", function () {
//           if (window.innerWidth > 991) {
//             tlCtaTertiary.play();
//           }
//         });

//         el.addEventListener("mouseleave", function () {
//           if (window.innerWidth > 991) {
//             tlCtaTertiary.reverse();
//           }
//         });
//       }
//     });
//   } else {
//     // If screen size is <= 991px, clear animations to avoid unnecessary processing
//     ctaTimelines.forEach((tl, el) => {
//       tl.kill(); // Kill GSAP timeline to free memory
//       el.removeEventListener("mouseenter", tl.play);
//       el.removeEventListener("mouseleave", tl.reverse);
//     });
//     ctaTimelines.clear(); // Clear the map
//   }
// }

// // Run on page load
// applyCTAAnimations();

// // Re-check on window resize
// window.addEventListener("resize", applyCTAAnimations);



///////////////////////////////
/// NOS ESPACES ITEM
///////////////////////////////

if (window.matchMedia("(min-width: 992px)").matches) {
const nosEspaceItemWraps = document.querySelectorAll(".nos-espaces-item-wrapper");

nosEspaceItemWraps.forEach(function (el) {
  let background = el.querySelector(".nos-espaces-item-dark");
  let img = el.querySelector(".nos-espaces-item-img");
  let svg = el.querySelector(".cta_tertiary_svg");
  let line = el.querySelector(".cta_tertiary_line");

  let tlNosEspacesItem = gsap.timeline({ paused: true });

  tlNosEspacesItem
    .to(background, { opacity: 0 })
    .to(img, { scale: 1.2, duration: 0.6, ease: "power3.out" }, '<')
    .from(line, { width: 0 }, '<')
    .from(svg, { rotate: 180, opacity: 0 }, '<');

  el.addEventListener("mouseenter", function () {
    tlNosEspacesItem.play(); // Play animation on mouseenter
  });

  el.addEventListener("mouseleave", function () {
    tlNosEspacesItem.reverse(); // Reverse animation on mouseleave
  });
});
}


///////////////////////////////
/// ADD VALUE FOR THE FORM
///////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
const textArea = document.getElementById("textarea-description-event");
if (textArea) {
  textArea.value = `Descriptif de l'événement :
- L’événement que je souhaite organiser est : [✍️ à compléter]
- Horaires / Déroulé de mon événement : [✍️ à compléter]
- Besoins techniques : [✍️ à compléter]
- Besoins en restauration : [✍️ à compléter]`;
}
});



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
// Get all elements with the class "pop-up-form"
var forms = document.querySelectorAll('.pop-up-form');

forms.forEach(function (form) {
  // Attach event listener to each form
  form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

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

    // The form will not be submitted in the default way due to preventDefault()
  });
});
});

// =================
// SCROLL TRIGGER NOS ESPACES ITEM
// =================

// const nosEspacesItemWrap = document.querySelectorAll(".nos-espaces-item-wrapper");

// // FOR EACH ODD ETAPE WRAPPER
// nosEspacesItemWrap.forEach(function (el) {
//     // let element = el.querySelector(".class");
//     let roomTitle = el.querySelector(".nos-espaces-room-text");
//     let tlNosEspaces = gsap.timeline({ paused: true });

//     tlNosEspaces
//       .from(roomTitle, {
//         opacity: 0,
//         y: 300,
//         stagger: .2,
//         })
    
//         ;

//     ScrollTrigger.create({
//       trigger: el, // Element that triggers the animation
//       toggleActions: "play complete play reverse",
//       start: "top 66%", // When to start the animation
//       // end: 'bottom center', // When to end the animation
//       markers: true,
//       animation: tlNosEspaces, // Animation to play
//       // scrub: true, // Smooth scrolling effect
//     });
//   });



console.log("end of js file");