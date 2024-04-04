import {Config} from "../../config/config"
import axios from "axios"

export function getProducts() {
    return axios.get(`${Config.API_URL}/products`);
}

export function getProduct(id) {
    return axios.get(`${Config.API_URL}/products/${id}`);
}

export function getCategories() {
    return axios.get(`${Config.API_URL}/products/categories`);
}

export function getCategoryProducts(category) {
    return axios.get(`${Config.API_URL}/products/category/${category}`);
}

export function addProduct(payload) {
    return axios.post(`${Config.API_URL}/products`, payload);
}

export function updateProduct(id, payload) {
    return axios.put(`${Config.API_URL}/products/${id}`, payload);
}

export function deleteProduct(id) {
    return axios.get(`${Config.API_URL}/products/${id}`);
}