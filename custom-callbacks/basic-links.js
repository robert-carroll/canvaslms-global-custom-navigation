/**
// @name        CanvasLMS - Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description example link array for rendering in tray
//
**/

/*
  title: 
  icon_svg:
  href: 
  target: 
  position: 
  tray: {
    footer: 
    cb: // here is your callback function () {}
  }
*/
function (item) {
  var links = [{
      href: 'http://www.example.com/your-library',
      title: 'Library',
      desc: 'Optional text description'
    },
    {
      href: 'http://www.google.com',
      title: 'Google'
    },
    {
      href: 'http://www.example.com/help-desk',
      title: 'Help Desk',
      desc: 'Optional text description'
    }
  ];
  var tray_links = globalCustomNav.glbl_tray_links(links);
  globalCustomNav.append_cb_content(item, tray_links);
}