console.log("OKAYYY")



// RANDOMLY PLACE ITEMS
// ;(() => {
//     "use strict";
//     const TRIES_PER_BOX = 1;
//     const randUint = range => Math.random() * range | 0;
//     const placing  = [...document.querySelectorAll(".people-wrapper")].map(el => Bounds(el, 5));
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



var maxSearchIterations = 10;
var min_x = 100;
var max_x = 500;
var min_y = 0;
var max_y = 200;
var filled_areas = [];

function calc_overlap(a1) {
    var overlap = 0;
    for (i = 0; i < filled_areas.length; i++) {

        var a2 = filled_areas[i];

        // no intersection cases
        if (a1.x + a1.width < a2.x) {
            continue;
        }
        if (a2.x + a2.width < a1.x) {
            continue;
        }
        if (a1.y + a1.height < a2.y) {
            continue;
        }
        if (a2.y + a2.height < a1.y) {
            continue;
        }

        // intersection exists : calculate it !
        var x1 = Math.max(a1.x, a2.x);
        var y1 = Math.max(a1.y, a2.y);
        var x2 = Math.min(a1.x + a1.width, a2.x + a2.width);
        var y2 = Math.min(a1.y + a1.height, a2.y + a2.height);

        var intersection = ((x1 - x2) * (y1 - y2));

        overlap += intersection;

        // console.log("( "+x1+" - "+x2+" ) * ( "+y1+" - "+y2+" ) = " + intersection);
    }

    // console.log("overlap = " + overlap + " on " + filled_areas.length + " filled areas ");
    return overlap;
}

function randomize() {

    filled_areas.splice(0, filled_areas.length);

    var index = 0;
    $('.people-wrapper').each(function() {
        var rand_x = 0;
        var rand_y = 0;
        var i = 0;
        var smallest_overlap = 9007199254740992;
        var best_choice;
        var area;
        for (i = 0; i < maxSearchIterations; i++) {
            rand_x = Math.round(min_x + ((max_x - min_x) * (Math.random() % 1)));
            rand_y = Math.round(min_y + ((max_y - min_y) * (Math.random() % 1)));
            area = {
                x: rand_x,
                y: rand_y,
                width: $(this).width(),
                height: $(this).height()
            };
            var overlap = calc_overlap(area);
            if (overlap < smallest_overlap) {
                smallest_overlap = overlap;
                best_choice = area;
            }
            if (overlap === 0) {
                break;
            }
        }

        filled_areas.push(best_choice);

        $(this).css({
            position: "absolute",
            "z-index": index++
        });
        $(this).animate({
            left: rand_x,
            top: rand_y
        });

        // console.log("and the winner is : " + smallest_overlap);
    });
    return false;
}

randomize();