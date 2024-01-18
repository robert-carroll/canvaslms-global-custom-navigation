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
      // for trays
      'div.gcn_tray-content': 'display: block !important;',
      'div.gcn_tray-open': 'display: block !important;',
      'svg.gcn_tray-closed': 'display: none !important;',
      'svg.gcn_tray-aodown': 'fill: currentcolor; display: inline-block; overflow: visible; color: inherit; vertical-align: middle; line-height: 1; width: 1em; height: 1em;',
      ".gcn_tray-wrapper": "transform: translateZ(0px); transition: 0.5s; opacity: 1; background-color: #FFFFFF; max-height: 100vh; max-width: 100vw; overflow: hidden auto; position: fixed; box-shadow: 0 0.375rem 0.4375rem rgba(0, 0, 0, 0.1), 0 0.625rem 1.75rem rgba(0, 0, 0, 0.25); top: 0; bottom: 0; width: 28em;",
      "[dir='ltr'] .gcn_tray-wrapper": "left: -28em; right: auto;",
      "[dir='rtl'] .gcn_tray-wrapper": "right: -28em; left: auto;",
      "[dir='ltr'] .gcn_tray-wrapper.gcn_open": "left: 0; right: auto;",
      "[dir='rtl'] .gcn_tray-wrapper.gcn_open": "right: 0; left: auto;",
      ".gcn_tray-close-btn-wrapper": "position: absolute; top: 0.5rem;",
      "[dir='ltr'] .gcn_tray-close-btn-wrapper": "left: auto; right: 0.5rem",
      "[dir='rtl'] .gcn_tray-close-btn-wrapper": "right: auto; left: 0.5rem",
      ".gcn_tray-close-btn": "box-sizing: border-box; background: none; color: #2D3B45; margin: 0px; padding: 0px; border-radius: 0.25rem; outline: none; border: none; width: auto; cursor: pointer;",
      ".gcn_tray-close-btn:hover": "background-color: rgba(45, 59, 69, 0.1);",
      ".gcn_tray-close-btn::before": "position: absolute; pointer-events: none; opacity: 0; content: ''; transform: scale(0.95); transition: all 0.2s ease 0s; top: -0.3125rem; right: -0.3125rem; bottom: -0.3125rem; left: -0.3125rem; border-style: solid; border-color: var(--ic-brand-primary); border-width: 0.125rem; border-radius: 0.5rem; transform: scale(1);",
      ".gcn_tray-close-btn:focus::before": "opacity: 1;",
      ".gcn_tray-content-wrapper": "box-sizing: border-box; max-width: 100%; overflow: visible; padding: 1.5rem;",
      ".gcn_tray-heading": "line-height: 1.125; margin: 0px; font-size: 1.375rem; font-weight: 700; color: inherit; box-sizing: border-box; max-width: 100%; overflow: visible;",
      ".gcn_tray-list-group-heading": "line-height: 1.125; margin: 0px; font-size: 1rem; font-weight: 700; color: inherit; box-sizing: border-box; max-width: 100%; overflow: visible;",
      ".gcn_tray-view--block-list": "margin: 0.75rem 0; list-style-type: none;",
      ".gcn_tray-list-group-heading + .gcn_tray-view--block-list": "margin: 0.75rem;",
      ".gcn_tray-view-listItem": "margin-top: 0.75rem; margin-bottom: 0.75rem; padding: 0px; max-width: 100%;",
      ".gcn_tray-view-listItem:first-of-type": "margin-top: 0;",
      ".gcn_tray-view-link:focus": "outline-color: var(--ic-link-color);",
      ".gcn_tray-view-link": "outline-color: transparent; outline-offset: 0.25rem; outline-style: solid; outline-width: 0.125rem; transition: outline-color 0.2s ease 0s; vertical-align: baseline; max-width: 100%; overflow: visible;",
      ".gcn_tray-link-desc-text": "font-size: 0.875rem;",
      // for custom tray callbacks
      ".gcn_tray-view-spinner": "max-width: 100%; overscroll-behavior: auto; display: inline-block; vertical-align: middle; position: relative; box-sizing: border-box; overflow: hidden; width: 3em; height: 3em;",
      ".gcn_tray-spinner__circle": "display: block; position: absolute; top: 0px; left: 0px; animation-name: gcn-spinner-rotate; animation-duration: 2.25s; animation-iteration-count: infinite; animation-timing-function: linear; width: 3em; height: 3em;",
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
        trayActiveClass: `ic-app-header__menu-list-item--active`
      },
      rspv: {
        tray_portal: `span[dir="${(document.querySelector('html').getAttribute('dir') ?? 'ltr')}"] div[role="dialog"] ul`,
        tray_container: 'div[class$="-tray__content"]',
        INSTUI_aodown: `<svg name="IconArrowOpenDown" viewBox="0 0 1920 1920" rotate="0" style="width: 1em; height: 1em;" 
        width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" class="gcn_tray-aodown">
        <g role="presentation"><path d="M568.129648 0.0124561278L392 176.142104 1175.86412 960.130789 392 1743.87035 568.129648 1920 1528.24798 960.130789z" 
        fill-rule="evenodd" stroke="none" stroke-width="1" transform="matrix(0 1 1 0 .067 -.067)"></path></g></svg>`
      },
      targets: ['_self', '_blank', '_parent', '_top']
    },
    load: (opts) => {
      if (!document.querySelector(globalCustomNav.cfg.glbl.nav_selector) && !document.querySelector(globalCustomNav.cfg.rspv.tray_portal)) return;

      if (document.querySelector(globalCustomNav.cfg.glbl.nav_selector) !== 'undefined') {

        globalCustomNav.dir = document.querySelector('html').getAttribute('dir') ?? 'ltr';
        globalCustomNav.opts = [];
        globalCustomNav.nav_items = Array.isArray(opts.nav_items) ? opts.nav_items : opts;
        if (typeof opts.throwbacks === 'object') {
          globalCustomNav.throwbacks = opts.throwbacks || {};
        }

        // preserve the nav item to restore active class when a tray is closed
        // handle primary routes, external tools, and custom contexts
        var active_context = document.querySelector(`${globalCustomNav.cfg.glbl.nav_selector} li.${globalCustomNav.cfg.glbl.trayActiveClass} a`);
        globalCustomNav.cfg.context_item = active_context.id || active_context.closest('li').id;
        globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, false);
      }
      globalCustomNav.watch_glbl_tray();
      globalCustomNav.watch_burger_tray();
    },
    watch_burger_tray: (_mtx, observer) => {
      const portal = document.querySelector(globalCustomNav.cfg.rspv.tray_portal);
      const tray_action_complete = document.querySelector('div.rspv-global-custom-nav');

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
      if (portal != null && (document.querySelector('.mobile-header-hamburger').offsetParent != null) && !tray_action_complete) {
        observer.disconnect();
        globalCustomNav.prepare_nav_items(globalCustomNav.nav_items, true);
        document.querySelector(globalCustomNav.cfg.rspv.tray_container).classList.add('rspv-global-custom-nav');
        globalCustomNav.exit_burger_tray();
      }
    },
    exit_burger_tray: (_mtx, observer) => {
      const tray_portal_open = document.querySelector(globalCustomNav.cfg.rspv.tray_portal);

      if (tray_portal_open) {

        globalCustomNav.rspv_tray_throwback();

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

        globalCustomNav.glbl_tray_throwback();

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

          // append high contrast icon
          
          globalCustomNav.append_item(item, hamb);
          if (item.tray) {
            globalCustomNav.tray(item, hamb);
          }
        }
      });
    },
    create_nav_icon: (item, hamb = true) => {
      item.tidle = item.title.replace(/\s+/g, '');
      item.slug = `global_nav_${item.tidle}_link`;

      // clone and create the icon, consider c4e
      let icon_to_copy = (ENV.K5_USER == true && hamb == true) ? 'Home' : 'Dashboard';
      if (item.tray) {
        icon_to_copy = 'Courses';
      }
      const nav_icon = hamb ? `${globalCustomNav.cfg.rspv.tray_portal} svg[name="Icon${icon_to_copy}"]` : `#global_nav_${icon_to_copy.toLowerCase()}_link`;
      const nav_icon_li = document.querySelector(nav_icon).closest('li');

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

      try {
        // global or hamb
        var icon_text = icon.querySelector('.menu-item__text') || icon.querySelector('span[letter-spacing="normal"]');
        icon_text.textContent = item.title;
      } catch (e) {
        console.log(e);
      }

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
      // nav item placement
      if (item.position !== 'undefined' && typeof item.position === 'number') {
        // positioned
        const position = (hamb == true ? globalCustomNav.cfg.rspv.tray_portal : globalCustomNav.cfg.glbl.nav_selector) + ` > li:nth-of-type(${item.position})`;
        document.querySelector(position).after(item.icon);
      } else if (item.position !== 'undefined' && item.position == 'after') {
        target_li.after(item.icon);
      } else {
        target_li.before(item.icon);
      }

      const regex = new RegExp(`^${item.href}`);
      if (!hamb && regex.test(window.location.pathname)) {
        globalCustomNav.cfg.context_item = item.slug;
        globalCustomNav.glbl_ensure_active_class(globalCustomNav.cfg.context_item);
      }
    },
    tray: (item, hamb) => {
      // bind tray to nav item
      document.querySelector('#' + (hamb ? 'rspv-' : '') + item.slug).addEventListener('click', function (e) {
        if (hamb) {
          globalCustomNav.rspv_tray_toggle(this);
        } else {
          // prevent default link click on global nav tray item anchor
          e.preventDefault();
          globalCustomNav.glbl_tray_toggle(this, e);
        }
      }.bind(item));
    },
    link: item => {
      var a = document.createElement('a');
      a.textContent = item.title;
      a.href = item.href;
      a.setAttribute('dir', globalCustomNav.dir);
      a.classList.add('gcn_tray-view-link');
      if (typeof item.target !== 'undefined' && globalCustomNav.cfg.targets.includes(item.target)) {
        a.target = item.target;
      }
      return a.outerHTML;
    },
    tray_links: items => {
      var html = `<ul class="gcn_tray-view--block-list" dir="${globalCustomNav.dir}">`;
      items.forEach(item => {
        html += `<li class="gcn_tray-view-listItem" dir="${globalCustomNav.dir}">`;
        html += globalCustomNav.link(item);

        // append link description if set
        html += (!!item.desc && item.desc.length > 1) ? `<div wrap="normal" letter-spacing="normal" class="gcn_tray-link-desc-text">${item.desc}</div>` : '';
        html += '</li>';
      })
      html += `</ul>`;
      return html;
    },
    rspv_tray_toggle: item => {
      const tray_content = document.querySelector(`#rspv-${item.slug}-tray`);

      tray_content.classList.toggle('gcn_tray-content');
      globalCustomNav.rspv_tray_content(item);

      document.querySelectorAll(`#rspv-${item.slug} svg[name^="IconArrowOpen"]`).forEach(e => {
        e.classList.toggle('gcn_tray-closed');
      });
    },
    rspv_tray_content: item => {
      const tray_content = document.querySelector(`#rspv-${item.slug}-tray`),
        tray_icon_id = `#rspv-${item.slug}`;

      if (!document.querySelector(`${tray_icon_id} svg[name="IconArrowOpenDown"]`)) {
        let arrow_end = document.querySelector(`${tray_icon_id} svg[name="IconArrowOpenEnd"]`);
        arrow_end.parentElement.insertAdjacentHTML('afterbegin', globalCustomNav.cfg.rspv.INSTUI_aodown);
        let arrow_down = document.querySelector(`${tray_icon_id} svg[name="IconArrowOpenDown"]`);
        let arrow_class = arrow_end.classList;
        arrow_class.forEach(c => {
          arrow_down.classList.add(c);
        });
        document.querySelector(`${tray_icon_id} svg[name="IconArrowOpenDown"]`).classList.toggle('gcn_tray-closed');
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
    glbl_tray_toggle: (item, click) => {
      // bind/click on each menu item, if current is custom open
      // if clicked menu item is not custom, close custom trays
      // ensures the continuity of clicking and closing trays remains endless
      Array.from(document.querySelectorAll(`${globalCustomNav.cfg.glbl.nav_selector} li`)).forEach(nav => {
        nav.addEventListener('click', function (ne) {
          const regex = new RegExp(item.tidle);
          if (!regex.test(ne.target.closest('a').id)) {
            if (document.getElementById(`${item.slug}-tray`)) {
              document.getElementById(`${item.slug}-tray`).remove();
            }
          }
        })
      });

      // toggled and tray content is not loaded
      if (!document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} > #${item.slug}-tray`)) {
        globalCustomNav.glbl_tray_content(item);
        click.target.closest('li').classList.add(globalCustomNav.cfg.glbl.trayActiveClass);
        globalCustomNav.glbl_tray_close(item);
      }
    },
    glbl_tray_close: item => {
      function close_transition() {
        const tray_wrapper = document.querySelector('.gcn_tray-wrapper');
        tray_wrapper.addEventListener('transitionend', () => {
          // remove tray after transition if it still exists
          document.getElementById(`${item.slug}-tray`)?.remove();

          // remove active class on global nav icon on close
          document
            .getElementById(item.slug)
            .closest('li')
            .classList.remove(globalCustomNav.cfg.glbl.trayActiveClass);
        });
        // slide out tray on close
        tray_wrapper.classList.remove('gcn_open');
      }

      // close tray when user clicks outside the tray
      document.querySelector(`#${item.slug}-tray-close`).addEventListener('click', function () {
        close_transition();
      }.bind(item));

      // close tray when focus leaves the tray
      window.addEventListener('click', function (e) {
        if (document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} > #${item.slug}-tray`) !== null) {
          if (!document.getElementById(`${item.slug}-tray`)?.contains(e.target) && (document.getElementById('main').contains(e.target) || !document.getElementById(`${item.slug}-item`).contains(e.target))) {
            close_transition();
          }
        }
      });

      // close tray with escape key when the tray is open
      document.addEventListener('keydown', function (event) {
        const key = event.key;
        if (key === 'Escape') {
          close_transition();
        }
      });
    },
    glbl_tray_content: item => {
      const tray_content_id = `${item.slug}-tray`;

      var tray_html = `<span id="${tray_content_id}" dir="${globalCustomNav.dir}">
      <span class="gcn_tray-wrapper">
      <div role="dialog" aria-label="${item.title} tray">
      <div style="min-height: 100vh;">
      <div class="${globalCustomNav.cfg.glbl.tray_container} ${item.tidle}-tray">`;

      // close button
      tray_html += `<span class="gcn_tray-close-btn-wrapper">
      <button id="${tray_content_id}-close" cursor="pointer" type="button" tabindex="0" class="gcn_tray-close-btn" dir="${globalCustomNav.dir}">
          <i class="icon-solid icon-x" style="padding:0.5rem;"></i><span class="screenreader-only">Close</span>
      </button></span>`;

      // tray content
      tray_html += `<div class="${globalCustomNav.cfg.glbl.space}">
            <div class="gcn_tray-content-wrapper">
              <h2 class="gcn_tray-heading" dir="${globalCustomNav.dir}">${item.title}</h2>
              <hr role="presentation" class="gcn-cb_content">`;

      // handle links vs callback
      tray_html += globalCustomNav.tray_links_vs_cb(item, false);

      if (item.tray.footer && item.tray.footer.length > 1) {
        tray_html += `<ul class="gcn_tray-view--block-list" dir="${globalCustomNav.dir}">
        <li class="gcn_tray-view-listItem" dir="${globalCustomNav.dir}"><hr role="presentation"></li>
        <li class="gcn_tray-view-listItem" dir="${globalCustomNav.dir}">`;
        tray_html += globalCustomNav.link(item);
        tray_html += `</li></ul><br><div wrap="normal" letter-spacing="normal" class="gcn_tray-link-desc-text">${item.tray.footer}</div>`;
      }
      tray_html += `</div></div></div></div></div></span></span>`;

      // append tray
      document.getElementById('nav-tray-portal').insertAdjacentHTML('afterbegin', tray_html);

      // focus on close button
      document.querySelector('.gcn_tray-close-btn')?.focus();

      // slide in tray on open
      document.querySelector('.gcn_tray-wrapper').classList.add('gcn_open');

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
              tray_html += `<h3 class="gcn_tray-list-group-heading">${group}</h3>`;
              tray_html += globalCustomNav.tray_links(item.tray.items[group]);
            })
          }
        }
        // prep for callback
      } else if (typeof item.tray.cb !== 'undefined' && typeof item.tray.cb === 'function') {
        tray_html += `<ul class="gcn_tray-view--block-list gcn-loading-tray-cb" dir="${globalCustomNav.dir}">
        <li class="gcn_tray-view-listItem" dir="${globalCustomNav.dir}">
          <div dir="${globalCustomNav.dir}" class="gcn_tray-view-spinner gcn-loading-tray-cb-svg gcn_tray-link-desc-text"></div>
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
        let tray_action_complete = document.querySelectorAll(`${globalCustomNav.cfg.glbl.tray_portal} a.${globalCustomNav.throwbacks[ui_tray].complete}`);
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
                let tray_action_complete = document.querySelectorAll(`div[id^="Expandable"] a.${globalCustomNav.throwbacks[tray_by_target].complete}`);
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
      target: 'a[href="/accounts"]',
      complete: 'gcn-admin-tray-sub-account-links',
      actions: {
        glbl: function () {
          let tray_last_li = document.querySelector(`#nav-tray-portal ul li:last-child`);
          // create a new element
          let subacctray_li = document.createElement('li');
          subacctray_li.id = 'adm-tray-subacctray';
          // dynamically grab the class set from the closest LI
          // for continuity and maybe future proof some Canvas updates
          subacctray_li.className = tray_last_li.getAttribute('class');

          // sideways import for myself
          let subacctray_html = localStorage.getItem(location.host + '_subacc_tray') || '<ul id="admin-tray-sam"><li>placeholder</li></ul>';

          // append html to tray
          tray_last_li.parentNode
            .insertBefore(subacctray_li, tray_last_li.nextSibling)
            .insertAdjacentHTML('beforeend', subacctray_html);

          document.querySelector(`#nav-tray-portal a[href="/accounts"]`).classList.add('gcn-admin-tray-sub-account-links');
        },
        rspv: function () {
          let account_items = document.querySelector(`div[id^="Expandable"] a[href="/accounts"]`).closest('ul').children;
          let tray_last_li = account_items[account_items.length - 1];
          let subacctray_li = document.createElement('li');
          subacctray_li.id = 'rspv-adm-tray-subacctray';
          // dynamically grab the class set from the closest LI
          // for continuity and maybe future proof some Canvas updates
          subacctray_li.className = tray_last_li.getAttribute('class');

          // sideways import for myself
          let subacctray_html = localStorage.getItem(location.host + '_subacc_tray') || '<ul id="rspv-admin-tray-sam"><li>placeholder</li></ul>';

          // append html to tray
          tray_last_li.parentNode
            .insertBefore(subacctray_li, tray_last_li.nextSibling)
            .insertAdjacentHTML('beforeend', subacctray_html);

          document.querySelector(`div[id^="Expandable"] a[href="/accounts"]`).classList.add('gcn-admin-tray-sub-account-links');
        }
      }
    },
    courses: {
      target: 'a[href="/courses"]',
      complete: 'gcn-move-all-courses',
      actions: {
        glbl: function () {
          let all_courses = document.querySelector(`#nav-tray-portal a[href="/courses"]`);
          // that was deprecated so fast
          all_courses.insertAdjacentHTML('afterend', ` <i class="icon-line icon-heart"></i>`);
          all_courses.classList.add('gcn-move-all-courses');
        },
        rspv: function () {
          // nudge lifting this too
          let all_courses = document.querySelector(`div[id^="Expandable"] a[href="/courses"]`);
          all_courses.innerHTML = all_courses.innerText + ` <i class="icon-line icon-quiz"></i>`;

          // move all courses to top of rspv tray
          let course_items = all_courses.closest('ul').children;
          course_items[0].before(course_items[course_items.length - 1]);

          all_courses.classList.add('gcn-move-all-courses');
        }
      }
    }
  };
  // consider c4e
  globalCustomNav_tray_throwback.subjects = globalCustomNav_tray_throwback.courses;

  const globalCustomNav_opts = {
    nav_items: globalCustomNav_items,
    throwbacks: globalCustomNav_tray_throwback,
    another: 1
  };
  // load custom nav options
  globalCustomNav.load(globalCustomNav_opts);

})();