import { prisma } from '../configs/prisma-client.config';
import { Categories } from '../generated/prisma/enums';

export const createCategoryService = async (name: Categories) => {
  return await prisma.category.create({
    data: {
      name,
    },
  });
};

export const getCategoryService = async () => {
  return await prisma.category.findMany();
};
