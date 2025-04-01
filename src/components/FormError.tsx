interface FormErrorProps {
  error: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  return (
    <p className="text-left text-error-input leading-[125%] text-xs font-normal mt-[10px]">
      {error}
    </p>
  );
};

export default FormError;
