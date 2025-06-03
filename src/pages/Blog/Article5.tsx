import articleImg from '../../assets/article-5.jpg';

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

        <div className="font-normal text-base text-left">
          <div className="relative justify-self-center bg-orange mb-40 rounded-[30px] w-[345px] md:w-[630px] h-[247px] md:h-[398px]">
            <img
              src={articleImg}
              alt="дівчина з хаски"
              className="bottom-0 left-0 absolute rounded-[30px] w-[335px] md:w-[614px] h-[231px] md:h-[382px]"
            />
          </div>
          <p className="font-semibold text-xl">Результати:</p>
          <ul className="flex flex-col mt-16 ml-16 pl-5 list-disc">
            <li className="font-bold">
              Переважно A: Ти - Диванний Король (або Королева)!
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 font-normal list-disc">
                <li>
                  Тобі потрібен Звіро-Бро, який розділить твою любов до затишку
                  та лінощів. Кіт - твій ідеальний партнер для дрімоти та
                  перегляду серіалів. Пам&#39;ятай, навіть королям потрібна
                  трохи уваги (і лоток!).
                </li>
              </ul>
            </li>
            <li className="mt-16 font-bold">
              Переважно B: Ти - Соціальний Метелик з Лапками (або Крильцями)!
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 font-normal list-disc">
                <li>
                  Тобі потрібен Звіро-Бро, з яким можна буде і потусити, і
                  відпочити. Собака середнього розміру або активний кіт - твій
                  вибір. Вони будуть раді твоїй компанії, але і дадуть тобі
                  трохи особистого простору.
                </li>
              </ul>
            </li>
            <li className="mt-16 font-bold">
              Переважно C: Ти - Танцюючий Ураган (з Хвостом)!
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 font-normal list-disc">
                <li>
                  Тобі потрібен Звіро-Бро, який зможе витримати твою енергію!
                  Енергійний собака - твій найкращий партнер для тренувань,
                  походів та інших шалених пригод. Головне - не забудь його
                  вчасно годувати, бо він, на відміну від тебе, не працює на
                  адреналіні!
                </li>
              </ul>
            </li>
            <li className="mt-16 font-bold">
              Переважно D: Ти - Ніжний Опікун (з Дбайливим Серцем)!
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 font-normal list-disc">
                <li>
                  Тобі потрібен Звіро-Друг, який буде радувати тебе своєю
                  ніжністю та потребуватиме твоєї турботи. Пташка або
                  хом&#39;ячок - твій найкращий компаньйон. Їхні маленькі
                  розміри, м&#39;які пір&#39;я (або пухнасті щічки) та милі
                  звички розтоплять твоє серце. Ти станеш для них джерелом
                  безпеки та любові, а вони подарують тобі безліч позитивних
                  емоцій.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
};

export default Article5;
