# JavaScript_sort

`<table class="table table-striped sortable">`
`    <thead>`
`      <tr>`
`        <th data-sortable>名前</th>`

`        <th data-sortable>登録者数</th>`

`        <th data-sortable>再生数</th>`
`        <th>備考</th>`
`      </tr>`
`    </thead>`
`    <tbody>`
`      <tr><td>Channel A</td><td>12,345</td><td>1,234,567</td><td>?</td></tr>`
`      <tr><td>Channel B</td><td> 9,876</td><td>2,345,678</td><td>?</td></tr>`
`      <!-- ... -->`
`    </tbody>`
`</table>`
`<script src="sortable.js"></script>``


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
