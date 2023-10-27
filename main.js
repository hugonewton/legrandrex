console.log("OKAYYY")



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


function getRandomPositionWithLimit($container, $element, maxTries, maxOverlap) {
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
  
      if (!checkOverlapWithMax($element, $container.find(".people-wrapper").not($element), maxOverlap)) {
        return; // Positioning successful
      }
  
      tries++;
    }
  
    // If maximum tries reached, add a class to the element
    $element.addClass("not-placed");
    console.warn("Maximum tries reached, positioning may not be optimal.");
  }
  
  function checkOverlapWithMax($element, elements, maxOverlap) {
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
    var maxOverlap = 10; // Adjust the value to control the maximum allowed overlap
  
    $elements.each(function(index, element) {
      getRandomPositionWithLimit($container, $(element), 100, maxOverlap);
    });
  });


