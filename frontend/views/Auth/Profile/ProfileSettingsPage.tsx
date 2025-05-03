"use client"
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Label from '@/components/Label/Label';
import ProfilePicture from '@/components/ProfilePicture/ProfilePicture'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { VERIFIED_ICON } from '@/utils/icons';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import LinkButton from '@/components/LinkButton/LinkButton';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '@/components/Loader/Loader';
import Toast from '@/components/Toast/Toast';

interface Role {
  name: string;
}
const ProfileSettingsPage: React.FC = () => {
const auth = useAppSelector((state)=>state.auth.user)
const [user, setUser] = useState<any>(auth);
const dispatch = useAppDispatch();

const [isClient, setIsClient] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [isPhotoUpdated, setIsPhotoUpdated] = useState(false);
const [newPhoto, setNewPhoto] = useState<File | null>(null);

useEffect(() => {
  setIsClient(true);  
}
, []);

// useEffect(() => {
//   const currentUser = auth.currentUser;
//   if (currentUser?.displayName) {
//     document.title = `${currentUser.displayName}'s Profile Settings | FOOD PICK`;
//   } else {
//     document.title = `Profile Settings | FOOD PICK`;
//   }
// }, []);



// const role: Role | null = useAppSelector((state) => state.auth.role) as unknown as Role | null;

const handleSendVerifyMail = async () => {
  try {
    setIsLoading(true);
    // await dispatch(verifyEmail());
    toast.success('Verification email sent successfully! Pleace check your email');
  } catch (error: any) {
    toast.error(error)
  }finally{
    setIsLoading(false);
  }
}

// const handleImageUpload = async (file: File): Promise<string | null> => {
//   try {
//     const formData = new FormData();
//     formData.append('image', file);
//     // const res = await dispatch(uploadProfilePicture({formData}));
//     return res.url;
//   } catch (error: any) {
//     toast.error("Failed to upload image: " + error);
//     return null;
//   }
// };

// const handleProfileUpdate = async () => {
//   try {
//     setIsLoading(true);
//     type UpdatedUser = { displayName: string; photoURL: string };
//     let updatedUser: UpdatedUser = { photoURL: user.photoURL, displayName: user.displayName };
//     if(isPhotoUpdated && newPhoto){
//       const uploadedPhotoUrl = await handleImageUpload(newPhoto);
//       if (uploadedPhotoUrl) {
//         updatedUser.photoURL = uploadedPhotoUrl;
//       } else {
//         throw new Error("Failed to upload photo");
//       }
//     }
//     await dispatch(updateUserProfile(updatedUser));
//     toast.success('Profile updated successfully');
//   } catch (error: any) {
//     toast.error(error);
//   } finally {
//     setIsLoading(false);
//   }
// }

  return (
   <>
   {
    (!isClient || isLoading) && <Loader />
   }
   <Toast />
    <div className='container min-h-[75vh] max-h-[75vh] overflow-auto'>
      <div className='flex flex-col gap-2 justify-center items-center h-full'>
        <div className='w-full p-4 rounded-md shadow-md bg-body_light dark:bg-body_dark'>
          <h2 className='text-2xl font-bold text-left'>Profile Settings</h2>
          <form className='mt-4 m-auto w-full'>
            <div className='mb-4 items-center justify-center flex'>
              <ProfilePicture src={user?.photoURL ?  process.env.NEXT_PUBLIC_BASE_URL +  user.photoURL : ''} editable alt={user.displayName+'_avatar'} onChange={(file)=>{
                setNewPhoto(file);
                setIsPhotoUpdated(true);
              }}/>
            </div>
            <div className='mb-4'>
            <Input 
              label={`Display Name`} 
              onChange={(e) => {setUser((prev: any)=>({...prev, displayName:e.target.value})) }} 
              id={'diplay_name'} 
              name={'diplay_name'} 
              type={'text'} 
              value={user.displayName} 
              isRequired 
              error={user.displayName ? '' : 'Full Name is required'} 
              />
            </div>
            <div className='mb-4'>
              <Input
                label={`Email`}
                onChange={(e) => { setUser((prev: any) => ({ ...prev, email: e.target.value })) }}
                id={'auth_email'}
                name={'auth_email'}
                type={'text'}
                value={user.email}
                isRequired
                isDisable={user.emailVerified}
                error={user.email ? '' : 'Email is required'}
                iconRight={user.emailVerified ? VERIFIED_ICON : undefined}
                iconRightTitle="Email Verified"
              />
           {  !user.emailVerified && <div  className={`block py-2 px-3 cursor-pointer text-[12px] w-full text-right p-2 rounded-sm md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:hover:text-primary text-black dark:text-white`}  onClick={() => { handleSendVerifyMail() }} >

              Verify Email
              </div>}
            </div>
            <div className='mb-4'>
              <Input
                label={`User Role`}
                onChange={(e) => {}}
                id={'auth_typr'}
                name={'auth_type'}
                type={'text'}
                value={user.role}
                isDisable={true}
                error={""}
              />
            </div>
            <div className='mb-4'>
              <Input
              label={`Account Create Date`}
              onChange={(e) => {}}
              id={'auth_createdAt'}
              name={'auth_createdAt'}
              type={'text'}
              value={user.metadata?.createdAt ? moment(Number(user.metadata.createdAt)).format('MMMM Do YYYY, h:mm:ss a') : ''}
              isDisable={true}
              error={""}
              />
            </div>


            {/* <div className='mb-4 w-[90%] m-auto'>
              <Button label='Save Changes' onClick={() => {handleProfileUpdate() }} type='filled' color='primary' />
            </div> */}
          </form>
        </div>
        {/* {
          userType === "ADMIN" && role && 
          <div className='w-full p-4 rounded-md shadow-md bg-body_light dark:bg-body_dark'>
          <h2 className='text-2xl font-bold text-left'>Role</h2>
          <form className='mt-4 m-auto w-full'>
            <div className='mb-4'>
              <Input
                label={`Role`}
                onChange={(e) => { }}
                id={'auth_role'}
                name={'auth_role'}
                type={'text'}
                value={role?.name ?? ''}
                isRequired
                isDisable
              />
            </div>
          </form>
        </div>
        } */}
      </div>
    </div>
   </>
  )
}

export default ProfileSettingsPage
