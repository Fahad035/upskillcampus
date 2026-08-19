<div align="center">

# 🚦 Smart City Traffic Forecasting using Machine Learning

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=28&duration=3000&pause=1000&color=2563EB&center=true&vCenter=true&width=900&lines=AI-Powered+Traffic+Forecasting+System;Random+Forest+Regression+Model;Interactive+Streamlit+Dashboard;Smart+City+Transportation+Analytics;Machine+Learning+Internship+Project" />

<br>

<p align="center">

<img src="https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python"/>

<img src="https://img.shields.io/badge/Streamlit-Web_App-red?style=for-the-badge&logo=streamlit"/>

<img src="https://img.shields.io/badge/Scikit--Learn-Machine_Learning-orange?style=for-the-badge&logo=scikitlearn"/>

<img src="https://img.shields.io/badge/Pandas-Data_Analysis-150458?style=for-the-badge&logo=pandas"/>

<img src="https://img.shields.io/badge/NumPy-Scientific_Computing-013243?style=for-the-badge&logo=numpy"/>

<img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge"/>

</p>

</div>

---

# 🌐 Live Demo

### 🚀 Experience the Application

> **Streamlit Cloud**

### https://smart-city-traffic-forecasting-5ioakrjecoad96ecdzgkw9.streamlit.app

---

# 📌 Overview

Smart City Traffic Forecasting is an Artificial Intelligence powered web application that predicts future traffic volume at city junctions using Machine Learning.

The application utilizes a **Random Forest Regression** model trained on historical traffic records to estimate the expected number of vehicles for a selected junction, date, and time.

The primary objective of this project is to assist transportation authorities, urban planners, and smart city initiatives in improving traffic management and reducing congestion through predictive analytics.

The application provides a modern interactive dashboard developed using Streamlit, allowing users to perform real-time traffic forecasting with an intuitive and responsive interface.

---

# 🎯 Project Objectives

The major objectives of this project are:

- Predict future traffic volume using Machine Learning.
- Analyze historical traffic patterns.
- Support smart transportation planning.
- Reduce urban traffic congestion.
- Improve road infrastructure planning.
- Assist decision-makers with predictive insights.
- Demonstrate end-to-end Machine Learning deployment.
- Build a modern AI-powered dashboard using Streamlit.

---

# ✨ Key Features

## 🚦 Traffic Forecasting

Predict expected vehicle count using a trained Random Forest Regression model.

---

## 📅 Date-Based Prediction

Generate traffic forecasts for any selected date.

---

## 🕒 Hour-wise Traffic Analysis

Predict traffic volume for different hours of the day.

---

## 📈 Traffic Trend Visualization

Interactive 24-hour traffic forecasting graph.

---

## 📊 Dashboard Analytics

Beautiful analytics cards displaying prediction insights.

---

## 🚗 Traffic Status Detection

Automatically classifies traffic into:

- 🟢 Low Traffic
- 🟡 Moderate Traffic
- 🔴 Heavy Traffic

---

## 🤖 AI Recommendation System

Provides intelligent recommendations based on predicted traffic conditions.

---

## 📄 Download Prediction Report

Generate and download traffic prediction reports directly from the application.

---

## 🎨 Modern User Interface

- Premium Gradient Design
- Glassmorphism Cards
- Interactive Dashboard
- Responsive Layout
- Professional Sidebar
- Hero Banner with Real Traffic Image

---

# 🖼 Project Preview

> Replace these placeholders with your screenshots after uploading them into a `screenshots` folder.

| Dashboard | Prediction Result |
|-----------|-------------------|
| ![](screenshots/dashboard.png) | ![](screenshots/prediction.png) |

---

# 📊 Project Highlights

| Feature | Status |
|----------|--------|
| Machine Learning Model | ✅ Completed |
| Data Cleaning | ✅ Completed |
| Feature Engineering | ✅ Completed |
| Model Training | ✅ Completed |
| Model Evaluation | ✅ Completed |
| Model Serialization | ✅ Completed |
| Streamlit Dashboard | ✅ Completed |
| Prediction Report Download | ✅ Completed |
| Traffic Trend Graph | ✅ Completed |
| Deployment | ✅ Completed |

---

# 🚀 Technology Stack

### Programming Language

- Python

### Machine Learning

- Scikit-learn

### Data Analysis

- Pandas
- NumPy

### Visualization

- Streamlit

### Model Serialization

- Joblib

### Deployment

- Streamlit Community Cloud

---

# ⭐ Why This Project?

This project demonstrates the complete Machine Learning lifecycle, from data preprocessing and model training to deployment as an interactive web application.

It highlights practical applications of predictive analytics in smart city transportation systems and showcases modern dashboard design using Streamlit.

The project also serves as a real-world portfolio piece demonstrating skills in:

