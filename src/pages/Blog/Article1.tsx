import { CustomButton } from 'components/CustomButton';
import articleImg from '../../assets/article-1.jpg';
import { useNavigate } from 'react-router';

const Article1 = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <article className="gap-20 grid grid-cols-1 md:grid-cols-2 mt-100 mb-64">
        <div className="font-normal text-base text-left">
          <div className="relative bg-orange mb-40 rounded-[30px] w-[345px] md:w-[627px] h-[158px] md:h-[287px]">
            <img
              src={articleImg}
              alt="дівчата градять котика"
              className="bottom-0 left-0 absolute rounded-[30px] w-[336px] md:w-[611px] h-[150px] md:h-[271px]"
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

        <div className="font-normal text-base text-left">
          <h1 className="md:mt-[320px] 2xl:mt-0 mb-16 font-bold text-3xl">
            Знайдіть свого ідеального компаньйона: Поради щодо вибору тварини
          </h1>
          <p className="mb-32">
            Рішення про заведення домашньої тварини – це важливий крок, який
            вимагає відповідальності та обдуманості. Щоб забезпечити гармонійне
            співіснування та щасливе життя як для вас, так і для тварини,
            необхідно ретельно зважити свій спосіб життя, можливості та
            очікування. Цей розділ надасть вам корисні поради та фактори, які
            допоможуть зробити правильний вибір та знайти ідеального
            компаньйона.
          </p>
          <h2 className="mb-16 font-semibold text-xl">
            Вибір віку та темпераменту:
          </h2>
          <ul className="flex flex-col mt-16 ml-16 pl-5 list-disc">
            <li>
              Молоді тварини (цуценята, кошенята):
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>
                  Переваги: Легше піддаються дресируванню, швидше адаптуються до
                  нового дому.
                </li>
                <li>
                  Недоліки: Потребують більше часу та уваги, схильні до
                  пустощів, можливі проблеми зі здоров&#39;ям
                </li>
              </ul>
            </li>

            <li className="mt-16">
              Дорослі тварини:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>
                  Переваги: Більш спокійні, вже мають сформовані звички, менше
                  проблем з навчанням туалету.
                </li>
                <li>
                  Недоліки: Можуть мати проблеми з адаптацією, можливі проблеми
                  зі здоров&#39;ям, пов&#39;язані з віком.
                </li>
              </ul>
            </li>

            <li className="mt-16">
              Темперамент:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>Оцініть темперамент тварини, якщо це можливо.</li>
                <li>
                  Активна, грайлива тварина підійде активним людям, а спокійна –
                  тим, хто віддає перевагу спокійному відпочинку.
                </li>
                <li>
                  Зверніть увагу на ознаки страху, агресії або інших проблем з
                  поведінкою.
                </li>
              </ul>
            </li>
          </ul>
          <h2 className="mt-32 mb-16 font-semibold text-xl">
            Усиновлення з притулку vs. купівля у заводчика:
          </h2>
          <p>Розгляньте обидва варіанти та зважте їхні переваги та недоліки.</p>
          <ul className="flex flex-col mt-16 ml-16 pl-5 list-disc">
            <li>
              Усиновлення з притулку:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>
                  Переваги: Можливість врятувати життя тварині, менші витрати,
                  часто тварина вже стерилізована/кастрована та вакцинована.
                </li>
                <li>
                  Недоліки: Можливі проблеми зі здоров&#39;ям або поведінкою, не
                  завжди відоме походження тварини.
                </li>
              </ul>
            </li>
            <li className="mt-16">
              Купівля у заводчика:
              <ul className="flex flex-col space-y-1 mt-2 ml-12 pl-5 list-disc">
                <li>
                  Переваги: Можливість вибору конкретної породи, відома історія
                  здоров&#39;я, передбачуваний темперамент
                </li>
                <li>Недоліки: Висока вартість, підтримка розведення тварин</li>
              </ul>
            </li>
          </ul>
        </div>
      </article>
      <CustomButton
        className="z-10 bg-default-btn mb-100 rounded-[20px] w-[356px] h-[44px]"
        onClick={() => navigate(-1)}
      >
        Повернутися до попередньої сторінки
      </CustomButton>
    </div>
  );
};

export default Article1;
