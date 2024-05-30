/**
// @name        CanvasLMS - Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description example throwback, adds quick nav links to Accounts in tray
//
**/

// for more details see /docs/custom-tray-throwbacks.md

const globalCustomNav_tray_throwback = {
  accounts: {
    // add quick navigation links for the admin tray accounts for account admins
    target: 'a[href="/accounts"]',
    actions: {
      // class to stop the observer when the tray is updated
      complete: 'gcn-admin-tray-quick-nav',
      // add some quick navigation links to each account
      add: function(accounts) {
        let dir = document.querySelector('html').getAttribute('dir') ?? 'ltr';
        let float = dir = 'ltr' ? 'right' : 'left';
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
  }
}