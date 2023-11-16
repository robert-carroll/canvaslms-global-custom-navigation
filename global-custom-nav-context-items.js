/**
// @name        CanvasLMS - Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description items only, context capable
//
**/

(function () {
  // handle css, if you aren't loading .css to themes
  if (document.querySelectorAll('[data-global-custom-nav-css="set"]').length == 0) {
    let styles = {
      // for item icons
      'i.gcn_inst_menu_icon:before': 'font-size: 32px; width: 32px; line-height: 32px;',
      'i.gcn_inst_menu_icon': 'width: 32px; height: 32px; font-style: bold;',
      'i.gcn_inst_rspv_icon': "color: var(--ic-brand-primary);",
      '.gcn_icon_svg': 'width: 32px !important; height: 32px !important; font-style: bold;'
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
        trayActiveClass: `ic-app-header__menu-list-item--active`
      },
      rspv: {
        tray_portal: `span[dir="${(document.querySelector('html').getAttribute('dir') ?? 'ltr')}"] div[role="dialog"] ul`,
        tray_container: 'div[class$="-tray__content"]'
      }
    },
    load: (opts) => {
      if (!document.querySelector(globalCustomNav.cfg.glbl.nav_selector) && !document.querySelector(globalCustomNav.cfg.rspv.tray_portal)) return;

      globalCustomNav.dir = document.querySelector('html').getAttribute('dir') ?? 'ltr';

      if (document.querySelector(globalCustomNav.cfg.glbl.nav_selector) !== 'undefined') {
        // preserve the nav item to restore active class when a tray is closed
        // handle primary routes, external tools, and custom contexts
        var active_context = document.querySelector(`${globalCustomNav.cfg.glbl.nav_selector} li.ic-app-header__menu-list-item--active a`);
        globalCustomNav.cfg.context_item = active_context.id || active_context.closest('li').id;

        // prepare after context preserved
        globalCustomNav.nav_items = Array.isArray(opts.nav_items) ? opts.nav_items : opts;
        globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, false);

        globalCustomNav.watch_glbl_tray();
      }
      globalCustomNav.watch_burger_tray();
    },
    watch_burger_tray: (_mtx, observer) => {
      const portal = document.querySelector(globalCustomNav.cfg.rspv.tray_portal);
      if (!portal) {
        if (typeof observer === 'undefined') {
          const obs = new MutationObserver(globalCustomNav.watch_burger_tray);
          obs.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
        return;
      }
      
      if (portal && (document.querySelector('.mobile-header-hamburger').offsetParent != null)) {
        observer.disconnect();
        globalCustomNav.exit_burger_tray();
      }
    },
    exit_burger_tray: (_mtx, observer) => {
      const tray_portal_open = document.querySelector(globalCustomNav.cfg.rspv.tray_container);
      const tray_action_complete = document.querySelector('div.rspv-global-custom-nav');

      if (tray_portal_open && !tray_action_complete) {
 
        globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, true);
        // TODO stops sub account duplicates, prevents previous placements
        tray_portal_open.classList.add('rspv-global-custom-nav');

        if (typeof observer === 'undefined') {
          const obs = new MutationObserver(globalCustomNav.exit_burger_tray);
          obs.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
        return;
      }
      if (!tray_portal_open) {
        observer.disconnect();
        globalCustomNav.watch_burger_tray();
      }
    },
    watch_glbl_tray: (_mtx, observer) => {
      const portal = document.querySelector(globalCustomNav.cfg.glbl.tray_portal);
      if (!portal) {
        if (typeof observer === 'undefined') {
          const obs = new MutationObserver(globalCustomNav.watch_glbl_tray);
          obs.observe(document.body, {
            childList: true,
          });
        }
        return;
      }
      if (typeof observer !== 'undefined') {
        observer.disconnect();
      }

      globalCustomNav.glbl_ensure_active_class(globalCustomNav.cfg.context_item);
      // 

      const watch = new MutationObserver(globalCustomNav.exit_glbl_tray);
      watch.observe(portal, {
        childList: true,
        subtree: true
      });
    },
    exit_glbl_tray: (_mtx, observer) => {
      const tray_portal_open = document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} div.${globalCustomNav.cfg.glbl.tray_container}`);

      if (tray_portal_open) {
        let ui_tray = [...tray_portal_open.classList].filter(c => c.endsWith('-tray'))[0].replace('-tray', '');
        globalCustomNav.glbl_ensure_active_class(`global_nav_${ui_tray}_link`);

        if (typeof observer === 'undefined') {
          const obs = new MutationObserver(globalCustomNav.exit_glbl_tray);
          obs.observe(document.body, {
            childList: true
          });
        }
        return;
      }
      if (!tray_portal_open) {
        observer.disconnect();
        globalCustomNav.watch_glbl_tray();
      }
    },
    glbl_ensure_active_class: context_item => {
      // ensure active class is restored to appropriate icon based on context
      Array.from(document.querySelectorAll(`${globalCustomNav.cfg.glbl.nav_selector} .${globalCustomNav.cfg.glbl.trayActiveClass}`)).forEach(e => {
        e.classList.toggle(globalCustomNav.cfg.glbl.trayActiveClass);
      });
      document.getElementById(context_item).closest('li').classList.add(globalCustomNav.cfg.glbl.trayActiveClass);
    },
    prepare_nav_items: (items, hamb = true) => {
      items.forEach(item => {
        // if roles for the current item are not set, the user can see it, otherwise
        const user_gets_item = (typeof item.roles === 'undefined') || item.roles();
        if (user_gets_item) {
          globalCustomNav.create_nav_icon(item, hamb);
        }
      });
    },
    append_item: (item, icon, hamb = true) => {
      const target_ul = hamb ? globalCustomNav.cfg.rspv.tray_portal : globalCustomNav.cfg.glbl.nav_selector;
      const target_li = document.querySelector(`${target_ul} li:last-child`);
      // nav item placement
      if (item.position !== 'undefined' && typeof item.position === 'number') {
        // positioned
        const position = (hamb == true ? globalCustomNav.cfg.rspv.tray_portal : globalCustomNav.cfg.glbl.nav_selector) + ` > li:nth-of-type(${item.position})`;
        document.querySelector(position).after(icon);
      } else if (item.position !== 'undefined' && item.position == 'after') {
        target_li.after(icon);
      } else {
        target_li.before(icon);
      }

      const regex = new RegExp(`^${item.href}`);
      if (!hamb && regex.test(window.location.pathname)) {
        globalCustomNav.cfg.context_item = item.slug;
        globalCustomNav.glbl_ensure_active_class(globalCustomNav.cfg.context_item);
      }
    },
    create_nav_icon: (item, hamb = true) => {
      item.tidle = item.title.replace(/\s+/g, '');
      item.slug = `global_nav_${item.tidle}_link`;

      // clone and create the icon, consider c4e
      const icon_to_copy = (ENV.K5_USER == true && hamb == true) ? 'Home' : 'Dashboard';
      const nav_icon = hamb ? `${globalCustomNav.cfg.rspv.tray_portal} svg[name="Icon${icon_to_copy}"]` : `#global_nav_${icon_to_copy.toLowerCase()}_link`;
      const nav_icon_li = document.querySelector(nav_icon).closest('li');

      // replace contents
      const icon = nav_icon_li.cloneNode(true);
      icon.setAttribute('id', (hamb ? 'rspv-' : '') + `${item.slug}-item`);
      icon.querySelector('svg').parentElement.classList.add((hamb ? 'rspv-' : '') + `svg-${item.tidle}-holder`);

      const icon_id = (hamb ? 'rspv-' : '') + item.slug;
      icon.querySelector('a').setAttribute('id', icon_id);
      icon.querySelector('a').href = item.href;
      if (typeof item.target !== 'undefined' && ['_self', '_blank', '_parent', '_top'].includes(item.target)) {
        icon.querySelector('a').setAttribute('target', item.target);
      }

      try {
        // global or hamb
        var icon_text = icon.querySelector('.menu-item__text') || icon.querySelector('span[letter-spacing="normal"]');
        icon_text.textContent = item.title;
      } catch (e) {
        console.log(e);
      }

      // prepare for svg
      const svg_holder = icon.querySelector((hamb ? '.rspv-svg' : '.svg') + `-${item.tidle}-holder`);
      let svg_class;
      if (hamb == true) {
        svg_class = icon.querySelector('svg').classList;
      } else {
        icon.classList.remove(globalCustomNav.cfg.glbl.trayActiveClass);
        //var svg_class = icon.querySelector('svg').classList;
        svg_class = ['ic-icon-svg', 'menu-item__icon', 'ic-icon-svg--apps', 'ic-icon-svg-custom-tray', 'gcn_icon_svg'];
      }
      // remove cloned svg
      icon.querySelector('svg').remove();

      // import svg
      if (/^icon-[a-z]/.test(item.icon_svg) == true) {
        // instructure icon
        let instuicon = `<div id="${(hamb ? 'rspv-' : '') + `${item.slug}-svg`}" role="presentation">`;
        instuicon += `<i class="icon-line ${item.icon_svg}${hamb ? ' gcn_inst_rspv_icon' : ''} gcn_inst_menu_icon"></i></div>`;
        svg_holder.insertAdjacentHTML('afterbegin', instuicon);

      } else if (/^http/.test(item.icon_svg)) {
        // externally hosted svg, you must handle cors policies locally
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
            svg_class.forEach(c => {
              icon.querySelector('svg').classList.add(c);
            })
          })
          .catch(console.error.bind(console));

      } else if (/^<svg/.test(item.icon_svg)) {
        // inline/script svg
        svg_holder.insertAdjacentHTML('afterbegin', item.icon_svg);
        icon.querySelector('svg').setAttribute('id', `rspv-${item.slug}-svg`);
        svg_class.forEach(c => {
          icon.querySelector('svg').classList.add(c);
        })
      }

      globalCustomNav.append_item(item, icon, hamb);
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
    }
  ];

  // load custom nav options
  globalCustomNav.load(globalCustomNav_items);

})();