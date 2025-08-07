
/*
  <table class="table table-striped sortable">
    <thead>
      <tr>
        <th data-sortable>���O</th>
        <th data-sortable>�o�^�Ґ�</th>
        <th data-sortable>�Đ���</th>
        <th>���l</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Channel A</td><td>12,345</td><td>1,234,567</td><td>?</td></tr>
      <tr><td>Channel B</td><td> 9,876</td><td>2,345,678</td><td>?</td></tr>
      <!-- ... -->
      
      
�y�|�C���g����z
data-sortable ����
�@�w�b�_�[�Z���i<th>�j�ɂ����t���邾���ŁA���̗񂪃N���b�N�\�ɂȂ�܂��B

�e�[�u���P�ʂ̃N���X�w��
�@<table class="sortable"> ��t�^����ƁA�����őS��Ƀ\�[�g�@�\���o�C���h���܂��B

�����ƕ�����̎�������
�@���l���ǂ����𔻒肵�A���l��͑召��r�A�������̓��P�[���t���\�[�g���g���Ă��܂��B

�ėp��
�@�ǂ̃y�[�W�ł� sortable.js ��ǂݍ��ނ����œ���BHTML�͍ŏ����̃}�[�N�A�b�v�ύX��OK�B

�A�C�R���ǉ�
�@th.dataset.order �̏�ԁiasc/desc�j���Ď����ACSS��^���v�f�Ł�����\��������ƁA���o�I�ɂ�������₷���Ȃ�܂��B
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
    // ���݂̃\�[�g�����擾�E���]
    const th = this.headers[colIndex];
    let order = th.dataset.order === 'asc' ? 'desc' : 'asc';
    // ���̗�̕\�������Z�b�g
    this.headers.forEach(h => h.dataset.order = 'none');
    th.dataset.order = order;

    // �s��z��
    const rows = Array.from(this.tbody.rows);
    rows.sort((a, b) => {
      const aText = a.cells[colIndex].textContent.trim();
      const bText = b.cells[colIndex].textContent.trim();
      // ���l���ǂ�������
      const aNum = parseFloat(aText.replace(/,/g, ''));
      const bNum = parseFloat(bText.replace(/,/g, ''));
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return (aNum - bNum) * (order === 'asc' ? 1 : -1);
      }
      return aText.localeCompare(bText, undefined, {numeric: true}) * (order === 'asc' ? 1 : -1);
    });

    // �\�[�g��ɍĕ`��
    rows.forEach(row => this.tbody.appendChild(row));
  }
}

// DOM�ǂݍ��݌�A�����ŏ�����
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('table.sortable').forEach(table => {
    new SortableTable(table);
  });
});