# Setup options for Global Custom Navigation Throwbacks

 Throwbacks let you modify an existing Canvas Tray, adding new content or functionality to it.

To configure throwbacks, add them to the `globalCustomNav_tray_throwback` object and
 ```js
  // configure throwbacks
  const globalCustomNav_tray_throwback = {
  };
```
If you are using Canvas For Elementary copy the `courses` throwback as `subject`
```js
  // consider c4e
  globalCustomNav_tray_throwback.subjects = globalCustomNav_tray_throwback.courses;
```

```js
  // configure custom opts
  const globalCustomNav_items = [
    // item configs go here with a comma, separating each
  ];

  // load custom nav options
  globalCustomNav.load(globalCustomNav_items);
```
When using Throwbacks an '_opts' object is required to pass both `nav_items` and `throwbacks` as the properties. If you are not using `nav_items`, comment it out, or pass an empty array.

> Note: while `nav_items` can be sent to `.load()` directly, throwbacks require the property and options

```js
  const globalCustomNav_opts = {
    //nav_items: globalCustomNav_items,
    throwbacks: globalCustomNav_tray_throwback
  };
  // load custom nav options
  globalCustomNav.load(globalCustomNav_opts);
```

## Handling Roles in Throwbacks

There's no nice way to build role parameters in Throwbacks that would work without unecessary complications.
Roles, or modifying throwback features for specific user roles should be handled within the Throwback. If a throwback is going to exist within a Tray that all users have, then either use block [role conditions](/docs/roles.md) to load the Throwback, or use role conditions within the throwback to handle differences for users.

## Example Throwbacks

Throwbacks offer an wide range of customization to Global Navigation, the possibilities and functionality may vary depending on the tray or user (student, instructor, administrator). These examples are provided to help understand the components to make a custom throwback.

### Throwbacks consist of:
- `target` - the tray and selector (primary link for the tray) that will be modified when opened
- `actions` - the config and methods used to customize each navigation tray
- `actions.complete` - the class used to stop the observer when the changes are ready
- `actions.glbl` - the customization changes when the global (desktop) navigation tray is opened
- `actions.rspv` - the customization changes when the responsive (mobile) navigation tray is opened

Other methods can be used in `actions` to reduce or reuse code, this is shown with the Accounts Throwback example using `add()`

### Trouble with Targets:

When choosing the target, it is best to identify a selector that works between both the global and responsive menus. 

Consider the following target selectors will have different results:


#### Problematic Selector

```a[href="/accounts"]```

Using the exact match selector for the default link in the tray is problematic for the Admin tray (unlike the Courses tray).

- The Issue: This selector targets the "All Accounts" link. This link is present immediately when the tray opens before the account links.

- The Result: The Mutation Observer and throwback sees this target, marks the task as complete, and attempts to inject the custom links before the actual account list has finished loading, often leading to the custom icons missing on the initial tray opening.

#### Recommended Selector

```a[href^="/accounts/"]```

Using the "starts with" selector is the most reliable method.

- The Logic: This selector ignores the "All Accounts" header and instead looks for the specific sub-account links (which contain IDs, e.g., /accounts/123).

- The Result: The Mutation Observer will continue watching the tray until these specific links are returned from the additional API requests and rendered in the DOM. This ensures your custom navigation items are added only when the tray is fully populated.


### Example Accounts Throwback

This Throwback example will add some quick navigation links to the Admin Tray Accounts list for quickly accessing Account navigation routes.


```js
accounts: {
  // add quick navigation links for the admin tray accounts for account admins
  target: 'a[href^="/accounts/"]',
  actions: {
    // class to stop the observer when the tray is updated
    complete: 'gcn-admin-tray-quick-nav',
    // add some quick navigation links to each account
    add: function(accounts) {
      let dir = document.querySelector('html').getAttribute('dir') ?? 'ltr';
      let float = dir == 'ltr' ? 'right' : 'left';
      let opts = {
        'users': '<i class="icon-line icon-user" aria-hidden="true" />',
        'settings': '<i class="icon-line icon-settings" aria-hidden="true" />',
        'settings#tab-announcements': '<i class="icon-line icon-announcement" aria-hidden="true" />'
      }
      accounts.forEach(a => {
        for(let o in opts) {
          let add = document.createElement('a');
          add.innerHTML = opts[o];
          add.href = a.href + '/' + o;
          add.setAttribute('dir', dir);
          add.style = `float: ${float};`;
          a.after(add);
        }
      });
    },
    // for global nav tray
    glbl: function () {
      // add links to accounts list
      this.add(document.querySelectorAll('div.accounts-tray ul a[href^="/accounts/"]'));
      // mark this throwback complete
      document.querySelector(`#nav-tray-portal a[href="/accounts"]`).classList.add(this.complete);
    },
    // for responsive nav tray
    rspv: function () {
      // add links to accounts list
      this.add(document.querySelectorAll(`div[id^="Expandable"] a[href^="/accounts/"]`));
      // mark this throwback complete
      document.querySelector(`div[id^="Expandable"] a[href="/accounts"]`).classList.add(this.complete);
    }
  }
},
```

## Example Courses Throwback

This Throwback example will add a heart icon to the All Courses link that is now at the top of the list for everyone!


```js
courses: {
  // adds a heart icon to the All Courses link
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
```
