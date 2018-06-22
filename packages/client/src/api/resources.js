import axios from "../util/axios";
import qs from "simple-query-string";

class Resources {
  constructor(resource) {
    this.resource = resource;
  }

  _serializeParams(params) {
    const query = qs.stringify(params);
    return query.length > 0 ? `?${query}` : "";
  }

  async fetchResource(params) {
    try {
      const q = this._serializeParams(params);
      const response = await axios.get(`${this.resource}${q}`);
      return response;
    } catch ({ data, status }) {
      return { data, status };
    }
  }

  async fetchResourceById(id) {
    try {
      const response = await axios.get(`${this.resource}/${id}`);
      return response;
    } catch ({ data, status }) {
      return { data, status };
    }
  }

  async storeResource(data) {
    try {
      const response = await axios.post(`${this.resource}`, data);
      return response;
    } catch ({ data, status }) {
      return { data, status };
    }
  }

  async dropResource(id) {
    try {
      const response = await axios.delete(`${this.resource}/${id}`);
      return response;
    } catch ({ data, status }) {
      return { data, status };
    }
  }

  async updateResource(id, payload) {
    try {
      const response = await axios.put(`${this.resource}/${id}`, payload);
      return response;
    } catch ({ data, status }) {
      return { data, status };
    }
  }
}

export default Resources;
