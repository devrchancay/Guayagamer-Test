import React, { Component } from "react";
import Layout from "../components/Layout";
import moment from "moment";

class Rooms extends Component {
  componentDidMount() {
    this.props.fetchTalks({});
    this.props.fetchRooms({});
  }

  render() {
    return (
      <div className="flex w-full">
        {this.props.rooms.data.docs.length === 0 && (
          <h2 className="text-center">
            Aun no tenemos datos, es probable que aun no llenemos una sala con
            charlas
          </h2>
        )}
        {this.props.rooms.data.docs.map(room => {
          let morning = moment().utcOffset(0);
          let afternoon = moment().utcOffset(0);
          afternoon.set({ hour: 13, minute: 0 });
          morning.set({ hour: 9, minute: 0 });
          return (
            <div className="w-1/2" key={room._id}>
              <h2>{room.name}</h2>
              <div className="w-full">
                <ul className="list-reset mt-4">
                  {room.sessions.morning.map((session, id) => {
                    const list = (
                      <li key={session._id} className="py-2">
                        <span>{morning.format("h:mm")}AM</span>{" "}
                        <span className="font-bold">{session.title}</span>{" "}
                        <span>{session.duration}min </span>
                      </li>
                    );
                    morning.add(session.duration, "m");

                    return list;
                  })}
                </ul>
                <ul className="list-reset">
                  <li className="py-2 ">
                    <span>12:00AM</span>{" "}
                    <span className="font-bold">Refrigerio</span>
                  </li>
                </ul>
                <ul className="list-reset">
                  {[
                    ...room.sessions.afternoon,
                    { title: "mesa redonda", duration: "60" }
                  ].map((session, id) => {
                    const list = (
                      <li key={session._id} className="py-2">
                        <span>{afternoon.format("h:mm")}PM</span>{" "}
                        <span className="font-bold">{session.title}</span>{" "}
                        <span>{session.duration}min </span>
                      </li>
                    );
                    afternoon.add(session.duration, "m");

                    return list;
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default () => <Layout Component={Rooms} />;
