import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import "./App.css";

import {Helmet} from "react-helmet";

function App() {
  return (
    <EthProvider>
      <div id="App" >
      <div className="container">
          <h1>Openskill</h1>
          <hr />
          <h2>Image Classification using Feature Extractor with MobileNet</h2>
          <div id="videoContainer"></div>
          <p><span className="loading" id="modelStatus">Loading MobileNet</span></p>
          <p>
            <button className="button2" id="sample1Button" >Add Sample 1 Image</button>
            <span id="amountOfsample1Images"> 0</span> Sample 1 Images<br />
            <button className="button2" id="sample2Button">Add Sample 2 Image</button>
            <span id="amountOfsample2Images"> 0</span> Sample 2 Images<br />
            <button className="button2" id="sample3Button">Add Sample 3 Image</button>
            <span id="amountOfsample3Images"> 0</span> Sample 3 Images<br />
            
            <button className="button2" id="train">Train</button><span id="loss"></span>
            <br />
            <button className="button2" id="buttonPredict">Start guessing!</button><br />
          </p>
          <p>Label: <span id="result">...</span><br />confidence: <span id="confidence">...</span></p>
          <p>
            <button className="button2" id="save">Save Model</button> |
            <label htmlFor="avatar">Load Model:</label>
            <input className="button2" type="file" id="load" multiple           />
          </p>
          <p>
            <Helmet>
              <script src="featureextractor.js" type="text/javascript" />
            </Helmet>           
          </p>
          <hr />
          <Setup />
          <hr />
          <Demo />
          
          
  
          
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
