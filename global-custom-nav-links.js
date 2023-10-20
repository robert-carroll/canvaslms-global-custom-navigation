/**
// @name        CanvasLMS - Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description icons only
//
**/
(function () {
  'use strict';

  // handle css, for now
  (function () {
    if (document.querySelectorAll('[data-global-nav-custom-css="set"]').length == 0) {
      let styles = {
        'i.gnct_inst_menu_icon:before': 'font-size: 32px; width: 32px; line-height: 32px;',
        'i.gnct_inst_menu_icon': 'width: 32px; height: 32px; font-style: bold;',
        '.gnct_icon_svg': 'width: 32px !important; height: 32px !important; font-style: bold;',
      };
      if (typeof styles !== 'undefined' && Object.keys(styles).length > 0) {
        let style = document.createElement('style');
        style.setAttribute('data-global-nav-custom-css', 'set');
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
  };

  globalCustomNav.create_nav_icon = (item, hamb = true) => {
    item.tidle = item.title.replace(/\W/g, '_').toLowerCase();
    item.slug = `global_nav_${item.tidle}_link`;

    // clone and create the icon
   
    const icon_to_copy = 'Dashboard';
    const nav_icon = hamb ? `${globalCustomNav.cfg.rspv.nav_selector} svg[name="Icon${icon_to_copy}"]` : `#global_nav_${icon_to_copy.toLowerCase()}_link`;
    const nav_icon_li = document.querySelector(nav_icon).closest('li');

    // replace contents
    var icon = nav_icon_li.cloneNode(true);
    icon.setAttribute('id', (hamb ? 'rspv-' : '') + `${item.slug}-item`);
    icon.querySelector('svg').parentElement.classList.add((hamb ? 'rspv-' : '') + `svg-${item.tidle}-holder`);

    const icon_id = (hamb ? 'rspv-' : '') + item.slug;
    icon.querySelector('a').setAttribute('id', icon_id);
    icon.querySelector('a').href = item.href;
    if (item.target !== 'undefined' && item.target.includes('_blank', '_self', '_parent')) {
      icon.querySelector('a').setAttribute('target', item.target);
    }

    try {
      // inst-ui 7 or 8 or global or hamb
      var icon_text_el = icon.querySelector('span[letter-spacing="normal"]') || (icon.querySelector('.menu-item__text') || icon.querySelector('span[class$="text"]'));
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
      svg_class = ['ic-icon-svg', 'menu-item__icon', 'ic-icon-svg--apps', 'ic-icon-svg-custom-tray', 'gnct_icon_svg'];
    }
    // remove cloned svg
    icon.querySelector('svg').remove();

    // import svg
    if (/^icon-[a-z]/.test(item.icon_svg) == true) {
      // instructure icon
      let instuicon = `<div id="${(hamb ? 'rspv-' : '') + `${item.slug}-svg`}" role="presentation">`;
      instuicon += `<i class="icon-line ${item.icon_svg}${hamb ? ' dUOHu_cVUo' : ''} gnct_inst_menu_icon"></i></div>`;
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
      glbl: {
        nav_selector: '#menu',
        menuItemClass: `ic-app-header__menu-list-item`,
        trayActiveClass: `ic-app-header__menu-list-item--active`
      },
      rspv: {
        nav_selector: `span[dir="${lang_dir}"] div[role="dialog"] ul`
      },
      nav_items: [],
      lang_dir: lang_dir
    }
    if (!document.querySelector(globalCustomNav.cfg.glbl.nav_selector) && !document.querySelector(globalCustomNav.cfg.rspv.nav_selector)) return;

    if (document.querySelector(globalCustomNav.cfg.glbl.nav_selector) !== 'undefined') {
      globalCustomNav.nav_items = opts;
      globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, false);
    }
    globalCustomNav.watch_burger_tray();
  };


  // configure opts
  const globalCustomNav_items = [{
      title: 'Instructure Icon',
      icon_svg: 'icon-pin',
      href: 'https://community.canvaslms.com/',
      target: '_blank',
      position: 1, // can be one of : integer (position after first), 'after' (help or last), 'before' (help or last)
      roles: function () {
        return ['teacher'].some(a => ENV.current_user_roles.includes(a));
      }
    },
    {
      title: 'External Icon',
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
      href: 'https://community.canvaslms.com/',
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
      href: 'https://community.canvaslms.com/',
      target: '_blank',
      position: 'after',
      roles: function () {
        return !['teacher', 'admin', 'root_admin', 'consortium_admin'].some(a => ENV.current_user_roles.includes(a));
      }
    },
  ];

  // add items to menu
  globalCustomNav.load(globalCustomNav_items);

})();
