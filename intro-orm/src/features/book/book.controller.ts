import { Request, Response } from 'express';
import { BooksService } from './book.service';
import { validate } from '../../validators/validate';
import {
  createBookSchema,
  getBookSchema,
  updateBookSchema,
} from '../../validators/books.validator';

export class BooksController {
  static async create(req: Request, res: Response) {
    const { body } = validate(createBookSchema, { body: req.body });

    const book = await BooksService.create({ body });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  }

  static async update(req: Request, res: Response) {
    const { params, body } = validate(updateBookSchema, {
      params: req.params,
      body: req.body,
    });

    const book = await BooksService.update({ params, body });

    res.status(200).json({
      success: true,
      message: `Book with id=${params?.id} updated successfully`,
      data: book,
    });
  }

  static async get(req: Request, res: Response) {
    const { query } = validate(getBookSchema, { query: req?.query });

    const { totalPage, books, page, limit, totalBooks } =
      await BooksService.get({ query });

    res.status(200).json({
      success: true,
      message: 'Book retrieved updated successfully',
      data: books,
      meta: {
        page: page,
        limit: limit,
        totalPage,
        totalBooks,
      },
    });
  }
}
