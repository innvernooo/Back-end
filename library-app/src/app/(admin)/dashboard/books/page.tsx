'use client';

import { FaPlus } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-instance.lib';
import { PaginatedApiResponse } from '../../../../types/api-response.type';
import { format } from 'date-fns';
import Link from 'next/link';

type Books = {
  id: string;
  title: string;
  authorId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export default function BooksManagement() {
  const {
    data: book,
    isError,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res =
        await axiosInstance.get<PaginatedApiResponse<Books[]>>('/books');

      return res?.data?.data;
    },
  });

  return (
    <>
      <div className="flex justify-between items-center h-fit">
        <div className="mb-3">
          <h1 className="text-3xl font-plus-jakarta-sans font-bold text-brand-primary text-blue-800">
            Books Management
          </h1>
          <p className="text-base font-inter text-black">
            Oversee and organize the library's books
          </p>
        </div>
        <Link href="/dashboard/createBooks" className="btn bg-blue-800">
          <FaPlus />
          Add New Book
        </Link>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th></th>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author Name</th>
              <th>Category</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {book?.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{(item?.id).slice(0, -9)}...</td>
                  <td className="font-semibold">{item?.title}</td>
                  <td>{item?.author?.name}</td>
                  <td>{item?.category?.name}</td>
                  <td>{format(item.createdAt, 'yyyy-MMMM-dd HH:mm:ss')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex justify-between">
        <div className="text-black">Showing 1 to 500 results</div>
        <div className="join">
          <button className="join-item btn bg-yellow-500">1</button>
          <button className="join-item btn bg-yellow-500">2</button>
          <button className="join-item btn bg-yellow-500">3</button>
          <button className="join-item btn bg-yellow-500">4</button>
        </div>
      </div>
    </>
  );
}
