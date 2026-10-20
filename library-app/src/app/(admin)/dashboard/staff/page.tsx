'use client';

import { MdMenuBook } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-instance.lib';
import {
  StaffRegisterInput,
  StaffRegisterOutput,
  staffRegisterSchema,
} from '@/features/newStaff/newStaffSchema';
import withAuthGuard from '@/hoc/withAuthGuard';

function StaffRegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaffRegisterInput, unknown, StaffRegisterOutput>({
    resolver: zodResolver(staffRegisterSchema),
  });

  const handleNewStaffRequest = useMutation({
    mutationFn: async (data: StaffRegisterOutput) => {
      const res = await axiosInstance.post('/auths/staffRegister', data);

      return res?.data;
    },
    onSuccess: () => {
      reset();
    },
    onError: () => {
        
    },
  });

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div>
          <div className="mb-4 flex justify-center text-6xl">
            <MdMenuBook className="p-2 bg-blue-700 rounded-lg" />
          </div>
          <div className="flex justify-center">
            <h1 className="text-blue-700 text-3xl font-bold">RuangBaca Desk</h1>
          </div>
          <div>
            <p className="mb-7 flex justify-center font-semibold text-lg text-black">
              Library Management
            </p>
          </div>
          <form
            noValidate
            onSubmit={handleSubmit((data) =>
              handleNewStaffRequest.mutate(data),
            )}
          >
            <div className="aura aura-rainbow p-5 w-fit h-fit bg-white text-black rounded-2xl">
              <h1 className="text-xl font-bold">Administrative Login</h1>
              <p className="text-sm">
                Please enter your credentials to access the catalog
              </p>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">Name</legend>
                <input
                  type="text"
                  className="input w-full bg-gray-300"
                  placeholder="Type here"
                  {...register('name')}
                />
                <p className="label text-red-500">{errors?.name?.message}</p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">Email</legend>
                <input
                  type="email"
                  className="input w-full bg-gray-300"
                  placeholder="Type here"
                  {...register('email')}
                />
                <p className="label text-red-500">{errors?.email?.message}</p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">
                  Phone Number
                </legend>
                <input
                  type="text"
                  className="input w-full bg-gray-300"
                  placeholder="Type here"
                  {...register('phoneNumber')}
                />
                <p className="label text-red-500">
                  {errors?.phoneNumber?.message}
                </p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">
                  Branch ID
                </legend>
                <input
                  type="text"
                  className="input w-full bg-gray-300"
                  placeholder="Type here"
                  {...register('branchId')}
                />
                <p className="label text-red-500">
                  {errors?.branchId?.message}
                </p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">role</legend>
                <input
                  type="text"
                  className="input w-full bg-gray-300"
                  placeholder="Type here"
                  {...register('role')}
                />
                <p className="label text-red-500">{errors?.role?.message}</p>
              </fieldset>
              <label className="mt-3 label">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox bg-yellow-400"
                />
                <p className="text-sm">Remember me</p>
              </label>
              <button className="w-full mt-4 btn btn-primary">Register</button>
              <div className="flex justify-center">
                <p className="mt-3 text-sm">
                  Need administrative access?{' '}
                  <a href="register" className="text-blue-700 underline">
                    Request Account
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default withAuthGuard(StaffRegisterPage, ['ADMIN']);
