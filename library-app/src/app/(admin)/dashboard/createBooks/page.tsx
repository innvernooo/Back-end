'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-instance.lib';
import {
  NewBookInput,
  NewBookOutput,
  NewBookSchema,
} from '@/features/newBook/validation/newBookSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateBooks() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewBookInput, unknown, NewBookOutput>({
    resolver: zodResolver(NewBookSchema),
  });

  const handleCreateBook = useMutation({
    mutationFn: async (data: NewBookOutput) => {
      console.log(data);
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('authorId', data.authorId);
      formData.append('categoryId', data.categoryId);
      formData.append('coverImage', data.cover[0]);

      const res = await axiosInstance.post('/books', formData);
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      reset();
    },
  });

  const { data: authorsData } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const res = await axiosInstance.get('/authors');

      return res?.data?.data;
    },
  });

  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await axiosInstance.get('/categories');

      return res?.data?.data;
    },
  });

  return (
    <>
      <div className="flex justify-between items-center h-fit">
        <div className="mb-3">
          <h1 className="text-3xl font-plus-jakarta-sans font-bold text-brand-primary text-blue-800">
            Create A New Book
          </h1>
          <p className="text-base font-inter text-black">
            Add a new volume to the library catalog with essential bibliographic
            details.
          </p>
        </div>
        <Link href="/dashboard/books" className="btn bg-blue-800">
          Back to Books
        </Link>
      </div>
      <form
        onSubmit={handleSubmit((data) => handleCreateBook.mutate(data))}
        className="h-fit bg-blue-800 p-5 rounded-2xl"
      >
        <fieldset className="fieldset">
          <legend className="fieldset-legend">BOOK TITLE</legend>
          <input
            type="text"
            className="input w-full bg-white text-black"
            placeholder="Type here"
            {...register('title')}
          />
          <p className="label">{errors?.title?.message}</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">AUTHOR ID</legend>
          <select
            defaultValue=""
            className="select w-full bg-white text-black"
            {...register('authorId')}
          >
            <option value="" disabled={true}>
              Pick an Author
            </option>
            {authorsData?.map((author: any, index: number) => (
              <option key={index} value={author?.id}>
                {author?.name}
              </option>
            ))}
          </select>
          <span className="label">{errors?.authorId?.message}</span>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">CATEGORY ID</legend>
          <select
            defaultValue=""
            className="select w-full bg-white text-black"
            {...register('categoryId')}
          >
            <option value="" disabled={true}>
              Pick a Category
            </option>
            {categoryData?.map((category: any, index: number) => (
              <option key={index} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </select>
          <span className="label">{errors?.categoryId?.message}</span>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">PICK A BOOK COVER IMAGE</legend>
          <input
            type="file"
            className="file-input bg-white text-black"
            {...register('cover')}
          />
          <label className="label">
            Max size 5MB | Must be .jpg / .jpeg / .png / .webp / .svg
            {errors?.cover?.message}
          </label>
        </fieldset>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary mt-3 bg-yellow-400 text-black"
          >
            Save as New Book
          </button>
        </div>
      </form>
    </>
  );
}
