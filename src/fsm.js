class FSM {

    constructor(config) {
      this.config = JSON.parse(JSON.stringify(config));
      this.history = ["normal"];
      this.redoHistory = [];
      if (!config) {
        throw new Error ("Config isn't passed");
      }
    }

    getState() {
      return this.config.initial;
    }

    changeState(state) {
      if (state in this.config.states) {
        this.config.initial = state;
        this.history.push(state);
        this.redoHistory = [];
        return this;
      }
      else {
        throw new Error ("State isn't exist");
      }
    }

    trigger(event) {
      if (event in this.config.states[this.config.initial].transitions) {
        //console.log(">>" + this.config.initial + "+" + event + "=" + this.config.states[this.config.initial].transitions[event]);
        this.config.initial = this.config.states[this.config.initial].transitions[event];
        this.history.push(this.config.initial);
        this.redoHistory = [];
        return this;
      }
      else {
        throw new Error ("Event in current state isn't exist");
      }
    }

    reset() {
      this.config.initial = "normal";
      return this;
    }

    getStates(event) {
      let stateArray = [];
      if (event) {
        for (var key in this.config.states) {
          if (event in this.config.states[key].transitions) {
            stateArray.push(key);
          }
        }
      }
      else {
        for (var key in this.config.states) {
            stateArray.push(key);
        }
      }
      return stateArray;
    }

    undo() {
      if (this.history.length > 1) {
        this.redoHistory.push(this.history.pop());
        this.config.initial = this.history[this.history.length - 1];
        return true;
      } else {
        return false;
      }
    }

    redo() {
      if (this.redoHistory.length > 0) {
        this.config.initial = this.redoHistory.pop();
        return true;
      } else {
        return false;
      }
    }

    clearHistory() {
      this.history = ["normal"];
      this.redoHistory = [];
      return this;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
