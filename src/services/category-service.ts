// services/categoryService.ts
import ApiService from './api-service';

interface Category {
  id: number;
  name: string;
  image: string;
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

class CategoryService {
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const result = await ApiService.get('/api/restaurant/api/categories/');
      return result;
    } catch (error) {
      console.error('Error en CategoryService.getCategories:', error);
      return {
        success: false,
        error: {
          message: 'Error al obtener categorías',
          code: 'CATEGORY_FETCH_ERROR',
          status: 0,
        },
      };
    }
  }
}

export default CategoryService;
export type { Category, ApiResponse };
