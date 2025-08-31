# 🐍 Python Machine Learning Pipeline
## **Production-Ready ML Implementation for AI Transformation**

---

## 🎯 **Overview**

This guide provides a comprehensive Python machine learning pipeline example that demonstrates production-ready implementation patterns for AI transformation initiatives. The pipeline covers the complete ML lifecycle from data preparation to model deployment and monitoring.

---

## 🏗️ **Pipeline Architecture**

### **1. Pipeline Components**
- **Data Ingestion** - Automated data collection and validation
- **Feature Engineering** - Data preprocessing and feature creation
- **Model Training** - Automated model development and validation
- **Model Deployment** - Production model serving and monitoring
- **Performance Tracking** - Continuous model performance monitoring

### **2. Technology Stack**
- **Core ML Libraries** - Scikit-learn, TensorFlow, PyTorch
- **Data Processing** - Pandas, NumPy, Apache Spark
- **Pipeline Orchestration** - Apache Airflow, Kubeflow
- **Model Serving** - Flask, FastAPI, TensorFlow Serving
- **Monitoring** - MLflow, Weights & Biases, Custom dashboards

---

## 📊 **Complete Pipeline Implementation**

### **1. Project Structure**
```
ai-ml-pipeline/
├── data/
│   ├── raw/                 # Raw data files
│   ├── processed/           # Processed data files
│   └── external/            # External data sources
├── models/
│   ├── trained/             # Trained model files
│   ├── checkpoints/         # Model checkpoints
│   └── artifacts/           # Model artifacts
├── src/
│   ├── data/                # Data processing modules
│   ├── features/             # Feature engineering
│   ├── models/               # Model training and evaluation
│   ├── deployment/           # Model deployment
│   └── monitoring/           # Performance monitoring
├── notebooks/                # Jupyter notebooks
├── tests/                    # Unit tests
├── config/                   # Configuration files
├── requirements.txt          # Python dependencies
└── README.md                 # Project documentation
```

### **2. Configuration Management**
```python
# config/config.yaml
data:
  raw_data_path: "data/raw/"
  processed_data_path: "data/processed/"
  external_data_path: "data/external/"
  
model:
  algorithm: "random_forest"
  hyperparameters:
    n_estimators: 100
    max_depth: 10
    random_state: 42
  
training:
  test_size: 0.2
  validation_size: 0.2
  random_state: 42
  
deployment:
  model_path: "models/trained/"
  api_port: 8000
  host: "0.0.0.0"
```

### **3. Data Processing Pipeline**
```python
# src/data/data_processor.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import logging

class DataProcessor:
    def __init__(self, config):
        self.config = config
        self.scaler = StandardScaler()
        self.logger = logging.getLogger(__name__)
    
    def load_data(self, file_path):
        """Load data from various sources"""
        try:
            if file_path.endswith('.csv'):
                data = pd.read_csv(file_path)
            elif file_path.endswith('.parquet'):
                data = pd.read_parquet(file_path)
            else:
                raise ValueError(f"Unsupported file format: {file_path}")
            
            self.logger.info(f"Loaded data: {data.shape}")
            return data
        except Exception as e:
            self.logger.error(f"Error loading data: {e}")
            raise
    
    def clean_data(self, data):
        """Clean and preprocess data"""
        # Remove duplicates
        data = data.drop_duplicates()
        
        # Handle missing values
        numeric_columns = data.select_dtypes(include=[np.number]).columns
        data[numeric_columns] = data[numeric_columns].fillna(data[numeric_columns].median())
        
        categorical_columns = data.select_dtypes(include=['object']).columns
        data[categorical_columns] = data[categorical_columns].fillna('Unknown')
        
        # Remove outliers (IQR method)
        for col in numeric_columns:
            Q1 = data[col].quantile(0.25)
            Q3 = data[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            data = data[(data[col] >= lower_bound) & (data[col] <= upper_bound)]
        
        self.logger.info(f"Cleaned data: {data.shape}")
        return data
    
    def split_data(self, data, target_column):
        """Split data into training, validation, and test sets"""
        # Separate features and target
        X = data.drop(columns=[target_column])
        y = data[target_column]
        
        # Split into train and temp
        X_train, X_temp, y_train, y_temp = train_test_split(
            X, y, 
            test_size=self.config['training']['test_size'] + self.config['training']['validation_size'],
            random_state=self.config['training']['random_state']
        )
        
        # Split temp into validation and test
        val_ratio = self.config['training']['validation_size'] / (self.config['training']['test_size'] + self.config['training']['validation_size'])
        X_val, X_test, y_val, y_test = train_test_split(
            X_temp, y_temp,
            test_size=val_ratio,
            random_state=self.config['training']['random_state']
        )
        
        self.logger.info(f"Data split - Train: {X_train.shape}, Val: {X_val.shape}, Test: {X_test.shape}")
        return X_train, X_val, X_test, y_train, y_val, y_test
    
    def scale_features(self, X_train, X_val, X_test):
        """Scale numerical features"""
        # Fit scaler on training data
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_val_scaled = self.scaler.transform(X_val)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Convert back to DataFrames
        X_train_scaled = pd.DataFrame(X_train_scaled, columns=X_train.columns)
        X_val_scaled = pd.DataFrame(X_val_scaled, columns=X_val.columns)
        X_test_scaled = pd.DataFrame(X_test_scaled, columns=X_test.columns)
        
        return X_train_scaled, X_val_scaled, X_test_scaled
```

