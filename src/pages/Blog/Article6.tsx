import { useNavigate } from 'react-router';
import articleImg from '../../assets/article-6.1.jpg';
import articleImg1 from '../../assets/article-6.2.jpg';
import { CustomButton } from 'components/CustomButton';

const Article6 = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <article className="gap-20 grid grid-cols-1 md:grid-cols-2 mt-100 mb-64">
        <div className="font-normal text-base text-left">
          <div className="relative bg-orange mb-40 rounded-[30px] w-[348px] md:w-[627px] h-[240px] md:h-[431px]">
            <img
              src={articleImg}
              alt="дівчата тримає собаку за лапу"
              className="bottom-0 left-0 absolute rounded-[30px] w-[332px] md:w-[611px] h-[224px] md:h-[415px]"
            />
          </div>
          <h2 className="mb-16 font-semibold text-xl">Терапевтична роль</h2>
          <p>
            Анімалотерапія (лікування за допомогою тварин) активно
            використовується в лікарнях, будинках для літніх людей,
            реабілітаційних центрах. Спілкування з тваринами допомагає пацієнтам
            подолати емоційні труднощі, пришвидшує одужання та підвищує
            мотивацію до лікування. Наприклад, собаки-терапевти часто працюють з
            дітьми з аутизмом, людьми з посттравматичними розладами та іншими
            психічними проблемами.
          </p>
          <h2 className="mt-32 mb-16 font-semibold text-xl">Взаємна вигода</h2>
          <p>
            Відносини між людиною і твариною — це приклад гармонійної взаємодії.
            Люди надають тваринам захист, їжу та любов, а ті у відповідь дарують
            тепло, безумовну підтримку та навіть рятують життя. Службові
            тварини, як-от собаки-поводирі чи рятувальники, — незамінні
            помічники в повсякденному житті людей з обмеженими можливостями.
          </p>
          <p className="mt-16">
            Тварини не просто супутники — вони друзі, помічники й терапевти.
            Їхній вплив на наше життя глибокий і багатогранний. Дбайливе
            ставлення до братів наших менших — це шлях до здоровішого,
            щасливішого суспільства.
          </p>
        </div>

        <div className="font-normal text-base text-left">
          <h1 className="md:mt-[465px] 2xl:mt-0 mb-16 font-bold text-3xl">
            Сила лап і сердець: як тварини змінюють життя людей
          </h1>
          <p>
            У сучасному світі взаємодія людини з тваринами набуває все більшого
            значення. Домашні улюбленці, дикі тварини, а також терапевтичні й
            службові тварини відіграють важливу роль у фізичному й
            психологічному добробуті людей. Цей взаємозв’язок не лише дарує
            радість, але й має глибокий вплив на наше ментальне здоров’я.
          </p>
          <h2 className="mt-32 mb-16 font-semibold text-xl">
            Емоційна підтримка та психічне здоров’я
          </h2>
          <p>
            Домашні тварини, особливо собаки та коти, часто стають для людей
            джерелом емоційної підтримки. Вони здатні знижувати рівень стресу,
            тривожності та навіть симптоми депресії. Дослідження показують, що
            спілкування з тваринами стимулює вироблення «гормону щастя» —
            окситоцину, що покращує настрій і сприяє відчуттю прив’язаності.
          </p>
          <div className="relative bg-orange mt-50 mb-40 rounded-[30px] w-[346px] xl:w-[630px] h-[275px] xl:h-[500px]">
            <img
              src={articleImg1}
              alt="діти обіймаюсь собаку"
              className="bottom-0 left-0 absolute rounded-[30px] w-[338px] xl:w-[615px] h-[266px] xl:h-[484px]"
            />
          </div>
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

export default Article6;
