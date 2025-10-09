/**
// @name        Admin Tray Sub Account Nav Throwback for Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description dev file with css, minified gcn
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
      // for callback trays and throwbacks
      ".gcn_tray-view-spinner": "max-width: 100%; overscroll-behavior: auto; display: inline-block; vertical-align: middle; position: relative; box-sizing: border-box; overflow: hidden; width: 3em; height: 3em;",
      ".gcn_tray-spinner__circle": "display: block; position: absolute; top: 0px; left: 0px; animation-name: gcn-spinner-rotate; animation-duration: 2.25s; animation-iteration-count: infinite; animation-timing-function: linear; width: 3em; height: 3em;",
      ".gcn_tray_throwback-spinner__circle": "display: block; animation-name: gcn-spinner-rotate; animation-duration: 2.25s; animation-iteration-count: infinite; animation-timing-function: linear; width: 3em; height: 3em;",
      ".gcn_tray-spinner__circleTrack": "stroke: rgb(245, 245, 245); fill: none; stroke-width: 0.375em;",
      ".gcn_tray-spinner__circleSpin": "fill: none; stroke-linecap: round; animation-name: gcn-spinner-morph; animation-duration: 1.75s; animation-iteration-count: infinite; animation-timing-function: ease; stroke-width: 0.375em; stroke-dasharray: 6em; transform-origin: calc(1.5em) calc(1.5em) 0px; stroke: rgb(3, 116, 181);",
      "@keyframes gcn-spinner-rotate": "to { transform: rotate(360deg) }",
      "@keyframes gcn-spinner-morph": "0% { stroke-dashoffset: 190%; } 50% { stroke-dashoffset: 50%; transform: rotate(90deg); } 100% { stroke-dashoffset: 190%; transform: rotate(360deg); }",
      // admin tray sub account navigation throwback
      "ul#gcn-admin-tray-san, ul#gcn-admin-tray-san ul" : "margin: 0; padding: 0; list-style: none;",
      "input#gcn-admin-tray-san-search" : "width: 95%;",
      "[dir='ltr'] ul#gcn-admin-tray-san ul" : "margin-left: 5px; border-left: 1px dotted #ccc; padding-left: 5px;",
      "[dir='rtl'] ul#gcn-admin-tray-san ul" : "margin-right: 5px; border-right: 1px dotted #ccc; padding-right: 5px;",
      "[dir='ltr'] ol#gcn-admin-tray-san-results" : "border-bottom: 2px solid #ccc; margin: 0; padding-left: 18px; margin-bottom: 4px;",
      "[dir='rtl'] ol#gcn-admin-tray-san-results" : "border-bottom: 2px solid #ccc; margin: 0; padding-right: 18px; margin-bottom: 4px;",
      "ul.gcn-san-list-open" : "display: block !important;",
      "[dir='ltr'] a.gcn-san-reload" : "float: right;",
      "[dir='rtl'] a.gcn-san-reload" : "float: left;",
      "[dir='ltr'] a.gcn-san-toggle" : "float: right;",
      "[dir='rtl'] a.gcn-san-toggle" : "float: left;"
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

  // requires the complete features of global-custom-nav.js
  // minified line for global custom nav [all features]
  const globalCustomNav={cfg:{context_item:"",glbl:{nav_selector:"#menu",tray_portal:"#nav-tray-portal",tray_container:"navigation-tray-container",space:"tray-with-space-for-global-nav",menuItemClass:"ic-app-header__menu-list-item",trayActiveClass:"ic-app-header__menu-list-item--active"},rspv:{tray_portal:`span[dir="${document.querySelector("html").getAttribute("dir")??"ltr"}"] div[role="dialog"] ul`,tray_container:'div[class$="-tray__content"]',INSTUI_aodown:'<svg name="IconArrowOpenDown" viewBox="0 0 1920 1920" rotate="0" style="width: 1em; height: 1em;" \n width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" class="gcn_tray-aodown">\n <g role="presentation"><path d="M568.129648 0.0124561278L392 176.142104 1175.86412 960.130789 392 1743.87035 568.129648 1920 1528.24798 960.130789z" \n fill-rule="evenodd" stroke="none" stroke-width="1" transform="matrix(0 1 1 0 .067 -.067)"></path></g></svg>'},targets:["_self","_blank","_parent","_top"]},load:t=>{if(document.querySelector(globalCustomNav.cfg.glbl.nav_selector)||document.querySelector(globalCustomNav.cfg.rspv.tray_portal)){if("undefined"!==document.querySelector(globalCustomNav.cfg.glbl.nav_selector)){globalCustomNav.dir=document.querySelector("html").getAttribute("dir")??"ltr",globalCustomNav.nav_items="undefined"!==t.nav_items&&Array.isArray(t.nav_items)?t.nav_items:[],globalCustomNav.throwbacks="object"==typeof t.throwbacks?t.throwbacks:{};var e=document.querySelector(`${globalCustomNav.cfg.glbl.nav_selector} li.${globalCustomNav.cfg.glbl.trayActiveClass} a`);e&&(globalCustomNav.cfg.context_item=e.id||e.closest("li").id),globalCustomNav.prepare_nav_items(globalCustomNav.nav_items,!1)}globalCustomNav.watch_glbl_tray(),globalCustomNav.watch_burger_tray()}},watch_burger_tray:(t,e)=>{const a=document.querySelector(globalCustomNav.cfg.rspv.tray_portal),l=document.querySelector("div.rspv-global-custom-nav");if(a)null==a||null==document.querySelector(".mobile-header-hamburger").offsetParent||l||(e.disconnect(),globalCustomNav.prepare_nav_items(globalCustomNav.nav_items,!0),document.querySelector(globalCustomNav.cfg.rspv.tray_container).classList.add("rspv-global-custom-nav"),globalCustomNav.exit_burger_tray());else if(void 0===e){new MutationObserver(globalCustomNav.watch_burger_tray).observe(document.body,{childList:!0,subtree:!0})}},exit_burger_tray:(t,e)=>{const a=document.querySelector(globalCustomNav.cfg.rspv.tray_portal);if(a){if(globalCustomNav.rspv_tray_throwback(),void 0===e){new MutationObserver(globalCustomNav.exit_burger_tray).observe(document.body,{childList:!0,subtree:!0})}}else a||(e.disconnect(),globalCustomNav.watch_burger_tray())},watch_glbl_tray:(t,e)=>{const a=document.querySelector(globalCustomNav.cfg.glbl.tray_portal);if(!a){if(void 0===e){new MutationObserver(globalCustomNav.watch_glbl_tray).observe(document.body,{childList:!0})}return}void 0!==e&&e.disconnect(),globalCustomNav.glbl_ensure_active_class(globalCustomNav.cfg.context_item);new MutationObserver(globalCustomNav.exit_glbl_tray).observe(a,{childList:!0,subtree:!0})},exit_glbl_tray:(t,e)=>{const a=document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} div.${globalCustomNav.cfg.glbl.tray_container}`);if(a){let t=[...a.classList].filter((t=>t.endsWith("-tray")))[0].replace("-tray","");if(globalCustomNav.glbl_ensure_active_class(`global_nav_${t}_link`),globalCustomNav.glbl_tray_throwback(),void 0===e){new MutationObserver(globalCustomNav.exit_glbl_tray).observe(document.body,{childList:!0})}}else a||(e.disconnect(),globalCustomNav.watch_glbl_tray())},glbl_ensure_active_class:t=>{t&&(Array.from(document.querySelectorAll(`${globalCustomNav.cfg.glbl.nav_selector} .${globalCustomNav.cfg.glbl.trayActiveClass}`)).forEach((t=>{t.classList.toggle(globalCustomNav.cfg.glbl.trayActiveClass)})),document.getElementById(t).closest("li").classList.add(globalCustomNav.cfg.glbl.trayActiveClass))},prepare_nav_items:(t,e=!0)=>{t.forEach((t=>{if(void 0===t.roles||t.roles()){if(globalCustomNav.create_nav_icon(t,e),t.high_contrast&&1==t.high_contrast){if(1!=ENV.use_high_contrast)return;return void globalCustomNav.append_high_contrast(t)}globalCustomNav.append_item(t,e),t.tray&&globalCustomNav.tray(t,e)}}))},create_nav_icon:(t,e=!0)=>{t.tidle=t.title.replace(/[\W_]+/g,"")||Math.random().toString(18).slice(2),t.slug=`global_nav_${t.tidle}_link`;let a=1==ENV.K5_USER&&1==e?"Home":"Dashboard";t.tray&&(a="Courses");const l=e?`${globalCustomNav.cfg.rspv.tray_portal} svg[name="Icon${a}"]`:`#global_nav_${a.toLowerCase()}_link`,o=document.querySelector(l).closest("li");if(t.high_contrast&&1==t.high_contrast){var r=o.querySelector(".menu-item__text")||o.querySelector('span[letter-spacing="normal"]');return void(t.dashboard_icon_text=r.innerText)}const s=o.cloneNode(!0);s.setAttribute("id",(e?"rspv-":"")+`${t.slug}-item`),s.querySelector("svg").parentElement.classList.add((e?"rspv-":"")+`svg-${t.tidle}-holder`);const n=(e?"rspv-":"")+t.slug;e&&t.tray?(s.querySelector("button").setAttribute("id",n),s.querySelector("button").setAttribute("aria-controls",(e?"rspv-":"")+`${t.slug}-tray`),s.querySelector("div div").setAttribute("id",(e?"rspv-":"")+`${t.slug}-tray`)):(s.querySelector("a").setAttribute("id",n),s.querySelector("a").href=t.href,void 0!==t.target&&globalCustomNav.cfg.targets.includes(t.target)&&s.querySelector("a").setAttribute("target",t.target)),(s.querySelector(".menu-item__text")||s.querySelector('span[letter-spacing="normal"]')).textContent=t.title;const c=s.querySelector((e?".rspv-svg":".svg")+`-${t.tidle}-holder`);s.querySelector("svg").classList.remove("ic-icon-svg--dashboard","svg-icon-home");let i=[...s.querySelector("svg").classList];if(e||s.classList.remove(globalCustomNav.cfg.glbl.trayActiveClass),s.querySelector("svg").remove(),1==/^icon-[a-z]/.test(t.icon_svg)){let a=`<div id="${(e?"rspv-":"")+`${t.slug}-svg`}" role="presentation">`;a+=`<i class="icon-line ${t.icon_svg}${e?" gcn_inst_rspv_icon":""} gcn_inst_menu_icon"></i></div>`,c.insertAdjacentHTML("afterbegin",a)}else/^https/.test(t.icon_svg)?fetch(t.icon_svg,{mode:"cors",method:"GET",headers:{"Access-Control-Request-Method":"GET",Accept:"text/plain","Content-Type":"text/plain"}}).then((t=>t.text())).then((a=>{c.insertAdjacentHTML("afterbegin",a),s.querySelector("svg").setAttribute("id",(e?"rspv-":"")+`${t.slug}-svg`),s.querySelector("svg").classList.add(...i)})).catch(console.error.bind(console)):/^<svg/.test(t.icon_svg)&&(c.insertAdjacentHTML("afterbegin",t.icon_svg),s.querySelector("svg").setAttribute("id",(e?"rspv-":"")+`${t.slug}-svg`),s.querySelector("svg").classList.add(...i));t.icon=s},append_item:(t,e=!0)=>{const a=e?globalCustomNav.cfg.rspv.tray_portal:globalCustomNav.cfg.glbl.nav_selector,l=document.querySelector(`${a} li:last-child`);if("undefined"!==t.position&&"number"==typeof t.position){const a=(1==e?globalCustomNav.cfg.rspv.tray_portal:globalCustomNav.cfg.glbl.nav_selector)+` > li:nth-of-type(${t.position})`;document.querySelector(a).after(t.icon)}else"undefined"!==t.position&&"after"==t.position?l.after(t.icon):l.before(t.icon);const o=new RegExp(`^${t.href}`);!e&&o.test(window.location.pathname)&&(globalCustomNav.cfg.context_item=t.slug,globalCustomNav.glbl_ensure_active_class(globalCustomNav.cfg.context_item))},append_high_contrast:t=>{if(0==document.querySelectorAll('[data-global-custom-nav-css="set"]').length){let t=document.createElement("style");t.setAttribute("data-global-custom-nav-css","set"),document.head.appendChild(t)}var e=document.querySelector("[data-global-custom-nav-css]").sheet;if(t.rspv&&!t.rspv.logo_svg&&(t.rspv.logo_svg=t.rspv.cdn+t.rspv.logos[window.location.host.split(".")[0]]),e.insertRule(`.ic-brand-mobile-global-nav-logo { background-image:url(${t.rspv.logo_svg}) !important; }`,e.cssRules.length),!document.querySelector(".gcn-high-contrast-glbl")){t.glbl&&!t.glbl.logo_svg&&(t.glbl.logo_svg=t.glbl.cdn+("function"==typeof t.glbl.logos?t.glbl.logos():t.glbl.logos[window.location.host.split(".")[0]])),e.insertRule(`.ic-app-header__logomark { background-image:url(${t.glbl.logo_svg}) !important; }`,e.cssRules.length);var a=document.createElement("div");a.setAttribute("style","background-color: transparent"),a.classList.add("ic-app-header__logomark-container","gcn-high-contrast-glbl");var l=document.createElement("span");l.setAttribute("class","screenreader-only"),l.textContent=t.dashboard_icon_text;var o=document.createElement("a");o.href="https://"+window.location.host,o.setAttribute("dir",globalCustomNav.dir),o.classList.add("ic-app-header__logomark"),o.appendChild(l),a.appendChild(o),document.querySelector("div.ic-app-header__main-navigation").prepend(a)}},tray:(t,e)=>{document.querySelector("#"+(e?"rspv-":"")+t.slug).addEventListener("click",function(t){e?globalCustomNav.rspv_tray_toggle(this):(t.preventDefault(),globalCustomNav.glbl_tray_toggle(this,t))}.bind(t))},link:t=>{var e=document.createElement("a");return e.textContent=t.title,e.href=t.href,e.setAttribute("dir",globalCustomNav.dir),e.classList.add("gcn_tray-view-link"),void 0!==t.target&&globalCustomNav.cfg.targets.includes(t.target)&&(e.target=t.target),e.outerHTML},tray_links:t=>{var e=`<ul class="gcn_tray-view--block-list" dir="${globalCustomNav.dir}">`;return t.forEach((t=>{e+=`<li class="gcn_tray-view-listItem" dir="${globalCustomNav.dir}">`,e+=globalCustomNav.link(t),e+=t.desc&&t.desc.length>1?`<div wrap="normal" letter-spacing="normal" class="gcn_tray-link-desc-text">${t.desc}</div>`:"",e+="</li>"})),e+="</ul>"},rspv_tray_toggle:t=>{document.querySelector(`#rspv-${t.slug}-tray`).classList.toggle("gcn_tray-content"),globalCustomNav.rspv_tray_content(t),document.querySelectorAll(`#rspv-${t.slug} svg[name^="IconArrowOpen"]`).forEach((t=>{t.classList.toggle("gcn_tray-closed")}))},rspv_tray_content:t=>{const e=document.querySelector(`#rspv-${t.slug}-tray`),a=`#rspv-${t.slug}`;if(!document.querySelector(`${a} svg[name="IconArrowOpenDown"]`)){let t=document.querySelector(`${a} svg[name="IconArrowOpenEnd"]`);t.parentElement.insertAdjacentHTML("afterbegin",globalCustomNav.cfg.rspv.INSTUI_aodown);let e=document.querySelector(`${a} svg[name="IconArrowOpenDown"]`);t.classList.forEach((t=>{e.classList.add(t)})),document.querySelector(`${a} svg[name="IconArrowOpenDown"]`).classList.toggle("gcn_tray-closed")}if(0==document.querySelectorAll(`#rspv-${t.slug}-tray a`).length){var l="";l+=globalCustomNav.tray_links_vs_cb(t),l+=`<li>${globalCustomNav.link(t)}</li>`,e.insertAdjacentHTML("afterbegin",l),globalCustomNav.handle_tray_cb(t,`#rspv-${t.slug}-tray .gcn-loading-tray-cb-svg`,"afterbegin")}},glbl_tray_toggle:(t,e)=>{Array.from(document.querySelectorAll(`${globalCustomNav.cfg.glbl.nav_selector} li`)).forEach((e=>{e.addEventListener("click",(function(e){new RegExp(t.tidle).test(e.target.closest("a").id)||document.getElementById(`${t.slug}-tray`)&&document.getElementById(`${t.slug}-tray`).remove()}))})),document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} > #${t.slug}-tray`)||(globalCustomNav.glbl_tray_content(t),e.target.closest("li").classList.add(globalCustomNav.cfg.glbl.trayActiveClass),globalCustomNav.glbl_tray_close(t))},glbl_tray_close:t=>{function e(){const e=document.querySelector(".gcn_tray-wrapper");e.addEventListener("transitionend",(()=>{document.getElementById(`${t.slug}-tray`)?.remove(),document.getElementById(t.slug).closest("li").classList.remove(globalCustomNav.cfg.glbl.trayActiveClass)})),e.classList.remove("gcn_open")}document.querySelector(`#${t.slug}-tray-close`).addEventListener("click",function(){e()}.bind(t)),window.addEventListener("click",(function(a){null!==document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} > #${t.slug}-tray`)&&(document.getElementById(`${t.slug}-tray`)?.contains(a.target)||!document.getElementById("main").contains(a.target)&&document.getElementById(`${t.slug}-item`).contains(a.target)||e())})),document.addEventListener("keydown",(function(t){"Escape"===t.key&&e()}))},glbl_tray_content:t=>{const e=`${t.slug}-tray`;var a=`<span id="${e}" dir="${globalCustomNav.dir}">\n <span class="gcn_tray-wrapper">\n <div role="dialog" aria-label="${t.title} tray">\n <div style="min-height: 100vh;">\n <div class="${globalCustomNav.cfg.glbl.tray_container} ${t.tidle}-tray">`;a+=`<span class="gcn_tray-close-btn-wrapper">\n <button id="${e}-close" cursor="pointer" type="button" tabindex="0" class="gcn_tray-close-btn" dir="${globalCustomNav.dir}">\n <i class="icon-solid icon-x" style="padding:0.5rem;"></i><span class="screenreader-only">Close</span>\n </button></span>`,a+=`<div class="${globalCustomNav.cfg.glbl.space}">\n <div class="gcn_tray-content-wrapper">\n <h2 class="gcn_tray-heading" dir="${globalCustomNav.dir}">${t.title}</h2>\n <hr role="presentation" class="gcn-cb_content">`,a+=globalCustomNav.tray_links_vs_cb(t,!1),t.tray.footer&&t.tray.footer.length>1&&(a+=`<ul class="gcn_tray-view--block-list" dir="${globalCustomNav.dir}">\n <li class="gcn_tray-view-listItem" dir="${globalCustomNav.dir}"><hr role="presentation"></li>\n <li class="gcn_tray-view-listItem" dir="${globalCustomNav.dir}">`,a+=globalCustomNav.link(t),a+=`</li></ul><br><div wrap="normal" letter-spacing="normal" class="gcn_tray-link-desc-text">${t.tray.footer}</div>`),a+="</div></div></div></div></div></span></span>",document.getElementById("nav-tray-portal").insertAdjacentHTML("afterbegin",a),document.querySelector(".gcn_tray-close-btn")?.focus(),document.querySelector(".gcn_tray-wrapper").classList.add("gcn_open"),globalCustomNav.handle_tray_cb(t,`.${globalCustomNav.cfg.glbl.space} div.gcn-loading-tray-cb-svg`,"afterbegin",!1)},tray_links_vs_cb:(t,e=!0)=>{var a="";if(void 0!==t.tray.items){if(Array.isArray(t.tray.items))a+=globalCustomNav.tray_links(t.tray.items);else if("object"==typeof t.tray.items)if(e){var l=Object.values(t.tray.items);a+=globalCustomNav.tray_links(l[0].concat(l[1]))}else Object.keys(t.tray.items).forEach((e=>{a+=`<h3 class="gcn_tray-list-group-heading">${e}</h3>`,a+=globalCustomNav.tray_links(t.tray.items[e])}))}else void 0!==t.tray.cb&&"function"==typeof t.tray.cb&&(a+=`<ul class="gcn_tray-view--block-list gcn-loading-tray-cb" dir="${globalCustomNav.dir}">\n <li class="gcn_tray-view-listItem" dir="${globalCustomNav.dir}">\n <div dir="${globalCustomNav.dir}" class="gcn_tray-view-spinner gcn-loading-tray-cb-svg gcn_tray-link-desc-text"></div>\n </li>\n </ul>`);return a},handle_tray_cb:(t,e,a,l=!0)=>{if(void 0!==t.tray.cb&&"function"==typeof t.tray.cb){var o=`<svg role="img" aria-labelledby="${(l?"rspv-":"")+`${t.slug}-tray-loading_svg`}" focusable="false" class="gcn_tray-spinner__circle">\n <title id="${(l?"rspv-":"")+`${t.slug}-tray-loading_svg`}">Loading</title>\n <g role="presentation">\n <circle cx="50%" cy="50%" r="1em" class="gcn_tray-spinner__circleTrack"></circle>\n <circle cx="50%" cy="50%" r="1em" class="gcn_tray-spinner__circleSpin"></circle>\n </g>\n </svg>`;document.querySelector(e).insertAdjacentHTML(a,o),t.tray.cb(t)}},append_cb_content:(t,e)=>{document.querySelector(`.${globalCustomNav.cfg.glbl.space} hr.gcn-cb_content`)?(document.querySelector(`.${globalCustomNav.cfg.glbl.space} hr.gcn-cb_content`).insertAdjacentHTML("afterend",e),document.querySelector(`.${globalCustomNav.cfg.glbl.space} .gcn-loading-tray-cb`).remove()):document.querySelector(`#rspv-${t.slug}-tray`)&&(document.querySelector(`#rspv-${t.slug}-tray`).insertAdjacentHTML("afterbegin",e),document.querySelector(`#rspv-${t.slug}-tray .gcn-loading-tray-cb`).remove())},glbl_tray_throwback:()=>{if(void 0===globalCustomNav.throwbacks)return;let t=[...document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} div.${globalCustomNav.cfg.glbl.tray_container}`).classList].filter((t=>t.endsWith("-tray")))[0].replace("-tray","");if("object"==typeof globalCustomNav.throwbacks[t]){let e=document.querySelector(`${globalCustomNav.cfg.glbl.tray_portal} ${globalCustomNav.throwbacks[t].target}`),a=document.querySelectorAll(`${globalCustomNav.cfg.glbl.tray_portal} a.${globalCustomNav.throwbacks[t].actions.complete}`);e&&0==a.length&&globalCustomNav.throwbacks[t].actions.glbl()}},rspv_tray_throwback:()=>{if(void 0===globalCustomNav.throwbacks)return;if(document.querySelector(globalCustomNav.cfg.rspv.tray_portal)&&Object.keys(globalCustomNav.throwbacks).length>=1){let t=document.querySelectorAll('button[aria-controls^="Expandable"][aria-expanded="true"]'),e=Object.keys(globalCustomNav.throwbacks).map((t=>[globalCustomNav.throwbacks[t].target,t])),a=Object.fromEntries(e),l=Object.keys(a);t&&l.forEach((t=>{if(document.querySelector(`div[id^="Expandable"] ${t}`)){let e=a[t];if("object"==typeof globalCustomNav.throwbacks[e]){0==document.querySelectorAll(`div[id^="Expandable"] a.${globalCustomNav.throwbacks[e].actions.complete}`).length&&globalCustomNav.throwbacks[e].actions.rspv()}}}))}}};
  
    // configure custom opts
  //const globalCustomNav_items = [];

  // configure moar
  const globalCustomNav_tray_throwback = {};

  // throwback for specific role
  // consider sub account recursion requires an Account Role to have [SIS Data - read] permission
  if (['AccountAdmin'].some(a => ENV.current_user_types?.includes(a))) {

    // replace/paste from gcn-ccsd-admin-tray-subaccount-nav.js or gcn-ccsd-admin-tray-subaccount-nav.min.js
    const gcn_AdminTraySubAccountNav = (function() {
      const subaccnav = {
        // ui text configration
        // not a great way around this at the moment
        search_text: 'Search...',
        reload_text: 'This will clear and reload the menu...\n...updating with any recent changes.\nDo you want to continue?',
        // no need to change these
        instance: location.host+'_subaccount_tray', // instance specific localStorage key
        tree: [], // the complete recursive tree of the sub account structure that is held in LocalStorage to save API calls
        html: null, // root HTML for menu navigation
        searchAccountFilter: [], // account *names* which should be excluded from the search result breadcrumbs
        accountFilter: [], // account *ids* as strings that should be excluded from the tree altogether
        skipRootInSearch: true,
        loadingSaveProgressInterval: 2000, // how often we should save our progress to localStorage when building the tree
        dir: document.querySelector('html').getAttribute('dir') ?? 'ltr' // handle account or user language preference
      };
    
      subaccnav.init = async (cfg) => {
        subaccnav.accountFilter = cfg.accountFilter || subaccnav.accountFilter;
        subaccnav.searchAccountFilter = cfg.searchAccountFilter || subaccnav.searchAccountFilter;
        subaccnav.skipRootInSearch = cfg.skipRoot || subaccnav.skipRootInSearch;
      
        const tree = localStorage.getItem(subaccnav.instance);
        if (tree) {
          const treeObj = JSON.parse(tree);
          subaccnav.tree = treeObj;
        } else {
          subaccnav.get_root_accounts();
        }
      }
    
      subaccnav.tree_to_html = function(arr, path = []) {
        var html = `<ul${path.length == 0 ? ' id="gcn-admin-tray-san"' : ''} data-tree="${path.join(':')}" ${path.length ? 'style="display: none;"' : ''} class="${subaccnav.tray.ul_class}" dir="${subaccnav.dir}">`;
    
        for (let i in arr) {
          let node = arr[i];
          const key = path.join(':') + (path.length ? ':' : '') + i;
          html += `<li data-tree="${key}" class="${subaccnav.tray.li_class}" dir="${subaccnav.dir}">`;
          html += (node.children && node.children.length ? `<a href="#${key}" class="gcn-san-toggle icon-solid icon-arrow-open-${subaccnav.dir == 'ltr' ? 'end' : 'start'}"></a>` : '');
          html += `<a href="/accounts/${node.id}" class="sub-acc" dir="${subaccnav.dir}">${node.name}</a>`;
          html += '</li>';
        }
        html += '</ul>';
    
        return html;
      };
    
      subaccnav.render_path_children = function(e) {
        var path = e.target.getAttribute('href').replace('#','');
        const paths = path.split(":");
        let currentTree = subaccnav.tree;
    
        for (let i=0; i<paths.length; i++) {
          const index = paths[i];
          currentTree = currentTree.children ? currentTree.children[index] : currentTree[index];
          
          const currentPath = paths.slice(0, i+1);
    
          let li = document.querySelector(`li[data-tree="${currentPath.join(":")}"]`),
            ul = document.querySelector(`ul[data-tree="${currentPath.join(":")}"]`);
    
          if (ul !== null) {
            continue;
          } else {
            var html = subaccnav.tree_to_html(currentTree.children || [], currentPath);
            li.insertAdjacentHTML('beforeend', html);
          }
        }
      }
    
      subaccnav.tree_search = function(query) {
        if (query.length < 3) {
          document.querySelector('#gcn-admin-tray-san-results').innerHTML = '';
          return;
        }
    
        var results = [];
        var queryRegex = query.split(/\s+/).map(term => new RegExp(term.trim(), 'i'));
        var parentFilterRegex = subaccnav.searchAccountFilter.map(term => term instanceof RegExp ? term : new RegExp(term.trim(), 'i'));
    
        var search = (item, root_acct, level = 0, parent = []) => {
          var title = item.name;
    
          var success = false;
          var foundTerms = queryRegex.filter(regex => regex.test(title));
    
          if (foundTerms.length) {
            const nextTerms = queryRegex.filter(regex => !(regex.test(title)));
    
            if (nextTerms.length) {
              success = nextTerms.every(regex => {
                return parent.some(parentTerm => regex.test(parentTerm.name))
              });
            }
            else {
              success = true;
            }
          }
    
          if (success) {
            results.push({
              id: item.id,
              name: title,
              parents: parent,
              root: root_acct
            });
          }
    
          if (item.children && item.children.length) {
            let nextParents = parent;
            
            if ((!subaccnav.skipRootInSearch || !item.url) && !parentFilterRegex.some(skipRegex => skipRegex.test(title))) {
              nextParents = parent.concat({ id: item.id, name: title });
            }
    
            for (let i=0, len=item.children.length; i<len; i++) {
              search(item.children[i], root_acct, level+1, nextParents);
            }
          }
        }
    
        for (let key in subaccnav.tree) {
          const root = subaccnav.tree[key];
          search(root, key);
        }
    
        document.querySelector('#gcn-admin-tray-san-results').innerHTML = '';
        
        for (let result of results) {
          var results_list = '';
    
          for (let parentNode of result.parents) {
            results_list += `<a href='/accounts/${parentNode.id}'>${parentNode.name}</a>`;
            // TODO switch to ltr for rtl
            results_list += `<span> ${subaccnav.dir == 'ltr' ? '&gt;' : '&lt;'} </span>`;
          }
    
          results_list += `<a href='/accounts/${result.id}'>${result.name}</a>`;
          document.querySelector('#gcn-admin-tray-san-results').innerHTML += `<li>${results_list}</li>`;
        }
      };
    
      subaccnav.controls = () => {
        
        if(!document.querySelector(`#${subaccnav.container_id} #gcn-admin-tray-san`)) return;

        // sub account list expansion
        document.querySelector(`#${subaccnav.container_id} #gcn-admin-tray-san`).addEventListener('click', e => {
          if(!e.target.closest(`#${subaccnav.container_id} a.gcn-san-toggle`)) return;
          e.preventDefault();
    
          if(!document.querySelector(`#${subaccnav.container_id} ul[data-tree="${e.target.getAttribute('href').replace('#','')}"]`)) {
            subaccnav.render_path_children(e);
          }
          
          let tree_list = document.querySelector(`#${subaccnav.container_id} ul[data-tree="${e.target.getAttribute('href').replace('#','')}"]`);
          var a_toggle = e.target.closest(`#${subaccnav.container_id} a.gcn-san-toggle`);
          var arrow = subaccnav.dir == 'ltr' ? 'end' : 'start';
          if(!tree_list.classList.contains('gcn-san-list-open')) {
            tree_list.classList.add('gcn-san-list-open');
            a_toggle.classList.add('icon-arrow-open-down');
            a_toggle.classList.remove('icon-arrow-open-' + arrow);
          } else {
            tree_list.classList.remove('gcn-san-list-open');
            a_toggle.classList.add('icon-arrow-open-' + arrow);
            a_toggle.classList.remove('icon-arrow-open-down');
          }
        });
    
        // sub account search
        var timeout = null;
        document.querySelector('#gcn-admin-tray-san-search').oninput = e => {
          var text = e.target.value;
          if (timeout != null) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(function(){
            subaccnav.tree_search(text);
            timeout = null;
          }, 300);
        };
        
        // reload
        document.querySelector(`#${subaccnav.container_id} a.gcn-san-reload`).onclick = e => {
          e.preventDefault();
          // TODO detect RTL/LTR
          let prompt = subaccnav.reload_text;
          if (confirm(prompt)) {
            localStorage.removeItem(subaccnav.instance);
            subaccnav.tree = [];
            subaccnav.html = null;
            // recollect accounts
            subaccnav.get_root_accounts();
            // clear menu, indicate loading
            subaccnav.throwback(subaccnav.tray);
          }
        };
      };
    
      subaccnav.get_root_accounts = async () => {
        let accountData = {
          index: {},
          ids: []
        };
        let page = 1, currentRootId;
    
        localStorage.removeItem(subaccnav.instance);
    
        let tempAccountData = localStorage.getItem(`${subaccnav.instance}.tmp`);
        let tempAccountRoot = localStorage.getItem(`${subaccnav.instance}.root`);
        let tempAccountPage = localStorage.getItem(`${subaccnav.instance}.page`);
    
        if (tempAccountData) {
          accountData = JSON.parse(tempAccountData);
          tempAccountData = null;
        }
    
        var res = await fetch(`/api/v1/accounts/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json+canvas-string-ids'
          },
        }).then(res => {
          if (!res.ok) throw Error(res.status);
          return res.json();
        }).catch(err => console.error(err));
    
        var saveProgress = setInterval(() => {
          localStorage.setItem(`${subaccnav.instance}.page`, page);
          localStorage.setItem(`${subaccnav.instance}.root`, currentRootId);
          localStorage.setItem(`${subaccnav.instance}.tmp`, JSON.stringify(accountData));
        }, subaccnav.loadingSaveProgressInterval);
    
        try {
          for (let account of res) {
            if(account.root_account_id !== null) {
              // skip account if it's not a root account
              // prevents duplicate search results if a root admin has been added as an admin of a sub account
              continue;
            }
            currentRootId = account.id;
    
            if (tempAccountRoot) {
              if (tempAccountRoot != currentRootId) {
                continue;
              } else if (tempAccountRoot == currentRootId) {
                tempAccountRoot = null;
              }
            }
    
            if (!(currentRootId in accountData.index)) {
              accountData.ids.push(currentRootId);
    
              accountData.index[currentRootId] = {
                id: currentRootId,
                name: account.name,
                parent_id: account.parent_account_id
              };
            }
    
            let done = false;
    
            if (tempAccountPage) {
              page = +tempAccountPage;
              tempAccountPage = null;
            } else {
              page = 1;
            }
    
            while (!done) {
              
              var accounts = await fetch(`/api/v1/accounts/${currentRootId}/sub_accounts?recursive=true&per_page=100&page=${page}`, {
                method: 'GET',
                headers: {
                  Accept: 'application/json+canvas-string-ids'
                },
              }).then(res => {
                if (!res.ok) throw Error(res.status);
                return res.json();
              }).catch(err => console.error(err));
    
              if (accounts.length === 0) {
                done = true;
                break;
              }
    
              for (let i=0, len=accounts.length; i<len; i++) {
                const subAccount = accounts[i];
                const id = subAccount.id;
    
                if (subaccnav.accountFilter.includes(id)) {
                  continue;
                }
    
                accountData.index[id] = {
                  id: id,
                  name: subAccount.name,
                  parent_id: subAccount.parent_account_id
                };
                accountData.ids.push(id);
              }
              page++;
            }
          }
    
          const accountTree = subaccnav.accounts_to_tree(accountData);
    
          clearInterval(saveProgress);
    
          localStorage.removeItem(`${subaccnav.instance}.page`);
          localStorage.removeItem(`${subaccnav.instance}.root`);
          localStorage.removeItem(`${subaccnav.instance}.tmp`);
    
          localStorage.setItem(subaccnav.instance, JSON.stringify(accountTree));
        }
        catch (e) {
          console.error(e);
          clearInterval(saveProgress);
        }
      }
    
      subaccnav.accounts_to_tree = (accountList) => {
        const tree = [];
    
        for (let i=0, len=accountList.ids.length; i<len; i++) {
          const id = accountList.ids[i];
          const account = accountList.index[id];
    
          if (!account.parent_id) {
            tree.push(account);
          } else if (!(account.parent_id in accountList.index)) { // list should be in the proper order for this to work
            continue;
          }
          else {
            const parent_id = account.parent_id;
            const parent_account = accountList.index[parent_id];
            
            if (!parent_account.children) {
              parent_account.children = [account];
            } else {
              parent_account.children.push(account);
            }
          }
        }
    
        const sortChildren = (node) => {
          if (node.children) {
            if (node.children.length > 10) {
              node.children.sort((a, b) => a.name < b.name ? -1 : 1);
            }
      
            for (let child of node.children) {
              sortChildren(child);
            }
          }
        }
      
        for (let key in tree) {
          sortChildren(tree[key]);
        }
    
        subaccnav.tree = tree;
        // update tray when accounts are collected
        subaccnav.throwback(subaccnav.tray);
    
        return tree;
      }
    
      subaccnav.throwback = (tray = {}) => {
        subaccnav.tray = tray || subaccnav.tray;
        subaccnav.container_id = ( subaccnav.tray.type == 'rspv' ? 'rspv-' : '') + 'gcn-admin-tray-subaccount-nav';
    
        let san = document.querySelector(`#${subaccnav.container_id}`);
        if(san) san.remove();
    
        let san_content = '';
        if(subaccnav.tree.length != 0) {
          // if the tree is ready, render root list and html
          subaccnav.html = subaccnav.tree_to_html(subaccnav.tree);
          san_content = `<input type="text" id="gcn-admin-tray-san-search" placeholder="${subaccnav.search_text}" />
          <ol id="gcn-admin-tray-san-results" class="${subaccnav.tray.ul_class}" dir="${subaccnav.dir}"></ol>
          ${subaccnav.html}<a href="#" class="gcn-san-reload" dir="${subaccnav.dir}"><i class="icon-solid icon-refresh" aria-hidden="true" /></a>`;
    
        } else {
          // indicate loading
          san_content = `<svg role="img" aria-labelledby="gcn-san-tray-loading_svg" focusable="false" class="gcn_tray_throwback-spinner__circle">
            <title id="gcn-san-tray-loading_svg">Loading</title>
            <g role="presentation">
              <circle cx="50%" cy="50%" r="1em" class="gcn_tray-spinner__circleTrack"></circle>
              <circle cx="50%" cy="50%" r="1em" class="gcn_tray-spinner__circleSpin"></circle>
            </g>
          </svg>`;
        }
        
        // create element for san container
        let wrapper = document.createElement('div');
        wrapper.id = subaccnav.container_id;
        wrapper.dir = subaccnav.dir;
        wrapper.dir = document.querySelector('html').getAttribute('dir') ?? 'ltr';
        wrapper.innerHTML = `<hr role="presentation">${san_content}`;
        // append san to tray where desired
        if(subaccnav.tray.where) { 
          subaccnav.tray.where.append(wrapper);
          // throwback complete
          document.querySelector(subaccnav.tray.mark).classList.add(subaccnav.tray.complete);
        }
        // enable interaction
        if(subaccnav.html) {
          subaccnav.controls();
        }
      }
    
      return {
        init: subaccnav.init,
        throwback: subaccnav.throwback
      }
    })();
    
    // initialize with filters
    gcn_AdminTraySubAccountNav.init({
      // account *names* which should be excluded from the search result breadcrumbs
      searchAccountFilter: [],
      // account *ids* as strings that should be excluded from the tree altogether
      // if you have a consortium, use both the local id and the global (shard id)
      accountFilter: [
        // '123456', // sub account relative to root
        // '100000000123456' // sub account relative to others
      ],
    });

    // throwback for admin tray - sub account navigation
    globalCustomNav_tray_throwback.accounts = {
      target: 'a[href="/accounts"]',
      actions: {
        complete: 'gcn-admin-tray-sub-account-links',
        glbl: function () {
          let content_location = document.querySelector('div.accounts-tray ul');
          gcn_AdminTraySubAccountNav.throwback({
            type: 'glbl',
            mark: '#nav-tray-portal a[href="/accounts"]',
            complete: this.complete,
            where: content_location.closest('div'),
            ul_class: content_location.getAttribute('class'),
            li_class: content_location.children[1].getAttribute('class')
          });
        },
        rspv: function () {
          let rspv_tray_sel = `div[id^="Expandable"] a[href="/accounts"]`;
          let content_location = document.querySelector(rspv_tray_sel).closest('ul');
          gcn_AdminTraySubAccountNav.throwback({
            type: 'rspv',
            mark: rspv_tray_sel,
            complete: this.complete,
            where: content_location,
            ul_class: content_location.getAttribute('class'),
            li_class: content_location.children[1].getAttribute('class')
          });
        }
      }
    };
  }

  const globalCustomNav_opts = {
    //nav_items: globalCustomNav_items,
    throwbacks: globalCustomNav_tray_throwback
  };
  // load custom nav options
  globalCustomNav.load(globalCustomNav_opts);

})();