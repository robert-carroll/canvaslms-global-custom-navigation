/**
// @name        Admin Tray Sub Account Nav Throwback for Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description example for handling a throwback for specific roles
//
**/

// handle css in this js file, or you can remove it if...
// you include the contents of /css/global-custom-nav.css AND gcn-ccsd-admin-tray-subaccount-nav.css in your Canvas Themes css file
!function(){if(0==document.querySelectorAll('[data-global-custom-nav-css="set"]').length){let t={"i.gcn_inst_menu_icon:before":"font-size: 1.625rem;","i.gcn_inst_rspv_icon":"color: var(--ic-brand-primary);","div.gcn_tray-content":"display: block !important;","div.gcn_tray-open":"display: block !important;","svg.gcn_tray-closed":"display: none !important;","svg.gcn_tray-aodown":"fill: currentcolor; display: inline-block; overflow: visible; color: inherit; vertical-align: middle; line-height: 1; width: 1em; height: 1em;",".gcn_tray-wrapper":"transform: translateZ(0px); transition: 0.5s; opacity: 1; background-color: #FFFFFF; max-height: 100vh; max-width: 100vw; overflow: hidden auto; position: fixed; box-shadow: 0 0.375rem 0.4375rem rgba(0, 0, 0, 0.1), 0 0.625rem 1.75rem rgba(0, 0, 0, 0.25); top: 0; bottom: 0; width: 28em;","[dir='ltr'] .gcn_tray-wrapper":"left: -28em; right: auto;","[dir='rtl'] .gcn_tray-wrapper":"right: -28em; left: auto;","[dir='ltr'] .gcn_tray-wrapper.gcn_open":"left: 0; right: auto;","[dir='rtl'] .gcn_tray-wrapper.gcn_open":"right: 0; left: auto;",".gcn_tray-close-btn-wrapper":"position: absolute; top: 0.5rem;","[dir='ltr'] .gcn_tray-close-btn-wrapper":"left: auto; right: 0.5rem","[dir='rtl'] .gcn_tray-close-btn-wrapper":"right: auto; left: 0.5rem",".gcn_tray-close-btn":"box-sizing: border-box; background: none; color: #2D3B45; margin: 0px; padding: 0px; border-radius: 0.25rem; outline: none; border: none; width: auto; cursor: pointer;",".gcn_tray-close-btn:hover":"background-color: rgba(45, 59, 69, 0.1);",".gcn_tray-close-btn::before":"position: absolute; pointer-events: none; opacity: 0; content: ''; transform: scale(0.95); transition: all 0.2s ease 0s; top: -0.3125rem; right: -0.3125rem; bottom: -0.3125rem; left: -0.3125rem; border-style: solid; border-color: var(--ic-brand-primary); border-width: 0.125rem; border-radius: 0.5rem; transform: scale(1);",".gcn_tray-close-btn:focus::before":"opacity: 1;",".gcn_tray-content-wrapper":"box-sizing: border-box; max-width: 100%; overflow: visible; padding: 1.5rem;",".gcn_tray-heading":"line-height: 1.125; margin: 0px; font-size: 1.375rem; font-weight: 700; color: inherit; box-sizing: border-box; max-width: 100%; overflow: visible;",".gcn_tray-list-group-heading":"line-height: 1.125; margin: 0px; font-size: 1rem; font-weight: 700; color: inherit; box-sizing: border-box; max-width: 100%; overflow: visible;",".gcn_tray-view--block-list":"margin: 0.75rem 0; list-style-type: none;",".gcn_tray-list-group-heading + .gcn_tray-view--block-list":"margin: 0.75rem;",".gcn_tray-view-listItem":"margin-top: 0.75rem; margin-bottom: 0.75rem; padding: 0px; max-width: 100%;",".gcn_tray-view-listItem:first-of-type":"margin-top: 0;",".gcn_tray-view-link:focus":"outline-color: var(--ic-link-color);",".gcn_tray-view-link":"outline-color: transparent; outline-offset: 0.25rem; outline-style: solid; outline-width: 0.125rem; transition: outline-color 0.2s ease 0s; vertical-align: baseline; max-width: 100%; overflow: visible;",".gcn_tray-link-desc-text":"font-size: 0.875rem;",".gcn_tray-view-spinner":"max-width: 100%; overscroll-behavior: auto; display: inline-block; vertical-align: middle; position: relative; box-sizing: border-box; overflow: hidden; width: 3em; height: 3em;",".gcn_tray-spinner__circle":"display: block; position: absolute; top: 0px; left: 0px; animation-name: gcn-spinner-rotate; animation-duration: 2.25s; animation-iteration-count: infinite; animation-timing-function: linear; width: 3em; height: 3em;",".gcn_tray_throwback-spinner__circle":"display: block; animation-name: gcn-spinner-rotate; animation-duration: 2.25s; animation-iteration-count: infinite; animation-timing-function: linear; width: 3em; height: 3em;",".gcn_tray-spinner__circleTrack":"stroke: rgb(245, 245, 245); fill: none; stroke-width: 0.375em;",".gcn_tray-spinner__circleSpin":"fill: none; stroke-linecap: round; animation-name: gcn-spinner-morph; animation-duration: 1.75s; animation-iteration-count: infinite; animation-timing-function: ease; stroke-width: 0.375em; stroke-dasharray: 6em; transform-origin: calc(1.5em) calc(1.5em) 0px; stroke: rgb(3, 116, 181);","@keyframes gcn-spinner-rotate":"to { transform: rotate(360deg) }","@keyframes gcn-spinner-morph":"0% { stroke-dashoffset: 190%; } 50% { stroke-dashoffset: 50%; transform: rotate(90deg); } 100% { stroke-dashoffset: 190%; transform: rotate(360deg); }","ul#gcn-admin-tray-san, ul#gcn-admin-tray-san ul":"margin: 0; padding: 0; list-style: none;","input#gcn-admin-tray-san-search":"width: 95%;","[dir='ltr'] ul#gcn-admin-tray-san ul":"margin-left: 5px; border-left: 1px dotted #ccc; padding-left: 5px;","[dir='rtl'] ul#gcn-admin-tray-san ul":"margin-right: 5px; border-right: 1px dotted #ccc; padding-right: 5px;","[dir='ltr'] ol#gcn-admin-tray-san-results":"border-bottom: 2px solid #ccc; margin: 0; padding-left: 18px; margin-bottom: 4px;","[dir='rtl'] ol#gcn-admin-tray-san-results":"border-bottom: 2px solid #ccc; margin: 0; padding-right: 18px; margin-bottom: 4px;","ul.gcn-san-list-open":"display: block !important;","[dir='ltr'] a.gcn-san-reload":"float: right;","[dir='rtl'] a.gcn-san-reload":"float: left;","[dir='ltr'] a.gcn-san-toggle":"float: right;","[dir='rtl'] a.gcn-san-toggle":"float: left;"};if(void 0!==t&&Object.keys(t).length>0){let r=document.createElement("style");r.setAttribute("data-global-custom-nav-css","set"),document.head.appendChild(r);let n=r.sheet;Object.keys(t).forEach((function(r){n.insertRule(`${r} { ${t[r]} }`,n.cssRules.length)}))}}}();

