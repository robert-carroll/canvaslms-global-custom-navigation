/**
// @name        Admin Tray Sub Account Nav Throwback for Global Custom Navigation
// @namespace   https://github.com/robert-carroll/canvaslms-global-custom-navigation
// @description adds sub account functionality to the admin tray
//
**/

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
    subaccnav.tray.where.append(wrapper);
    // throwback complete
    document.querySelector(subaccnav.tray.mark).classList.add(subaccnav.tray.complete);
    
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