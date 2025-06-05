import { CustomButton } from './CustomButton';
import { InputField } from 'components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { clearError } from '../redux/users/usersSlice';
import CloseSVG from '../assets/CloseSVG';
import {
  Dialog,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import { closeDialog } from '../redux/dialogs/dialogSlice';
import { useEffect } from 'react';
import { showToast } from './Toast';
import CustomCheckbox from './CustomCheckbox';
import { TextareaDemo } from './CustomTextarea';
import { useSendFeedbackMutation } from 'src/redux/feedback/feedbackApi';
import { feedbackSchema } from 'validations/feedbackValidation';
import { Link } from 'react-router-dom';
type FormData = z.infer<typeof feedbackSchema>;

const DialogFeedbackForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onChange',
  });

  const [sendFeedback] = useSendFeedbackMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await sendFeedback(data).unwrap();
      showToast({
        title: 'Ваше повідомлення відправлено',
        description: 'Відповідь прийде на пошту',
        status: 'success',
      });
    } catch (err) {
      showToast({
        title: 'Щось пішло не так',
        description: 'Помилка при надсиланні відгуку',
        status: 'error',
      });
    } finally {
      reset();
      navigate('/');
      dispatch(clearError());
      dispatch(closeDialog());
    }
  };
  return (
    <Dialog
      open={activeDialog === 'feedback'}
      onOpenChange={() => {
        dispatch(clearError());
        dispatch(closeDialog());
      }}
    >
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        className="w-[413px] min-h-[463px] rounded-[30px] p-32 bg-dialog text-center gap-0"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="dialog-content"
        aria-describedby={undefined}
      >
        <DialogClose className="absolute top-24 right-24 focus:outline-none focus-visible:outline-none">
          <CloseSVG />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl leading-[140%] text-default-btn mb-30">
            Dim Tvaryn
          </DialogTitle>
        </DialogHeader>
        <p>
          Добрий день! Раді вітати Вас на нашому сайті. Якщо у Вас є запитання
          чи пропозиції напишіть нам.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-left m-0"
        >
          <InputField
            label="Електронна пошта"
            placeholder="Email*"
            className="h-40 w-[349px] text-[16px] mb-16"
            labelSize="base"
            labelClass="text-input-border mb-16"
            id="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <TextareaDemo
            id="feedback"
            placeholder="Повідомлення*"
            {...register('feedback')}
            error={errors.feedback?.message}
          />
          <CustomCheckbox
            id="checkbox"
            label="Я згоден на обробку моїх персональних даних"
            {...register('checkbox')}
            error={errors.checkbox?.message}
          >
            <Link to="/privacy-policy">Політика конфіденційності</Link>
          </CustomCheckbox>
          <DialogFooter>
            <CustomButton
              type="submit"
              styleType="defaultButton"
              className="mt-32 w-[196px] h-[44px] text-base"
            >
              Відправити
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default DialogFeedbackForm;
