class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.config = JSON.parse(JSON.stringify(config));
      //console.log("C>" + this.config.initial);
      if (!config) {
        throw new Error ("Config isn't passed");
      }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      //console.log("GS> " + this.config.initial);
      return this.config.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (state in this.config.states) {
        this.config.initial = state;
        //console.log("CS> " + this.config.initial);
        return this;
      }
      else {
        throw new Error ("State isn't exist");
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (event in this.config.states[this.config.initial].transitions) {
        //console.log(">>" + this.config.initial + "+" + event + "=" + this.config.states[this.config.initial].transitions[event]);
        this.config.initial = this.config.states[this.config.initial].transitions[event];
      }
      else {
        throw new Error ("Event in current state isn't exist");
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
