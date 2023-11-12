/**
// @name        CanvasLMS - Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description icons only, context capable
//
**/
(function () {
  'use strict';

  // handle css, for now
  (function () {
    if (document.querySelectorAll('[data-global-custom-nav-css="set"]').length == 0) {
      let styles = {
        'i.gcn_inst_menu_icon:before': 'font-size: 32px; width: 32px; line-height: 32px;',
        'i.gcn_inst_menu_icon': 'width: 32px; height: 32px; font-style: bold;',
        'i.gcn_inst_rspv_icon': "color: var(--ic-brand-primary);",
        '.gcn_icon_svg': 'width: 32px !important; height: 32px !important; font-style: bold;',
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

  const globalCustomNav = {};

  globalCustomNav.watch_burger_tray = (_mtx, observer) => {
    let rspv_nav = document.querySelector(globalCustomNav.cfg.rspv.nav_selector);
    if (!rspv_nav) {
      if (typeof observer === 'undefined') {
        var obs = new MutationObserver(globalCustomNav.watch_burger_tray);
        obs.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
      return;
    }

    if (rspv_nav != null && (document.querySelector('.mobile-header-hamburger').offsetParent != null)) {
      observer.disconnect();
      globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, true);
      globalCustomNav.exit_burger_tray();
    }
  };

  globalCustomNav.exit_burger_tray = (_mtx, observer) => {
    let rspv_nav = document.querySelector(globalCustomNav.cfg.rspv.nav_selector);

    if (rspv_nav != null) {
      if (typeof observer === 'undefined') {
        var obs = new MutationObserver(globalCustomNav.exit_burger_tray);
        obs.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
      return;
    }
    if (rspv_nav == null) {
      observer.disconnect();
      globalCustomNav.watch_burger_tray();
    }
  };

  globalCustomNav.watch_glbl_tray = (_mtx, observer) => {
    let portal = document.querySelector(globalCustomNav.cfg.glbl.tray_portal);
    if (!portal) {
      if (typeof observer === 'undefined') {
        var obs = new MutationObserver(globalCustomNav.watch_glbl_tray);
        obs.observe(document.body, {
          childList: true,
        });
      }
      return;
    }
    if (typeof observer !== 'undefined') {
      observer.disconnect();
    }
    let tray = new MutationObserver(globalCustomNav.exit_glbl_tray);
    tray.observe(portal, {
      childList: true,
      subtree: true
    });
  };

  globalCustomNav.exit_glbl_tray = (_mtx, observer) => {
    let tray_portal_open = document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} div.navigation-tray-container`); //document.querySelector(globalCustomNav.cfg.glbl.tray_portal).children.length ? true : false;
    let rspv_nav = document.querySelector(globalCustomNav.cfg.rspv.nav_selector.slice(0, -3));
    
    if (rspv_nav != null && tray_portal_open) {
    // ensure active class is restored to appropriate icon based on context
      let ui_tray = [...tray_portal_open.classList].filter(c => c.endsWith('-tray') )[0].toLowerCase().replace('-tray', '');
      globalCustomNav.glbl_active_class_clear();
      document.getElementById(`global_nav_${ui_tray}_link`).closest('li').classList.add(globalCustomNav.cfg.glbl.trayActiveClass);

      if (typeof observer === 'undefined') {
        var obs = new MutationObserver(globalCustomNav.exit_glbl_tray);
        obs.observe(document.body, {
          childList: true
        });
      }
      return;
    }
    if (rspv_nav == null && !tray_portal_open) {
      // ensure active class is restored to appropriate icon based on context
      globalCustomNav.glbl_active_class_clear();
      document.getElementById(globalCustomNav.cfg.context_item).closest('li').classList.add(globalCustomNav.cfg.glbl.trayActiveClass);
      observer.disconnect();
      globalCustomNav.watch_glbl_tray();
    }
  };

  globalCustomNav.prepare_nav_items = (items, hamb = true) => {
    items.forEach(item => {
      // if roles for the current item are not set, the user can see it, otherwise
      const user_gets_item = (typeof item.roles === 'undefined') || item.roles();
      if (user_gets_item) {
        globalCustomNav.create_nav_icon(item, hamb);
      }
    });
  };

  globalCustomNav.append_item = (item, icon, hamb = true) => {
    const target_ul = hamb ? globalCustomNav.cfg.rspv.nav_selector : globalCustomNav.cfg.glbl.nav_selector;
    const target_li = document.querySelector(`${target_ul} li:last-child`);
    // nav item placement
    if (item.position !== 'undefined' && typeof item.position === 'number') {
      // positioned
      var sel = (hamb == true ? globalCustomNav.cfg.rspv.nav_selector : globalCustomNav.cfg.glbl.nav_selector) + ` > li:nth-of-type(${item.position})`;
      document.querySelector(sel).after(icon);
    } else if (item.position !== 'undefined' && item.position == 'after') {
      target_li.after(icon);
    } else {
      target_li.before(icon);
    }

    const regex = new RegExp(`^${item.href}`);
    if (!hamb && regex.test(window.location.pathname)) {
      globalCustomNav.glbl_active_class_clear();
      // ensure active class is restored to appropriate icon based on context
      globalCustomNav.cfg.context_item = item.slug;
      document.getElementById(item.slug).closest('li').classList.add(globalCustomNav.cfg.glbl.trayActiveClass);
    }
  };

  globalCustomNav.create_nav_icon = (item, hamb = true) => {
    item.tidle = item.title.replace(/\W/g, '_').toLowerCase();
    item.slug = `global_nav_${item.tidle}_link`;

    // clone and create the icon, consider c4e
    const is_tray = item.tray || false;
    let icon_to_copy = (ENV.K5_USER == true && hamb == true) ? 'Home' : 'Dashboard';
    if(is_tray) {
      icon_to_copy = 'Courses';
    }
    const nav_icon = hamb ? `${globalCustomNav.cfg.rspv.nav_selector} svg[name="Icon${icon_to_copy}"]` : `#global_nav_${icon_to_copy.toLowerCase()}_link`;
    const nav_icon_li = document.querySelector(nav_icon).closest('li');

    // replace contents
    var icon = nav_icon_li.cloneNode(true);
    icon.setAttribute('id', (hamb ? 'rspv-' : '') + `${item.slug}-item`);
    icon.querySelector('svg').parentElement.classList.add((hamb ? 'rspv-' : '') + `svg-${item.tidle}-holder`);

    const icon_id = (hamb ? 'rspv-' : '') + item.slug;
    if (hamb && is_tray) {
      // button for resp tray
      icon.querySelector('button').setAttribute('id', icon_id);
      icon.querySelector('button').setAttribute('aria-controls', (hamb ? 'rspv-' : '') + `${item.slug}-tray`);
      icon.querySelector('div div').setAttribute('id', (hamb ? 'rspv-' : '') + `${item.slug}-tray`);
    } else {
      icon.querySelector('a').setAttribute('id', icon_id);
      icon.querySelector('a').href = item.href;
      if (item.target !== 'undefined' && item.target.includes('_blank', '_self', '_parent')) {
        icon.querySelector('a').setAttribute('target', item.target);
      }
    }

    try {
      // global or hamb
      var icon_text_el = icon.querySelector('.menu-item__text') || icon.querySelector('span[letter-spacing="normal"]');
      icon_text_el.textContent = item.title;
    } catch (e) {
      console.log(e);
    }

    // prepare for svg
    const svg_holder = icon.querySelector((hamb ? '.rspv-svg' : '.svg') + `-${item.tidle}-holder`);
    var svg_class;
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
  };

  globalCustomNav.load = (opts) => {
    const lang_dir = document.querySelector('html').getAttribute('dir') ?? 'ltr';
    globalCustomNav.cfg = {
      lang_dir: lang_dir,
      context_item: '',
      glbl: {
        nav_selector: '#menu',
        tray_portal: '#nav-tray-portal',
        menuItemClass: `ic-app-header__menu-list-item`,
        trayActiveClass: `ic-app-header__menu-list-item--active`
      },
      rspv: {
        nav_selector: `span[dir="${lang_dir}"] div[role="dialog"] ul`
      },
      nav_items: []
    }
    if (!document.querySelector(globalCustomNav.cfg.glbl.nav_selector) && !document.querySelector(globalCustomNav.cfg.rspv.nav_selector)) return;

    globalCustomNav.nav_items = Array.isArray(opts.nav_items) ? opts.nav_items : opts;
    globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, false);

    if (document.querySelector(globalCustomNav.cfg.glbl.nav_selector) !== 'undefined') {
      // preserve the nav item to restore active class when a tray is closed
      // handle primary routes, external tools, and custom contexts
      Array.from(document.querySelectorAll(`${globalCustomNav.cfg.glbl.nav_selector} li`)).forEach(nav => {
        if (nav.classList.contains(globalCustomNav.cfg.glbl.trayActiveClass) == true) {
          globalCustomNav.cfg.context_item = nav.querySelector('a').getAttribute('id') || nav.querySelector('a').closest('li').getAttribute('id');
        }
      });

      globalCustomNav.watch_glbl_tray();
    }
    globalCustomNav.watch_burger_tray();
  };

  globalCustomNav.glbl_active_class_clear = () => {
    Array.from(document.querySelectorAll(`${globalCustomNav.cfg.glbl.nav_selector} .${globalCustomNav.cfg.glbl.trayActiveClass}`)).forEach(e => {
      e.classList.toggle(globalCustomNav.cfg.glbl.trayActiveClass);
    });
  }

  // configure opts
  const globalCustomNav_items = [{
      title: 'Instructure Icon',
      icon_svg: 'icon-pin',
      href: 'https://community.canvaslms.com/',
      target: '_blank',
      position: 1, // can be one of : integer (position after first), 'after' (help or last), 'before' (help or last)
    },
    {
      title: 'Custom Context',
      // custom context handles active class in global nav
      icon_svg: 'icon-expand-start',
      href: '/courses/1234567',
      target: '',
      roles: function () {
        return ['teacher'].some(a => ENV.current_user_roles.includes(a));
      }
    },
  ];
  
  // load custom nav options
  globalCustomNav.load(globalCustomNav_items);

})();