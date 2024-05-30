/**
// @name        Admin Tray Sub Account Nav Throwback for Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description example for handling a throwback for specific roles
//
**/

(function () {
  'use strict';

  // requires the complete features of global-custom-nav.js
  const globalCustomNav = {};

  // configure custom opts
  const globalCustomNav_items = [];

  // configure moar
  const globalCustomNav_tray_throwback = {};

  // throwback for specific role
  // consider sub account recursion requires an Account Role to have the permission [SIS Data - read] 
  if (['AccountAdmin'].some(a => ENV.current_user_types?.includes(a))) {
    // load external script
    const getThrowback = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      document.body.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
      script.defer = 'defer';
      // update with your own cdn host
      script.src = `${your.cdn}/js/gcn-ccsd-admin-tray-subaccount-nav.min.js`;
    });
    // set and promise class
    getThrowback.then(() => {
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