'use client';

import { FaPlus } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-instance.lib';
import { PaginatedApiResponse } from '../../../../types/api-response.type';

type Author = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export default function AuthorsManagement() {
  const { data, isError, error } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const res =
        await axiosInstance.get<PaginatedApiResponse<Author[]>>('/authors');

      return res?.data?.data;
    },
  });

  return (
    <>
      <div className="flex justify-between items-center h-fit">
        <div className="mb-3">
          <h1 className="text-3xl font-plus-jakarta-sans font-bold text-brand-primary text-blue-800">
            Authors Management
          </h1>
          <p className="text-base font-inter text-black">
            Oversee and organize the book's author
          </p>
        </div>
        <button className="btn bg-blue-800">
          <FaPlus />
          Add New Author
        </button>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th></th>
              <th>Author ID</th>
              <th>Name</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {data?.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.id}</td>
                  <td className="font-semibold">{item?.name}</td>
                  <td>{item.createdAt}</td>
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
