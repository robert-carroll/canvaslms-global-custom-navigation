# Setup options for High Contrast Logos

By default, when a user chooses High Contrast Mode, the left navigation logo is removed, and the responsive navigation menu is defaulted to the Canvas logo. This isn't really an issue for most, but if you have multiple instances (consortium) and users primarily use 1 or 2 of those instances, and those instances are branded differently, this could be the only way they recognize where they are.

## Selecting the right files
- The file you use should provide high contrast to the **default** Canvas theme
- If your regular branding logo meets this requirement then you can use the one you add in Canvas Themes
  - If your customized theme and logo do not provide enough contrast, then you should host a secondary logo on a CDN
- If you have multiple instances, the `logos: {}` object represents the instance `subdomain: file`

### Example Config for High Contrast Logos
Here is an example to be added to `globalCustomNav_items` along with any other custom navigation _items_ or trays.

```js
{
  // please ensure the logo you use here is high contrast for your users
  // the default theme and global nav background used in high contrast mode is dark, white logos are better
  high_contrast: true,
  title: 'High Contrast Logo', // not visible for global nav header logo
  // example only, host your own
  glbl: {
    // single instance
    // canvas hosted, if it has enough contrast
    logo_svg: 'https://instructure-uploads.s3.amazonaws.com/account_<global_account_id>/attachments/<file_id>/your-branding-logo.svg',
    // externally hosted alternative
    // logo_svg: 'https://your.cdn/images/high-contrast-logo.svg',
    // multiple instances
    /*
    cdn: 'https://your.cdn/images/',
    // manage swapping by instance organization (institution) subdomain to image
    // logos: {
    //   'one': 'instance-one-logo.svg',
    //   'two': 'instance-two-logo.svg',
    //   'tri': 'instance-tri-logo.svg',
    // },
    // manage swapping by logic
    // logos: function() {}
    */
  },
  rspv: {
    // single instance
    logo_svg: 'https://instructure-uploads.s3.amazonaws.com/account_<global_account_id>/attachments/<file_id>/instance-one-logo-horizontal.png',
    // multiple instances
    /*
    cdn: 'https://instructure-uploads.s3.amazonaws.com/',
    // manage swapping by instance organization (institution) subdomain to image
    // if your logos provide high contrast within the default theme, you might use the ones already hosted
    logos: {
      'one': 'account_<global_account_id>/attachments/<file_id>/instance-one-logo-horizontal.png',
      'two': 'account_<global_account_id>/attachments/<file_id>/instance-two-logo-horizontal.png',
      'tri': 'account_<global_account_id>/attachments/<file_id>/instance-tri-logo-horizontal.png',
    }
    */
  },
  href: 'https://' + window.location.host,
  target: '_self',
}
```