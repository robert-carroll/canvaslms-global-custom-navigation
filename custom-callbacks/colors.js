/**
// @name        CanvasLMS - Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description return a set of linked squares with user course colors
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
  // return a set of linked squares with user course colors
  var html = '';
  fetch(`/api/v1/users/self/colors`, {
      'headers': {
        'accept': 'application/json',
        'content-type': 'application/json',
        'cache': 'default'
      }
    })
    .then(res => {
      if (!res.ok) throw Error(res.status);
      return res.json();
    })
    .then(json => json.custom_colors)
    .then(colors => {
      html += '<div style="line-height: 0;">';
      Object.keys(colors).forEach(c => {
        if (/course_/.test(c)) {
          html += `<a href="${c.replace('_' ,'s/')}" style="background-color: ${colors[c]}; width:20px; height: 20px; display: inline-block;"></a>`;
        }
      });
      html += '<div>';
      return html;
    }).then(html => globalCustomNav.append_cb_content(item, html))
    .catch(err => console.error(err));
}