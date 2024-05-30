# Roles

## Roles by Block
If you want to add a nav item by conditional blocks. This can be useful to scope custom logic outside the functionality of Role Callbacks. It's also useful for Throwbacks or Callbck Trays which may be be written extend functionality for specfic user groups.

```js
const globalCustomNav_items = [];
if(['teacher','admin'].some(a => ENV.current_user_roles.includes(a))) {
  globalCustomNav_items.push({
    title: 'Instructure Icon',
    icon_svg: 'icon-pin',
    href: 'https://instructure.design/#icons-font',
    target: '_blank',
    position: 1, // can be one of : integer (position after first), 'after' (help or last), 'before' (help or last)
  });
}
```

## Role Callbacks

Roles can now be handled within the nav item config using the `role` property.

- return `boolean`
- probably favor `ENV` over `API`, unless you want to cache the result in `localStorage` for better ux
  - Otherwise, users will be waiting for navigation with each page load

## Teachers

```js
// teachers
roles: function () {
  return ['teacher'].some(a => ENV.current_user_roles.includes(a));
}
```

```js
// students
roles: function () {
  return ['student'].some(a => ENV.current_user_roles.includes(a));
}
```

## Tricky Roles

If you have staff in the student role, maybe for Professional Development, depending on the sub account you install this too, employees would see the Student links. Using elimination, instead of inclusion, helps find users that don't have employee roles.

## Students
```js
// students
roles: function () {
  return !['teacher', 'admin', 'root_admin'].some(a => ENV.current_user_roles.includes(a));
}
```

## Staff
```js
// staff
roles: function () {
  var account_role = ['AccountAdmin'].some(a => ENV.current_user_types.includes(a));
  var enrollment_type = ['teacher', 'admin', 'root_admin'].some(a => ENV.current_user_roles.includes(a));
  return account_role || enrollment_type;
}
```

## Navigating Consortiums
If you're an account admin of a Canvas LMS _consortium_ you may have found...

You might have to account for differences in `ENV.current_user_roles` when: 
- the root instance has `root_admin`
- and the trust instances use `consortium_admin`

```js
roles: function () {
  var account_role = ['AccountAdmin', 'Staff Admin', 'Support Admin'].some(a => ENV.current_user_types.includes(a));
  var enrollment_type = ['teacher', 'admin', 'root_admin', 'consortium_admin'].some(a => ENV.current_user_roles.includes(a));
  return account_role || enrollment_type;
}
```