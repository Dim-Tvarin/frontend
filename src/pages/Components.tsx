import { CustomButton } from 'components/CustomButton'
import React from 'react'

export const Components = () => {
  return (
    <div className='flex flex-col'>
      Button
        <CustomButton
                type="submit"
                styleType="defaultButton"
              >
                Увійти
              </CustomButton>
      </div>
  )
}
