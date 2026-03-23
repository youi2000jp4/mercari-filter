// メルカリ検索を「新しい順・個人出品」に自動設定
(function () {
  const url = new URL(location.href);
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
})();
