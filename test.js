import test from 'ava';
import nbsp from './';

var nbspCount = function(text) {
  return text.match(/&nbsp;/g).length;
};

test(t => {
  const not_exists = nbsp();
  t.is(not_exists.message, "Error#options: the `input` parameter isn't specified");
});

test(t => {
  // lang: ru, only string
  const s1 = 'Шла Саша по шоссе и сосала сушку';
  const s2 = 'Ребята не стоит вскрывать этот код. Вы молодые, шутливые, вам все легко.';
  const s3 = 'Впрочем, на этот раз страх встречи с своею кредиторшей даже его самого поразил по выходе на улицу.';

  const res1 = nbsp({ s: s1, l: 'ru' });
  const res2 = nbsp({ s: s2, l: 'ru' });
  const res3 = nbsp({ s: s3, l: 'ru' });

  const count1 = nbspCount(res1);
  const count2 = nbspCount(res2);
  const count3 = nbspCount(res3);

  t.is(count1, 2);
  t.is(count2, 2);
  t.is(count3, 4);
});

test(t => {
  // lang: ru, file...
  const res1 = nbsp({ i: 'input.txt', l: 'ru' });

  const count1 = nbspCount(res1);

  t.is(count1, 12);
});