### **4. Feature Engineering**
```python
# src/features/feature_engineer.py
import pandas as pd
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
import logging

class FeatureEngineer:
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        self.feature_selector = None
        self.selected_features = None
    
    def create_features(self, data):
        """Create new features from existing data"""
        data = data.copy()
        
        # Create interaction features
        numeric_columns = data.select_dtypes(include=[np.number]).columns
        for i, col1 in enumerate(numeric_columns):
            for col2 in numeric_columns[i+1:]:
                data[f'{col1}_{col2}_interaction'] = data[col1] * data[col2]
        
        # Create polynomial features
        for col in numeric_columns[:3]:  # Limit to first 3 columns to avoid explosion
            data[f'{col}_squared'] = data[col] ** 2
            data[f'{col}_cubed'] = data[col] ** 3
        
        # Create statistical features
        data['numeric_mean'] = data[numeric_columns].mean(axis=1)
        data['numeric_std'] = data[numeric_columns].std(axis=1)
        data['numeric_sum'] = data[numeric_columns].sum(axis=1)
        
        self.logger.info(f"Created features. New shape: {data.shape}")
        return data
    
    def select_features(self, X_train, y_train, X_val, X_test, k=50):
        """Select most important features"""
        # Initialize feature selector
        self.feature_selector = SelectKBest(score_func=f_classif, k=min(k, X_train.shape[1]))
        
        # Fit and transform training data
        X_train_selected = self.feature_selector.fit_transform(X_train, y_train)
        X_val_selected = self.feature_selector.transform(X_val)
        X_test_selected = self.feature_selector.transform(X_test)
        
        # Get selected feature names
        self.selected_features = X_train.columns[self.feature_selector.get_support()].tolist()
        
        # Convert back to DataFrames
        X_train_selected = pd.DataFrame(X_train_selected, columns=self.selected_features)
        X_val_selected = pd.DataFrame(X_val_selected, columns=self.selected_features)
        X_test_selected = pd.DataFrame(X_test_selected, columns=self.selected_features)
        
        self.logger.info(f"Selected {len(self.selected_features)} features")
        return X_train_selected, X_val_selected, X_test_selected
```

