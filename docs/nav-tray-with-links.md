# Setup options for Global Custom Navigation Trays

Tray configs start with the basic properties from [nav-items](/docs/nav-items.md)

- `tray` object that sets the nav item includes a custom tray
- `footer` the optional footer text for the tray
- `items` an array of objects for the trays list of links
  - `href` the URL your item will link to
  - `title` the title for the link 
  - `target` must be one of `['_self', '_blank', '_parent', '_top']`
  - `desc` optional description text for the link

```js
  // configure custom opts
  const globalCustomNav_items = [
    // item configs go here with a comma, separating each
  ];

  // load custom nav options
  globalCustomNav.load(globalCustomNav_items);
```

## Example Config Options

### Tray with simple list
```js
{
  title: 'Tray with simple list',
  // example only, host your own, or use icon class
  icon_svg: 'icon-paperclip',
  href: 'https://community.canvaslms.com/',
  target: '_self',
  //position: 'before', // default
  tray: {
    footer: 'Optional footer text, put whatever you want here, or leave it blank.',
    items: [{
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
    ]
  }
},
```

### Tray with grouped list
Grouped lists are _ungrouped_ in the Responsive Navigation Menu
```js
{
  title: 'Tray with grouped list',
  // example tray, with custom link list
  icon_svg: 'icon-heart',
  href: 'https://community.canvaslms.com/',
  target: '_self',
  position: 'before', // default
  tray: {
    footer: 'Optional footer text, put whatever you want here, or leave it blank.',
    items: {
      'Published': [{
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
      ],
      'Unpublished': [{
          href: 'https://canvas.instructure.com/doc/api/',
          title: 'Canvas API',
          desc: "To get started, you'll want to review the general basics"
        },
        {
          href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          title: 'MDN JavaScript'
        },
        {
          href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          title: 'MDN HTML'
        }
      ]
    }
  }
},
```