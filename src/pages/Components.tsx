import { CustomButton } from 'components/CustomButton';


 const Components = () => {
    return (
        <div className="flex flex-col mt-72">
            Button
           <CustomButton styleType="defaultButton" variant="default" >
                Button
            </CustomButton>
            <CustomButton styleType="defaultButton" variant="link" >
                Button
            </CustomButton>
        </div>
    );
};


export default Components