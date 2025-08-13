import { useState } from 'react';

export const PhoneReveal = ({
  phone,
  className,
}: {
  phone: string;
  className?: string;
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const maskedPhone = phone.replace(/(\+380)(\d{2})\d{5}\d{2}/, '$1ХХХХХХХ');

  return (
    <div
      className={`${className} grid items-center xl:gap-50 text-lg xl:grid-cols-2 xl:w-[320px]`}
    >
      <span className=" font-medium">{isRevealed ? phone : maskedPhone}</span>
      {!isRevealed && (
        <button
          onClick={() => setIsRevealed(true)}
          className="text-link hover:text-blue-600 transition whitespace-nowrap"
        >
          Показати номер
        </button>
      )}
    </div>
  );
};
