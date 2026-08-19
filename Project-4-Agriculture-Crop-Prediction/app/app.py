# ==========================================
# Agriculture Crop Production Prediction
# ==========================================

import streamlit as st
import joblib
import numpy as np

# -----------------------------------------
# Page Configuration
# -----------------------------------------

st.set_page_config(
    page_title="Agriculture Crop Prediction",
    page_icon="🌾",
    layout="centered"
)

# ==========================================
# Sidebar
# ==========================================

with st.sidebar:

    st.image(
        "https://img.icons8.com/color/96/wheat.png",
        width=90
    )

    st.title("Crop Prediction")

    st.markdown("---")

    st.write("### 🤖 Model")
    st.info("Random Forest Regressor")

    st.write("### 📊 Accuracy")
    st.success("94.63 %")

    st.write("### 📂 Dataset")
    st.write("49 Agricultural Records")

    st.markdown("---")

    st.write("### 🛠 Technologies")

    st.write("""
- Python
- Pandas
- NumPy
- Scikit-learn
- Streamlit
- Joblib
""")
    
# -----------------------------------------
# Load Model
# -----------------------------------------

model = joblib.load("./model/crop_prediction_model.pkl")
crop_encoder = joblib.load("./model/crop_encoder.pkl")
state_encoder = joblib.load("./model/state_encoder.pkl")

# -----------------------------------------
# Custom CSS
# -----------------------------------------

st.markdown("""
<style>

.block-container{
    max-width:1000px;
    padding-top:2rem;
    padding-bottom:2rem;
}

.main{
    background:#f8fafc;
}

.metric-card{
    background:white;
    padding:15px;
    border-radius:12px;
    text-align:center;
    box-shadow:0px 3px 10px rgba(0,0,0,.08);
}

.result-card{
    background:linear-gradient(135deg,#16a34a,#22c55e);
    color:white;
    padding:25px;
    border-radius:15px;
    text-align:center;
    margin-top:20px;
}

.stButton>button{
    width:100%;
    height:55px;
    font-size:18px;
    font-weight:bold;
    border-radius:10px;
    background:#16a34a;
    color:white;
}

.stButton>button:hover{
    background:#15803d;
}

</style>
""", unsafe_allow_html=True)

# ==========================================
# Header
# ==========================================

st.markdown("""
<h1 style="text-align:center;color:#15803d;">
🌾 Agriculture Crop Production Prediction
</h1>
""", unsafe_allow_html=True)

st.markdown("""
<p style="
text-align:center;
font-size:18px;
color:gray;
margin-bottom:30px;
">
AI-powered system to predict agriculture crop yield using
Random Forest Regression.
</p>
""", unsafe_allow_html=True)

col1,col2,col3=st.columns(3)

with col1:
    st.markdown("""
    <div class="metric-card">
        <h4>🤖 Model</h4>
        <h2>Random Forest</h2>
    </div>
    """,unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="metric-card">
        <h4>📈 Accuracy</h4>
        <h2>94.63%</h2>
    </div>
    """,unsafe_allow_html=True)

with col3:
    st.markdown("""
    <div class="metric-card">
        <h4>📂 Dataset</h4>
        <h2>49 Records</h2>
    </div>
    """,unsafe_allow_html=True)

st.divider()

# -----------------------------------------
# Input Section
# -----------------------------------------

st.markdown("## 🌱 Enter Crop Details")
col1, col2 = st.columns(2)

with col1:
    crop = st.selectbox(
        "🌱 Select Crop",
        crop_encoder.classes_
    )

with col2:
    state = st.selectbox(
        "📍 Select State",
        state_encoder.classes_
    )

col3, col4 = st.columns(2)

with col3:
    cultivation_a2fl = st.number_input(
        "Cultivation Cost A2+FL",
        min_value=0.0,
        format="%.2f"
    )

with col4:
    cultivation_c2 = st.number_input(
        "Cultivation Cost C2",
        min_value=0.0,
        format="%.2f"
    )

production_cost = st.number_input(
    "Production Cost C2",
    min_value=0.0,
    format="%.2f"
)

st.divider()

# -----------------------------------------
# Prediction
# -----------------------------------------

# -----------------------------------------
# Prediction
# -----------------------------------------

if st.button("🚀 Predict Crop Yield"):

    # Input Validation
    if cultivation_a2fl == 0 or cultivation_c2 == 0 or production_cost == 0:
        st.warning("Please enter all cultivation and production costs.")
        st.stop()

    # Encode Inputs
    crop_encoded = crop_encoder.transform([crop])[0]
    state_encoded = state_encoder.transform([state])[0]

    # Create Input Array
    input_data = np.array([[
        crop_encoded,
        state_encoded,
        cultivation_a2fl,
        cultivation_c2,
        production_cost
    ]])

    # Predict
    prediction = model.predict(input_data)[0]

    # Save prediction
    st.session_state["prediction"] = prediction

    # -----------------------------
    # Input Summary
    # -----------------------------

    st.subheader("📋 Input Summary")

    col1, col2 = st.columns(2)

    with col1:
        st.write("**Crop:**", crop)
        st.write("**State:**", state)
        st.write("**Cultivation Cost A2+FL:**", cultivation_a2fl)

    with col2:
        st.write("**Cultivation Cost C2:**", cultivation_c2)
        st.write("**Production Cost C2:**", production_cost)

    # -----------------------------
    # Prediction Card
    # -----------------------------

    st.markdown(f"""
    <div class="result-card">

    <h3>🌾 Predicted Crop Yield</h3>

    <h1>{prediction:.2f}</h1>

    <p>Quintal / Hectare</p>

    </div>
    """, unsafe_allow_html=True)

    # -----------------------------
    # Download Prediction
    # -----------------------------

    result = f"""
Agriculture Crop Production Prediction

----------------------------------------

Crop : {crop}

State : {state}

Cultivation Cost A2+FL : {cultivation_a2fl}

Cultivation Cost C2 : {cultivation_c2}

Production Cost C2 : {production_cost}

----------------------------------------

Predicted Yield : {prediction:.2f} Quintal / Hectare
"""

    st.download_button(
        "📄 Download Prediction",
        data=result,
        file_name="crop_prediction.txt",
        mime="text/plain"
    )

st.divider()

# -----------------------------------------
# About Section
# -----------------------------------------


with st.expander("📖 About this Project"):

    st.write("""
This application predicts agriculture crop yield using a
Random Forest Regression model trained on historical crop
production data.

### Features
- Crop Selection
- State Selection
- Cost Inputs
- Machine Learning Prediction

### Technologies Used

- Python
- Streamlit
- Scikit-learn
- Pandas
- Joblib
""")
    
st.divider()

st.markdown(
"""
<div style="text-align:center;color:gray;">

Developed by <b>Md Fahad</b><br>

Data Science & Machine Learning Internship<br>

Uniconverge Technologies | Edunet Foundation | 2026

</div>
""",
unsafe_allow_html=True)