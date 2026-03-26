/**
// @name        CanvasLMS - Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description one global nav tool, maybe?
//
**/

(function () {
  // handle css, if you aren't adding .css to themes
  if (document.querySelectorAll('[data-global-custom-nav-css="set"]').length == 0) {
    let styles = {
      // for item icons
      'i.gcn_inst_menu_icon:before': 'font-size: 1.625rem;',
      'i.gcn_inst_rspv_icon': 'color: var(--ic-brand-primary);',
      // font in trays
      ":root": '--gcn-ic-font: LatoWeb, "Lato Extended", Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;',
      // from instui/canvas:
      // react .css-ab1c2d-* 
      // renamed .css-instui-* 
      // then .gcn-instui-*
      ".gcn-instui-tray": "background-color: rgb(255, 255, 255); position: fixed; overflow: hidden auto; box-sizing: border-box; z-index: 9999; max-width: 100vw; max-height: 100vh; box-shadow: rgba(0, 0, 0, 0.1) 0px 0.375rem 0.4375rem, rgba(0, 0, 0, 0.25) 0px 0.625rem 1.75rem; top: 0px; bottom: 0px; width: 28em;",
      "[dir='ltr'] .gcn-instui-tray": "left: 0px; right: auto;",
      "[dir='rtl'] .gcn-instui-tray": "right: 0px; left: auto;",
      ".gcn-instui-tray-slide-left-transitioning, .gcn-instui-tray-slide-right-transitioning": "transition: opacity 300ms ease-in-out, transform 300ms ease-in-out !important;",
      ".gcn-instui-tray-slide-left-entering, .gcn-instui-tray-slide-left-entered, .gcn-instui-tray-slide-right-entering, .gcn-instui-tray-slide-right-entered": "transform: translate3d(0, 0, 0) !important; opacity: 1 !important;",
      ".gcn-instui-tray-slide-left-exiting, .gcn-instui-tray-slide-left-exited": "transform: translate3d(-100%, 0, 0) !important; opacity: 0.01 !important;",
      ".gcn-instui-tray-slide-right-exiting, .gcn-instui-tray-slide-right-exited": "transform: translate3d(100%, 0, 0) !important; opacity: 0.01 !important;",
      ".gcn-instui-tray__content": "min-height: 100vh;",
      ".gcn-instui-closeButton": "z-index: 1; display: inline-block; position: absolute; top: 0.5rem;",
      "[dir='ltr'] .gcn-instui-closeButton": "right: 0.5rem; left: auto;",
      "[dir='rtl'] .gcn-instui-closeButton": "left: 0.5rem; right: auto;",
      ".gcn-instui-view--inlineBlock-baseButton": 'margin: 0px; padding: 0px; transition: outline-color 0.2s, outline-offset 0.25s; outline-offset: -0.8rem; outline: rgba(43, 122, 188, 0) solid 0.125rem; width: auto; cursor: pointer; box-sizing: border-box; font-family: var(--gcn-ic-font); max-width: 100%; vertical-align: middle; color: rgb(39, 53, 64); background: none; position: relative; appearance: none; text-decoration: none; border-radius: 0.25rem; height: fit-content; overflow: visible; display: inline-block; border-width: 0px; overscroll-behavior: auto; touch-action: manipulation;',
      ".gcn-instui-view--inlineBlock-baseButton:hover, .gcn-instui-view--inlineBlock-baseButton:active": "outline-offset: -0.8rem; outline: rgba(43, 122, 188, 0) solid 0.125rem;",
      ".gcn-instui-view--inlineBlock-baseButton:focus": "outline-offset: calc(0.1875rem); outline-color: var(--ic-link-color);",
      ".gcn-instui-baseButton__content": 'box-sizing: border-box; width: 1.75rem; display: block; direction: inherit; user-select: none; transition: background 0.2s, transform 0.2s; transform: none; font-family: var(--gcn-ic-font); font-weight: 400; text-transform: none; letter-spacing: normal; border-style: none; border-width: 0.0625rem; border-radius: 0.25rem; line-height: 1; text-align: start; font-size: 0.875rem; padding-left: 0px; padding-right: 0px; height: 1.75rem; color: rgb(39, 53, 64); border-color: rgb(39, 53, 64); background: transparent; box-shadow: none;',
      ".gcn-instui-baseButton__childrenLayout": "display: flex; height: 100%; width: 100%; -moz-box-pack: center; justify-content: center; box-sizing: border-box; -moz-box-align: center; align-items: center; flex-direction: row; max-width: 100%; overflow: visible; unicode-bidi: isolate;",
      ".gcn-instui-view--inlineBlock-baseButton *": "pointer-events: none;",
      ".gcn-instui-baseButton__iconOnly": "box-sizing: border-box; min-width: 0.0625rem; flex-shrink: 0; max-width: 100%; overflow: visible; unicode-bidi: isolate;",
      ".gcn-instui-baseButton__iconSVG": "display: flex; -moz-box-align: center; align-items: center; font-size: 1rem;",
      ".gcn-instui-inlineSVG-svgIcon": "fill: currentcolor; display: inline-block; overflow: visible; color: inherit; vertical-align: middle; line-height: 1; width: 1em; height: 1em;",
      ".gcn-instui-screenReaderContent": "width: 0.0625rem !important; height: 0.0625rem !important; margin: -0.0625rem !important; padding: 0px !important; position: absolute; top: 0px; inset-inline-start: 0px; white-space: nowrap; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;",
      ".gcn-instui-view": "padding: 1.5rem; transition: outline-color 0.2s, outline-offset 0.25s; outline-offset: -0.8rem; outline: rgba(43, 122, 188, 0) solid 0.125rem;",
      ".gcn-instui-view-heading": "box-sizing: border-box; max-width: 100%; overflow: visible; overscroll-behavior: auto; line-height: 1.25; margin: 0px; font-family: var(--gcn-ic-font); font-size: 1.375rem; font-weight: 700; color: inherit; transition: outline-color 0.2s, outline-offset 0.25s; outline-offset: -0.8rem; outline: rgba(43, 122, 188, 0) solid 0.125rem;",
      ".gcn-instui-view--block-list": "margin: 0.75rem 0px; transition: outline-color 0.2s, outline-offset 0.25s; outline-offset: -0.8rem; outline: rgba(43, 122, 188, 0) solid 0.125rem; box-sizing: border-box; font-family: var(--gcn-ic-font); max-width: 100%; overflow: visible; display: block; overscroll-behavior: auto; padding-inline: 0px; list-style-type: none;",
      ".gcn-instui-view-listItem:first-of-type": "margin-top: 0px;",
      ".gcn-instui-view-listItem": "box-sizing: border-box; max-width: 100%; overflow: visible; overscroll-behavior: auto; font-weight: 400; font-family: var(--gcn-ic-font); line-height: 1.5; color: rgb(39, 53, 64); padding: 0px; font-size: 1rem; margin-top: 0.75rem; margin-bottom: 0.75rem; transition: outline-color 0.2s, outline-offset 0.25s; outline-offset: -0.8rem; outline: rgba(43, 122, 188, 0) solid 0.125rem;",
      ".gcn-instui-view-link": "transition: outline-color 0.2s, outline-offset 0.25s; outline-offset: -0.8rem; outline: rgba(43, 122, 188, 0) solid 0.125rem;",
      ".gcn-instui-view-link:is(a), .gcn-instui-view-link:is(button)": "box-sizing: border-box; font-family: var(--gcn-ic-font); font-weight: 400; transition: outline-color 0.2s; vertical-align: baseline; outline-color: transparent; outline-offset: 0.25rem; text-underline-offset: auto; cursor: pointer; color: var(--ic-link-color); text-decoration: none;",
      ".gcn-instui-view-link:focus": "outline-offset: calc(0.1875rem); outline-color: var(--ic-brand-primary);",
      ".gcn-instui-view-link:is(a):focus, .gcn-instui-view-link:is(button):focus": "border-radius: 0.125rem;",
      ".gcn-instui-text": "font-family: var(--gcn-ic-font); letter-spacing: 0px; font-weight: 300; font-size: 0.75rem;",
      ".gcn-instui-text-footer": "font-family: var(--gcn-ic-font); letter-spacing: 0px; font-size: 1rem;",
      ".gcn-instui-screenReaderContent": "width: 0.0625rem !important; height: 0.0625rem !important; margin: -0.0625rem !important; padding: 0px !important; position: absolute; top: 0px; inset-inline-start: 0px; white-space: nowrap; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;",
      // for rspv trays
      'div.gcn-tray-rspv-expand': 'display: block !important;',
      'svg.gcn-tray-rspv-closed': 'display: none !important;',
      'svg.gcn-tray-rspv-aodown': 'fill: currentcolor; display: inline-block; overflow: visible; color: inherit; vertical-align: middle; line-height: 1; width: 1em; height: 1em;',
      // common - for callback trays and throwbacks
      ".gcn_tray-view-spinner": "max-width: 100%; overscroll-behavior: auto; display: inline-block; vertical-align: middle; position: relative; box-sizing: border-box; overflow: hidden; width: 3em; height: 3em;",
      ".gcn_tray-spinner__circle": "display: block; position: absolute; top: 0px; left: 0px; animation-name: gcn-spinner-rotate; animation-duration: 2.25s; animation-iteration-count: infinite; animation-timing-function: linear; width: 3em; height: 3em;",
      ".gcn_tray_throwback-spinner__circle": "display: block; animation-name: gcn-spinner-rotate; animation-duration: 2.25s; animation-iteration-count: infinite; animation-timing-function: linear; width: 3em; height: 3em;",
      ".gcn_tray-spinner__circleTrack": "stroke: rgb(245, 245, 245); fill: none; stroke-width: 0.375em;",
      ".gcn_tray-spinner__circleSpin": "fill: none; stroke-linecap: round; animation-name: gcn-spinner-morph; animation-duration: 1.75s; animation-iteration-count: infinite; animation-timing-function: ease; stroke-width: 0.375em; stroke-dasharray: 6em; transform-origin: calc(1.5em) calc(1.5em) 0px; stroke: rgb(3, 116, 181);",
      "@keyframes gcn-spinner-rotate": "to { transform: rotate(360deg) }",
      "@keyframes gcn-spinner-morph": "0% { stroke-dashoffset: 190%; } 50% { stroke-dashoffset: 50%; transform: rotate(90deg); } 100% { stroke-dashoffset: 190%; transform: rotate(360deg); }"
    };
    if (typeof styles !== 'undefined' && Object.keys(styles).length > 0) {
      let style = document.createElement('style');
      style.setAttribute('data-global-custom-nav-css', 'set');
      document.head.appendChild(style);
      let sheet = style.sheet;
      Object.keys(styles).forEach(function (key) {
        sheet.insertRule(`${key} { ${styles[key]} }`, sheet.cssRules.length);
      });
    }
  }
})();

