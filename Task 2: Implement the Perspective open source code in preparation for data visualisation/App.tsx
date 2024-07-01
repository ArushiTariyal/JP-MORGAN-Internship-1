import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean   //To display the graph, we are making a showGraph property
                       // Interface will determine the attributes any entity might have
                      // The values might differ for each entity as Interfaces follow abstraction
                      // Hence, they always qualify and never quantify
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false  //The constructor helps in initializing the values in an object
     // We have set the initial showGraph as false as we want to display graph only when user clicks on 'Start Streaming Data'
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if(this.state.showGraph)                  //We can only obtain the graph visuals using React when
    return (<Graph data={this.state.data}/>)  // user wants to see it
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0;
    const interval  = setInterval(() => {   //allows to get data stream after clicking button once, instead of re-clicking. 
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server
      this.setState({ 
        data: serverResponds,
        showGraph: true,
      });
    });
    x++;
    if(x>1000){    //a guard value to stop the interval process automatically
      clearInterval(interval);
    }
  }, 100);
}

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick ={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
