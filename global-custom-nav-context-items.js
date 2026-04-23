/**
// @name        CanvasLMS - Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description items only, context capable
//
**/

(function () {
  // handle css, if you aren't adding .css to themes
  if (document.querySelectorAll('[data-global-custom-nav-css="set"]').length == 0) {
    let styles = {
      // for item icons
      'i.gcn_inst_menu_icon:before': 'font-size: 1.625rem;',
      'i.gcn_inst_rspv_icon': 'color: var(--ic-brand-primary);',
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

        // preserve the nav item to restore active class when a tray is closed
        // handle primary routes, external tools, and custom contexts
        var active_context = document.querySelector(`${globalCustomNav.cfg.glbl.nav_selector} li.${globalCustomNav.cfg.glbl.trayActiveClass} a`);
        if(active_context) {
          globalCustomNav.cfg.context_item = active_context.id || active_context.closest('li').id;
        }
        // update the glbl menu with custom nav items
        globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, false);
      }
      globalCustomNav.detect_glbl_portal();
      globalCustomNav.detect_rspv_portal();
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
    watch_rspv_portal: () => {
      // check for tray portal, handle throwbacks
      const tray_portal_open = document.querySelector(globalCustomNav.cfg.rspv.tray_portal);
      
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
      const nav_icon = hamb ? `${globalCustomNav.cfg.rspv.tray_portal} svg[name="Icon${icon_to_copy}"]` : `#global_nav_${icon_to_copy.toLowerCase()}_link`;
      const nav_icon_li = document.querySelector(nav_icon).closest('li');

      // replace contents
      const icon = nav_icon_li.cloneNode(true);
      icon.setAttribute('id', (hamb ? 'rspv-' : '') + `${item.slug}-item`);
      icon.querySelector('svg').parentElement.classList.add((hamb ? 'rspv-' : '') + `svg-${item.tidle}-holder`);

      const icon_id = (hamb ? 'rspv-' : '') + item.slug;
      icon.querySelector('a').setAttribute('id', icon_id);
      icon.querySelector('a').href = item.href;
      if (typeof item.target !== 'undefined' && globalCustomNav.cfg.targets.includes(item.target)) {
        icon.querySelector('a').setAttribute('target', item.target);
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
      title: 'Custom Context',
      // custom context handles active class in global nav
      icon_svg: 'icon-expand-start',
      href: '/courses/'+ENV.COURSE_ID,
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
    }
  ];

  // load custom nav options
  globalCustomNav.load(globalCustomNav_items);

})();