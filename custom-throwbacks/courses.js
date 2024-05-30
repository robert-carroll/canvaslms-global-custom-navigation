/**
// @name        CanvasLMS - Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description example throwback, adding an icon to All Courses link
//
**/

// for more details see /docs/custom-tray-throwbacks.md

const globalCustomNav_tray_throwback = {
  courses: {
    // adds a heart icon to the All Courses link, it's at the top!
    target: 'a[href="/courses"]',
    actions: {
      // class to stop the observer when the tray is updated
      complete: 'gcn-heart-all-courses',
      // for global nav tray
      glbl: function () {
        // identify the courses link
        let all_courses = document.querySelector(`#nav-tray-portal a[href="/courses"]`);
        // update the element HTML with an icon
        all_courses.insertAdjacentHTML('afterend', ` <i class="icon-line icon-heart"></i>`);
        // mark this throwback complete
        all_courses.classList.add(this.complete);
      },
      // for responsive nav tray
      rspv: function () {
        // identify the courses link
        let all_courses = document.querySelector(`div[id^="Expandable"] a[href="/courses"]`);
        // update the element HTML with an icon
        all_courses.innerHTML = all_courses.innerText + ` <i class="icon-line icon-heart"></i>`;
        // mark this throwback complete
        all_courses.classList.add(this.complete);
      }
    }
  }
}
