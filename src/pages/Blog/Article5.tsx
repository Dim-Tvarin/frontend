const Article5 = () => {
  return (
    <div className="container">
      <article className="gap-20 grid grid-cols-1 xl:grid-cols-2 mt-100 mb-64">
        <div className="font-normal text-base text-left">
          <h1 className="mb-16 font-bold text-3xl">
            ТЕСТ Знайди звіра, який впишеться в твій лайфстайл!
          </h1>
          <ol className="flex flex-col mt-16 ml-16 pl-5 list-decimal">
            <li>
              Твій улюблений день тижня - це...
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>A) Будь-який, коли можна нічого не робити.</li>
                <li>B) Вихідний, щоб трохи розвіятися.</li>
                <li>C) Кожен день - це пригода!</li>
                <li>D) День, коли я можу спокійно спостерігати за світом.</li>
              </ul>
            </li>
            <li className="mt-16">
              Твоя реакція на несподівані зміни планів:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>A) &quot;А можна я просто полежу?&quot;</li>
                <li>B) &quot;Ну, ок, пристосуємось.&quot;</li>
                <li>C) &quot;Круто! Нові можливості!&quot;</li>
                <li>D) &quot;Це трохи тривожно, але я впораюсь.&quot;</li>
              </ul>
            </li>
            <li className="mt-16">
              Твій улюблений вид спорту (або активності):
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>A) Дрімота - це олімпійський вид спорту!</li>
                <li>B) Прогулянки, йога, щось не надто виснажливе.</li>
                <li>
                  C) Марафонський біг, екстремальний спорт, танці до упаду!
                </li>
                <li>D) Спостереження за птахами, плавання (якщо акваріум).</li>
              </ul>
            </li>
            <li className="mt-16">
              Твоє ставлення до галасливих компаній:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>A) &quot;Тихо! Я сплю!&quot;</li>
                <li>B) Люблю компанію, але іноді потрібен спокій.</li>
                <li>C) Чим гучніше, тим веселіше!</li>
                <li>
                  D) Віддаю перевагу тихій компанії або одиночним розвагам.
                </li>
              </ul>
            </li>
            <li className="mt-16">
              Твоє ставлення до обіймів (і ніжностей):
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>A) Обійми? Тільки якщо це дуже потрібно.</li>
                <li>B) Люблю обійми, але не постійно.</li>
                <li>C) Я - обіймальна машина! Дайте мені всі обійми!</li>
                <li>D) Люблю ніжні погладжування та увагу.</li>
              </ul>
            </li>
            <li className="mt-16">
              Твоя улюблена музика:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>A) Звуки сну.</li>
                <li>B) Спокійна музика, поп, щось ненав&#39;язливе.</li>
                <li>C) Енергійна музика, рок, реп, техно!</li>
                <li>D) Мелодійні звуки природи, класика.</li>
              </ul>
            </li>
            <li className="mt-16">
              Твоє ставлення до пригод:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>A) Пригоди? А можна я просто залишусь вдома?</li>
                <li>B) Не проти пригод, але не надто екстремальних.</li>
                <li>C) Я - король (або королева) пригод!</li>
                <li>D) Пригоди? Тільки якщо вони безпечні та передбачувані.</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="font-normal text-base text-left"></div>
      </article>
    </div>
  );
};

export default Article5;
