# CanvasLMS - Global Custom Navigation

This version of the Global Custom Navigation shuffles it all together.

```
Hello Global Canvas Community,

For your review:

An attempt at resolving a robust set of requests (really, responsible requirements),
before refactoring, 
please render some responses.

Robert
```

> ! This is a beta thing, do not use this in production – review _Considerations_

## Features
  - No jQuery
  - Right To Left language support
  - Global and Responsive (mobile) navigation icon creation
  - 3 svg options for icon: instructure icons, external svg, inline svg
  - Tray for both Global and Responsive navigation
  - Tray list can be:
      - basic list (ex; accounts)
      - grouped (ex; published|unpublished courses)
        - ungrouped in responsive nav tray (ex: responsive courses tray)
  - Role Callback
  - Tray Callback

## Tray Callbacks

- should handle promise to load content after tray is available
- should probably be navigation/links
- should insert html to be placed into the portal after load
- alternatively, use `glbl_tray_links()` to render links

## Role Callbacks

- return `boolean`
- probably favor `ENV` over `API`, unless you want to cache the result in `localStorage` for better ux
  - Otherwise, users will be waiting for navigation with each page load

## Navigation Item Settings

### Icons
```js
{
  title: 'Instructure Icon',
  icon_svg: 'icon-pin',
  href: 'https://community.canvaslms.com/',
  target: '_blank',
  // can be one of : integer (position after first), 'after' (help or last), 'before' (help or last)
  position: 1, 
  // optional roles callback
  roles: function () {}, 
}
```
### Link Trays
```js
{
  title: 'Tray with Links',
  icon_svg: 'icon-paperclip',
  href: 'https://community.canvaslms.com/',
  target: '_blank',
  position: 'before' // default
  tray: {
    footer: 'Optional footer text, put whatever you want here, or leave it blank.',
    links: [{
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
    ]
  }
}
```

### Callback Trays
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

## Considerations on Context and Clones

_Restoring active state to current context nav icon_ may result in flavors of the script depending on needs:

  - Icon with link out, doesn't need to handle context
  - Icons with custom context link, would need to handle context if current path is the nav item
  - Trays (all feaures) should always handle context

Cloning elements is used to replace jQuery for standard JavaScript
  - Anything clonable improves forward compatability and reduces copy/paste for elements
  - This results in less need to copy all the classes
  - The Global Tray is directly copied in. It is not available to clone.


## Contributions & Feedback
Always welcome, discuss in the [community](https://community.canvaslms.com/t5/Canvas-Developers-Group/Thread-with-space-for-Global-Custom-Navigation/td-p/583803), or PR's and issues if you enjoy committing.

## Contributors
There a snippets and concepts in this code revolving around conversations and contributions by: 
- [James](https://community.canvaslms.com/t5/user/viewprofilepage/user-id/105160) mutations/append css/clones
- [jsimon3](https://community.canvaslms.com/t5/user/viewprofilepage/user-id/685323)  responsive tray
- [dbrace](https://community.canvaslms.com/t5/user/viewprofilepage/user-id/375810) instui icons
- [JACOBSEN_C](https://community.canvaslms.com/t5/user/viewprofilepage/user-id/103689) roles
- [hechla](https://community.canvaslms.com/t5/user/viewprofilepage/user-id/521056) icon placement
- [cesbrandt](https://community.canvaslms.com/t5/user/viewprofilepage/user-id/109121) easily readable role conditions
- [Code-with-Ski](https://community.canvaslms.com/t5/user/viewprofilepage/user-id/2432278) language direction detection, tray transition and classes
- threads that have been archived
- notes from 2020
- the community for it's feedback