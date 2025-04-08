import { useState } from "react";

export const PhoneReveal = ({ phone, className }: { phone: string; className?: string;}) => {
  const [isRevealed, setIsRevealed] = useState(false)

  const maskedPhone = phone.replace(/(\+380)(\d{2})\d{5}\d{2}/, '$1ХХХХХХХ')

  return (
    <div className={`${className} flex items-center gap-50`}>
      <span className="text-xl font-medium">
        {isRevealed ? phone : maskedPhone}
      </span>
      {!isRevealed && (
        <button
          onClick={() => setIsRevealed(true)}
          className="text-xl text-link hover:text-blue-600 transition"
        >
          Показати номер
        </button>
      )}
    </div>
  )
}