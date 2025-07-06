import { CustomButton } from './CustomButton';
import { InputField } from 'components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
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
import { feedbackSchema } from '../validations/feedbackValidation';
import { Link } from 'react-router-dom';
import { Spinner } from './Spinner';
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
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onChange',
  });

  const [sendFeedback, { isLoading }] = useSendFeedbackMutation();

  const onSubmit = async (data: FormData) => {
    const { email, feedback } = data;
    try {
      await sendFeedback({ email, feedback }).unwrap();

      showToast({
        title: 'Ваше повідомлення відправлено',
        description: 'Відповідь прийде на пошту',
        status: 'success',
      });

      reset();
      navigate('/');
      dispatch(clearError());
      dispatch(closeDialog());
    } catch (err) {
      showToast({
        title: 'Щось пішло не так',
        description: 'Помилка при надсиланні відгуку',
        status: 'error',
      });
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
        className="w-[455px] min-h-[503px] rounded-[30px] p-0 bg-white dark:bg-dialog text-center gap-0 overflow-hidden"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="dialog-content"
        aria-describedby={undefined}
      >
        <DialogClose className="absolute top-[13px] right-[13px] focus:outline-none focus-visible:outline-none">
          <CloseSVG fill="white" size="30" />
        </DialogClose>
        <DialogHeader className="h-[52px] bg-default-btn dark:bg-header p-16">
          <DialogTitle className="text-sm leading-[140%] text-white">
            Dim Tvaryn
          </DialogTitle>
        </DialogHeader>
        <div className="px-16 py-32">
          <p className="text-default-btn rounded-[20px] bg-dialog dark:bg-main px-12 py-16 text-sm text-left mb-16">
            Добрий день! Раді вітати Вас на нашому сайті. <br />
            Якщо у Вас є запитання чи пропозиції напишіть нам.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col text-left m-0"
          >
            <InputField
              placeholder="Email*"
              className="h-40 text-[16px]"
              labelSize="base"
              id="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <TextareaDemo
              id="feedback"
              placeholder="Повідомлення*"
              {...register('feedback')}
              error={errors.feedback?.message}
              className="max-w-[423px] mb-16 h-[115px] text-[16px] text-wrap"
            />
            <Controller
              name="checkbox"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  id="checkbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  error={errors.checkbox?.message}
                  className="mt-16"
                >
                  <p>Я згоден на обробку моїх персональних даних</p>
                  <Link
                    to="/privacy-policy"
                    onClick={() => dispatch(closeDialog())}
                    className="cursor-pointer underline"
                  >
                    Політика конфіденційності
                  </Link>
                </CustomCheckbox>
              )}
            />

            <DialogFooter>
              <CustomButton
                type="submit"
                styleType="defaultButton"
                className="mt-32 text-base"
              >
                {isLoading ? <Spinner /> : 'Відправити'}
              </CustomButton>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogFeedbackForm;
