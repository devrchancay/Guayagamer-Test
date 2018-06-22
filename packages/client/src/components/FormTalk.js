import React, { Component } from "react";
import { Link } from "react-router-dom";

class FormTalk extends Component {
  state = {
    title: "",
    duration: "",
    speaker: "",
    email: "",
    errors: {
      title: null,
      duration: null,
      speaker: null
    }
  };

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  clearErrors() {
    this.setState({
      errors: {
        title: null,
        duration: null,
        speaker: null
      }
    });
  }

  submitTalk(evt) {
    evt.preventDefault();
    this.clearErrors();
    const { title, duration, speaker, emailSpeaker } = this.state;

    if (!speaker || !title || !duration) {
      const errors = {
        title: !title ? "debe ingresar el titulo de la charla" : null,
        speaker: !speaker ? "Debe ingresar el nombre de expositor" : null,
        duration: !duration
          ? "Debe ingresar la duracion de la charla en minutos"
          : null
      };
      this.setState({ errors });
      return;
    }

    if (title && !/^[a-z A-Z]+$/.test(title)) {
      this.setState(state => {
        return {
          errors: {
            ...state.errors,
            title: "El titulo no puede contener numeros"
          }
        };
      });
      return;
    }

    if (!Number.isInteger(+duration)) {
      this.setState(state => {
        return {
          errors: {
            ...state.errors,
            duration: "Debe especificar la duracion en minutos"
          }
        };
      });
      return;
    }

    this.props.storageTalks({
      title: title.trim(),
      duration,
      speaker,
      emailSpeaker
    });
  }

  _clearForm() {
    this.setState({ title: "", duration: "", emailSpeaker: "", speaker: "" });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.talks.messages.success !== nextProps.talks.messages.success
    ) {
      this._clearForm();
      this.props.fetchTalks({});
      this.setState({ success: nextProps.talks.messages.success });
    }
  }

  _closeMessages() {
    this.setState({ success: null });
  }

  render() {
    return (
      <div className="w-full flex flex-col content-center items-center justify-center">
        <form
          method="POST"
          onSubmit={this.submitTalk.bind(this)}
          className="bg-white w-5/6 md:w-2/3 shadow-md rounded px-8 pt-6 pb-8 mb-4 relative"
        >
          {this.props.talks.loading && (
            <div
              style={{ background: "rgba(0,0,0,0.9)" }}
              className="absolute w-full h-full pin-l pin-t flex justify-center items-center content-center"
            >
              <p className="text-white">Espere un momento...</p>
            </div>
          )}
          {this.state.success && (
            <div
              className="mb-3 bg-green-lightest border border-green-light text-green-dark px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{this.state.success}</span>
              <span
                className="absolute pin-t pin-b pin-r px-4 py-3"
                onClick={this._closeMessages.bind(this)}
              >
                <svg
                  className="fill-current h-6 w-6 text-green"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}

          <div className="mb-4">
            <h2 className="py-2 text-grey-darker">Ingrese una charla</h2>
          </div>

          <div className="mb-4">
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight ${
                this.state.errors.title ? "border-red mb-3" : ""
              }`}
              name="title"
              type="text"
              placeholder="📚 Titulo de la charla"
              value={this.state.title}
              onChange={this.handleChange.bind(this)}
            />
            {this.state.errors.title && (
              <p className="text-red text-xs italic">
                {this.state.errors.title}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight ${
                this.state.errors.duration ? "border-red mb-3" : ""
              }`}
              name="duration"
              type="text"
              placeholder="🕙 Duracion de la charla"
              value={this.state.duration}
              onChange={this.handleChange.bind(this)}
            />
            {this.state.errors.duration && (
              <p className="text-red text-xs italic">
                {this.state.errors.duration}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight ${
                this.state.errors.speaker ? "border-red mb-3" : ""
              }`}
              name="speaker"
              type="text"
              placeholder="🗣 Speaker"
              value={this.state.speaker}
              onChange={this.handleChange.bind(this)}
            />
            {this.state.errors.speaker && (
              <p className="text-red text-xs italic">
                {this.state.errors.speaker}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight"
              name="emailSpeaker"
              type="text"
              placeholder="✉️ Email del speaker"
              value={this.state.emailSpeaker}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Guardar
            </button>
          </div>
          <p className="text-gray text-xs italic">
            * Ingrese 1 en duracion para llenar un "cuarto" (15 minutos)
          </p>
        </form>
        <p className="py-6 text-center text-grey text-xs">
          <Link to="/talks">Ver todas las charlas</Link>
        </p>
        <p className="text-center text-grey text-xs">
          ©2018 Technisys. All rights reserved.
        </p>
      </div>
    );
  }
}

export default FormTalk;
