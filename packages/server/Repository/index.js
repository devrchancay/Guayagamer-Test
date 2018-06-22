class Repository {
  _serializeErrors(errors) {
    const keys = Object.keys(errors);
    return keys.map(key => {
      return {
        [key]: errors[key].message,
      };
    });
  }

  _buildException(error) {
    return { errors: error };
  }

  _removeItems(payload, keys = []) {
    return Object.keys(payload).reduce((prev, next) => {
      if (keys.indexOf(next) === -1) {
        prev[next] = payload[next];
      }
      return prev;
    }, {});
  }

  async findAll(params, pagination) {
    try {
      const select = `${this.exclude}`;

      const options = {
        select,
      };
      const response = await this.Model.paginate(params, pagination, options);

      return {
        ...response,
        docs: response.docs.map(q => this._removeItems(q._doc, this.readOnly)),
      };
    } catch (error) {
      const errors = this._serializeErrors(error.errors);
      return { errors };
    }
  }

  async findOne(query) {
    try {
      const q = await this.Model.findOne(query);
      const response = this._removeItems(q._doc, this.readOnly);
      return response;
    } catch (error) {
      const errors = this._serializeErrors(error.errors);
      return { errors };
    }
  }

  async storage(fields) {
    try {
      const newRow = new this.Model(fields);
      const response = await newRow.save();
      return response;
    } catch (error) {
      const errors = this._serializeErrors(error.errors);
      return { errors };
    }
  }

  async update(query, update) {
    try {
      const payload = this.readOnly
        ? this._removeItems(update, [...this.readOnly, 'email'])
        : update;
      await this.Model.findOneAndUpdate(query, payload);
      const response = await this.Model.find(query);
      return response;
    } catch (error) {
      const errors = this._serializeErrors(error.errors);
      return { errors };
    }
  }

  async delete(query) {
    try {
      const response = await this.Model.find(query).remove();
      return response;
    } catch (error) {
      const errors = this._serializeErrors(error.errors);
      return { errors };
    }
  }
}

export default Repository;
