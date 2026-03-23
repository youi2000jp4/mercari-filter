// メルカリ検索を「新しい順・個人出品」に自動設定 v1.1
function injectParams(urlStr) {
  const url = new URL(urlStr, location.href);
  if (!url.pathname.startsWith("/search")) return urlStr;

  url.searchParams.set("sort", "created_time");
  url.searchParams.set("order", "desc");
  url.searchParams.set("item_types", "1");
  return url.toString();
}

function applyFilter() {
  const fixed = injectParams(location.href);
  if (fixed !== location.href) {
    location.replace(fixed);
  }
}

// 初回実行
applyFilter();

// SPA対応：history APIを乗っ取ってURLが変わる前にパラメータを注入
const _push = history.pushState.bind(history);
const _replace = history.replaceState.bind(history);

history.pushState = function (state, title, url) {
  _push(state, title, url ? injectParams(url) : url);
};

history.replaceState = function (state, title, url) {
  _replace(state, title, url ? injectParams(url) : url);
};

window.addEventListener("popstate", applyFilter);
