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
    * - 入力文字列に何も入っていなかったら初期値入力
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

    if(model.cons_list.length == 0){
      model.cons_list = "ptk".split("");
    }

    if(model.vowel_list.length == 0){
      model.vowel_list = "ieaou".split("");
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
    let word_result = this.gen_cons(model, "", word_len);
    return word_result;
  }

  /**
    * 最小値～最大値までの文字数を生成するが、
    * 生成アルゴリズムは子音・母音を交互に行う
@startuml(generate_word.svg)
[*] --> 子音
子音 -> 母音 : [生成文字列長 ＜ 目標文字列長]
子音 --> [*] : [生成文字列長 ≧ 目標文字列長]
母音 -> 子音 : [生成文字列長 ＜ 目標文字列長]
母音 --> [*] : [生成文字列長 ≧ 目標文字列長]
@enduml
    */
  gen_cons(model, word, limit){
    // 文字抽出
    const ch = model.cons_list[this.randi(model.cons_list.length)];
    let wordN = word + ch;
    if(wordN.length < limit){
      wordN = this.gen_vowel(model, wordN, limit);
    }
    return wordN;
  }
  gen_vowel(model, word, limit){
    // 文字抽出
    const ch = model.vowel_list[this.randi(model.vowel_list.length)];
    let wordN = word + ch;
    if(wordN.length < limit){
      wordN = this.gen_cons(model, wordN, limit);
    }
    return wordN;
  }
  
}