- Machine Learning
- Data Analysis
- Model Deployment
- Python Development
- Interactive Dashboard Design
- AI-powered Decision Support Systems

---

# 📂 Project Structure

```text
Smart-City-Traffic-Forecasting/
│
├── app/
│   └── app.py
│
├── assets/
│   └── hero.jpg
│
├── dataset/
│   └── traffic.csv
│
├── model/
│   └── traffic_prediction_model.pkl
│
├── notebook/
│   └── Smart_City_Traffic_Forecasting.ipynb
│
├── requirements.txt
│
└── README.md
```

---

# 🧠 Machine Learning Workflow

```text
Historical Traffic Dataset
           │
           ▼
Data Cleaning & Preprocessing
           │
           ▼
Feature Engineering
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
Model Serialization (.pkl)
           │
           ▼
Streamlit Dashboard
           │
           ▼
Traffic Volume Prediction
```

---

# 📊 Dataset Description

The project uses a historical traffic dataset containing vehicle count observations collected from multiple road junctions.

The dataset was preprocessed to remove inconsistencies and prepare the data for Machine Learning training.

### Dataset Size

| Property | Value |
|----------|------:|
| Total Records | **48,120** |
| Duplicate Records | **0** |
| Missing Values | **0** |
| Target Variable | Traffic Volume |

---

# 📑 Dataset Features

| Feature | Description |
|----------|-------------|
| Junction | Junction ID |
| Year | Observation Year |
| Month | Month of Observation |
| Day | Day of Month |
| Hour | Hour of Day |
| Day of Week | Weekday Number |
| Vehicles | Target Traffic Volume |

---

# 🧹 Data Preprocessing

The following preprocessing steps were performed before model training:

- Removed duplicate records
- Checked missing values
- Converted date information into numerical features
- Extracted Year
- Extracted Month
- Extracted Day
- Extracted Hour
- Extracted Day of Week
- Selected relevant features
- Split dataset into training and testing sets

---

# 📈 Train-Test Split

The dataset was divided into training and testing datasets for model evaluation.

| Dataset | Samples |
|---------|---------:|
| Training Data | **38,496** |
| Testing Data | **9,624** |

---

# 🤖 Machine Learning Models

Three regression algorithms were evaluated to determine the best-performing model.

| Model | Purpose |
|-------|---------|
| Linear Regression | Baseline Model |
| Decision Tree Regressor | Non-linear Regression |
| ✅ Random Forest Regressor | Final Selected Model |

---

# 📊 Model Performance Comparison

| Model | MAE | RMSE | R² Score |
|------|------:|------:|------:|
| Linear Regression | 9.637650 | 12.772034 | 0.599740 |
| Decision Tree | 3.136118 | 4.794033 | 0.943607 |
| ✅ Random Forest | **2.396650** | **3.556561** | **0.968963** |

---

# 🏆 Selected Model

After evaluating all regression algorithms, **Random Forest Regressor** achieved the highest prediction performance.

### Final Model

```text
RandomForestRegressor(random_state=42)
```

### Performance

- ✅ Lowest MAE
- ✅ Lowest RMSE
- ✅ Highest R² Score
- ✅ Best Generalization
- ✅ Excellent Prediction Accuracy

---

# 📉 Model Evaluation Metrics

### Mean Absolute Error (MAE)

Measures the average prediction error between actual and predicted traffic volume.

**Random Forest MAE**

```text
2.396650
```

---

### Root Mean Squared Error (RMSE)

Measures prediction accuracy while giving higher importance to large errors.

**Random Forest RMSE**

```text
3.556561
```

---

### R² Score

Represents how well the model explains the variance in traffic volume.

**Random Forest R² Score**

```text
0.968963
```

Equivalent Accuracy

```text
96.90%
```

---

# 🔄 Complete Project Pipeline

```text
Traffic Dataset
      │
      ▼
Data Cleaning
      │
      ▼
Feature Engineering
      │
      ▼
Train/Test Split
      │
      ▼
Train ML Models
      │
      ▼
Model Evaluation
      │
      ▼
Random Forest Selected
      │
      ▼
Save Model (.pkl)
      │
      ▼
Build Streamlit Dashboard
      │
      ▼
Deploy to Streamlit Community Cloud
```

---

# 🎯 Project Outcomes

✔ Successfully trained multiple Machine Learning models

✔ Achieved **96.90% R² Score** using Random Forest Regression

✔ Built an interactive Streamlit dashboard

✔ Visualized hourly traffic trends

✔ Generated downloadable prediction reports

✔ Successfully deployed the application on Streamlit Community Cloud

