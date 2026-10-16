import { title } from 'node:process';
import { prisma } from '../../configs/prisma-client.config';
import {
  CreateBookRequest,
  DeleteBookRequest,
  GetBookRequest,
  UpdateBookRequest,
} from '../../validators/books.validator';
import { AppError } from '../../errors/app.error';

export class BooksService {
  static async create(
    { body }: CreateBookRequest,
    files: Express.Multer.File[],
  ) {
    const findBookTitle = await prisma.book.findFirst({
      where: {
        title,
      },
    });

    if (!findBookTitle) throw new AppError(409, 'Book title already existed');

    const filePath = files[0]?.path?.split('\\').slice(-3).join('/');

    return await prisma.book.create({
      data: {
        title: body?.title,
        authorId: body?.authorId,
        categoryId: body?.categoryId,
        coverImageUrl: filePath,
      },
    });
  }

  static async update({ params, body }: UpdateBookRequest) {
    const findId = await prisma.book.findUnique({
      where: {
        id: params?.id as string,
      },
    });

    if (!findId) throw new Error(`Book with Id=${params?.id} is not found`);

    return await prisma.book.update({
      data: {
        title: body?.title,
        authorId: body?.authorId,
        categoryId: body?.categoryId,
      },
      where: {
        id: params?.id as string,
      },
    });

    return {
      id: params?.id,
    };
  }

  static async get({ query }: GetBookRequest) {
    const offset = (query?.page - 1) * query?.limit;

    const books = await prisma.book.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
      where: {
        deletedAt: null,
      },
      take: query?.limit,
      skip: offset,
      orderBy: {
        createdAt: 'asc',
      },
    });

    const totalBooks = await prisma.book.count({
      where: {
        deletedAt: null,
      },
    });

    const totalPage = Math.ceil(totalBooks / query?.limit);

    return {
      totalPage,
      page: query?.page,
      limit: query?.limit,
      books,
      totalBooks,
    };
  }

  static async delete({ params }: DeleteBookRequest) {
    const books = await prisma.book.delete({
      where: {
        id: params?.id,
      },
    });

    return {
      books,
      id: params?.id,
    };
  }
}