(function () {
  'use strict';

  // requires the complete features of global-custom-nav.js
  const globalCustomNav = {};

  // configure custom opts
  const globalCustomNav_items = [];

  // configure moar
  const globalCustomNav_tray_throwback = {};

  // throwback for specific role
  // consider sub account recursion requires an Account Role to have [SIS Data - read] permission
  if (['AccountAdmin'].some(a => ENV.current_user_types?.includes(a))) {

    // replace/paste from gcn-ccsd-admin-tray-subaccount-nav.js or gcn-ccsd-admin-tray-subaccount-nav.min.js
    const gcn_AdminTraySubAccountNav = (function() {})();
    
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
      complete: 'gcn-admin-tray-sub-account-links',
      actions: {
        glbl: function () {
          let content_location = document.querySelector('div.accounts-tray ul');
          gcn_AdminTraySubAccountNav.throwback({
            type: 'glbl',
            mark: '#nav-tray-portal a[href="/accounts"]',
            complete: 'gcn-admin-tray-sub-account-links',
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
            complete: 'gcn-admin-tray-sub-account-links',
            where: content_location,
            ul_class: content_location.getAttribute('class'),
            li_class: content_location.children[1].getAttribute('class')
          });
        }
      }
    };
  }

  const globalCustomNav_opts = {
    nav_items: globalCustomNav_items,
    throwbacks: globalCustomNav_tray_throwback
  };
  // load custom nav options
  globalCustomNav.load(globalCustomNav_opts);

})();