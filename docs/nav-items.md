# Setup options for Global Custom Navigation Items

These are simple navigation item icons with links.
- `title` the name of your navigation item (the label or hover tooltip)
- `icon_svg` the image displayed
- `href` the URL your item will link to
- `target` must be one of `['_self', '_blank', '_parent', '_top']`
- `position` menu position: can be one of: integer (position after first), 'after' (help or last), 'before' (help or last)

> Note: `.load()` can directly accept the array for `nav_items`, but not for [Throwbacks](/docs/custom-tray-throwbacks.md)

```js
  // configure custom opts
  const globalCustomNav_items = [
    // item configs go here with a comma, separating each
  ];

  // load custom nav options
  globalCustomNav.load(globalCustomNav_items);
```

## Icon Options
3 svg options for icons:
- Instructure Icons built into Canvas, from https://instructure.design/#icons-font
- Inline SVG, an `<svg>` you paste into the item config
- Hosted SVG, something you host on your own servers or CDN
  - Requires HTTPS and you must handle CORS policies yourself

## Example Config Options

Basic nav items require [global-custom-nav-items.js](/global-custom-nav-items.js) or minified version [/js/global-custom-nav-items.min.js](/js/global-custom-nav-items.min.js)

### Basic Config with Instructure Icons
```js
{
  title: 'Instructure Icon',
  icon_svg: 'icon-pin',
  href: 'https://instructure.design/#icons-font',
  target: '_blank',
  position: 1, // can be one of: integer (position after first), 'after' (help or last), 'before' (help or last)
},
```
### Externally hosted SVG file on CDN
```js
{
  title: 'Hosted Icon',
  // example only, host your own, or use icon class
  icon_svg: 'https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/ui-icons/svg/Line/pin.svg',
  href: 'https://community.canvaslms.com/',
  target: '_blank',
  //position: 'before' // default
},
```

### Inline SVG in the JS

```js
{
  title: 'Inline Icon',
  // example, instructure-ui pin.svg from above
  icon_svg: `<svg viewBox="0 0 1920 1920" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M1643.272 835.697c-22.024 22.023-57.826 22.023-79.85 0l-20.442-20.442c-.226-.226-.226-.452-.452-.678-.226-.113-.452-.113-.565-.339L1072.806 345.08c-.226-.225-.34-.564-.565-.79-.226-.226-.565-.339-.79-.452l-20.33-20.33c-22.024-22.023-22.024-57.938 0-79.962l83.915-83.802 592.15 592.038-83.914 83.915zm-506.768 305.167c-7.34-8.584-13.44-18.07-21.571-26.09L771.93 771.773c-8.018-8.132-17.506-13.892-26.09-21.12l286.42-286.419 390.437 390.438-286.193 286.193zm-101.42 453.007l-16.49 16.49-742.362-742.25 16.489-16.49c106.73-106.842 292.743-106.842 399.36 0l343.002 343.003c53.309 53.308 82.673 124.235 82.673 199.567 0 75.445-29.364 146.372-82.673 199.68zM1135.035.045L971.272 163.697c-59.295 59.294-62.344 150.776-15.022 216.847L658.876 677.918c-4.066 3.953-6.437 8.81-9.035 13.553-144.565-60.085-322.899-33.656-436.97 80.301l-96.338 96.34 411.106 411.105-511.06 511.059c-22.136 22.023-22.136 57.826 0 79.85 10.956 11.067 25.413 16.602 39.869 16.602s28.913-5.535 39.981-16.603l511.059-511.059 411.106 410.993 96.339-96.339c74.654-74.54 115.764-173.816 115.764-279.529 0-55.115-11.745-108.31-33.091-157.327 2.597-1.92 5.647-3.05 8.018-5.421l300.763-300.763c29.365 20.895 62.456 34.448 96.903 34.448 43.37 0 86.852-16.603 119.83-49.582l163.766-163.764L1135.036.045z" stroke="none" stroke-width="1" fill-rule="evenodd"/></svg>`,
  href: 'https://community.canvaslms.com/',
  target: '',
  position: 'after'
},
```
### Nav Item (roles) for Faculty Roles and Enrollment Types
```js
{
  title: 'Icon with Role Requirements - Faculty',
  // example icon with staffrole requirement
  icon_svg: 'icon-educators',
  href: 'https://community.canvaslms.com/t5/Canvas-Instructor/ct-p/canvas_instructor',
  target: '_blank',
  position: 'after',
  roles: function () {
    // add what you need based on your account roles
    var account_role = ['AccountAdmin'].some(a => ENV.current_user_types.includes(a));
    // these are standard, but can be adjust as needed
    var enrollment_type = ['teacher', 'admin', 'root_admin', 'consortium_admin'].some(a => ENV.current_user_roles.includes(a));
    return account_role || enrollment_type;
  }
},
```

### Nav Item for Students
```js
{
  title: 'Icon with Role Requirements - Student',
  // example icon with exclusion role requirement for students
  icon_svg: 'icon-group',
  href: 'https://community.canvaslms.com/t5/Canvas-Student/ct-p/canvas_student',
  target: '_blank',
  position: 'after',
  roles: function () {
    return !['teacher', 'admin', 'root_admin', 'consortium_admin'].some(a => ENV.current_user_roles.includes(a));
  }
},
```
## Custom Context

### Course Context

The following examples require [global-custom-nav-context-items.js](/global-custom-nav-context-items.js) or minified version [/js/global-custom-nav-context-items.min.js](/js/global-custom-nav-context-items.min.js)


```js
{
    title: 'Custom Context',
    // custom context handles active class in global nav
    icon_svg: 'icon-expand-start',
    href: '/courses/101',
    target: '_top',
    roles: function () {
      return ['user'].some(a => ENV.current_user_roles.includes(a));
    }
  },
```

### Account Content
```js
{
  title: 'Custom Account Context',
  // custom context handles active class in global nav
  icon_svg: 'icon-ruler',
  href: '/accounts/self',
  target: '_self',
  roles: function () {
    return ['admin'].some(a => ENV.current_user_roles.includes(a));
  }
},
```