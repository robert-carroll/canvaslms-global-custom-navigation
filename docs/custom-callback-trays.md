# Setup options for Global Custom Navigation Trays

Callback Trays use the params from [nav-items](/docs/nav-items.md) and [nav-tray-with-links](/docs/nav-tray-with-links.md)

### Tray Callbacks:

- should handle promise to load content after tray is available
- should probably be navigation/links
- should insert html to be placed into the portal after load
- may use `globalCustomNav.tray_links(items)` to render dynamic links

## Example Callback Tray Configs

### Basic Config for Callback Trays
```js
{
  title: 'Callback Tray',
  icon_svg: 'icon-integrations',
  href: '#',
  // target: '_blank',
  position: 'after',
  // optional tray
  tray: {
    footer: // optional tray footer,
    cb: function (item) {}
}
```

### Tray with Callback link render

```js
{
  title: 'Tray with Callback link render',
  // example tray with custom callback for content area
  icon_svg: 'icon-flag',
  href: '#',
  // target: '_blank',
  position: 3,
  roles: function () {
    var account_role = ['AccountAdmin', 'Staff Admin', 'Support Admin'].some(a => ENV.current_user_types.includes(a));
    var enrollment_type = ['teacher', 'admin', 'root_admin'].some(a => ENV.current_user_roles.includes(a));
    return account_role || enrollment_type;
  },
  tray: {
    // footer: 'Optional footer text, put whatever you want here, or leave it blank.',
    cb: function (item) {
      var items = [{
          href: 'https://community.canvaslms.com/',
          title: 'Library',
          target: '_top',
          desc: 'Canvas Community'
        },
        {
          href: 'https://community.canvaslms.com/t5/Canvas-Developers-Group/gh-p/developers',
          title: 'Help Desk',
          target: '_blank'
        },
        {
          href: 'https://instructure.design/#icons-font',
          title: 'Instructure Icons',
          target: '_parent',
          desc: `<i class="icon-line icon-heart icon-solid"></i>`
        }
      ];
      var list_html = globalCustomNav.tray_links(items);
      globalCustomNav.append_cb_content(item, list_html);
    }
  }
},
```

### Tray with Custom Callback
Instead of a list of static links, you can write a custom callback.

This example returns a set of linked squares with user course colors.

```js
{
  title: 'Tray with Callback',
  // example tray with custom callback for content area
  icon_svg: 'icon-integrations',
  href: 'https://github.com/robert-carroll/canvaslms-global-custom-navigation',
  // target: '_blank',
  position: 'after',
  tray: {
    footer: 'Optional footer text, put whatever you want here, or leave it blank.',
    cb: function (item) {
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
              html += `<a href="/${c.replace('_' ,'s/')}" style="background-color: ${colors[c]}; width:20px; height: 20px; display: inline-block;"></a>`;
            }
          });
          html += '<div>';
          return html;
        }).then(html => globalCustomNav.append_cb_content(item, html))
        .catch(err => console.error(err));
    }
  }
},
```