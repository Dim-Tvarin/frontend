import articleImg from '../../assets/article-1.jpg';

const Article1 = () => {
  return (
    <div className="container">
      <article className="gap-20 grid grid-cols-2 mt-100 mb-50">
        <div className="font-normal text-base text-left">
          <div className="relative bg-orange mb-40 rounded-[30px] w-[627px] h-[287px]">
            <img
              src={articleImg}
              alt="дівчата градять котика"
              className="bottom-0 left-0 absolute w-[611px] h-[271px]"
            />
          </div>
          <h2 className="mb-16 font-semibold text-xl">Вибір виду тварини:</h2>
          <p>
            Найпопулярніші домашні улюбленці – це собаки та коти, але існують й
            інші варіанти.
          </p>

          <ul className="flex flex-col mt-16 ml-16 pl-5 list-disc">
            <li>
              Собаки:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>
                  Переваги: Вірність, відданість, можливість дресирування,
                  активні ігри.
                </li>
                <li>
                  Недоліки: Потреба у регулярних прогулянках, дресируванні,
                  більші витрати на утримання.
                </li>
                <li>
                  Фактори вибору: Розмір породи, рівень енергії, складність
                  дресирування, особливості догляду за шерстю.
                </li>
              </ul>
            </li>
          </ul>
          <ul className="flex flex-col mt-16 ml-16 pl-5 list-disc">
            <li>
              Коти:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>
                  Переваги: Незалежність, чистоплотність, менші витрати на
                  утримання.
                </li>
                <li>
                  Недоліки: Менша потреба у спілкуванні, можливі проблеми з
                  поведінкою (дряпання меблів, мічення території у некастрованих
                  котиків).
                </li>
                <li>
                  Фактори вибору: Рівень активності, потреба у спілкуванні,
                  наявність алергії у членів сім&#39;ї.
                </li>
              </ul>
            </li>
          </ul>

          <ul className="flex flex-col mt-16 ml-16 pl-5 list-disc">
            <li>
              Інші тварини:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>Гризуни (хом&#39;яки, морські свинки, кролики):</li>
                <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                  <li>
                    Переваги: Невеликі розміри, відносна простота у догляді.
                  </li>
                  <li>
                    Недоліки: Нічний спосіб життя у деяких видів, специфічні
                    вимоги до утримання.
                  </li>
                </ul>
                <li>Птахи:</li>
                <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                  <li>
                    Переваги: Можливість навчання розмови, цікава поведінка.
                  </li>
                  <li>
                    Недоліки: Потреба у просторій клітці, шум, складність
                    догляду за пір&#39;ям.
                  </li>
                </ul>
                <li>Риби:</li>
                <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                  <li>Переваги: Спокій, медитативний ефект.</li>
                  <li>
                    Недоліки: Складність догляду за акваріумом, обмежені
                    можливості взаємодії.
                  </li>
                </ul>
              </ul>
            </li>
          </ul>
        </div>

        <div className="text-base text-left">
          <h1 className="mb-16 font-bold text-3xl">
            Знайдіть свого ідеального компаньйона: Поради щодо вибору тварини
          </h1>
        </div>
      </article>
    </div>
  );
};

export default Article1;
