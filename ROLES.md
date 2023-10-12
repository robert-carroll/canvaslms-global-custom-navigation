# Roles


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

If you have staff in the student role, maybe for PD, depending on the sub account you install this too, employees would see the Student links. 
Using elimination, instead of inclusion, helps find users that don't have employee roles.


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
If you're an account admin of a Canvas LMS _consortium_ you have inevitably found...

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