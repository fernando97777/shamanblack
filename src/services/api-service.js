// services/apiService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Configuración base de Axios
const API_BASE_URL = 'http://192.168.0.12:8069'; // Cambia por tu URL base

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autorización automáticamente
apiClient.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error obteniendo token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Interceptor para manejar respuestas y errores globalmente
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // Manejo de errores 401 (token expirado)
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.removeItem('authToken');
        // Aquí podrías redirigir al login
        // NavigationService.navigate('Login');
      } catch (storageError) {
        console.error('Error limpiando token:', storageError);
      }
    }
    return Promise.reject(error);
  },
);

// Clase principal del servicio API
class ApiService {
  /**
   * Petición GET genérica
   * @param {string} endpoint - Endpoint de la API
   * @param {object} params - Parámetros de query (opcional)
   * @param {object} config - Configuración adicional de Axios (opcional)
   * @returns {Promise} Respuesta de la API
   */
  static async get(endpoint, params = {}, config = {}) {
    try {
      const response = await apiClient.get(endpoint, {
        params,
        ...config,
      });
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Petición POST genérica
   * @param {string} endpoint - Endpoint de la API
   * @param {object} data - Datos a enviar
   * @param {object} config - Configuración adicional de Axios (opcional)
   * @returns {Promise} Respuesta de la API
   */
  static async post(endpoint, data = {}, config = {}) {
    try {
      const response = await apiClient.post(endpoint, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Petición PUT genérica (actualización completa)
   * @param {string} endpoint - Endpoint de la API
   * @param {object} data - Datos a actualizar
   * @param {object} config - Configuración adicional de Axios (opcional)
   * @returns {Promise} Respuesta de la API
   */
  static async put(endpoint, data = {}, config = {}) {
    try {
      const response = await apiClient.put(endpoint, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Petición PATCH genérica (actualización parcial)
   * @param {string} endpoint - Endpoint de la API
   * @param {object} data - Datos a actualizar parcialmente
   * @param {object} config - Configuración adicional de Axios (opcional)
   * @returns {Promise} Respuesta de la API
   */
  static async patch(endpoint, data = {}, config = {}) {
    try {
      const response = await apiClient.patch(endpoint, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Petición DELETE genérica
   * @param {string} endpoint - Endpoint de la API
   * @param {object} config - Configuración adicional de Axios (opcional)
   * @returns {Promise} Respuesta de la API
   */
  static async delete(endpoint, config = {}) {
    try {
      const response = await apiClient.delete(endpoint, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Subir archivos usando FormData
   * @param {string} endpoint - Endpoint de la API
   * @param {FormData} formData - Datos del formulario con archivos
   * @param {function} onUploadProgress - Callback para progreso de subida (opcional)
   * @returns {Promise} Respuesta de la API
   */
  static async upload(endpoint, formData, onUploadProgress = null) {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (onUploadProgress) {
        config.onUploadProgress = onUploadProgress;
      }

      const response = await apiClient.post(endpoint, formData, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Manejo centralizado de errores
   * @param {object} error - Error de Axios
   * @returns {object} Objeto de error normalizado
   */
  static handleError(error) {
    console.error('API Error:', error);

    let errorMessage = 'Error de conexión';
    let errorCode = 'NETWORK_ERROR';
    let status = 0;

    if (error.response) {
      // Error de respuesta del servidor
      status = error.response.status;
      errorMessage = error.response.data?.message || error.response.data?.error || `Error ${status}`;
      errorCode = error.response.data?.code || `HTTP_${status}`;
    } else if (error.request) {
      // Error de red (sin respuesta)
      errorMessage = 'Sin conexión a internet';
      errorCode = 'NO_INTERNET';
    } else {
      // Error en la configuración de la petición
      errorMessage = error.message;
      errorCode = 'REQUEST_ERROR';
    }

    return {
      success: false,
      error: {
        message: errorMessage,
        code: errorCode,
        status,
        originalError: error,
      },
    };
  }

  /**
   * Configurar nueva URL base
   * @param {string} baseURL - Nueva URL base
   */
  static setBaseURL(baseURL) {
    apiClient.defaults.baseURL = baseURL;
  }

  /**
   * Configurar timeout global
   * @param {number} timeout - Timeout en milisegundos
   */
  static setTimeout(timeout) {
    apiClient.defaults.timeout = timeout;
  }

  /**
   * Configurar headers globales
   * @param {object} headers - Headers a agregar
   */
  static setHeaders(headers) {
    apiClient.defaults.headers = {
      ...apiClient.defaults.headers,
      ...headers,
    };
  }
}

export default ApiService;
