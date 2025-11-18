import { ProductService } from "../services/ProductService.js";
//
export const getProducts = async (req, res) => {
  const { barcode, name, reference, productId } = req.query;

  try {
    let products = [];

    if (barcode) {
      products = await ProductService.getProductByBarcode(barcode);
    } else if (name) {
      products = await ProductService.getProductByName(name);
    } else if (reference) {
      products = await ProductService.getProductByReference(reference);
    } else if (productId) {
      products = await ProductService.getProductByPrimaryKey(productId);
    } else {
      return res.status(400).json({
        error: "Informe 'barcode', 'name', 'reference' ou 'productId' na query.",
      });
    }

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado." });
    }

    return res.json(products);

  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro interno ao buscar produtos." });
  }
};

export const getProductDetails = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await ProductService.getProductDetails(productId);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    return res.json(product);

  } catch (error) {
    console.error("Erro buscando detalhes do produto:", error);
    res.status(500).json({ error: "Erro buscando detalhes do produto." });
  }
};