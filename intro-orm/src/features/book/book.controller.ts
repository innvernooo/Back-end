import { Request, Response } from 'express';
import { BooksService } from './book.service';

export class BooksController {
  static async create(req: Request, res: Response) {
    try {
      const { title, authorId, categoryId } = req.body;

      const book = await BooksService.create({ title, authorId, categoryId });

      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: book,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        data: {},
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, authorId, categoryId } = req.body;

      const book = await BooksService.update({
        id: id as string,
        title,
        authorId,
        categoryId,
      });

      res.status(200).json({
        success: true,
        message: `Book with id=${id} updated successfully`,
        data: book,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message: error?.message,
          data: {},
        });
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const book = await BooksService.get();

      res.status(200).json({
        success: true,
        message: 'Book retirved updated successfully',
        data: book,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message: error?.message,
          data: {},
        });
    }
  }
}
