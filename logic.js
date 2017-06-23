/**
 * 0～引数までの範囲の整数の乱数を生成
 * 
 * @method randi
 * @param {Int} value 乱数の最大値 + 1
 */
function randi(value){
  return Math.floor(Math.random() * value);
}

/**
 * 画面上の項目値を大域変数window.modelに反映
 * 
 * @method view2model
 */
function view2model(){
  var _model = window.model;
  _model.char_list = $("#char_list").val();
  _model.num_min = (0 - $("#num_min").val()) * -1;
  _model.num_max = (0 - $("#num_max").val()) * -1;
  _model.word_result = $("#word_result").text();
  window.model = _model;
}

/**
 * 大域変数window.modelの値を画面上に反映
 * 
 * @method model2view
 */
function model2view(){
  var _model = window.model;
  $("#char_list").val(_model.char_list);
  $("#num_min").val(_model.num_min);
  $("#num_max").val(_model.num_max);
  $("#word_result").text(_model.word_result);
}

/**
 * 画面項目の不正値を大域変数内でチェックし、なおせるものはなおす
 * - 入力文字列に何も入っていなかったら初期値(ieaou)入力
 * - 最小値が範囲外だったら初期値(3)入力
 * - 最大値が範囲外だったら初期値(6)入力
 * - 最小値と最大値が逆だったら入れ替え
 *
 * @method validate
 */
function validate(){
  var _model = window.model;
  if(_model.char_list == ""){
    _model.char_list = "ieaou";
  }
  
  if(_model.num_min < 1 || _model.num_min > 10){
    _model.num_min = 3;
  }
  
  if(_model.num_max < 1 || _model.num_max > 10){
    _model.num_max = 6;
  }
  
  if(_model.num_min > _model.num_max){
    var temp = _model.num_min;
    _model.num_min =_model.num_max;
    _model.num_max = temp;
  }
  window.model = _model;
}

/**
 * 単語を生成する
 * 入力文字列に入力されている文字を利用し
 * 最小値～最大値までの文字数のランダムな単語を
 * 出力文字欄に出力する
 *
 * @method do_generate
 */
function do_generate(){
  // 画面上の不正値を補正
  view2model();
  validate();
  var _model = window.model;
  
  // 生成文字列長を決定
  var word_len = randi(_model.num_max - _model.num_min + 1) + _model.num_min;
  var char_list = _model.char_list.split("");
  var word_result = "";
  for(var i = 0; i < word_len; i++){
    word_result += char_list[randi(char_list.length)];
  }
  _model.word_result = word_result;
  model2view();
}

/*
 * 画面ロード時の処理
 */
$(()=>{
  // 汎用大域変数を初期化
  window.model = {};
  // 画面に初期値入力
  $("#char_list").val("ieaoupbmftdnlrskgmnŋ");
  $("#num_min").val(3);
  $("#num_min").val(6);
  // 単語生成ボタンのクリックイベント
  $("#do_generate").click(do_generate);
});