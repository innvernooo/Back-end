import { prisma } from '../../configs/prisma-client.config';
import {
  BookUncheckedCreateInput,
  BookUncheckedUpdateInput,
} from '../../generated/prisma/models';

export class BooksService {
  static async create({
    title,
    authorId,
    categoryId,
  }: BookUncheckedCreateInput) {
    return await prisma.book.create({
      data: {
        title,
        authorId,
        categoryId,
      },
    });
  }

  static async update({
    id,
    title,
    authorId,
    categoryId,
  }: BookUncheckedUpdateInput) {
    const findId = await prisma.book.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!findId) throw new Error(`Book with Id=${id} is not found`);

    return await prisma.book.update({
      data: {
        title,
        authorId,
        categoryId,
      },
      where: {
        id: id as string,
      },
    });
  }

  static async get() {
    return await prisma.book.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
