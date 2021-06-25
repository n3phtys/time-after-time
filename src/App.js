import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

class Time {
  constructor(str) {
    this.hours = 8;
    this.minutes = 0;
    if (!!str) {
      const arr = str.split(":");
      if (!!arr[0]) {
        this.hours = !!arr[0] ? parseInt(arr[0]) : 8;
        this.minutes = !!arr[1] ? parseInt(arr[1]) : 0;
      }
    }
  }

  addDuration(duration) {
    const fullMin = duration.minutesCeil() + this.minutes;
    const remainingMin = fullMin;
    const additionalHours = Math.floor(fullMin / 60);
    return (
      (
        "" +
        (this.hours +
          duration.hours() +
          Math.floor(fullMin / 60) +
          additionalHours)
      ).padStart(2, "") +
      ":" +
      ("" + Math.ceil(fullMin % 60)).padStart(2, "")
    );
  }

  toSeconds() {
    return (this.hours * 60 + this.minutes) * 60;
  }

  secondsToTime(other) {
    return other.toSeconds() - this.toSeconds();
  }

  toString() {
    return `${("" + this.hours).padStart(2, "0")}:${(
      "" + this.minutes
    ).padStart(2, "0")}`;
  }
}

class Duration {
  constructor(str) {
    if (!isNaN(str)) {
      this.seconds = str;
    } else {
      this.seconds = !!str ? parseTime(str) : (8 * 60 - 6) * 60;
    }
    console.log(this.seconds);
  }

  hours() {
    return Math.floor(this.seconds / 3600);
  }
  minutesCeil() {
    return Math.ceil((this.seconds % 3600) / 60);
  }

  toString() {
    let s = this.seconds;
    const hours = Math.floor(s / 3600);
    s -= hours * 3600;
    const minutes = Math.floor(s / 60);
    s -= minutes * 60;
    const seconds = Math.floor(s);
    let str = "";
    if (!!hours) {
      str += hours + "h";
    }
    if (!!minutes) {
      str += minutes + "m";
    }
    if (!!seconds) {
      str += seconds + "s";
    }
    if (!str) str += 0;
    return str;
  }
}

class AppState {
  constructor(fragment) {
    if (!fragment) fragment = "p/7h54m/8:00";
    const segments = fragment.split("/");
    const mode = segments.shift();
    const dur = segments.shift();
    console.log(dur);
    this.duration = new Duration(dur);
    console.log(this.duration.toString());
    console.log(segments);
    this.timesteps = segments.map((t) => new Time(t));
  }

  writeToUrl() {
    window.location.hash = this.asUrlFragment();
  }

  get totalDurationString() {}

  get endOfDayString() {}

  asUrlFragment() {
    let str = "p/";
    str += this.duration.toString();
    this.timesteps.forEach((step) => {
      str += "/" + step.toString();
    });
    return str;
  }
}

function App() {
  let fragment = !!window.location.hash
    ? window.location.hash.substring(1)
    : "";
  let appState = new AppState(fragment);
  appState.writeToUrl();
  console.log(appState);

  return (
    <div className="App">
      <div>
        <hr></hr>
        <ShowTime appState={appState} />
        <hr></hr>
        <TimeStepList appState={appState} />
      </div>
    </div>
  );
}

function ShowTime(props) {
  const appState = props.appState;
  const durationIs = computeTotalDuration(appState.timesteps);
  const durationShould = appState.duration;
  if (appState.timesteps.length % 2 == 0) {
    // we're currently out
    return (
      <p>
        You have worked <b>{durationIs.toString()}</b> of your total of{" "}
        {durationShould.toString()} for today. That is
        <b>
          {((durationIs.seconds / durationShould.seconds) * 100).toFixed(2)} %
        </b>{" "}
        of your SHOULD time.
      </p>
    );
  } else {
    const remainingDurationForLastSegment = new Duration(
      durationShould.seconds - durationIs.seconds
    );
    const currentLast = appState.timesteps[appState.timesteps.length - 1];
    const timeReachedFulltime = currentLast.addDuration(
      remainingDurationForLastSegment
    );
    return (
      <p>
        You will be finished with work for today at
        <b>{timeReachedFulltime.toString()}</b>.
      </p>
    );
  }
}

function TimeStepList(props) {
  const appState = props.appState;
  const timesteps = appState.timesteps;

  const listItems = timesteps.map((step, index) => {
    const onChange = (event) => {
      appState.timesteps[index] = new Time(event.target.value);
      appState.writeToUrl();
      window.location.reload();
    };
    const onDelete = (event) => {
      appState.timesteps.splice(index, 1);
      appState.writeToUrl();
      window.location.reload();
    };
    return (
      <li key={index}>
        {index % 2 == 0 ? "IN" : "OUT"}{" "}
        <input type="time" value={step} onChange={onChange} />
        <button onClick={onDelete}>X</button>
      </li>
    );
  });

  const [time, setTime] = useState(now());
  const [dura, setDura] = useState(appState.duration);

  return (
    <div>
      <h2>My in / out times</h2>
      <ul>{listItems}</ul>
      <div>
        <label>Add:</label>
        <input
          type="time"
          value={time.toString()}
          onChange={(event) => setTime(new Time(event.target.value))}
        />
        <button
          onClick={() => {
            appState.timesteps.push(time);
            appState.timesteps.sort(
              (a, b) => a.hours * 60 + a.minutes - (b.hours * 60 + b.minutes)
            );
            appState.writeToUrl();
            window.location.reload();
          }}
        >
          +
        </button>
      </div>
      <div>
        <hr></hr>
        <input
          type="text"
          value={dura.toString()}
          onChange={(event) => {
            setDura(new Duration(event.target.value));
          }}
        />
        <button
          onClick={() => {
            appState.duration = dura;
            appState.writeToUrl();
            window.location.reload();
          }}
        >
          SET
        </button>
      </div>
    </div>
  );
}

export default App;

function now() {
  const d = new Date();
  return new Time(
    ("" + d.getHours()).padStart(2, "0") +
      ":" +
      ("" + d.getMinutes()).padStart(2, "0")
  );
}

function computeTotalDuration(timesteps) {
  let durSeconds = 0;
  console.log([timesteps, durSeconds]);
  for (let i = 0; i < timesteps.length - 1; i += 2) {
    durSeconds += timesteps[i].secondsToTime(timesteps[i + 1]);
    console.log([i, durSeconds]);
  }
  console.log("durSeconds: " + durSeconds);
  return new Duration(durSeconds);
}

function parseTime(str, multiplier = 3600) {
  console.log("parsing: " + str);
  if (!str) return 0;
  const h = str.indexOf("h");
  const m = str.indexOf("m");
  const s = str.indexOf("s");
  if (h >= 0) {
    return (
      parseInt(str.substring(0, h)) * 3600 +
      parseTime(str.substring(h + 1), multiplier / 60)
    );
  } else if (m >= 0) {
    return (
      parseInt(str.substring(0, m)) * 60 +
      parseTime(str.substring(m + 1), multiplier / 60)
    );
  } else if (s >= 0) {
    return (
      parseInt(str.substring(0, s)) * 1 +
      parseTime(str.substring(s + 1), multiplier / 60)
    );
  } else {
    return parseInt(str) * multiplier;
  }
}