---
# ⚙️ Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Fahad035/Smart-City-Traffic-Forecasting.git
```

---

## 2️⃣ Navigate to the Project Directory

```bash
cd Smart-City-Traffic-Forecasting
```

---

## 3️⃣ Create a Virtual Environment

### Windows

```bash
python -m venv venv
```

Activate Virtual Environment

```bash
venv\Scripts\activate
```

---

### Linux / macOS

```bash
python3 -m venv venv
```

Activate

```bash
source venv/bin/activate
```

---

## 4️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 5️⃣ Run the Application

```bash
streamlit run app/app.py
```

The application will start locally at:

```text
http://localhost:8501
```

---

# 🚀 Usage Guide

Using the application is simple and intuitive.

### Step 1

Select the desired **Junction ID**.

---

### Step 2

Choose the **Prediction Date**.

---

### Step 3

Select the **Hour** of the day.

---

### Step 4

Click the **Forecast Traffic Volume** button.

---

### Step 5

The dashboard instantly displays:

- 🚗 Predicted Vehicle Count
- 🚦 Traffic Status
- 📊 Analytics Dashboard
- 📈 24-Hour Traffic Trend
- 📋 Prediction Summary

---

### Step 6

Download the prediction report using the built-in download feature.

---

# 📸 Application Screenshots

Create a folder named **screenshots** and place your images inside it.

```text
screenshots/
│
├── home.png
├── dashboard.png
├── prediction.png
├── analytics.png
├── trend.png
```

---

## 🏠 Home Dashboard

<p align="center">
<img src="screenshots/home.png" width="900">
</p>

---

## 🚦 Prediction Dashboard

<p align="center">
<img src="screenshots/dashboard.png" width="900">
</p>

---

## 📊 Traffic Prediction Result

<p align="center">
<img src="screenshots/prediction.png" width="900">
</p>

---

## 📈 Traffic Analytics

<p align="center">
<img src="screenshots/analytics.png" width="900">
</p>

---

## 📉 Hourly Traffic Trend

<p align="center">
<img src="screenshots/trend.png" width="900">
</p>

---

# 🏗 System Architecture

```text
                    User

                      │

                      ▼

          Streamlit Web Dashboard

                      │

                      ▼

          Input Validation Layer

                      │

                      ▼

       Random Forest Regression Model

                      │

                      ▼

          Traffic Volume Prediction

                      │

        ┌─────────────┴─────────────┐

        ▼                           ▼

 Traffic Analytics         Prediction Report

        ▼                           ▼

     Dashboard                Download Report
```

---

# 🖥 Dashboard Modules

The application consists of multiple interactive modules:

### 🚀 Hero Section

- Modern Gradient Banner
- Professional Design
- Traffic Image
- Project Overview

---

### 📊 Dashboard Cards

Displays:

- AI Model
- Accuracy
- Dataset Size

---

### 🚦 Prediction Form

Allows users to provide:

- Junction
- Date
- Hour
- Day

---

### 📈 Prediction Engine

The trained Random Forest model predicts traffic volume instantly.

---

### 📊 Traffic Analytics

Displays:

- Predicted Vehicles
- Junction
- Hour

---

### 📈 Traffic Trend

Shows predicted traffic throughout the day using an interactive line chart.

---

### 📋 Prediction Summary

Displays all selected inputs together with the predicted traffic volume.

---

### 📄 Download Report

Generates a downloadable prediction report in **TXT** format.

---

# ☁ Deployment

The application has been successfully deployed using **Streamlit Community Cloud**.

### 🌍 Live Application

https://smart-city-traffic-forecasting-5ioakrjecoad96ecdzgkw9.streamlit.app

---

### Deployment Platform

- Streamlit Community Cloud

---

### Version Control

- Git
- GitHub

---

# 📊 Performance Highlights

| Metric | Result |
|---------|--------|
| Dataset Records | 48,120 |
| Training Samples | 38,496 |
| Testing Samples | 9,624 |
| Selected Model | Random Forest |
| MAE | 2.396650 |
| RMSE | 3.556561 |
| R² Score | 96.90% |
| Deployment | Streamlit Cloud |

---

# 🎯 Skills Demonstrated

This project demonstrates practical knowledge of:

- Python Programming
- Data Analysis
- Machine Learning
- Regression Algorithms
- Feature Engineering
- Model Evaluation
- Model Serialization
- Streamlit Development
- Interactive Dashboard Design
- Data Visualization
- Git & GitHub
- Cloud Deployment

---

# 💡 Real-World Applications

This solution can be applied in several smart city scenarios:

- Smart Traffic Management
- Intelligent Transportation Systems
- Urban Infrastructure Planning
- Traffic Congestion Monitoring
- Emergency Route Planning
- Public Transport Scheduling
- Traffic Control Centers
- Government Smart City Projects

---

# 🚀 Future Enhancements

Although the current application delivers accurate traffic forecasting, several advanced features can further improve its capabilities.

### Planned Improvements

- 🌦 Weather-Based Traffic Prediction
- 🗺 Google Maps API Integration
- 📍 Live Traffic Monitoring
- 🚔 Accident Detection Integration
- 📡 Real-Time Traffic Data Collection
- 🧠 Deep Learning (LSTM/GRU) Models
- 🚘 Route Recommendation System
- 🚦 Smart Traffic Signal Optimization
- 🌍 Multi-City Traffic Prediction
- 📱 Mobile Responsive Dashboard
- ☁ Cloud Database Integration
- 📊 Interactive Power BI Dashboard
- 🤖 AI Chat Assistant for Traffic Insights
- 🔔 Traffic Alert Notification System

---

# 📌 Challenges Faced

During the development of this project, several challenges were encountered and successfully resolved.

- Preparing and cleaning historical traffic data.
- Selecting the most suitable regression algorithm.
- Improving prediction accuracy through model comparison.
- Designing a professional Streamlit dashboard.
- Handling prediction report generation.
- Creating interactive traffic trend visualization.
- Deploying the application on Streamlit Community Cloud.
- Managing GitHub large model files efficiently.

---

# 🏆 Project Achievements

✅ Successfully cleaned and preprocessed the dataset.

✅ Trained multiple Machine Learning regression models.

✅ Achieved **96.90% R² Score** using Random Forest Regression.

✅ Developed a modern Streamlit dashboard.

✅ Added interactive traffic trend visualization.

✅ Implemented downloadable prediction reports.

✅ Successfully deployed the application to Streamlit Community Cloud.

---

# 📚 Learning Outcomes

This project strengthened practical skills in:

- Machine Learning Workflow
- Data Cleaning & Feature Engineering
- Regression Algorithms
- Model Evaluation
- Streamlit Application Development
- Interactive Dashboard Design
- Data Visualization
- Model Deployment
- Git & GitHub
- Cloud Deployment

---

# 🤝 Contributing

Contributions are welcome!

If you would like to improve this project:

1. Fork this repository.
2. Create a new feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Added new feature"
```

