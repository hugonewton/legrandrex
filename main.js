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



var min_x = 0;
var max_x = 200;
var min_y = 0;
var max_y = 200;
var filled_areas = new Array();

$('.people-wraper').each(function() {
    var rand_x=0;
    var rand_y=0;
    var area;
    do {
        rand_x = Math.round(min_x + ((max_x - min_x)*(Math.random() % 1)));
        rand_y = Math.round(min_y + ((max_y - min_y)*(Math.random() % 1)));
        area = {x: rand_x, y: rand_y, width: $(this).width(), height: $(this).height()};
    } while(check_overlap(area));
    
    filled_areas.push(area);
    
    $(this).css({left:rand_x, top: rand_y});
});

function check_overlap(area) {
    for (var i = 0; i < filled_areas.length; i++) {
        
        check_area = filled_areas[i];
        
        var bottom1 = area.y + area.height;
        var bottom2 = check_area.y + check_area.height;
        var top1 = area.y;
        var top2 = check_area.y;
        var left1 = area.x;
        var left2 = check_area.x;
        var right1 = area.x + area.width;
        var right2 = check_area.x + check_area.width;
        if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
            continue;
        }
        return true;
    }
    return false;
}