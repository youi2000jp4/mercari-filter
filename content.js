// メルカリ検索を「新しい順・個人出品」に自動設定 v1.5
// SPA対応：URLの変化を監視してリダイレクト
let lastUrl = "";

setInterval(() => {
  if (location.href === lastUrl) return;
  lastUrl = location.href;

  if (!location.pathname.startsWith("/search")) return;

  const params = new URLSearchParams(location.search);
  if (params.get("sort") === "created_time" &&
      params.get("order") === "desc" &&
      params.get("item_types") === "mercari") return;

  const url = new URL(location.href);
  url.searchParams.set("sort", "created_time");
  url.searchParams.set("order", "desc");
  url.searchParams.set("item_types", "mercari");
  location.href = url.toString();
}, 300);
