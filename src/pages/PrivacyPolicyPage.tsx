const PrivacyPolicyPage = () => {
  return (
    <div className="px-16 py-50 md:px-24 pt-32 pb-64 text-[16px] sm:text-[16px] md:text-[18px] text-default-btn leading-[1.6]">
      <div className="container text-left">
        <h1 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold mb-24 text-center">
          Політика конфіденційності
        </h1>

        <section className="mb-32">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-8 text-left">
            1. Загальні положення
          </h2>
          <p className="text-justify">
            Ця Політика конфіденційності описує, як ми збираємо, використовуємо,
            передаємо та зберігаємо персональні дані користувачів нашого
            маркетплейсу для прилаштування тварин. Використовуючи наш застосунок
            або сайт, ви погоджуєтесь із правилами обробки даних, викладеними
            нижче.
          </p>
        </section>

        <section className="mb-32">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-8 text-left">
            2. Використання та мета збору даних
          </h2>
          <p className="text-justify">
            Персональні дані (наприклад, email, імʼя, IP-адреса) збираються лише
            з метою:
          </p>
          <ul className="flex flex-col list-disc pl-20 mt-8 text-justify">
            <li>відповіді на ваші звернення через форму фідбеку</li>
            <li>аналітики використання сайту з метою його покращення</li>
            <li>інформування вас про важливі оновлення (за вашої згоди)</li>
          </ul>
        </section>

        <section className="mb-32">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-8 text-left">
            3. Cookies та аналітика
          </h2>
          <p className="text-justify">
            Ми використовуємо cookies для збереження налаштувань користувача та
            збирання аналітичних даних (Google Analytics, Microsoft Clarity). Ви
            можете вимкнути cookies у своєму браузері, однак це може вплинути на
            функціональність сайту.
          </p>
        </section>

        <section className="mb-32">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-8 text-left">
            4. Надання даних третім особам
          </h2>
          <p className="text-justify">
            Ми не продаємо та не передаємо ваші дані третім особам, окрім
            випадків, коли це вимагається законом або ви безпосередньо надаєте
            таку згоду.
          </p>
        </section>

        <section className="mb-32">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-8 text-left">
            5. Захист персональних даних
          </h2>
          <p className="text-justify">
            Ми застосовуємо технічні та організаційні заходи для захисту вашої
            інформації від несанкціонованого доступу, зміни або знищення.
          </p>
        </section>

        <section className="mb-32">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-8 text-left">
            6. Використання застосунку дітьми
          </h2>
          <p className="text-justify">
            Наш застосунок доступний для використання дітьми, однак
            відповідальність за дії дітей несе їхній законний представник
            (батьки або опікуни). Якщо ви дозволяєте дитині користуватись
            сервісом — ви погоджуєтесь з тим, що повністю несете
            відповідальність за її дії.
          </p>
        </section>

        <section className="mb-32">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-8 text-left">
            7. Зміни до політики
          </h2>
          <p className="text-justify">
            Ми можемо періодично оновлювати цю Політику. Остання дата оновлення:
            5 червня 2025 року. Рекомендуємо періодично переглядати сторінку,
            щоб бути в курсі змін.
          </p>
        </section>

        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-8 text-left">
            8. Контакти
          </h2>
          <p className="text-justify">
            Якщо у вас виникли питання, звертайтесь на електронну пошту:{' '}
            <a href="mailto:DimTvaryn@meta.ua" className="underline text-link">
              DimTvaryn@meta.ua
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