4. Push your branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 🛡 License

This project is released under the **MIT License**.

You are free to use, modify, and distribute this project for educational and personal purposes.

---

# 🙏 Acknowledgements

Special thanks to:

- **Uniconverge Technologies**
- **Edunet Foundation**
- **Scikit-learn**
- **Streamlit**
- **Python Community**
- **Open Source Contributors**

for providing the tools and learning resources that made this project possible.

---

# 👨‍💻 Developer

<div align="center">

## Md Fahad

**Data Science & Machine Learning Intern**

Passionate about Artificial Intelligence, Machine Learning, Data Science, and Full Stack Development.

</div>

---

# 🌐 Connect With Me

<div align="center">

<a href="https://github.com/Fahad035">
<img src="https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github">
</a>

<a href="https://portfolio-five-puce-89.vercel.app">
<img src="https://img.shields.io/badge/Portfolio-Visit-blue?style=for-the-badge&logo=googlechrome">
</a>

</div>

---

# 🌍 Live Demo

<div align="center">

### 🚦 Smart City Traffic Forecasting

### https://smart-city-traffic-forecasting-5ioakrjecoad96ecdzgkw9.streamlit.app

</div>

---

# ⭐ Support

If you found this project useful:

🌟 Star this repository

🍴 Fork this repository

💡 Share your feedback

🤝 Contribute to future improvements

Your support motivates continued development of open-source Machine Learning projects.

---

# 📈 Repository Statistics

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Fahad035/Smart-City-Traffic-Forecasting?style=for-the-badge)

![GitHub forks](https://img.shields.io/github/forks/Fahad035/Smart-City-Traffic-Forecasting?style=for-the-badge)

![GitHub issues](https://img.shields.io/github/issues/Fahad035/Smart-City-Traffic-Forecasting?style=for-the-badge)

![GitHub last commit](https://img.shields.io/github/last-commit/Fahad035/Smart-City-Traffic-Forecasting?style=for-the-badge)

</div>

---

# 👀 Visitor Count

<div align="center">

<img src="https://komarev.com/ghpvc/?username=Fahad035&repo=Smart-City-Traffic-Forecasting&label=Repository+Views&color=2563EB&style=for-the-badge"/>

</div>

---

<div align="center">

# ❤️ Thank You for Visiting

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=24&duration=3000&pause=1000&color=2563EB&center=true&vCenter=true&width=850&lines=Thank+You+for+Visiting+the+Repository!;Happy+Coding!;Keep+Learning+Machine+Learning!;Building+Smarter+Cities+with+AI!" />

### ⭐ If you enjoyed this project, don't forget to star the repository!

</div>
