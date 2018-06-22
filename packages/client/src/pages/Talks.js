import React, { Component } from "react";
import Layout from "../components/Layout";
import { Link, Redirect } from "react-router-dom";
import md5 from "crypto-js/md5";

const Card = ({ title, duration, speaker, img }) => (
  <div className="m-2 mx-6 bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden w-64">
    <div className="px-6 py-4">
      <img
        className="block h-16 rounded-full mx-auto mb-4"
        src={img}
        alt={speaker}
      />
      <div className="text-center">
        <div className="mb-4">
          <p className="text-xl leading-tight pb-2">{speaker}</p>
          <p className="text-sm leading-tight text-grey-dark">{title}</p>
          <p className="py-1 text-sm leading-tight text-grey-dark">
            <span role="img" aria-label="clock">
              🕙
            </span>
            {`${duration}min `}
          </p>
        </div>
      </div>
    </div>
  </div>
);

class Talks extends Component {
  state = {
    total: 0,
    totalEnHoras: 0
  };
  componentDidMount() {
    this.props.init();
    this.props.fetchTalks({});
  }

  generateRooms() {
    this.props.generateRooms();
  }

  render() {
    return (
      <div className="flex flex-col md:w-5/6">
        {!this.props.talks.loading
          ? this.props.talks.data.docs.length === 0 && (
              <span>Nadie se ha registrado al evento</span>
            )
          : null}
        {this.props.talks.data.docs.length > 0 && (
          <React.Fragment>
            <div className="px-8 py-4 flex  justify-center items-center">
              <Link
                className="no-underline bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                to="/"
              >
                Formulario
              </Link>
              <button
                className="ml-2 bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded"
                onClick={this.generateRooms.bind(this)}
              >
                {this.props.talks.loading ? "Espere..." : "Salas"}
              </button>
              {this.props.talks.messages.success && <Redirect to="rooms" />}
            </div>
            <div className="flex flex-wrap">
              {this.props.talks.data.docs.map(item => {
                const hash = md5(item.emailSpeaker);
                const img = `https://www.gravatar.com/avatar/${hash}`;
                return <Card key={item._id} {...item} img={img} />;
              })}
            </div>
          </React.Fragment>
        )}

        <p className="py-6 text-center text-grey text-xs">
          <Link to="/">Ir al formulario de registro</Link>
        </p>
      </div>
    );
  }
}

export default () => <Layout Component={Talks} />;
