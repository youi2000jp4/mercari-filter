// メルカリ検索を「新しい順・個人出品」に自動設定 v1.3
function applyFilter() {
  const url = new URL(location.href);
  if (!url.pathname.startsWith("/search")) return;

  const params = url.searchParams;
  let changed = false;

  if (params.get("sort") !== "created_time" || params.get("order") !== "desc") {
    params.set("sort", "created_time");
    params.set("order", "desc");
    changed = true;
  }

  if (params.get("item_types") !== "mercari") {
    params.set("item_types", "mercari");
    changed = true;
  }

  if (changed) {
    location.replace(url.toString());
  }
}

// 初回実行
applyFilter();

// SPA対応：pushState のみ乗っ取る（replaceState は触らない）
const _push = history.pushState.bind(history);
history.pushState = function (state, title, url) {
  if (url) {
    const u = new URL(url, location.href);
    if (u.pathname.startsWith("/search")) {
      u.searchParams.set("sort", "created_time");
      u.searchParams.set("order", "desc");
      u.searchParams.set("item_types", "mercari");
      return _push(state, title, u.toString());
    }
  }
  return _push(state, title, url);
};

window.addEventListener("popstate", applyFilter);