### **5. Model Training**
```python
# src/models/model_trainer.py
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import joblib
import os
import logging
from datetime import datetime

class ModelTrainer:
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        self.model = None
        self.training_history = {}
    
    def train_model(self, X_train, y_train, X_val, y_val):
        """Train the machine learning model"""
        try:
            # Initialize model
            self.model = RandomForestClassifier(
                n_estimators=self.config['model']['hyperparameters']['n_estimators'],
                max_depth=self.config['model']['hyperparameters']['max_depth'],
                random_state=self.config['model']['hyperparameters']['random_state']
            )
            
            # Train model
            self.logger.info("Training model...")
            self.model.fit(X_train, y_train)
            
            # Evaluate on validation set
            y_val_pred = self.model.predict(X_val)
            y_val_pred_proba = self.model.predict_proba(X_val)[:, 1]
            
            # Calculate metrics
            val_accuracy = self.model.score(X_val, y_val)
            val_auc = roc_auc_score(y_val, y_val_pred_proba)
            
            # Store training history
            self.training_history = {
                'training_date': datetime.now().isoformat(),
                'model_type': self.config['model']['algorithm'],
                'hyperparameters': self.config['model']['hyperparameters'],
                'validation_accuracy': val_accuracy,
                'validation_auc': val_auc,
                'feature_importance': dict(zip(X_train.columns, self.model.feature_importances_))
            }
            
            self.logger.info(f"Model trained successfully. Val Accuracy: {val_accuracy:.4f}, Val AUC: {val_auc:.4f}")
            return self.model
            
        except Exception as e:
            self.logger.error(f"Error training model: {e}")
            raise
    
    def evaluate_model(self, X_test, y_test):
        """Evaluate model performance on test set"""
        if self.model is None:
            raise ValueError("Model not trained yet")
        
        # Make predictions
        y_test_pred = self.model.predict(X_test)
        y_test_pred_proba = self.model.predict_proba(X_test)[:, 1]
        
        # Calculate metrics
        test_accuracy = self.model.score(X_test, y_test)
        test_auc = roc_auc_score(y_test, y_test_pred_proba)
        
        # Generate reports
        classification_rep = classification_report(y_test, y_test_pred)
        confusion_mat = confusion_matrix(y_test, y_test_pred)
        
        # Store evaluation results
        evaluation_results = {
            'test_accuracy': test_accuracy,
            'test_auc': test_auc,
            'classification_report': classification_rep,
            'confusion_matrix': confusion_mat.tolist()
        }
        
        self.logger.info(f"Model evaluation completed. Test Accuracy: {test_accuracy:.4f}, Test AUC: {test_auc:.4f}")
        return evaluation_results
    
    def save_model(self, model_path):
        """Save the trained model and artifacts"""
        if self.model is None:
            raise ValueError("Model not trained yet")
        
        try:
            # Create directory if it doesn't exist
            os.makedirs(model_path, exist_ok=True)
            
            # Save model
            model_file = os.path.join(model_path, 'model.pkl')
            joblib.dump(self.model, model_file)
            
            # Save training history
            history_file = os.path.join(model_path, 'training_history.json')
            import json
            with open(history_file, 'w') as f:
                json.dump(self.training_history, f, indent=2)
            
            # Save feature names
            features_file = os.path.join(model_path, 'features.json')
            with open(features_file, 'w') as f:
                json.dump(list(self.model.feature_names_in_), f, indent=2)
            
            self.logger.info(f"Model saved to {model_path}")
            
        except Exception as e:
            self.logger.error(f"Error saving model: {e}")
            raise
```

