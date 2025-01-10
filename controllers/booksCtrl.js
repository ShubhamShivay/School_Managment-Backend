import Books from "../models/Books.js";
import expressAsyncHandler from "express-async-handler";

//! @desc Create Book
//! @route POST /api/books
//! @access Private

export const createBook = expressAsyncHandler(async (req, res) => {
    const { name, description, image, writer, price, publisher, quantity } =
        req.body;

    const book = await Books.create({
        name: name.toLowerCase(),
        description: description.toLowerCase(),
        image,
        writer: writer.toLowerCase(),
        price,
        publisher,
        quantity,
    });
    res.json({
        status: "success",
        message: "Book created successfully",
        book,
    });
});

