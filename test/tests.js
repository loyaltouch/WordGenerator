QUnit.test("hello test", assert => {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("num_maxよりnum_minが大きければ交換", assert => {
  let w = new WordGenerator();
  let model = {};
  model.num_min = 7;
  model.num_max = 5;
  result = w.validate(model);
  assert.equal(result.num_min, 5, "最小値のほうが小さい");
  assert.equal(result.num_max, 7, "最大値のほうが大きい");
});

QUnit.test("char_listに文字が入っていなければ既定値を入力", assert => {
  let w = new WordGenerator();
  let model = {};
  model.char_list = "";
  result = w.validate(model);
  assert.equal(result.char_list, "ieaou", "規定値ieaou");
});

