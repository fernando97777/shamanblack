// services/productService.ts
import ApiService from './api-service';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string | null;
  image_url: string | null;
  category: number;
  category_name: string;
}

interface CategoryInfo {
  id: number;
  name: string;
  image: string;
}

interface ProductsResponse {
  category: CategoryInfo;
  products: Product[];
  total_products: number;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    status: number;
  };
}

class ProductService {
  static async getProductsByCategory(categoryId: number): Promise<ApiResponse<ProductsResponse>> {
    try {
      const result = await ApiService.get(`/api/restaurant/api/categories/${categoryId}/products/`);
      return result;
    } catch (error) {
      console.error('Error en ProductService.getProductsByCategory:', error);
      return {
        success: false,
        error: {
          message: 'Error al obtener productos de la categoría',
          code: 'PRODUCTS_FETCH_ERROR',
          status: 0,
        },
      };
    }
  }
}

export default ProductService;
export type { Product, CategoryInfo, ProductsResponse, ApiResponse };
