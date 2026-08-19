# ==========================================================
# Smart City Traffic Forecasting
# Data Science & Machine Learning Internship
# ==========================================================
import base64
import streamlit as st
import joblib
import numpy as np
import pandas as pd

from pathlib import Path
from datetime import datetime

# ==========================================================
# PAGE CONFIGURATION
# ==========================================================

st.set_page_config(
    page_title="Smart City Traffic Forecasting",
    page_icon="🚦",
    layout="centered",
    initial_sidebar_state="expanded"
)

# ==========================================================
# LOAD MODEL
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

model = joblib.load(
    BASE_DIR / "model" / "traffic_prediction_model.pkl"
)

IMAGE_PATH = BASE_DIR / "assets" / "traffic.jpg"
HERO_IMAGE = BASE_DIR / "assets" / "hero.jpg"

with open(HERO_IMAGE, "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode()
# ==========================================================
# CUSTOM CSS
# ==========================================================

st.markdown("""
<style>

/* ---------- Background ---------- */

.stApp{

background:
linear-gradient(
135deg,
#EEF4FF 0%,
#F8FAFC 45%,
#ECFEFF 100%
);

}

/* ---------- Main Container ---------- */

.block-container{

max-width:1100px;

padding-top:1.5rem;

padding-bottom:2rem;

}

/* ---------- Hero ---------- */

.hero{

background:rgba(15,23,42,.75);

backdrop-filter:blur(12px);

color:white;

padding:40px;

border-radius:22px;

margin-top:-210px;

margin-left:25px;

margin-right:25px;

position:relative;

z-index:10;

box-shadow:0 15px 40px rgba(0,0,0,.35);

}

/* ---------- Badge ---------- */

.badge{

display:inline-block;

padding:10px 18px;

background:white;

color:#2563EB;

border-radius:25px;

font-weight:600;

font-size:15px;

}

/* ---------- Metric Cards ---------- */

.metric-card{

background:rgba(255,255,255,.82);

backdrop-filter:blur(14px);

padding:18px;

border-radius:18px;

border:1px solid rgba(255,255,255,.6);

text-align:center;

box-shadow:
0 10px 25px rgba(0,0,0,.08);

transition:.3s;

}

.metric-card:hover{

transform:translateY(-6px);

box-shadow:
0 18px 35px rgba(37,99,235,.15);

}

.metric-card h4{

color:#64748B;

margin-bottom:12px;

}

.metric-card h2{

font-size:26px;

color:#2563EB;

margin-bottom:6px;

}

.metric-card p{

color:#6B7280;

}

/* ---------- Form ---------- */

.form-card{

background:rgba(255,255,255,.75);

padding:25px;

border-radius:20px;

backdrop-filter:blur(14px);

box-shadow:
0 10px 30px rgba(0,0,0,.08);

margin-bottom:20px;

}

/* ---------- Result ---------- */

.result-card{

background:
linear-gradient(
135deg,
#2563EB,
#7C3AED
);

padding:35px;

border-radius:24px;

text-align:center;

color:white;

box-shadow:
0 18px 45px rgba(37,99,235,.28);

}

/* ---------- Buttons ---------- */

.stButton>button{

width:100%;

height:56px;

border:none;

border-radius:14px;

font-size:18px;

font-weight:700;

background:
linear-gradient(
135deg,
#2563EB,
#7C3AED
);

color:white;

transition:.25s;

}

.stButton>button:hover{

transform:translateY(-2px);

box-shadow:
0 12px 30px rgba(37,99,235,.30);

}

/* ---------- Sidebar ---------- */

section[data-testid="stSidebar"]{

background:
linear-gradient(
180deg,
#0F172A,
#1E293B
);

}

section[data-testid="stSidebar"] *{

color:white;

}

</style>
""", unsafe_allow_html=True)

# ==========================================================
# SIDEBAR
# ==========================================================

with st.sidebar:

    st.image(
    IMAGE_PATH,
    use_container_width=True
    )

    st.caption(
    "Real-time Urban Traffic"
    )

    st.title("Traffic Forecast")

    st.markdown("---")

    st.info("🤖 Random Forest Regressor")

    st.success("🎯 Accuracy : 96.90%")

    st.write("📊 Dataset : 48,120 Records")

    st.markdown("---")

    st.subheader("🛠 Technologies")

    st.markdown("""
- Python
- Pandas
- NumPy
- Scikit-learn
- Streamlit
- Joblib
""")

    st.markdown("---")

    st.caption("""
Smart City Traffic Forecasting

Data Science & Machine Learning Internship

Uniconverge Technologies

Version 1.0
""")

# ==========================================================
# HERO
# ==========================================================

st.markdown(f"""
<div style="position:relative;">

<img src="data:image/jpeg;base64,{encoded_image}"
style="
width:100%;
height:320px;
object-fit:cover;
border-radius:24px;
">

</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="hero">

<h1>Smart City Traffic Forecasting</h1>

<p>
AI-powered traffic volume prediction using Machine Learning
to support smarter transportation planning.
</p>

</div>
""", unsafe_allow_html=True)

# ==========================================================
# DASHBOARD CARDS
# ==========================================================

c1,c2,c3=st.columns(3)

with c1:

    st.markdown("""

<div class="metric-card">

<h4>🤖 AI Model</h4>

<h2>Random Forest</h2>

<p>Best Performing Model</p>

</div>

""",unsafe_allow_html=True)

with c2:

    st.markdown("""

<div class="metric-card">

<h4>🎯 Accuracy</h4>

<h2>96.90%</h2>

<p>R² Score</p>

</div>

""",unsafe_allow_html=True)

with c3:

    st.markdown("""

<div class="metric-card">

<h4>🚗 Dataset</h4>

<h2>48,120</h2>

<p>Traffic Records</p>

</div>

""",unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)

# ==========================================================
# PREDICTION FORM
# ==========================================================

st.markdown("""
<h2 style="text-align:center;color:#1E3A8A;">
🚦 Traffic Prediction Dashboard
</h2>
""", unsafe_allow_html=True)

st.markdown("""
<div class="form-card">

<h3 style="color:#2563EB;">

📋 Enter Traffic Details

</h3>

</div>
""", unsafe_allow_html=True)

# ==========================================================
# INPUT FORM
# ==========================================================

col1, col2 = st.columns(2)

with col1:

    junction = st.selectbox(
        "🚦 Select Junction",
        [1, 2, 3, 4]
    )

    selected_date = st.date_input(
        "📅 Select Date",
        datetime(2015, 11, 1)
    )

with col2:

    hour = st.slider(
        "🕒 Select Hour",
        min_value=0,
        max_value=23,
        value=12
    )

    st.info(
        f"📅 **Day:** {selected_date.strftime('%A')}"
    )

# ==========================================================
# DATE FEATURES
# ==========================================================

year = selected_date.year
month = selected_date.month
day = selected_date.day
day_number = selected_date.weekday()

st.markdown("<br>", unsafe_allow_html=True)

predict = st.button("🚦 Predict Traffic Volume")

st.markdown("<br>", unsafe_allow_html=True)

# ==========================================================
# PREDICTION
# ==========================================================

if predict:

    # ---------------------------------------
    # Prepare Input
    # ---------------------------------------

    input_data = np.array([[
        junction,
        year,
        month,
        day,
        hour,
        day_number
    ]])

    # ---------------------------------------
    # Prediction
    # ---------------------------------------

    prediction = model.predict(input_data)[0]

    prediction = max(0, prediction)

    # ---------------------------------------
    # Traffic Status
    # ---------------------------------------

    if prediction < 20:

        status = "🟢 Low Traffic"

        color = "#10B981"

        recommendation = (
            "Traffic is expected to remain smooth. "
            "No congestion is anticipated."
        )

    elif prediction < 50:

        status = "🟡 Moderate Traffic"

        color = "#F59E0B"

        recommendation = (
            "Moderate traffic is expected. "
            "Drive carefully during busy hours."
        )

    else:

        status = "🔴 Heavy Traffic"

        color = "#EF4444"

        recommendation = (
            "Heavy traffic is expected. "
            "Consider alternate routes or avoid peak hours."
        )

    # =====================================================
    # RESULT CARD
    # =====================================================

    st.markdown(f"""

    <div class="result-card">

    <h2>🚦 Predicted Traffic Volume</h2>

    <h1 style="
    font-size:70px;
    margin-bottom:10px;
    ">
    {prediction:.0f}
    </h1>

    <h3>Vehicles</h3>

    <br>

    <div style="
    background:white;
    color:{color};
    display:inline-block;
    padding:12px 28px;
    border-radius:30px;
    font-size:20px;
    font-weight:bold;
    ">

    {status}

    </div>

    </div>

    """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    # =====================================================
    # DASHBOARD METRICS
    # =====================================================

    st.markdown("## 📊 Traffic Analytics")

    m1, m2, m3 = st.columns(3)

    with m1:
        st.metric(
            "🚗 Vehicles",
            f"{prediction:.0f}"
        )

    with m2:
        st.metric(
            "🚦 Junction",
            junction
        )

    with m3:
        st.metric(
            "🕒 Hour",
            f"{hour}:00"
        )

    # =====================================================
    # TRAFFIC INTENSITY
    # =====================================================

    st.markdown("### 🚦 Traffic Intensity")

    traffic_percent = min(prediction / 100, 1.0)

    st.progress(traffic_percent)

    st.caption(
        f"Traffic Utilization : {traffic_percent*100:.1f}%"
    )

    # =====================================================
    # AI RECOMMENDATION
    # =====================================================

    st.markdown("### 🤖 AI Recommendation")

    if prediction < 20:

        st.success(recommendation)

    elif prediction < 50:

        st.warning(recommendation)

    else:

        st.error(recommendation)

    # =====================================================
    # PREDICTION SUMMARY
    # =====================================================

    st.markdown("## 📋 Prediction Summary")

    summary = pd.DataFrame({

        "Parameter": [

            "Junction",

            "Date",

            "Day",

            "Hour",

            "Predicted Vehicles",

            "Traffic Status"

        ],

        "Value": [

            junction,

            selected_date.strftime("%d-%m-%Y"),

            selected_date.strftime("%A"),

            f"{hour}:00",

            round(prediction),

            status

        ]

    })

    st.table(summary)

    # ==========================================================
    # TRAFFIC TREND CHART
    # ==========================================================

    st.markdown("## 📈 24-Hour Traffic Forecast")

    hours = list(range(24))
    traffic_predictions = []

    for h in hours:

        sample = np.array([[
            junction,
            year,
            month,
            day,
            h,
            day_number
        ]])

        value = model.predict(sample)[0]

        traffic_predictions.append(max(0, value))

    chart_df = pd.DataFrame({

        "Hour": hours,

        "Predicted Vehicles": traffic_predictions

    })

    st.area_chart(
        chart_df.set_index("Hour"),
        use_container_width=True
    )

    # ==========================================================
    # DOWNLOAD REPORT
    # ==========================================================

    report = f"""
SMART CITY TRAFFIC FORECAST REPORT
===========================================

Prediction Date : {selected_date.strftime("%d-%m-%Y")}

Day             : {selected_date.strftime("%A")}

Junction        : {junction}

Hour            : {hour}:00

-------------------------------------------

Predicted Vehicles : {prediction:.0f}

Traffic Status     : {status}

-------------------------------------------

Machine Learning Model

Random Forest Regressor

Dataset Size

48,120 Traffic Records

-------------------------------------------

Generated By

Smart City Traffic Forecasting

Developer

Md Fahad

Data Science & Machine Learning Internship

Uniconverge Technologies

Edunet Foundation

2026

===========================================
"""

    st.download_button(
        "📄 Download Prediction Report",
        data=report,
        file_name="traffic_prediction_report.txt",
        mime="text/plain",
        use_container_width=True
    )

# ==========================================================
# ABOUT PROJECT
# ==========================================================

st.divider()

with st.expander("📖 About this Project", expanded=False):

    st.markdown("""

### 🚦 Smart City Traffic Forecasting

This application predicts the expected traffic volume at a city
junction using Machine Learning.

The system is trained on historical traffic data and uses a
Random Forest Regression model to estimate the number of
vehicles for a selected junction, date, and time.

---

### ✨ Features

- 🚦 Traffic Volume Prediction
- 📅 Date-based Forecasting
- 📊 Interactive Dashboard
- 📈 24-Hour Traffic Trend
- 🤖 AI Recommendation
- 📄 Download Prediction Report

---

### 🧠 Machine Learning

- Random Forest Regressor

---

### 📊 Dataset

- 48,120 Traffic Records

---

### 🛠 Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- Streamlit
- Joblib

""")

# ==========================================================
# FOOTER
# ==========================================================

st.divider()

st.markdown("""
<div style="
background: linear-gradient(135deg, #0F172A, #1E293B);
padding: 22px;
border-radius: 18px;
text-align: center;
color: white;
margin-top: 20px;
">

<h3>🚦 Smart City Traffic Forecasting</h3>

<p>
Developed by <b>Md Fahad</b><br><br>

Data Science & Machine Learning Internship<br><br>

Uniconverge Technologies | Edunet Foundation<br><br>

© 2026 All Rights Reserved
</p>

</div>
""", unsafe_allow_html=True)
