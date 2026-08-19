# 🌾 Agriculture Crop Production Prediction

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![Streamlit](https://img.shields.io/badge/Streamlit-Web%20App-red?style=for-the-badge&logo=streamlit)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-Machine%20Learning-orange?style=for-the-badge&logo=scikitlearn)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

### AI-Powered Agriculture Crop Yield Prediction using Machine Learning

**Developed as part of the Data Science & Machine Learning Internship**

**Organization:** Uniconverge Technologies  
**Supported By:** Edunet Foundation

</div>

---

## 🌐 Live Demo

🚀 **Live Application**

https://agriculture-crop-appuction-prediction-nxuppvq96jbuxgcnrab4vw.streamlit.app

---

# 📖 Project Overview

Agriculture plays a crucial role in food production and the economy. Estimating crop yield before harvesting helps farmers, agricultural organizations, and policymakers make informed decisions regarding cultivation planning and resource management.

This project presents a Machine Learning-based Crop Production Prediction System that predicts the expected crop yield using historical agricultural data. The application is built using **Python**, **Scikit-learn**, and **Streamlit**, providing an easy-to-use web interface where users can input agricultural parameters and instantly receive yield predictions.

---

# 🎯 Objectives

- Predict agricultural crop production using Machine Learning.
- Compare multiple regression algorithms.
- Select the best-performing model based on evaluation metrics.
- Deploy the trained model as an interactive web application.
- Provide an easy-to-use interface for prediction.

---

# ✨ Features

- 🌾 Crop Selection
- 📍 State Selection
- 💰 Cultivation Cost (A2+FL)
- 💰 Cultivation Cost (C2)
- 💰 Production Cost
- 🤖 Machine Learning Prediction
- 📊 Feature Importance Visualization
- 📄 Download Prediction Report
- 🎨 Professional Streamlit Dashboard
- 🌐 Online Deployment

---

# 🧠 Machine Learning Workflow

```
Dataset
      │
      ▼
Data Cleaning
      │
      ▼
Label Encoding
      │
      ▼
Train-Test Split
      │
      ▼
Model Training
      │
      ▼
Model Evaluation
      │
      ▼
Random Forest Selected
      │
      ▼
Model Serialization
      │
      ▼
Streamlit Web Application
```

---

# 📂 Dataset Information

The dataset contains historical agricultural production records.

### Input Features

- Crop
- State
- Cost of Cultivation (A2+FL)
- Cost of Cultivation (C2)
- Cost of Production (C2)

### Target Variable

- Yield (Quintal / Hectare)

---

# 🤖 Machine Learning Models Used

The following regression models were implemented and compared:

| Model | Purpose |
|--------|----------|
| Linear Regression | Baseline Regression Model |
| Decision Tree Regressor | Tree-Based Regression |
| Random Forest Regressor | Ensemble Learning (Selected Model) |

---

# 📈 Model Performance

| Model | R² Score |
|--------|-----------|
| Linear Regression | 0.7800 |
| Decision Tree | 0.6444 |
| ✅ Random Forest | **0.9463** |

The Random Forest Regressor achieved the highest prediction accuracy and was selected for deployment.

---

# 🛠️ Technologies Used

## Programming Language

- Python

## Libraries

- Pandas
- NumPy
- Scikit-learn
- Joblib
- Matplotlib
- Streamlit

## Development Tools

- Visual Studio Code
- Jupyter Notebook
- Git
- GitHub

## Deployment

- Streamlit Community Cloud

---

# 📁 Project Structure

```
Project-4-Agriculture-Crop-Prediction
│
├── app/
│   └── app.py
│
├── data/
│   └── datafile (1).csv
│
├── model/
│   ├── crop_prediction_model.pkl
│   ├── crop_encoder.pkl
│   └── state_encoder.pkl
│
├── notebook/
│   └── Crop_Production_Prediction.ipynb
│
├── requirements.txt
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/your-repository-name.git
```

Move into the project directory.

```bash
cd Project-4-Agriculture-Crop-Prediction
```

Install the required packages.

```bash
pip install -r requirements.txt
```

Run the application.

```bash
streamlit run app/app.py
```

---

# 🚀 How to Use

1. Open the web application.
2. Select the Crop.
3. Select the State.
4. Enter the cultivation costs.
5. Enter the production cost.
6. Click **Predict Crop Yield**.
7. View the predicted crop yield.
8. Download the prediction report if required.

---

# 📊 Application Preview

The application provides:

- Professional Dashboard
- Interactive Input Form
- Crop Yield Prediction
- Feature Importance Graph
- Prediction Summary
- Download Report
- Responsive Interface

---

# 💡 Future Enhancements

- Weather Data Integration
- Rainfall Prediction
- Soil Quality Analysis
- Satellite Data Integration
- Real-Time Crop Recommendation
- Mobile Responsive Dashboard
- Multi-language Support

---

# 🎓 Internship Details

**Internship**

Data Science & Machine Learning Internship

**Organization**

Uniconverge Technologies

**Supported By**

Edunet Foundation

**Duration**

6 Weeks

---

# 👨‍💻 Author

**Md Fahad**

Computer Science Engineering (Artificial Intelligence & Machine Learning)

GitHub: https://github.com/Fahad035

Portfolio: https://portfolio-five-puce-89.vercel.app

---

# 🙏 Acknowledgements

Special thanks to:

- Uniconverge Technologies
- Edunet Foundation
- Streamlit
- Scikit-learn Community
- Python Open Source Community

for providing learning resources and tools that made this project possible.

---

# 📜 License

This project is developed for educational and internship purposes.

Feel free to use and modify it for learning purposes.

---

<div align="center">

### ⭐ If you found this project useful, please consider giving it a Star!

Made with ❤️ by **Md Fahad**

</div>