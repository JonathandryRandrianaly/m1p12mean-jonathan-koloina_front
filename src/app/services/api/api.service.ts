import { Injectable } from '@angular/core';
import axios from 'axios';
import axiosInstance from '../../axios-config';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  async getAll(path: string) {
    try {
      const response = await axiosInstance.get(`/${path}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getWithData(path: string, data: any) {
    try {
      const response = await axiosInstance.get(`/${path}`, { params: data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async export(path: string, data: any) {
    try {
      const response = await axiosInstance.get(`/${path}`, {
        params: data,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async insert(path: string, data: any) {
    try {
      const response = await axiosInstance.post(`/${path}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async import(path: string, data: FormData) {
    try {
        const response = await axiosInstance.post(`/${path}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
  }

  async login(path: string, data: any) {
    try {
      const response = await axiosInstance.post(`/${path}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(path: string, data: any) {
    try {
      const response = await axiosInstance.put(`/${path}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async replace(path: string,id: string, data: any) {
    try {
      const response = await axiosInstance.patch(`/${path}/${id}`, data, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'accept': 'application/ld+json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateWithData(path: string, data: any) {
    try {
        const response = await axiosInstance.put(`/${path}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
  }


  async delete(path: string, id: any) {
    try {
      const response = await axiosInstance.delete(`/${path}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async deleteWithData(path: string, data: any) {
    try {
      const response = await axiosInstance.delete(`/${path}`, { params: data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
