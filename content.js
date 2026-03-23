// メルカリ検索を「新しい順・個人出品」に自動設定
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

  if (params.get("item_types") !== "1") {
    params.set("item_types", "1");
    changed = true;
  }

  if (changed) {
    location.replace(url.toString());
  }
}

// 初回実行
applyFilter();

// SPA対応：URL変化を監視
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    applyFilter();
  }
}).observe(document, { subtree: true, childList: true });