(function () {
  'use strict';

  // TODO context items globally applied to consortium instances, should handle a root url, and ensure active class

  // continue if curious
  const globalCustomNav = {  
    cfg: {
      context_item: '',
      glbl: {
        nav_selector: '#menu',
        tray_portal: '#nav-tray-portal',
        tray_container: 'navigation-tray-container',
        space: 'tray-with-space-for-global-nav',
        menuItemClass: `ic-app-header__menu-list-item`,
        trayActiveClass: `ic-app-header__menu-list-item--active`,
        keeper: null
      },
      rspv: {
        tray_portal: 'div[role="dialog"]:has(.ic-brand-mobile-global-nav-logo) ul',
        tray_container: 'div[class$="-tray__content"]',
        INSTUI_aodown: `<svg name="IconArrowOpenDown" viewBox="0 0 1920 1920" rotate="0" style="width: 1em; height: 1em;" 
        width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" class="gcn-tray-rspv-aodown">
        <g role="presentation"><path d="M568.129648 0.0124561278L392 176.142104 1175.86412 960.130789 392 1743.87035 568.129648 1920 1528.24798 960.130789z" 
        fill-rule="evenodd" stroke="none" stroke-width="1" transform="matrix(0 1 1 0 .067 -.067)"></path></g></svg>`,
        keeper: null
      },
      targets: ['_self', '_blank', '_parent', '_top']
    },
    load: (opts) => {
      if (!document.querySelector(globalCustomNav.cfg.glbl.nav_selector) && !document.querySelector(globalCustomNav.cfg.rspv.tray_portal)) return;

      if (document.querySelector(globalCustomNav.cfg.glbl.nav_selector)) {

        // get the left-to-right or right-to-left direction
        globalCustomNav.dir = document.querySelector('html').getAttribute('dir') ?? 'ltr';
        // accept nav items, or default to empty
        globalCustomNav.nav_items = Array.isArray(opts.nav_items) ? opts.nav_items : opts;
        // accept throwbacks, or default to empty
        globalCustomNav.throwbacks = (typeof opts.throwbacks === 'object') ? opts.throwbacks : {};

        // preserve the nav item to restore active class when a tray is closed
        // handle primary routes, external tools, and custom contexts
        var active_context = document.querySelector(`${globalCustomNav.cfg.glbl.nav_selector} li.${globalCustomNav.cfg.glbl.trayActiveClass} a`);
        if (active_context) {
          globalCustomNav.cfg.context_item = active_context.id || active_context.closest('li').id;
        }
        // update the glbl menu with custom nav items
        globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, false);
      }
      globalCustomNav.detect_glbl_portal();
      globalCustomNav.detect_rspv_portal();
      globalCustomNav.tray_handler();
    },
    // the responsive menu monitors the same physical UI space for two distinct phases...
    // one for the top level nav 'portal' (the space), and one for the second level 'tray' (the menu)
    detect_rspv_portal: (mtx) => {
      // if we have mtx, check if the portal is injected
      if (mtx) {
        let portal_detected = false;
        for (const mutation of mtx) {
          for (const node of mutation.addedNodes) {
            // check if the added node is an element and if it matches or contains the portal
            if (node.nodeType === 1) {
              if (node.matches(globalCustomNav.cfg.rspv.tray_portal) || node.querySelector(globalCustomNav.cfg.rspv.tray_portal)) {
                portal_detected = true;
                break;
              }
            }
          }
          if (portal_detected) break;
        }
        
        // mtx happened but the portal wasn't included, ignore and keep watching
        if (!portal_detected && !document.querySelector(globalCustomNav.cfg.rspv.tray_portal)) {
          return; 
        }
      }

      // check for the portal and customization state
      const portal = document.querySelector(globalCustomNav.cfg.rspv.tray_portal);
      const tray_portal_complete = document.querySelector('div.rspv-global-custom-nav');

      // there is no portal, start observer
      if (!portal) {
        if (!globalCustomNav.cfg.rspv.keeper) {
          // store the observer in the keeper, prevent stacking and utilize hand off
          // subtree ensures items are added responsive menu opens
          globalCustomNav.cfg.rspv.keeper = new MutationObserver(globalCustomNav.detect_rspv_portal);
          globalCustomNav.cfg.rspv.keeper.observe(document.body, { childList: true, subtree: true });
        }
        return;
      }
      
      // portal exists, menu is not yet customized
      if (portal != null && !tray_portal_complete) {
        // handoff, stop observing the body once the portal is found
        if (globalCustomNav.cfg.rspv.keeper) {
          globalCustomNav.cfg.rspv.keeper.disconnect();
          globalCustomNav.cfg.rspv.keeper = null;
        }
        
        // add custom menu items
        globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, true);
        // mark it complete
        document.querySelector(globalCustomNav.cfg.rspv.tray_container).classList.add('rspv-global-custom-nav');
        
        // handoff for tray functionality
        globalCustomNav.cfg.rspv.keeper = new MutationObserver(globalCustomNav.watch_rspv_portal);
        globalCustomNav.cfg.rspv.keeper.observe(document.body, { childList: true, subtree: true });
      }
    },
    watch_rspv_portal: (mtx) => {
      // check for tray portal, handle throwbacks
      const tray_portal_open = document.querySelector(globalCustomNav.cfg.rspv.tray_portal);
      // ensure the tray portal is open
      if (tray_portal_open) {
        // only run throwback if new elements were actually injected into the DOM
        const has_new_nodes = mtx && mtx.some(mutation => mutation.addedNodes.length > 0);
        if (has_new_nodes) {
          // second level nav tray is open, handle throwbacks
          globalCustomNav.rspv_tray_throwback();
        }
        return;
      }
      
      // when the portal is not open, handoff back to the portal watcher
      if (!tray_portal_open) {
        if (globalCustomNav.cfg.rspv.keeper) {
          globalCustomNav.cfg.rspv.keeper.disconnect();
          globalCustomNav.cfg.rspv.keeper = null;
        }
        globalCustomNav.detect_rspv_portal();
      }
    },
    // waits for and finds the global nav tray portal and then hands observation off to watch_glbl_portal
    detect_glbl_portal: () => {
      const portal = document.querySelector(globalCustomNav.cfg.glbl.tray_portal);
      if (!portal) {
        if (!globalCustomNav.cfg.glbl.keeper) {
          // essential for theme and userscript use, vs just pasting it into the browser console
          // nav portal doesn't immedately exist when JS is loaded, but it persists once created
          globalCustomNav.cfg.glbl.keeper = new MutationObserver(globalCustomNav.detect_glbl_portal);
          globalCustomNav.cfg.glbl.keeper.observe(document.body, { childList: true });
        }
        return;
      }
  
      // maintain a single active observer
      if (globalCustomNav.cfg.glbl.keeper) {
        globalCustomNav.cfg.glbl.keeper.disconnect();
      }
      
      // set active class here prevents default from taking it back
      // also reduces visual swap between default and custom item when closing a native tray
      globalCustomNav.glbl_ensure_active_class();
      //

      // keep on keeping on (watch again)
      globalCustomNav.cfg.glbl.keeper = new MutationObserver(globalCustomNav.watch_glbl_portal);
      globalCustomNav.cfg.glbl.keeper.observe(portal, { childList: true, subtree: true });
    },
    watch_glbl_portal: (mtx) => {
      // watch for tray container, handle throwbacks
      const portal = document.querySelector(globalCustomNav.cfg.glbl.tray_portal);
      // detect the tray container
      const tray_container_open = document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} div.${globalCustomNav.cfg.glbl.tray_container}`);

      if (tray_container_open) {
        // get the current open tray slug
        let ui_tray = [...tray_container_open.classList].find(c => c.endsWith('-tray'))?.replace('-tray', '');
        if (ui_tray) {
          globalCustomNav.glbl_ensure_active_class(`global_nav_${ui_tray}_link`);

          // call throwbacks
          globalCustomNav.glbl_tray_throwback();
        }
      }

      mtx.forEach(mutation => {
        if (mutation.removedNodes.length > 0 && portal.children.length === 0) {
          // reset context on tray removal
          globalCustomNav.glbl_ensure_active_class();
        }
      });
    },
    glbl_ensure_active_class: (context_item = globalCustomNav.cfg.context_item) => {
      // clear existing active classes to prevent duplicates
      document.querySelectorAll(`.${globalCustomNav.cfg.glbl.trayActiveClass}`).forEach(el => {
        el.classList.remove(globalCustomNav.cfg.glbl.trayActiveClass);
      });

      // attempt to find the requested item, fallback to the default context item
      const nav_item = document.getElementById(context_item) || document.getElementById(globalCustomNav.cfg.context_item);

      // safely apply the active class to the parent <li> if it exists
      nav_item?.closest('li')?.classList.add(globalCustomNav.cfg.glbl.trayActiveClass);
    },
    prepare_nav_items: (items, hamb = true) => {
      items.forEach(item => {
        // if roles for the current item are not set, the user can see it, otherwise
        const user_gets_item = (typeof item.roles === 'undefined') || item.roles();
        if (user_gets_item) {
          globalCustomNav.create_nav_icon(item, hamb);

          if (!!item.high_contrast && item.high_contrast == true) {
            if (ENV.use_high_contrast != true) return;
            globalCustomNav.append_high_contrast(item);
            return;
          }
          
          globalCustomNav.append_item(item, hamb);
        }
      });
    },
    create_nav_icon: (item, hamb = true) => {
      // create a DOM safe string from the title for the id, or replace it with a random string if regex returns an empty string
      item.tidle = item.title.replace(/[\W_]+/g,'') || Math.random().toString(18).slice(2);
      item.slug = `global_nav_${item.tidle}_link`;

      // clone and create the icon, consider c4e
      let icon_to_copy = (ENV.K5_USER == true && hamb == true) ? 'Home' : 'Dashboard';
      if (item.tray) {
        icon_to_copy = 'Courses';
      }
      const nav_icon = hamb ? `${globalCustomNav.cfg.rspv.tray_portal} svg[name="Icon${icon_to_copy}"]` : `#global_nav_${icon_to_copy.toLowerCase()}_link`;
      const nav_icon_li = document.querySelector(nav_icon).closest('li');

      // handle custom high contrast logos
      if (!!item.high_contrast && item.high_contrast == true) {
        // get the text for the cloned nav item, global or hamb
        var dashboard_icon_text = nav_icon_li.querySelector('.menu-item__text') || nav_icon_li.querySelector('span[letter-spacing="normal"]');
        item.dashboard_icon_text = dashboard_icon_text.innerText;
        // done here
        return;  
      }
      // continue for custom nav items

      // replace contents
      const icon = nav_icon_li.cloneNode(true);
      icon.setAttribute('id', (hamb ? 'rspv-' : '') + `${item.slug}-item`);
      icon.querySelector('svg').parentElement.classList.add((hamb ? 'rspv-' : '') + `svg-${item.tidle}-holder`);

      const icon_id = (hamb ? 'rspv-' : '') + item.slug;
      if (hamb && item.tray) {
        // button for resp tray
        icon.querySelector('button').setAttribute('id', icon_id);
        icon.querySelector('button').setAttribute('aria-controls', (hamb ? 'rspv-' : '') + `${item.slug}-tray`);
        icon.querySelector('div div').setAttribute('id', (hamb ? 'rspv-' : '') + `${item.slug}-tray`);
      } else {
        icon.querySelector('a').setAttribute('id', icon_id);
        icon.querySelector('a').href = item.href;
        if (typeof item.target !== 'undefined' && globalCustomNav.cfg.targets.includes(item.target)) {
          icon.querySelector('a').setAttribute('target', item.target);
        }
      }

      // get the text for the cloned nav item, global or hamb
      var icon_text = icon.querySelector('.menu-item__text') || icon.querySelector('span[letter-spacing="normal"]');
      // set the clones text to the item text
      icon_text.textContent = item.title;

      // prepare for svg
      const svg_holder = icon.querySelector((hamb ? '.rspv-svg' : '.svg') + `-${item.tidle}-holder`);
      icon.querySelector('svg').classList.remove('ic-icon-svg--dashboard', 'svg-icon-home');
      let svg_class = [...icon.querySelector('svg').classList];
      if (!hamb) {
        icon.classList.remove(globalCustomNav.cfg.glbl.trayActiveClass);
      }
      // remove cloned svg
      icon.querySelector('svg').remove();

      // import svg
      if (/^icon-[a-z]/.test(item.icon_svg) == true) {
        // instructure icon
        let instuicon = `<div id="${(hamb ? 'rspv-' : '') + `${item.slug}-svg`}" role="presentation">`;
        instuicon += `<i class="icon-line ${item.icon_svg}${hamb ? ' gcn_inst_rspv_icon' : ''} gcn_inst_menu_icon"></i></div>`;
        svg_holder.insertAdjacentHTML('afterbegin', instuicon);

      } else if (/^https/.test(item.icon_svg)) {
        // externally hosted svg, you must handle cors policies yourself
        fetch(item.icon_svg, {
            mode: 'cors',
            method: 'GET',
            headers: {
              'Access-Control-Request-Method': 'GET',
              'Accept': 'text/plain',
              'Content-Type': 'text/plain',
            }
          })
          .then(r => r.text())
          .then(svg => {
            svg_holder.insertAdjacentHTML('afterbegin', svg);
            icon.querySelector('svg').setAttribute('id', (hamb ? 'rspv-' : '') + `${item.slug}-svg`);
            icon.querySelector('svg').classList.add(...svg_class);
          })
          .catch(console.error.bind(console));

      } else if (/^<svg/.test(item.icon_svg)) {
        // inline/script svg
        svg_holder.insertAdjacentHTML('afterbegin', item.icon_svg);
        icon.querySelector('svg').setAttribute('id', (hamb ? 'rspv-' : '') + `${item.slug}-svg`);
        icon.querySelector('svg').classList.add(...svg_class);
      }
      item.icon = icon;
      return;
    },
    append_item: (item, hamb = true) => {
      const target_ul = hamb ? globalCustomNav.cfg.rspv.tray_portal : globalCustomNav.cfg.glbl.nav_selector;
      const target_li = document.querySelector(`${target_ul} li:last-child`);
      const position_sel = (hamb == true ? globalCustomNav.cfg.rspv.tray_portal : globalCustomNav.cfg.glbl.nav_selector) + ` > li:nth-of-type(${item.position})`;
      // nav item placement by position
      if (typeof item.position === 'number' && document.querySelector(position_sel)) {
					document.querySelector(position_sel).after(item.icon);
      } else {
        if (item.position == 'after') {
          target_li.after(item.icon);
        } else {
          // default to before the last child (usually Help)
          // unless, visually other items are added after current is placed
          target_li.before(item.icon);
        }
      }

      // check if the current window path matches the item's href
      // to set the active state on load for context items
      const regex = new RegExp(`^${item.href}`);
      if (!hamb && regex.test(window.location.pathname)) {
        if (item.slug != globalCustomNav.cfg.context_item) {
          globalCustomNav.cfg.context_item = item.slug;
          // set active class when the icon is added
          // reduces visual swap between default to custom
           globalCustomNav.glbl_ensure_active_class();
        }
      }
    },
    append_high_contrast: item => {
      // create style sheet if not already set
      if (document.querySelectorAll('[data-global-custom-nav-css="set"]').length == 0) {
        let style = document.createElement('style');
        style.setAttribute('data-global-custom-nav-css', 'set');
        document.head.appendChild(style);
      }
      // update style sheet with logomark override
      var style_sheet = document.querySelector('[data-global-custom-nav-css]').sheet;

      // responsive/mobile high contrast logos, single and consortiums
      if (!!item.rspv && !item.rspv.logo_svg) {
        item.rspv.logo_svg = item.rspv.cdn + item.rspv.logos[window.location.host.split('.')[0]];
      }
      style_sheet.insertRule(`.ic-brand-mobile-global-nav-logo { background-image:url(${item.rspv.logo_svg}) !important; }`, style_sheet.cssRules.length);

      // prevent readding when changing view between mobile and desktop - add only once
      if (document.querySelector('.gcn-high-contrast-glbl')) return;

      // global high contrast logos, single and consortiums
      if (!!item.glbl && !item.glbl.logo_svg) {
        item.glbl.logo_svg = item.glbl.cdn 
          + (typeof item.glbl.logos === 'function' ? item.glbl.logos() : item.glbl.logos[window.location.host.split('.')[0]]);
      }
      style_sheet.insertRule(`.ic-app-header__logomark { background-image:url(${item.glbl.logo_svg}) !important; }`, style_sheet.cssRules.length);

      // wrapper for global nav header logo
      var div = document.createElement('div');
      div.setAttribute('style', 'background-color: transparent');
      div.classList.add('ic-app-header__logomark-container', 'gcn-high-contrast-glbl');

      // screenreader dashboard text
      var span = document.createElement('span');
      span.setAttribute('class', 'screenreader-only');
      span.textContent = item.dashboard_icon_text;

      // logo link
      var a = document.createElement('a');
      a.href = 'https://' + window.location.host;
      a.setAttribute('dir', globalCustomNav.dir);
      a.classList.add('ic-app-header__logomark');
      a.appendChild(span);
      div.appendChild(a);
      document.querySelector('div.ic-app-header__main-navigation').prepend(div);
    },
    link: item => {
      var a = document.createElement('a');
      a.textContent = item.title;
      a.href = item.href;
      a.setAttribute('dir', globalCustomNav.dir);
      a.classList.add('gcn-instui-view-link');
      if (typeof item.target !== 'undefined' && globalCustomNav.cfg.targets.includes(item.target)) {
        a.target = item.target;
      }
      return a.outerHTML;
    },
    tray_links: items => {
      var html = `<ul class="gcn-instui-view--block-list" dir="${globalCustomNav.dir}">`;
      items.forEach(item => {
        html += `<li class="gcn-instui-view-listItem" dir="${globalCustomNav.dir}">`;
        html += globalCustomNav.link(item);

        // append link description if set
        html += (!!item.desc && item.desc.length > 1) ? `<div class="gcn-instui-text" wrap="normal" letter-spacing="normal">${item.desc}</div>` : '';
        html += '</li>';
      })
      html += `</ul>`;
      return html;
    },
    rspv_tray_toggle: item => {
      const tray_content = document.querySelector(`#rspv-${item.slug}-tray`);

      // tray content is empty
      if (!tray_content.childElementCount)
        globalCustomNav.rspv_tray_content(item);

      // toggle tray state (expand/collapse)
      tray_content.classList.toggle('gcn-tray-rspv-expand');

      // swap the arrows based on expand/collapse
      document.querySelectorAll(`#rspv-${item.slug} svg[name^="IconArrowOpen"]`).forEach(e => {
        e.classList.toggle('gcn-tray-rspv-closed');
      });
    },
    rspv_tray_content: item => {
      const tray_content = document.querySelector(`#rspv-${item.slug}-tray`),
        tray_icon_id = `#rspv-${item.slug}`;

      // swap the expand/collapse arrow
      if (!document.querySelector(`${tray_icon_id} svg[name="IconArrowOpenDown"]`)) {
        let arrow_end = document.querySelector(`${tray_icon_id} svg[name="IconArrowOpenEnd"]`);
        arrow_end.parentElement.insertAdjacentHTML('afterbegin', globalCustomNav.cfg.rspv.INSTUI_aodown);
        let arrow_down = document.querySelector(`${tray_icon_id} svg[name="IconArrowOpenDown"]`);
        // clone the class list to the added 'open' arrow
        let arrow_class = arrow_end.classList;
        arrow_class.forEach(c => {
          arrow_down.classList.add(c);
        });
        document.querySelector(`${tray_icon_id} svg[name="IconArrowOpenDown"]`).classList.toggle('gcn-tray-rspv-closed');
      }
      // tray links
      if (document.querySelectorAll(`#rspv-${item.slug}-tray a`).length == 0) {
        var tray_html = '';

        // handle links vs callback
        tray_html += globalCustomNav.tray_links_vs_cb(item);

        // add default footer link
        tray_html += `<li>${globalCustomNav.link(item)}</li>`;
        // append
        tray_content.insertAdjacentHTML('afterbegin', tray_html);

        // handle callback
        globalCustomNav.handle_tray_cb(item, `#rspv-${item.slug}-tray .gcn-loading-tray-cb-svg`, 'afterbegin');
      }
    },
    // unified handler with event delegation for custom tray toggling events
    // reconciles interactions between native Canvas trays and custom trays
    // maintains native ui/ux feel and functionality for custom trays
    tray_handler: () => {

      const glbl_tray_close = (slug, restore_focus = true) => {
        const open_tray = document.querySelector('.gcn-instui-tray');
        if (!open_tray || !open_tray.classList.contains('gcn-instui-tray')) return;

        // restore focus on nav item when tray closes
        if (restore_focus) {
          const tray_nav_anchor = document.getElementById(slug);
          if (tray_nav_anchor) {
            if (!tray_nav_anchor.hasAttribute('tabindex')) tray_nav_anchor.setAttribute('tabindex', '0');
            tray_nav_anchor.focus();
          }
        }
       
        // trigger tray slide on close
        const direction = globalCustomNav.dir == 'ltr' ? 'left' : 'right';
        // re-add the transition so it animates the departure
        open_tray.classList.add(`gcn-instui-tray-slide-${direction}-transitioning`);
        // use a single requestAnimationFrame to ensure the browser registers
        // the transition class BEFORE we change the physical location.
        requestAnimationFrame(() => {
          // swap the resting state to the exiting state (moves it off-screen)
          open_tray.classList.replace(`gcn-instui-tray-slide-${direction}-entered`, `gcn-instui-tray-slide-${direction}-exiting`);
          // wait for the exact 300ms animation to finish
          setTimeout(() => {
            // lock it into its final off-screen state
            open_tray.classList.replace(`gcn-instui-tray-slide-${direction}-exiting`, `gcn-instui-tray-slide-${direction}-exited`);
            open_tray.classList.remove(`gcn-instui-tray-slide-${direction}-transitioning`);
            // cleanup: remove it from the DOM
            document.getElementById(`${slug}-tray`)?.remove();
          }, 300);
        });
      };

      document.addEventListener('click', (e) => {
        const target = e.target;
        // checks if the click is on a global or responsive nav item
        const nav_anchor = target.closest(`${globalCustomNav.cfg.glbl.nav_selector} li a, [id^="rspv-"]`);

        // reconcile custom vs native trays
        if (nav_anchor) {
          const is_rspv = nav_anchor.id.startsWith('rspv-');

          // do nothing for native trays except close any open custom trays
          // native tray nav items (li) do not have an id
          // only run for global nav trays because responsive trays don't use this handler for closing
          if (!is_rspv && nav_anchor.closest('li') && !nav_anchor.closest('li').hasAttribute('id')) {
            const open_tray = document.querySelector('.gcn-instui-tray');
            if (open_tray) {
              const open_slug = open_tray.parentElement.id.replace('-tray', '');
              // pass 'false' to prevent focus stealing from the native tray
              glbl_tray_close(open_slug, false);
            }
            return;
          }

          // slug for the click
          const slug = is_rspv ? nav_anchor.id.replace('rspv-', '') : nav_anchor.id;
          const item = globalCustomNav.nav_items.find(i => i.slug === slug);

          // check if this specific item has custom tray content
          const has_tray = item && item.tray !== undefined;
          const open_tray = document.querySelector('.gcn-instui-tray');

          // handle toggling open/close states for custom trays
          if (has_tray) {
            if (!is_rspv) e.preventDefault();

            if (is_rspv) {
              globalCustomNav.rspv_tray_toggle(item);
            } else {
              const is_open = !!document.getElementById(`${item.slug}-tray`);
              if (!is_open) {
                // close open trays before opening
                if (open_tray) {
                  const open_slug = open_tray.parentElement.id.replace('-tray', '');
                  // pass 'false' because we are opening a NEW custom tray 
                  // and don't want the old nav item to steal focus
                  glbl_tray_close(open_slug, false);
                }
                // generate and append the tray content to tray portal ONLY when opening
                const tray_html = globalCustomNav.tray_links_vs_cb(item, is_rspv);
                if (tray_html !== false) {
                  globalCustomNav.glbl_tray_content(item, tray_html);
                }
              } else {
                // close when reclicking the nav item for the tray
                // uses default (true) to restore focus
                glbl_tray_close(slug);
              }
            }
            return;
          }
        }

        // handle close button
        const open_tray = document.querySelector('.gcn-instui-tray');
        if (open_tray && !nav_anchor) {
          const tray_container = open_tray.parentElement;
          const slug = tray_container.id.replace('-tray', '');
          const item = globalCustomNav.nav_items.find(i => i.slug === slug);
          
          // close tray when focus leaves the tray
          // or user clicks the close button
          // ...a click is only "outside" if it's not the tray 
          // ...and not the nav item that controls the tray
          const is_close_btn = target.closest('[id$="-tray-close"]');
          const is_inside_tray = open_tray.contains(target);

          if (is_close_btn || !is_inside_tray) {
            if (item) {
              glbl_tray_close(slug);
            }
          }
        }
      });

      // close tray with escape key when the tray is open
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const open_tray = document.querySelector('.gcn-instui-tray');
          if (open_tray) {
            const slug = open_tray.parentElement.id.replace('-tray', '');
            if (slug) glbl_tray_close(slug);
          }
        }
      });

      // clear focus and prevent native nav items from stealing focus
      // when closing a native tray to open a custom tray
      const global_nav = document.querySelector(globalCustomNav.cfg.glbl.nav_selector);
      if (global_nav) {
        global_nav.addEventListener('focus', (e) => {
          const open_tray = document.querySelector('.gcn-instui-tray');
          if (open_tray) {
            const target_li = e.target.closest('li');
            // if the focused element is a native nav item (lacks a custom id) 
            // and a custom tray is actively open, intercept it
            if (target_li && !target_li.hasAttribute('id') && typeof e.target.blur === 'function') {
              // clear focus from native item
              e.target.blur();
              // redirect focus back to our custom tray's close button
              const close_btn = document.querySelector('.gcn-tray-close-btn');
              if (close_btn) close_btn.focus();
            }
          }
        // use capture phase to intercept focus before it resolves
        }, true); 
      }
    },
    glbl_tray_content: item => {
      const tray_content_id = `${item.slug}-tray`;
      const direction = globalCustomNav.dir == 'ltr' ? 'left' : 'right';

      var tray_html = `<span id="${tray_content_id}" dir="${globalCustomNav.dir}">
      <span class="gcn-instui-tray" dir="${globalCustomNav.dir}">
      <div role="dialog" aria-label="${item.title} tray">
      <div class="gcn-instui-tray__content">
      <div class="${globalCustomNav.cfg.glbl.tray_container} ${item.tidle}-tray">`;

      // close button
      tray_html += `<span class="gcn-instui-closeButton">
        <button id="${tray_content_id}-close" dir="${globalCustomNav.dir}" cursor="pointer" type="button" class="gcn-instui-view--inlineBlock-baseButton">
          <span class="gcn-instui-baseButton__content">
            <span class="gcn-instui-baseButton__childrenLayout">
              <span class="gcn-instui-baseButton__iconOnly">
                <span class="gcn-instui-baseButton__iconSVG">
                  <svg name="IconX" viewBox="0 0 1920 1920" rotate="0" style="width: 1em; height: 1em;" width="1em"
                  height="1em" aria-hidden="true" role="presentation" focusable="false"
                  class="gcn-instui-inlineSVG-svgIcon">
                    <g role="presentation">
                      <path
                        d="M797.32 985.882 344.772 1438.43l188.561 188.562 452.549-452.549 452.548 452.549 188.562-188.562-452.549-452.548 452.549-452.549-188.562-188.561L985.882 797.32 533.333 344.772 344.772 533.333z">
                      </path>
                    </g>
                  </svg></span><span
                  class="gcn-instui-screenReaderContent">Close</span>
                </span></span></span></button></span>`;

      // tray content
      tray_html += `<div class="${globalCustomNav.cfg.glbl.space}">
            <div class="gcn-instui-view" dir="${globalCustomNav.dir}">
              <h2 class="gcn-instui-view-heading" dir="${globalCustomNav.dir}">${item.title}</h2>
              <hr role="presentation" class="gcn-cb_content">`;

      // handle links vs callback
      tray_html += globalCustomNav.tray_links_vs_cb(item, false);

      if (item.tray.footer && item.tray.footer.length > 1) {
        tray_html += `
        <ul class="gcn-instui-view--block-list" dir="${globalCustomNav.dir}">
        <li class="gcn-instui-view-listItem" dir="${globalCustomNav.dir}"><hr role="presentation"></li>
        <li class="gcn-instui-view-listItem" dir="${globalCustomNav.dir}">`;
        tray_html += globalCustomNav.link(item);
        tray_html += `</li></ul><br /><div class="gcn-instui-text-footer" wrap="normal" letter-spacing="normal">${item.tray.footer}</div>`;
      }
      tray_html += `</div></div></div></div></div></span></span>`;

      // append tray
      document.getElementById('nav-tray-portal').insertAdjacentHTML('afterbegin', tray_html);

      // slide in tray on open
      const tray = document.querySelector('.gcn-instui-tray');
      tray.classList.add(`gcn-instui-tray-slide-${direction}-exited`);
      // queue the first frame (browser calculates the off-screen layout)
      requestAnimationFrame(() => {
        // queue the second frame (browser has painted, now we trigger the move)
        requestAnimationFrame(() => {
          // moving in
          tray.classList.replace(`gcn-instui-tray-slide-${direction}-exited`, `gcn-instui-tray-slide-${direction}-entering`);
          // add the transition to animate the move
          tray.classList.add(`gcn-instui-tray-slide-${direction}-transitioning`);
          tray.setAttribute('aria-hidden', 'true');
          // duration
          setTimeout(() => {
            tray.classList.replace(`gcn-instui-tray-slide-${direction}-entering`, `gcn-instui-tray-slide-${direction}-entered`);
            tray.classList.remove(`gcn-instui-tray-slide-${direction}-transitioning`);
            tray.removeAttribute('aria-hidden');
          }, 300);
        });
      });

      // focus on close button
      document.querySelector('.gcn-instui-tray [class$="-closeButton"] button')?.focus();

      // handle callback
      globalCustomNav.handle_tray_cb(item, `.${globalCustomNav.cfg.glbl.space} div.gcn-loading-tray-cb-svg`, 'afterbegin', false);
    },
    tray_links_vs_cb: (item, hamb = true) => {
      // handle custom tray choice
      var tray_html = '';
      // append links if set
      if (typeof item.tray.items !== 'undefined') {
        if (Array.isArray(item.tray.items)) {

          tray_html += globalCustomNav.tray_links(item.tray.items);

        } else if (typeof item.tray.items === 'object') {

          if (hamb) {
            var groups = Object.values(item.tray.items);
            tray_html += globalCustomNav.tray_links(groups[0].concat(groups[1]));
          } else {
            Object.keys(item.tray.items).forEach(group => {
              tray_html += `<h3 class="gcn-instui-view-heading">${group}</h3>`;
              tray_html += globalCustomNav.tray_links(item.tray.items[group]);
            })
          }
        }
        // prep for callback
      } else if (typeof item.tray.cb !== 'undefined' && typeof item.tray.cb === 'function') {
        tray_html += `<ul class="gcn-instui-view--block-list gcn-loading-tray-cb" dir="${globalCustomNav.dir}">
        <li class="gcn-instui-view-listItem" dir="${globalCustomNav.dir}">
          <div dir="${globalCustomNav.dir}" class="gcn_tray-view-spinner gcn-loading-tray-cb-svg gcn-instui-text"></div>
        </li>
      </ul>`;
      }
      return tray_html;
    },
    handle_tray_cb: (item, sel, pos, hamb = true) => {
      if (typeof item.tray.cb !== 'undefined' && typeof item.tray.cb === 'function') {
        var loading_svg = `<svg role="img" aria-labelledby="${(hamb ? 'rspv-' : '') + `${item.slug}-tray-loading_svg`}" focusable="false" class="gcn_tray-spinner__circle">
        <title id="${(hamb ? 'rspv-' : '') + `${item.slug}-tray-loading_svg`}">Loading</title>
        <g role="presentation">
          <circle cx="50%" cy="50%" r="1em" class="gcn_tray-spinner__circleTrack"></circle>
          <circle cx="50%" cy="50%" r="1em" class="gcn_tray-spinner__circleSpin"></circle>
        </g>
      </svg>`;
        document.querySelector(sel).insertAdjacentHTML(pos, loading_svg);

        item.tray.cb(item);
      }
    },
    append_cb_content: (item, content) => {
      if (document.querySelector(`.${globalCustomNav.cfg.glbl.space} hr.gcn-cb_content`)) {
        document.querySelector(`.${globalCustomNav.cfg.glbl.space} hr.gcn-cb_content`).insertAdjacentHTML('afterend', content);
        document.querySelector(`.${globalCustomNav.cfg.glbl.space} .gcn-loading-tray-cb`).remove();
      } else if (document.querySelector(`#rspv-${item.slug}-tray`)) {
        document.querySelector(`#rspv-${item.slug}-tray`).insertAdjacentHTML('afterbegin', content);
        document.querySelector(`#rspv-${item.slug}-tray .gcn-loading-tray-cb`).remove();
      }
    },
    glbl_tray_throwback: () => {
      if (typeof globalCustomNav.throwbacks === 'undefined') return;

      const tray_container = document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} div.${globalCustomNav.cfg.glbl.tray_container}`);
      let ui_tray = [...tray_container.classList].filter(c => c.endsWith('-tray'))[0].replace('-tray', '');
      if (typeof globalCustomNav.throwbacks[ui_tray] === 'object') {
        let tray_ready = document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} ${globalCustomNav.throwbacks[ui_tray].target}`);
        let tray_action_complete = document.querySelectorAll(`${globalCustomNav.cfg.glbl.tray_portal} a.${globalCustomNav.throwbacks[ui_tray].actions.complete}`);
        if (tray_ready && tray_action_complete.length == 0) {
          globalCustomNav.throwbacks[ui_tray].actions.glbl();
        }
      }
    },
    rspv_tray_throwback: () => {
      if (typeof globalCustomNav.throwbacks === 'undefined') return;

      const portal = document.querySelector(globalCustomNav.cfg.rspv.tray_portal);
      if (portal && Object.keys(globalCustomNav.throwbacks).length >= 1) {
        // TODO frequently review for catchment class or attribute
        let expanded = document.querySelectorAll(`button[aria-controls^="Expandable"][aria-expanded="true"]`);
        let to_targets = Object.keys(globalCustomNav.throwbacks).map(t => [globalCustomNav.throwbacks[t].target, t]);
        let to_mapping = Object.fromEntries(to_targets);
        let targets = Object.keys(to_mapping);

        if (expanded) {
          targets.forEach(t => {
            let tray_ready = document.querySelector(`div[id^="Expandable"] ${t}`);
            if (tray_ready) {
              let tray_by_target = to_mapping[t];
              if (typeof globalCustomNav.throwbacks[tray_by_target] === 'object') {
                let tray_action_complete = document.querySelectorAll(`div[id^="Expandable"] a.${globalCustomNav.throwbacks[tray_by_target].actions.complete}`);
                if (tray_action_complete.length == 0) {
                  globalCustomNav.throwbacks[tray_by_target].actions.rspv();
                }
              }
            }
          })
        }
      }
    }
  };

  // configure custom opts
  const globalCustomNav_items = [{
      title: 'Instructure Icon',
      icon_svg: 'icon-pin',
      href: 'https://instructure.design/#icons-font',
      target: '_blank',
      position: 1, // can be one of : integer (position after first), 'after' (help or last), 'before' (help or last)
    },
    {
      title: 'Hosted Icon',
      // example only, host your own, or use icon class
      icon_svg: 'https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/ui-icons/svg/Line/pin.svg',
      href: 'https://community.canvaslms.com/',
      target: '_blank',
      //position: 'before' // default
    },
    {
      title: 'Inline Icon',
      // example, instructure-ui pin.svg from above
      icon_svg: `<svg viewBox="0 0 1920 1920" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M1643.272 835.697c-22.024 22.023-57.826 22.023-79.85 0l-20.442-20.442c-.226-.226-.226-.452-.452-.678-.226-.113-.452-.113-.565-.339L1072.806 345.08c-.226-.225-.34-.564-.565-.79-.226-.226-.565-.339-.79-.452l-20.33-20.33c-22.024-22.023-22.024-57.938 0-79.962l83.915-83.802 592.15 592.038-83.914 83.915zm-506.768 305.167c-7.34-8.584-13.44-18.07-21.571-26.09L771.93 771.773c-8.018-8.132-17.506-13.892-26.09-21.12l286.42-286.419 390.437 390.438-286.193 286.193zm-101.42 453.007l-16.49 16.49-742.362-742.25 16.489-16.49c106.73-106.842 292.743-106.842 399.36 0l343.002 343.003c53.309 53.308 82.673 124.235 82.673 199.567 0 75.445-29.364 146.372-82.673 199.68zM1135.035.045L971.272 163.697c-59.295 59.294-62.344 150.776-15.022 216.847L658.876 677.918c-4.066 3.953-6.437 8.81-9.035 13.553-144.565-60.085-322.899-33.656-436.97 80.301l-96.338 96.34 411.106 411.105-511.06 511.059c-22.136 22.023-22.136 57.826 0 79.85 10.956 11.067 25.413 16.602 39.869 16.602s28.913-5.535 39.981-16.603l511.059-511.059 411.106 410.993 96.339-96.339c74.654-74.54 115.764-173.816 115.764-279.529 0-55.115-11.745-108.31-33.091-157.327 2.597-1.92 5.647-3.05 8.018-5.421l300.763-300.763c29.365 20.895 62.456 34.448 96.903 34.448 43.37 0 86.852-16.603 119.83-49.582l163.766-163.764L1135.036.045z" stroke="none" stroke-width="1" fill-rule="evenodd"/></svg>`,
      href: 'https://community.canvaslms.com/',
      target: '',
      position: 'after'
    },
    {
      title: 'Icon with Role Requirements - Faculty',
      // example icon with role requirement
      icon_svg: 'icon-educators',
      href: 'https://community.canvaslms.com/t5/Canvas-Instructor/ct-p/canvas_instructor',
      target: '_blank',
      position: 'after',
      roles: function () {
        var account_role = ['AccountAdmin', 'Staff Admin', 'Support Admin'].some(a => ENV.current_user_types.includes(a));
        var enrollment_type = ['teacher', 'admin', 'root_admin', 'consortium_admin'].some(a => ENV.current_user_roles.includes(a));
        return account_role || enrollment_type;
      }
    },
    {
      title: 'Icon with Role Requirements - Student',
      // example icon with role requirement
      icon_svg: 'icon-group',
      href: 'https://community.canvaslms.com/t5/Canvas-Student/ct-p/canvas_student',
      target: '_blank',
      position: 'after',
      roles: function () {
        return !['teacher', 'admin', 'root_admin', 'consortium_admin'].some(a => ENV.current_user_roles.includes(a));
      }
    },
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
    {
      title: 'Spinner',
      icon_svg: 'icon-record',
      href: '#',
      position: 'after',
      tray: {
        footer: 'Just keep...',
        cb: function (_item) {    
          // to keep the spinner spinning indefinitely, create an 
          // unresolved promise that never calls globalCustomNav.append_cb_content()
          return new Promise(() => {
            // intentionally left blank
            // because resolve() is never called, the spinner just keeps spinning
          });
        }
      }
    },
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
    }
  ];

  // configure moar
  // handle roles within throwbacks
  const globalCustomNav_tray_throwback = {
    accounts: {
      // add quick navigation links for the admin tray accounts
      target: 'a[href^="/accounts/"]',
      actions: {
        // class to stop the observer when the tray is updated
        complete: 'gcn-admin-tray-quick-nav',
        // add some quick navigation links to each account
        add: function(accounts) {
          let dir = document.querySelector('html').getAttribute('dir') ?? 'ltr';
          let float = dir === 'ltr' ? 'right' : 'left';
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
    courses: {
      // adds a heart icon to the All Courses link, it's at the top!
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
  };
  // consider c4e
  globalCustomNav_tray_throwback.subjects = globalCustomNav_tray_throwback.courses;

  const globalCustomNav_opts = {
    nav_items: globalCustomNav_items,
    throwbacks: globalCustomNav_tray_throwback
  };
  // load custom nav options
  globalCustomNav.load(globalCustomNav_opts);

})();