<html>

<style>
th,td {
  border: 1px solid #ddd;
  padding: 8px;
}


/* 1. th を相対配置にして余白を調整 */
th[data-sortable] {
  position: relative;
  padding-right: 1.8em; /* アイコン分の余白 */
  cursor: pointer;
}

/* 2. 上矢印（▲）を ::before で常時表示 */
th[data-sortable]::before {
  content: '▲';
  position: absolute;
  top: 0.4em;
  right: 0.2em;
  font-size: 0.7em;
  color: #ccc;         /* デフォルトは薄いグレー */
  line-height: 1;
}

/* 3. 下矢印（▼）を ::after で常時表示 */
th[data-sortable]::after {
  content: '▼';
  position: absolute;
  top: 1.4em;
  right: 0.2em;
  font-size: 0.7em;
  color: #ccc;         /* デフォルトは薄いグレー */
  line-height: 1;
}

/* 4. 昇順ソート中の▲だけ色を濃く */
th[data-sortable][data-order="asc"]::before {
  color: #000;
}

/* 5. 降順ソート中の▼だけ色を濃く */
th[data-sortable][data-order="desc"]::after {
  color: #000;
}
</style>
<body>
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
      <tr><td>アイザワ</td><td>12,345</td><td>1,234,567</td><td>—</td></tr>
      <tr><td>イシカワ/td><td> 5,476</td><td>2,145,689</td><td>—</td></tr>
     <tr><td>ウチヤマ</td><td>10,148</td><td>1,547,118</td><td>—</td></tr>
      <tr><td>エンドウ</td><td> 9,876</td><td>3,345,548</td><td>—</td></tr>
</tbody>
  </table>
    <script src="sortable.js"></script>
  </body>
  </html>