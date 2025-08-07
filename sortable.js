
/*
  <table class="table table-striped sortable">
    <thead>
      <tr>
        <th data-sortable>名前</th>
        <th data-sortable>登録者数</th>
        <th data-sortable>再生数</th>
        <th>備考</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Channel A</td><td>12,345</td><td>1,234,567</td><td>?</td></tr>
      <tr><td>Channel B</td><td> 9,876</td><td>2,345,678</td><td>?</td></tr>
      <!-- ... -->
      
      
【ポイント解説】
data-sortable 属性
　ヘッダーセル（<th>）にこれを付けるだけで、その列がクリック可能になります。

テーブル単位のクラス指定
　<table class="sortable"> を付与すると、自動で全列にソート機能をバインドします。

数字と文字列の自動判別
　数値かどうかを判定し、数値列は大小比較、文字列列はロケール付きソートを使っています。

汎用化
　どのページでも sortable.js を読み込むだけで動作。HTMLは最小限のマークアップ変更でOK。

アイコン追加
　th.dataset.order の状態（asc/desc）を監視し、CSSや疑似要素で▲▼を表示させると、視覚的にも分かりやすくなります。
*/


// sortable.js
class SortableTable {
  constructor(table) {
    this.table = table;
    this.tbody = table.tBodies[0];
    this.headers = Array.from(table.querySelectorAll('th[data-sortable]'));
    this._bindEvents();
  }

  _bindEvents() {
    this.headers.forEach((th, idx) => {
      th.style.cursor = 'pointer';
      th.dataset.order = 'none'; // 'asc' | 'desc' | 'none'
      th.addEventListener('click', () => this._sortByColumn(idx));
    });
  }

  _sortByColumn(colIndex) {
    // 現在のソート順を取得・反転
    const th = this.headers[colIndex];
    let order = th.dataset.order === 'asc' ? 'desc' : 'asc';
    // 他の列の表示をリセット
    this.headers.forEach(h => h.dataset.order = 'none');
    th.dataset.order = order;

    // 行を配列化
    const rows = Array.from(this.tbody.rows);
    rows.sort((a, b) => {
      const aText = a.cells[colIndex].textContent.trim();
      const bText = b.cells[colIndex].textContent.trim();
      // 数値かどうか判定
      const aNum = parseFloat(aText.replace(/,/g, ''));
      const bNum = parseFloat(bText.replace(/,/g, ''));
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return (aNum - bNum) * (order === 'asc' ? 1 : -1);
      }
      return aText.localeCompare(bText, undefined, {numeric: true}) * (order === 'asc' ? 1 : -1);
    });

    // ソート後に再描画
    rows.forEach(row => this.tbody.appendChild(row));
  }
}

// DOM読み込み後、自動で初期化
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('table.sortable').forEach(table => {
    new SortableTable(table);
  });
});