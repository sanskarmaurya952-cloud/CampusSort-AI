# ♻️ CampusSort AI — Smart Waste Classifier

**AI-powered waste classification for cleaner and more sustainable campuses.**

CampusSort AI is a machine learning-based web application that helps users identify and segregate common waste items. Users upload an image of a waste item, and the trained image classification model predicts its category.

## 🌍 Problem Statement

Improper waste segregation is a major challenge in campuses and public spaces. People often struggle to distinguish recyclable materials from organic waste, causing useful materials to be mixed with general waste and increasing landfill burden.

CampusSort AI aims to make waste identification simpler through an accessible, browser-based machine learning solution.

## 💡 Solution

The application uses a trained image classification model to classify waste images into four categories:

* **Plastic** — bottles, containers and other plastic items
* **Paper** — sheets, cardboard and paper packaging
* **Metal** — cans and other metal objects
* **Organic** — fruit peels and other biodegradable waste

Users upload an image and receive a predicted category with a confidence score. The result can help them make more informed waste-disposal decisions.

## ✨ Features

* Image upload for waste classification
* Machine learning-powered predictions
* Four waste categories
* Prediction confidence display
* Simple, responsive user interface
* Browser-based inference without a dedicated backend server

## 🧠 Machine Learning Model

The project uses an image classification model trained using **Google Teachable Machine** and exported in TensorFlow.js format.

The exported model files are stored in the `model/` directory.

Expected model files include:

* `model.json`
* `metadata.json`
* The weight file(s) referenced by `model.json`

**Note:** Predictions depend on the quality and diversity of training images. The model may misclassify unfamiliar objects, mixed materials, or images with poor lighting. Predictions should be treated as guidance rather than a guarantee of correct recycling.

## 🛠️ Technology Stack

* HTML5
* CSS3
* JavaScript
* TensorFlow.js
* Google Teachable Machine
* GitHub
* Vercel

## 📁 Project Structure

```text
CampusSort-AI/
├── index.html
├── style.css
├── script.js
├── README.md
└── model/
    ├── model.json
    ├── metadata.json
    └── model weight files
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/CampusSort-AI.git
cd CampusSort-AI
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Add the trained model

Export the model from Google Teachable Machine using the TensorFlow.js format. Copy the exported model files into the `model/` directory, preserving their original filenames.

### 3. Start a local server

With Python installed, run:

```bash
py -m http.server 8000
```

Open `http://localhost:8000` in your browser.

## 🌐 Deployment

The application can be deployed using Vercel:

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Deploy the project as a static website.
4. Open the deployed URL and test image classification.

Ensure the exported model files are included in the deployed repository.

## 🧪 Testing

Test the model with images that were not used during training. Include different object types, backgrounds, lighting conditions, and camera angles.

Record the actual results and limitations before reporting model accuracy.

## 🔮 Future Improvements

* Add more waste categories, such as glass and e-waste
* Improve classification with a larger and more diverse dataset
* Provide locally relevant waste-disposal guidance
* Add multilingual support
* Evaluate model performance using a separate test dataset

## 🎯 Impact

CampusSort AI demonstrates how accessible machine learning can encourage better waste-segregation habits and support cleaner campuses.

## 👨‍💻 Author

**Sanskar Maurya**

Built as an individual machine learning innovation project for the BUILD WITH ML competition.

## 📄 Disclaimer

This is an educational prototype. Predictions may be inaccurate and should not replace local waste-management guidelines.

## 🙌 Acknowledgements

* Google Teachable Machine
* TensorFlow.js
* Open-source web technologies

AI assistants and other resources used during development should be acknowledged in accordance with the competition rules.