### **6. Model Deployment**
```python
# src/deployment/model_server.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import logging
import os
from datetime import datetime

class ModelServer:
    def __init__(self, model_path, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        self.model = None
        self.features = None
        self.scaler = None
        
        # Load model and artifacts
        self.load_model(model_path)
    
    def load_model(self, model_path):
        """Load the trained model and artifacts"""
        try:
            # Load model
            model_file = os.path.join(model_path, 'model.pkl')
            self.model = joblib.load(model_file)
            
            # Load features
            features_file = os.path.join(model_path, 'features.json')
            import json
            with open(features_file, 'r') as f:
                self.features = json.load(f)
            
            self.logger.info("Model loaded successfully")
            
        except Exception as e:
            self.logger.error(f"Error loading model: {e}")
            raise
    
    def preprocess_input(self, input_data):
        """Preprocess input data for prediction"""
        try:
            # Convert to DataFrame
            if isinstance(input_data, dict):
                df = pd.DataFrame([input_data])
            elif isinstance(input_data, list):
                df = pd.DataFrame(input_data)
            else:
                df = input_data
            
            # Ensure all required features are present
            missing_features = set(self.features) - set(df.columns)
            if missing_features:
                raise ValueError(f"Missing features: {missing_features}")
            
            # Select only required features
            df = df[self.features]
            
            # Handle missing values
            df = df.fillna(0)
            
            return df
            
        except Exception as e:
            self.logger.error(f"Error preprocessing input: {e}")
            raise
    
    def predict(self, input_data):
        """Make predictions on input data"""
        try:
            # Preprocess input
            processed_data = self.preprocess_input(input_data)
            
            # Make prediction
            prediction = self.model.predict(processed_data)
            prediction_proba = self.model.predict_proba(processed_data)
            
            # Format results
            results = []
            for i, (pred, proba) in enumerate(zip(prediction, prediction_proba)):
                result = {
                    'prediction': int(pred),
                    'probability': float(proba[1]),
                    'confidence': float(max(proba))
                }
                results.append(result)
            
            return results
            
        except Exception as e:
            self.logger.error(f"Error making prediction: {e}")
            raise

# Flask application
app = Flask(__name__)

# Initialize model server
model_server = None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/predict', methods=['POST'])
def predict():
    """Prediction endpoint"""
    try:
        # Get input data
        input_data = request.get_json()
        
        if not input_data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Make prediction
        predictions = model_server.predict(input_data)
        
        return jsonify({
            'predictions': predictions,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/model_info', methods=['GET'])
def model_info():
    """Get model information"""
    if model_server and model_server.model:
        return jsonify({
            'model_type': type(model_server.model).__name__,
            'features': model_server.features,
            'n_features': len(model_server.features),
            'timestamp': datetime.now().isoformat()
        })
    else:
        return jsonify({'error': 'Model not loaded'}), 500

if __name__ == '__main__':
    # Load configuration
    import yaml
    with open('config/config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    
    # Initialize model server
    model_path = config['deployment']['model_path']
    model_server = ModelServer(model_path, config)
    
    # Start server
    app.run(
        host=config['deployment']['host'],
        port=config['deployment']['api_port'],
        debug=False
    )
```

### **7. Performance Monitoring**
```python
# src/monitoring/performance_monitor.py
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import logging
import json
import os

class PerformanceMonitor:
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        self.metrics_history = []
        self.performance_thresholds = {
            'accuracy_threshold': 0.8,
            'response_time_threshold': 1.0,  # seconds
            'throughput_threshold': 100  # requests per minute
        }
    
    def log_prediction(self, input_data, prediction, response_time):
        """Log prediction for monitoring"""
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'input_data': input_data,
            'prediction': prediction,
            'response_time': response_time
        }
        
        self.metrics_history.append(log_entry)
        
        # Keep only last 1000 entries
        if len(self.metrics_history) > 1000:
            self.metrics_history = self.metrics_history[-1000:]
    
    def calculate_metrics(self, time_window_minutes=60):
        """Calculate performance metrics over time window"""
        if not self.metrics_history:
            return {}
        
        # Filter by time window
        cutoff_time = datetime.now() - timedelta(minutes=time_window_minutes)
        recent_metrics = [
            m for m in self.metrics_history 
            if datetime.fromisoformat(m['timestamp']) > cutoff_time
        ]
        
        if not recent_metrics:
            return {}
        
        # Calculate metrics
        metrics = {
            'total_predictions': len(recent_metrics),
            'avg_response_time': np.mean([m['response_time'] for m in recent_metrics]),
            'max_response_time': np.max([m['response_time'] for m in recent_metrics]),
            'min_response_time': np.min([m['response_time'] for m in recent_metrics]),
            'throughput_per_minute': len(recent_metrics) / time_window_minutes,
            'timestamp': datetime.now().isoformat()
        }
        
        return metrics
    
    def check_performance_alerts(self, metrics):
        """Check for performance alerts"""
        alerts = []
        
        if metrics.get('avg_response_time', 0) > self.performance_thresholds['response_time_threshold']:
            alerts.append({
                'type': 'HIGH_RESPONSE_TIME',
                'message': f"Average response time {metrics['avg_response_time']:.2f}s exceeds threshold {self.performance_thresholds['response_time_threshold']}s",
                'severity': 'WARNING'
            })
        
        if metrics.get('throughput_per_minute', 0) < self.performance_thresholds['throughput_threshold']:
            alerts.append({
                'type': 'LOW_THROUGHPUT',
                'message': f"Throughput {metrics['throughput_per_minute']:.1f} requests/min below threshold {self.performance_thresholds['throughput_threshold']}",
                'severity': 'WARNING'
            })
        
        return alerts
    
    def generate_report(self, output_path):
        """Generate performance report"""
        try:
            # Calculate current metrics
            current_metrics = self.calculate_metrics()
            
            # Check for alerts
            alerts = self.check_performance_alerts(current_metrics)
            
            # Generate report
            report = {
                'generated_at': datetime.now().isoformat(),
                'metrics': current_metrics,
                'alerts': alerts,
                'performance_status': 'HEALTHY' if not alerts else 'WARNING'
            }
            
            # Save report
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, 'w') as f:
                json.dump(report, f, indent=2)
            
            self.logger.info(f"Performance report generated: {output_path}")
            return report
            
        except Exception as e:
            self.logger.error(f"Error generating performance report: {e}")
            raise
```

