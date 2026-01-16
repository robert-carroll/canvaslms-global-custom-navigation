# CanvasLMS - Global Custom Navigation

This version of the Global Custom Navigation shuffles it all together.

> `!` Always review and test in beta before deploying to production

## Features
  - No jQuery
  - All Languages including _Left To Right_ and _Right To Left_
  - Global and Responsive (mobile) navigation icon creation
  - 3 svg options for icon: instructure icons, external svg, inline svg
  - Tray for both Global and Responsive navigation
  - Tray list can be:
      - basic list (ex; accounts)
      - grouped (ex; published|unpublished courses)
        - ungrouped in responsive nav tray (ex: responsive courses tray)
  - Role Callback
  - Tray Callback or Throwback
  - Custom High Contrast Logo considerations

## Navigation Item Settings & Setup

The files in the _js/_ directory are ready for use. They include mostly minified versions with examples included for configuring options.

The files in the _css/_ directory for the associated features can be added to your Themes CSS file.

## Docs
Some guides on how to setup and configure features and customizations:
- [/docs/nav-items.md](/docs/nav-items.md) - setup simple navigation items
- [/docs/nav-tray-with-links.md](/docs/nav-tray-with-links.md) - setup custom trays with links
- [/docs/custom-callback-trays.md](/docs/custom-callback-trays.md) - setup custom trays with custom callback content
- [/docs/custom-tray-throwbacks.md](/docs/custom-tray-throwbacks.md) - setup throwbacks to modify or add content to a Canvas tray
- [/docs/high-contrast-logos.md](/docs/high-contrast-logos.md) - handle branding logos for high contrast mode

## Development & Testing Files
The files in the root of this repo are for testing and development:
- `global-custom-nav.js` includes all features with examples
- `global-custom-nav-items.js` only handles and includes examples basic navigation item icons
- `global-custom-nav-context-items.js` nav items only that handle global nav active class context
  - active class context refers to a _course_ or _account_, and when the user is within that Canvas route, the item icon will show the active class and appear selected.

## Contributions & Feedback
Always welcome, discuss in the [community](https://community.instructure.com/en/discussion/583803/thread-with-space-for-global-custom-navigation), or PR's and issues if you enjoy committing.

## _Custom_ Contributions
There are directories in this repository for Custom Callbacks (for custom trays) and Custom Throwbacks. If you or your institution develop one and would like it shared for others to use, please consider adding it to this repository and those directories. This will provide examples, and allow others to utilize and support them as well as make them easier to find. You could also place a forwarding link if you host it in your repository.

## Contributors
There are snippets and concepts in this code revolving around conversations and contributions by: 
- [James](https://community.instructure.com/en/profile/James) mutations/append css/clones
- [jsimon3](https://community.instructure.com/en/profile/jsimon3) responsive tray
- [dbrace](https://community.instructure.com/en/profile/dbrace) instui icons
- [JACOBSEN_C](https://community.instructure.com/en/profile/JACOBSEN_C) roles
- [hechla](https://community.instructure.com/en/profile/hechla) icon placement
- [cesbrandt](https://community.instructure.com/en/profile/cesbrandt) easily readable role conditions
- [Code-with-Ski](https://community.instructure.com/en/profile/Code-with-Ski) language direction detection, tray transition and classes
- threads that have been archived
- notes from 2020
- the community for its feedback