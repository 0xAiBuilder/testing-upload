import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
//import AncientOne from "./components/AncientOne";
//import AIWalletFactory from "./components/AIWalletFactory";
//import AIWalletFactory3 from "./components/AIWalletFactory3";
import Footer from "./components/Footer";
import "./App.css";

import ScriptTag from 'react-script-tag';

/* import { BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import AI_realm from './pages/AI_realm/AI_realm';
import Training_chamber from './pages/Training_chamber/Training_chamber'; */
function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          {/*<AncientOne />
          <hr /> 
          <AIWalletFactory3 />
          <hr />*/}
          <Footer />
          <h1>Image Classification using Feature Extractor with MobileNet</h1>
          <div id="videoContainer"></div>
          <p><span id="modelStatus">Loading MobileNet</span></p>
          <p>
            <button id="catButton">Add Sample 1 Image</button>
            <span id="amountOfCatImages">0</span> Sample 1 Images<br />
            <button id="dogButton">Add Sample 2 Image</button>
            <span id="amountOfDogImages">0</span> Sample 2 Images<br />
            <button id="badgerButton">Add Sample 3 Image</button>
            <span id="amountOfBadgerImages">0</span> Sample 3 Images<br />
            <br />
            <button id="train">Train</button><span id="loss"></span>
            <button id="buttonPredict">Start guessing!</button><br />
          </p>
          <p>Label: <span id="result">...</span><br />confidence: <span id="confidence">...</span></p>
          <p>
            <button id="save">Save Model</button> |
            <label htmlFor="avatar">Load Model:</label>
            <input type="file" id="load" multiple           />

          </p>
          <p>
            
           
          </p>
          <ScriptTag type="text/javascript" src="featureextractor.js" />
        </div>
        {/* <Router>
          <main>
            <Routes>
                <Route path="*" element={<Navigate to ="/" />}/>
                <Route path = "/AI_realm"      element={<AI_realm/>}/>
                <Route path = "/Training_chamber" element={<Training_chamber/>} />
            </Routes>
          </main>
          <Navbar/>
        </Router> */}
      </div>
    </EthProvider>
  );
}

export default App;
