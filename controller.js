/**
 * 画面上の項目値をmodelオブジェクトに反映
 * 
 * @method view2model
 * @return {Object}
 */
function view2model(){
  let model = {};
  model.char_list = $("#char_list").val();
  model.num_min = (0 - $("#num_min").val()) * -1;
  model.num_max = (0 - $("#num_max").val()) * -1;
  model.word_result = $("#word_result").text();
  return model;
}

/**
 * modelオブジェクトの値を画面上に反映
 * 
 * @method model2view
 * @param {Object}
 */
function model2view(model){
  $("#char_list").val(model.char_list);
  $("#num_min").val(model.num_min);
  $("#num_max").val(model.num_max);
  $("#word_result").text(model.word_result);
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
  let model = view2model();
  let w = new WordGenerator();
  let vmodel = w.validate(model)
  const result = w.generate(vmodel);
  vmodel.word_result = result;
  model2view(vmodel);
}

/*
 * 画面ロード時の処理
 */
$(()=>{
  // 画面に初期値入力
  $("#char_list").val("ieaoupbmftdnlrskgmnŋ");
  $("#num_min").val(3);
  $("#num_max").val(6);
  // 単語生成ボタンのクリックイベント
  $("#do_generate").click(do_generate);
});