// メルカリ検索を「新しい順・個人出品・売切表示・3000円以上」に自動設定 v1.6
// SPA対応：URLの変化を監視してリダイレクト
let lastUrl = "";

setInterval(() => {
  if (location.href === lastUrl) return;
  lastUrl = location.href;

  if (!location.pathname.startsWith("/search")) return;

  const params = new URLSearchParams(location.search);
  if (params.get("sort") === "created_time" &&
      params.get("order") === "desc" &&
      params.get("item_types") === "mercari" &&
      params.get("status") === "sold_out" &&
      params.get("price_min") === "3000") return;

  const url = new URL(location.href);
  url.searchParams.set("sort", "created_time");
  url.searchParams.set("order", "desc");
  url.searchParams.set("item_types", "mercari");
  url.searchParams.set("status", "sold_out");
  url.searchParams.set("price_min", "3000");
  location.href = url.toString();
}, 300);
