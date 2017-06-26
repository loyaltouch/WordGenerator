/**
  * 
  * 単語生成器の主機能
  * @class WordGenerator
  */
class WordGenerator{
  /**
    * 0～引数までの範囲の整数の乱数を生成
    * 
    * @method randi
    * @param {Int} value 乱数の最大値 + 1
    * @return {Int}
    */
  randi(value){
    return Math.floor(Math.random() * value);
  }

  /**
    * 引数の不正値をチェックし、なおせるものはなおす
    * - 入力文字列に何も入っていなかったら初期値(ieaou)入力
    * - 最小値が範囲外だったら初期値(3)入力
    * - 最大値が範囲外だったら初期値(6)入力
    * - 最小値と最大値が逆だったら入れ替え
    *
    * @method validate
    * @param {Object} チェック対象のデータセット
    * @return {Object} チェック結果のデータセット
    */
  validate(model){
    if(model.char_list == ""){
      model.char_list = "ieaou";
    }
    
    if(model.num_min < 1 || model.num_min > 50){
      model.num_min = 3;
    }
    
    if(model.num_max < 1 || model.num_max > 50){
      model.num_max = 6;
    }
    
    if(model.num_min > model.num_max){
      let temp = model.num_min;
      model.num_min =model.num_max;
      model.num_max = temp;
    }
    return model;
  }
  
  /**
    * 単語を生成する
    * 入力文字列に入力されている文字を利用し
    * 最小値～最大値までの文字数のランダムな単語を
    * 出力文字として出力する
    *
    * @method generate
    * @param {Object} 入力データセット
    * @return {String} 出力文字列
    */
  generate(model){
    // 生成文字列長を決定
    const word_len = this.randi(model.num_max - model.num_min + 1) + model.num_min;
    // 単語生成
    const char_list = model.char_list.split("");
    let word_result = "";
    for(let i = 0; i < word_len; i++){
      word_result += char_list[this.randi(char_list.length)];
    }
    return word_result;
  }
}
