const ProductModel = require("../models/product.model");
const productRegister = async (req, res) => {
  try {
    const { title, temp_thumbnail, description, price, discount } = req.body;

    if (!title && !temp_thumbnail && !description && !price && !discount) {
      req.status(400).json({ message: "Pastikan semua sudah terisi!!!" });
    }

    const createProduct = await ProductModel.createProduct(
      title,
      temp_thumbnail,
      description,
      price,
      discount,
    );

    if (!createProduct.affectedRows) {
      throw new Error("Terjadi kesalahan");
    }

    return res.status(201).json({
      message: "Data tersimpan!",
      data: req.body,
      errorr: "tidak ada error",
    });
  } catch (_err) {
    return console.error("Terjadi masalah di productRegister", _err);
  }
};

const productAll = (req, res) => {
  ProductModel.getAllProduct()
    .then((items) => res.status(200).json({ data: items }))
    .catch((_err) => res.status(500).json({ message: _err }));
};

const productOne = (req, res) => {
  const { id } = req.params;
  ProductModel.getOneProduct(id)
    .then((items) => res.status(200).json({ data: items }))
    .catch((_err) => res.status(500).json({ message: _err }));
};

const productEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, temp_thumbnail, description, price, discount } = req.body;

    if (!title && !temp_thumbnail && !description && !price && !discount) {
      req.status(400).json({ message: "Pastikan semua sudah terisi!!!" });
    }

    const editProduct = await ProductModel.editProduct(
      id,
      title,
      temp_thumbnail,
      description,
      price,
      discount,
    );
    if (!editProduct.affectedRows) {
      throw new Error("Terjadi kesalahan proses edit model");
    }

    return res
      .status(200)
      .json({ message: "Produk Berhasil di ubah", id, data: req.body });
  } catch (_err) {
    return new Error("Terjadi masalah di productEdit", _err);
  }
};

const productDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const checkId = await ProductModel.getOneProduct(id);
    if (!checkId > 0) {
      return res.status(200).json("Tidak ada id yang di cari");
    }

    const deleteProduct = await ProductModel.deleteProduct(id);
    if (!deleteProduct.affectedRows) {
      return res
        .status(500)
        .json("Terjadi kesalahan di ProductModel.deleteProduct");
    }

    return res
      .status(200)
      .json({ message: "Produk berhasil di hapus", deleteProduct });
  } catch (_err) {
    return res.status(500).json("Terjadi kesalahan di productDelete");
  }
};

module.exports = {
  productRegister,
  productAll,
  productOne,
  productEdit,
  productDelete,
};
