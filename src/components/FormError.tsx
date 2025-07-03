interface FormErrorProps {
  error: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  return (
    <p className="text-left text-error-input leading-[125%] text-sm font-normal mt-[10px] mb-16">
      {error}
    </p>
  );
};

export default FormError;
