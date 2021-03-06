import Author from '../models/Author'
import { NotFoundError } from '../helpers/apiError'
import Book, { BookDocument } from '../models/Book'
import mongoose from 'mongoose'

async function create(book: BookDocument) {
  const createdBook = await Book.create(book)

  // add bookId to the referenced author as well
  book.authors.forEach(async (author) => {
    await Author.findByIdAndUpdate(author, {
      $push: { books: book },
    })
  })

  return createdBook
}

async function findAll() {
  return await Book.find().populate('authors', 'name')
}

async function findById(bookId: string) {
  const foundBook = await Book.findById(bookId).populate('authors', 'name')

  if (!foundBook) {
    throw new NotFoundError('Book not found')
  }

  return foundBook
}

async function findByTitle(title: string) {
  const foundBook = await Book.find({ title: { $regex: title, $options: 'i' } })

  if (!foundBook.length) {
    throw new NotFoundError('Book not found')
  }

  return foundBook
}

async function findByAuthorId(authorId: string) {
  const id = authorId as unknown as mongoose.Types.ObjectId
  const foundBook = await Book.find({ authors: [id] }).populate(
    'authors',
    'name'
  )

  if (!foundBook.length) {
    throw new NotFoundError('Book not found')
  }

  return foundBook
}

async function deleteBook(bookId: string) {
  const foundBook = await Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError('Book not found')
  }

  foundBook.authors.forEach(async (author) => {
    await Author.findByIdAndUpdate(author, { $pull: { books: bookId } })
  })
}

async function updateBook(bookId: string, update: Partial<BookDocument>) {
  // Clear author list of the updating book before update
  const updatingBook = await Book.findById(bookId)

  if (!updatingBook) {
    throw new NotFoundError('Book not found')
  }

  updatingBook?.authors.forEach(
    async (author) =>
      await Author.findByIdAndUpdate(author, { $pull: { books: bookId } })
  )

  // Update book
  const updatedBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!updatedBook) {
    throw new NotFoundError('Book not found')
  }

  // Poppulate Author's books with new updated bookId
  updatedBook.authors.forEach(
    async (author) =>
      await Author.findByIdAndUpdate(author, { $push: { books: bookId } })
  )

  return updatedBook
}

export default {
  create,
  findAll,
  findById,
  deleteBook,
  updateBook,
  findByTitle,
  findByAuthorId,
}
