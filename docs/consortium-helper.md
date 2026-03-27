# Cross-Instance Navigation

A common use case for consortiums or organizations with multiple Canvas instances is routing users to a shared context on another instance. 

The `x_instance_context_href` helper solves this by dynamically handling the environment and routing.

## The Helper Function

Include this helper function in your custom navigation script, typically before your `globalCustomNav_items` array.

```js
var x_instance_context_href = (path, target_root) => {
  if (!target_root) return path;

  const current_host = window.location.hostname;
  let target_host = target_root;

  // automatically consider the environment (prod, beta, test)
  const match_env = current_host.match(/\.(beta|test)\./);
  if (match_env && !target_host.includes(match_env[0])) {
      // anchor to the end of the string ($) to prevent accidental mid-string matches
      target_host = target_host.replace(/\.instructure\.com$/, `${match_env[0]}instructure.com`);
  }

  // return relative path if on target, else absolute URL
  return current_host === target_host 
      ? path 
      : `https://${target_host}${path.startsWith('/') ? '' : '/'}${path}`;
}
```

### How It Works

The helper function processes the provided path and target root domain to return the appropriate URL string:

* **Environment Synchronization:** It checks if the current host is a `beta` or `test` instance. If navigating from `child.beta.instructure.com`, it automatically adjusts the target root to `main.beta.instructure.com`.

* **Smart Routing:** If the user is on a child instance, it returns an absolute URL to bridge them to the root instance.

* **Active State Preservation:** If the user is already on the target instance, it returns the relative path. This ensures standard active-class highlighting logic continues to function without domain-stripping workarounds.

## Example Usage

Call the helper function inline when defining the `href` for a navigation item.

```js
{
  title: 'Consortium Context',
  icon_svg: 'icon-educators',
  href: x_instance_context_url('/courses/101', 'main.instructure.com'), 
  target: '_blank',
  //position: 'before' // default
}
```