---

## 🚀 **Usage Examples**

### **1. Complete Pipeline Execution**
```python
# main.py
import yaml
import logging
from src.data.data_processor import DataProcessor
from src.features.feature_engineer import FeatureEngineer
from src.models.model_trainer import ModelTrainer
from src.monitoring.performance_monitor import PerformanceMonitor

def main():
    # Load configuration
    with open('config/config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    
    # Setup logging
    logging.basicConfig(level=logging.INFO)
    
    # Initialize components
    data_processor = DataProcessor(config)
    feature_engineer = FeatureEngineer(config)
    model_trainer = ModelTrainer(config)
    performance_monitor = PerformanceMonitor(config)
    
    try:
        # 1. Load and process data
        logging.info("Loading and processing data...")
        data = data_processor.load_data('data/raw/sample_data.csv')
        data = data_processor.clean_data(data)
        X_train, X_val, X_test, y_train, y_val, y_test = data_processor.split_data(data, 'target')
        X_train_scaled, X_val_scaled, X_test_scaled = data_processor.scale_features(X_train, X_val, X_test)
        
        # 2. Feature engineering
        logging.info("Performing feature engineering...")
        X_train_features = feature_engineer.create_features(X_train_scaled)
        X_val_features = feature_engineer.create_features(X_val_scaled)
        X_test_features = feature_engineer.create_features(X_test_scaled)
        
        X_train_selected, X_val_selected, X_test_selected = feature_engineer.select_features(
            X_train_features, y_train, X_val_features, y_val, X_test_features
        )
        
        # 3. Train model
        logging.info("Training model...")
        model = model_trainer.train_model(X_train_selected, y_train, X_val_selected, y_val)
        
        # 4. Evaluate model
        logging.info("Evaluating model...")
        evaluation_results = model_trainer.evaluate_model(X_test_selected, y_test)
        
        # 5. Save model
        logging.info("Saving model...")
        model_trainer.save_model(config['model']['model_path'])
        
        # 6. Generate performance report
        logging.info("Generating performance report...")
        performance_monitor.generate_report('reports/performance_report.json')
        
        logging.info("Pipeline completed successfully!")
        
    except Exception as e:
        logging.error(f"Pipeline failed: {e}")
        raise

if __name__ == "__main__":
    main()
```

---

## 📊 **Best Practices**

### **1. Code Quality**
- **Modular Design** - Separate concerns into distinct modules
- **Error Handling** - Comprehensive exception handling
- **Logging** - Detailed logging for debugging and monitoring
- **Testing** - Unit tests for all components

### **2. Production Readiness**
- **Configuration Management** - External configuration files
- **Environment Variables** - Secure credential management
- **Health Checks** - API health monitoring endpoints
- **Performance Monitoring** - Real-time performance tracking

### **3. Scalability**
- **Async Processing** - Non-blocking operations
- **Batch Processing** - Efficient bulk data handling
- **Caching** - Result caching for performance
- **Load Balancing** - Multiple model instances

---

## 📚 **Additional Resources**

- **[ML Fundamentals](ml-fundamentals.md)** - Core machine learning concepts
- **[MLOps Frameworks](../mlops-platforms/)** - Production ML operations
- **[AIOps Tools](../aiops-tools/)** - Intelligent operations platforms
- **[AI Strategy Canvas](../../implementation-frameworks/strategy-development/ai-strategy-canvas.md)** - Strategic AI planning

---

*Last updated: August 2025*
