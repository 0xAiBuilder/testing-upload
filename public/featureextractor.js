let featureExtractor;
let classifier;
let video;
let loss;
let sample1Images = 0;
let sample2Images = 0;
let sample3Images = 0;

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  video.parent("videoContainer");
  video.size(320, 240);

  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);

  // Create a new classifier using those features and give the video we want to use
  const options = { numLabels: 3 };
  classifier = featureExtractor.classification(video, options);
  // Set up the UI buttons
  setupButtons();
}

// A function to be called when the model has been loaded
function modelReady() {
  select("#modelStatus").html("MobileNet Loaded!");
  // If you want to load a pre-trained model at the start
  // classifier.load('./model/model.json', function() {
  //   select('#modelStatus').html('Custom Model Loaded!');
  // });
}

// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

function dappclassify() {
  classifier.dappclassify(gotdappResults);
}

// A util function to create UI buttons
function setupButtons() {
  // When the sample 1 button is pressed, add the current frame
  // from the video with a label of "sample 1" to the classifier
  buttonA = select("#sample1Button");
  buttonA.mousePressed(function() {
    classifier.addImage("sample1");
    select("#amountOfsample1Images").html((sample1Images += 1));
  });

  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  buttonB = select("#sample2Button");
  buttonB.mousePressed(function() {
    classifier.addImage("sample2");
    select("#amountOfsample2Images").html((sample2Images += 1));
  });

  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  buttonC = select("#sample3Button");
  buttonC.mousePressed(function() {
    classifier.addImage("sample3");
    select("#amountOfsample3Images").html((sample3Images += 1));
  });

  // Train Button
  train = select("#train");
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select("#loss").html(`Loss: ${loss}`);
      } else {
        select("#loss").html(`Done Training! Final Loss: ${loss}`);
      }
    });
  });

  // Predict Button
  buttonPredict = select("#buttonPredict");
  buttonPredict.mousePressed(classify);

  // Save model
  saveBtn = select("#save");
  saveBtn.mousePressed(function() {
    classifier.save();
  });

  // Load model
  loadBtn = select("#load");
  loadBtn.changed(function() {
    classifier.load(loadBtn.elt.files, function() {
      select("#modelStatus").html("Custom Model Loaded!");
    });
  });

  // Load model
  /* loadBtn = select("#load");
  loadBtn.changed(function() {
    classifier.load(loadBtn.elt.files, function() {
      console.log("step 2");
      select("#modelStatus").html("Custom Model Loaded!");
    });
    //console.log("step 2");
  }); */

  //decentralized Load model
  
  //decentralizedloadBtn.changed(function() {
  //  console.log(loadBtn.elt.files);
    //classifier.load(loadBtn.elt.files, function() {
    /* let urljson = "https://ipfs.io/ipfs/bafybeiccb6jlx4iq45ycnx3z2waoupl53byqucs4y2wmdldjrjeryebevm/model.json";
    let urlbin = "https://ipfs.io/ipfs/bafybeiccb6jlx4iq45ycnx3z2waoupl53byqucs4y2wmdldjrjeryebevm/model.weights.bin";
    classifier.load([loadJSON(urljson),urlbin],function() {
      select('#modelStatus').html('Custom Model Loaded!');
    });  */

    
  //  console.log("step 2");
  //});
}

// Show the results
function gotResults(err, results) {
  // Display any error
  if (err) {
    console.error(err);
  }
  if (results && results[0]) {
    select("#result").html(results[0].label);
    select("#confidence").html(`${results[0].confidence.toFixed(2) * 100  }%`);
    classify();
  }
}

