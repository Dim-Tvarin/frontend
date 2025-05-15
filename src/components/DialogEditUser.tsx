import * as Dialog from '@radix-ui/react-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import CloseSVG from 'src/assets/CloseSVG';
import { closeDialog } from 'src/redux/dialogs/dialogSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'src/redux/store';
import { DialogHeader, DialogOverlay } from './components/ui/dialog';

import UserProfileForm from './UserProfileForm';
import { useState } from 'react';
import UserPasswordForm from './UserPasswordForm';

const DialogEditUser: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );

  return (
    <Dialog.Root
      open={activeDialog === 'editUser'}
      onOpenChange={() => dispatch(closeDialog())}
    >
      <Dialog.Portal>
        <DialogOverlay className="fixed inset-0 bg-black/70 " />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          onPointerDownOutside={e => e.preventDefault()}
          aria-describedby="Забули пароль?"
        >
          <Dialog.Close className="absolute top-24 right-24 ">
            <CloseSVG size="24" />
          </Dialog.Close>
          <DialogHeader>
            <Dialog.Title className="text-2xl leading-[140%] text-default-btn mb-30">
              <Tabs
                defaultValue="account"
                value={activeTab}
                onValueChange={setActiveTab}
                className={`rounded-[30px]  text-center gap-0 bg-dialog ${
                  activeTab === 'account'
                    ? 'w-[965px] min-h-[589px] p-[60px] pb-[84px] '
                    : 'w-[630px] min-h-[481px] p-50'
                }`}
              >
                <TabsList className="felx gap-20 h-[44px]">
                  <TabsTrigger
                    value="account"
                    aria-orientation="vertical"
                    className="w-[185px] h-[44px] m-0 outline-none shadow-none rounded-[20px]
          data-[state=active]:shadow-none 
          data-[state=active]:outline-none 
          text-white hover:text-default-btn bg-default-btn hover:bg-orange hover:border-default-btn hover:border-2 disabled:bg-disabled  
          data-[state=active]:text-default-btn 
          data-[state=active]:bg-white 
          data-[state=active]:border-2
          data-[state=active]:border-default-btn 
          data-[state=active]:hover:border-orange"
                  >
                    Основна інформація
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    aria-orientation="vertical"
                    className="w-[185px] h-[44px] m-0 outline-none shadow-none rounded-[20px]
          data-[state=active]:shadow-none 
          data-[state=active]:outline-none 
          text-white hover:text-default-btn bg-default-btn hover:bg-orange hover:border-default-btn hover:border-2 disabled:bg-disabled  
          data-[state=active]:text-default-btn 
          data-[state=active]:bg-white 
          data-[state=active]:border-2
          data-[state=active]:border-default-btn 
          data-[state=active]:hover:border-orange"
                  >
                    Зміна паролю
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="flex mt-32">
                  <UserProfileForm />
                </TabsContent>
                <TabsContent value="password" className="flex mt-32">
                  <UserPasswordForm />
                </TabsContent>
              </Tabs>
            </Dialog.Title>
          </DialogHeader>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogEditUser;
