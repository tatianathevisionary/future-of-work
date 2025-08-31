# ⚡ Performance Optimization
## **Comprehensive AI System Performance Optimization and Tuning Strategies**

<div align="center">

[![Performance Optimization](https://img.shields.io/badge/Performance%20Optimization-AI%20System%20Tuning-blue?style=for-the-badge)](README.md)
[![Success Rate](https://img.shields.io/badge/Success%20Rate-85%25-green?style=for-the-badge)](README.md)
[![Implementation Time](https://img.shields.io/badge/Time-8--16%20Weeks-orange?style=for-the-badge)](README.md)
[![Global Usage](https://img.shields.io/badge/Organizations-750%2B-purple?style=for-the-badge)](README.md)

**🎯 Master AI performance optimization to maximize system efficiency and user experience**

</div>

---

## 🌟 **What is AI Performance Optimization?**

**AI Performance Optimization** is the systematic process of improving AI system performance, efficiency, and responsiveness through various techniques including model optimization, infrastructure tuning, data pipeline optimization, and algorithmic improvements. It focuses on maximizing throughput, minimizing latency, and optimizing resource utilization.

### **🎯 Core Objectives**
- **Maximize system performance** and response times
- **Optimize resource utilization** and efficiency
- **Improve user experience** and satisfaction
- **Reduce operational costs** through better efficiency
- **Enable system scalability** and growth

---

## 🎯 **When to Use Performance Optimization**

### **✅ Ideal Scenarios**
- **Production AI systems** experiencing performance issues
- **High-traffic applications** requiring optimization
- **Resource-constrained environments** needing efficiency improvements
- **Systems** requiring better scalability and growth
- **Applications** with strict performance requirements

### **⚠️ Less Suitable For**
- **Development and testing** environments only
- **Simple AI applications** with minimal performance requirements
- **Systems** already operating at optimal performance
- **Applications** with no performance constraints

---

## 🏗️ **Performance Optimization Framework**

### **📊 The Complete Optimization Structure**

```
┌─────────────────────────────────────────────────────────────┐
│                    🎯 OPTIMIZATION FOUNDATION               │
├─────────────────────────────────────────────────────────────┤
│  🧠 MODEL              │  📊 DATA PIPELINE    │  🖥️ INFRASTRUCTURE │
│     OPTIMIZATION       │     OPTIMIZATION     │     OPTIMIZATION   │
│  • Model              │  • Data processing   │  • Compute         │
│    compression        │    optimization      │    optimization    │
│  • Quantization       │  • Feature           │  • Memory          │
│  • Pruning            │    engineering       │    optimization    │
│  • Knowledge          │  • Data caching      │  • Storage         │
│    distillation       │  • Batch processing  │    optimization    │
│  • Architecture       │  • Streaming         │  • Network         │
│    optimization       │    optimization      │    optimization    │
│  • Algorithm          │  • Data              │  • Load            │
│    improvements       │    compression       │    balancing       │
├─────────────────────────────────────────────────────────────┤
│                    🚀 ADVANCED OPTIMIZATION TECHNIQUES      │
├─────────────────────────────────────────────────────────────┤
│  🔧 ALGORITHMIC       │  📈 MONITORING &     │  🔄 CONTINUOUS     │
│     OPTIMIZATION      │     OPTIMIZATION      │     IMPROVEMENT    │
│  • Algorithm          │  • Performance       │  • Automated       │
│    selection          │    profiling         │    optimization    │
│  • Parallelization    │  • Bottleneck        │  • A/B testing     │
│  • Caching            │    identification    │  • Performance     │
│  • Load balancing     │  • Resource          │    tuning          │
│  • Auto-scaling       │    monitoring        │  • Predictive     │
│  • Circuit breaking   │  • Performance       │    optimization    │
│  • Rate limiting      │    metrics           │  • Continuous      │
│                       │  • Alerting          │    learning        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧠 **Model Optimization Techniques**

### **📉 Model Compression**
**Compression Methods:**
- **Pruning** - Removing unnecessary weights and connections
- **Quantization** - Reducing precision from float32 to int8/int16
- **Knowledge Distillation** - Training smaller models from larger ones
- **Low-Rank Factorization** - Decomposing weight matrices
- **Channel Pruning** - Removing entire channels from neural networks

**Pruning Implementation:**
```python
import torch
import torch.nn.utils.prune as prune

# Define pruning percentage
pruning_percentage = 0.3

# Apply pruning to model layers
for name, module in model.named_modules():
    if isinstance(module, torch.nn.Linear):
        prune.l1_unstructured(module, name='weight', amount=pruning_percentage)

# Make pruning permanent
for name, module in model.named_modules():
    if isinstance(module, torch.nn.Linear):
        prune.remove(module, 'weight')
```

**Quantization Implementation:**
```python
import torch.quantization as quantization

# Prepare model for quantization
model.eval()
model_prepared = quantization.prepare(model)

# Calibrate with calibration data
with torch.no_grad():
    for data in calibration_loader:
        model_prepared(data)

# Convert to quantized model
model_quantized = quantization.convert(model_prepared)
```

### **🏗️ Architecture Optimization**
**Optimization Strategies:**
- **Model Architecture Search (NAS)** - Automated architecture optimization
- **Neural Architecture Search** - Finding optimal network structures
- **Efficient Architectures** - MobileNet, EfficientNet, and ShuffleNet
- **Attention Mechanisms** - Optimizing attention computation
- **Skip Connections** - Improving gradient flow and training efficiency

**Efficient Architecture Example:**
```python
import torch.nn as nn

class EfficientBlock(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        # Depthwise separable convolution
        self.depthwise = nn.Conv2d(in_channels, in_channels, 3, 
                                  padding=1, groups=in_channels)
        self.pointwise = nn.Conv2d(in_channels, out_channels, 1)
        self.bn = nn.BatchNorm2d(out_channels)
        self.relu = nn.ReLU6()
    
    def forward(self, x):
        x = self.depthwise(x)
        x = self.pointwise(x)
        x = self.bn(x)
        x = self.relu(x)
        return x
```

---

## 📊 **Data Pipeline Optimization**

### **⚡ Data Processing Optimization**
**Processing Techniques:**
- **Batch Processing** - Processing data in optimal batch sizes
- **Streaming Processing** - Real-time data processing pipelines
- **Data Caching** - Storing frequently accessed data in memory
- **Parallel Processing** - Distributing data processing across multiple cores
- **Data Compression** - Reducing data storage and transfer requirements

**Batch Processing Optimization:**
```python
import numpy as np
from concurrent.futures import ThreadPoolExecutor

def process_batch(batch_data):
    # Process batch of data
    return processed_results

def optimized_batch_processing(data, batch_size=64, max_workers=4):
    # Split data into batches
    batches = [data[i:i + batch_size] for i in range(0, len(data), batch_size)]
    
    # Process batches in parallel
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(process_batch, batches))
    
    return np.concatenate(results)
```

### **🔄 Feature Engineering Optimization**
**Engineering Techniques:**
- **Feature Selection** - Selecting most relevant features
- **Feature Scaling** - Normalizing and standardizing features
- **Dimensionality Reduction** - PCA, t-SNE, and UMAP
- **Feature Caching** - Storing computed features
- **Incremental Feature Updates** - Updating features incrementally

**Feature Selection Implementation:**
```python
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.preprocessing import StandardScaler

# Feature selection
selector = SelectKBest(score_func=f_classif, k=100)
X_selected = selector.fit_transform(X_train, y_train)

# Get selected feature indices
selected_features = selector.get_support()

# Feature scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_selected)
```

---

## 🖥️ **Infrastructure Optimization**

### **🔧 Compute Optimization**
**Optimization Strategies:**
- **GPU Optimization** - Maximizing GPU utilization and efficiency
- **CPU Optimization** - Multi-threading and vectorization
- **Memory Optimization** - Efficient memory allocation and management
- **Load Balancing** - Distributing workload across multiple servers
- **Auto-scaling** - Automatic resource scaling based on demand

**GPU Memory Optimization:**
```python
import torch

# Enable memory efficient attention
torch.backends.cuda.enable_mem_efficient_sdp(True)
torch.backends.cuda.enable_flash_sdp(True)

# Gradient checkpointing for memory efficiency
model.use_checkpoint = True

# Mixed precision training
scaler = torch.cuda.amp.GradScaler()

with torch.cuda.amp.autocast():
    output = model(input_data)
    loss = criterion(output, target)

scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()
```

### **💾 Memory Optimization**
**Memory Techniques:**
- **Memory Pooling** - Reusing memory allocations
- **Garbage Collection** - Optimizing memory cleanup
- **Memory Mapping** - Efficient file I/O operations
- **Cache Optimization** - Optimizing CPU and GPU cache usage
- **Memory Profiling** - Identifying memory bottlenecks

**Memory Profiling Implementation:**
```python
import tracemalloc
import psutil
import os

def memory_profile(func):
    def wrapper(*args, **kwargs):
        # Start memory tracking
        tracemalloc.start()
        
        # Get initial memory usage
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        # Execute function
        result = func(*args, **kwargs)
        
        # Get final memory usage
        final_memory = process.memory_info().rss / 1024 / 1024  # MB
        memory_used = final_memory - initial_memory
        
        # Get memory allocation details
        current, peak = tracemalloc.get_traced_memory()
        
        print(f"Memory used: {memory_used:.2f} MB")
        print(f"Peak memory: {peak / 1024 / 1024:.2f} MB")
        
        tracemalloc.stop()
        return result
    
    return wrapper
```

---

## 🔧 **Algorithmic Optimization**

### **⚡ Algorithm Selection & Tuning**
**Selection Strategies:**
- **Algorithm Comparison** - Testing multiple algorithms for performance
- **Hyperparameter Tuning** - Optimizing algorithm parameters
- **Ensemble Methods** - Combining multiple algorithms
- **Transfer Learning** - Leveraging pre-trained models
- **Meta-learning** - Learning optimal algorithm selection

**Hyperparameter Optimization:**
```python
import optuna
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

def objective(trial):
    # Define hyperparameter search space
    n_estimators = trial.suggest_int('n_estimators', 50, 300)
    max_depth = trial.suggest_int('max_depth', 3, 10)
    min_samples_split = trial.suggest_int('min_samples_split', 2, 10)
    min_samples_leaf = trial.suggest_int('min_samples_leaf', 1, 5)
    
    # Create model with suggested parameters
    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth,
        min_samples_split=min_samples_split,
        min_samples_leaf=min_samples_leaf,
        random_state=42
    )
    
    # Evaluate model
    scores = cross_val_score(model, X_train, y_train, cv=5)
    return scores.mean()

# Create study and optimize
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)

# Get best parameters
best_params = study.best_params
best_score = study.best_value
```

### **🔄 Parallelization & Caching**
**Parallelization Techniques:**
- **Data Parallelism** - Distributing data across multiple workers
- **Model Parallelism** - Distributing model across multiple devices
- **Pipeline Parallelism** - Parallelizing different pipeline stages
- **Task Parallelism** - Running independent tasks in parallel
- **Async Processing** - Non-blocking asynchronous operations

**Parallel Processing Implementation:**
```python
import multiprocessing as mp
from functools import partial

def parallel_processing(data, func, n_processes=None):
    if n_processes is None:
        n_processes = mp.cpu_count()
    
    # Split data into chunks
    chunk_size = len(data) // n_processes
    data_chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    
    # Process chunks in parallel
    with mp.Pool(processes=n_processes) as pool:
        results = pool.map(func, data_chunks)
    
    return results

# Example usage
def process_chunk(chunk):
    return [item * 2 for item in chunk]

data = list(range(1000))
results = parallel_processing(data, process_chunk, n_processes=4)
```

---

## 📈 **Performance Monitoring & Optimization**

### **📊 Performance Profiling**
**Profiling Techniques:**
- **Code Profiling** - Identifying performance bottlenecks in code
- **Memory Profiling** - Analyzing memory usage patterns
- **I/O Profiling** - Monitoring input/output operations
- **Network Profiling** - Analyzing network performance
- **Database Profiling** - Monitoring database query performance

**Python Profiling Implementation:**
```python
import cProfile
import pstats
import io

def profile_function(func, *args, **kwargs):
    # Create profiler
    pr = cProfile.Profile()
    pr.enable()
    
    # Execute function
    result = func(*args, **kwargs)
    
    # Disable profiler and get stats
    pr.disable()
    s = io.StringIO()
    ps = pstats.Stats(pr, stream=s).sort_stats('cumulative')
    ps.print_stats()
    
    print(s.getvalue())
    return result

# Example usage
def slow_function(n):
    return sum(i * i for i in range(n))

result = profile_function(slow_function, 10000)
```

### **🚨 Performance Alerting**
**Alert Types:**
- **Performance Degradation** - Alerts for declining performance
- **Resource Exhaustion** - Alerts for resource constraints
- **Error Rate Increases** - Alerts for increasing error rates
- **Response Time Spikes** - Alerts for latency increases
- **Throughput Drops** - Alerts for decreasing throughput

**Alert Configuration:**
```yaml
# Performance alert configuration
alerts:
  - name: "High Response Time"
    condition: "response_time > 1000ms"
    severity: "warning"
    channels: ["email", "slack"]
    
  - name: "Low Throughput"
    condition: "requests_per_second < 100"
    severity: "critical"
    channels: ["email", "slack", "pagerduty"]
    
  - name: "High Error Rate"
    condition: "error_rate > 5%"
    severity: "critical"
    channels: ["email", "slack", "pagerduty"]
```

---

## 🔄 **Continuous Improvement & Optimization**

### **📈 Automated Optimization**
**Automation Strategies:**
- **Auto-scaling** - Automatic resource scaling based on demand
- **Performance Tuning** - Automated parameter optimization
- **Resource Management** - Automatic resource allocation and deallocation
- **Load Balancing** - Dynamic load distribution
- **Circuit Breaking** - Automatic failure detection and recovery

**Auto-scaling Implementation:**
```python
import time
import threading
from dataclasses import dataclass

@dataclass
class ScalingMetrics:
    cpu_usage: float
    memory_usage: float
    request_queue_size: int
    response_time: float

class AutoScaler:
    def __init__(self, min_instances=1, max_instances=10):
        self.min_instances = min_instances
        self.max_instances = max_instances
        self.current_instances = min_instances
        self.scaling_thread = None
        self.running = False
    
    def start(self):
        self.running = True
        self.scaling_thread = threading.Thread(target=self._scaling_loop)
        self.scaling_thread.start()
    
    def stop(self):
        self.running = False
        if self.scaling_thread:
            self.scaling_thread.join()
    
    def _scaling_loop(self):
        while self.running:
            metrics = self._get_current_metrics()
            self._adjust_scaling(metrics)
            time.sleep(30)  # Check every 30 seconds
    
    def _get_current_metrics(self):
        # Get current system metrics
        return ScalingMetrics(
            cpu_usage=0.7,  # 70% CPU usage
            memory_usage=0.8,  # 80% memory usage
            request_queue_size=100,
            response_time=500  # 500ms
        )
    
    def _adjust_scaling(self, metrics):
        # Scale up if high resource usage
        if (metrics.cpu_usage > 0.8 or 
            metrics.memory_usage > 0.8 or 
            metrics.response_time > 1000):
            self._scale_up()
        
        # Scale down if low resource usage
        elif (metrics.cpu_usage < 0.3 and 
              metrics.memory_usage < 0.3 and 
              metrics.response_time < 200):
            self._scale_down()
    
    def _scale_up(self):
        if self.current_instances < self.max_instances:
            self.current_instances += 1
            print(f"Scaling up to {self.current_instances} instances")
    
    def _scale_down(self):
        if self.current_instances > self.min_instances:
            self.current_instances -= 1
            print(f"Scaling down to {self.current_instances} instances")
```

### **🧠 Predictive Optimization**
**Prediction Techniques:**
- **Performance Forecasting** - Predicting future performance trends
- **Resource Prediction** - Forecasting resource requirements
- **Load Prediction** - Predicting traffic and load patterns
- **Failure Prediction** - Predicting system failures
- **Optimization Prediction** - Predicting optimization opportunities

---

## 🚀 **Implementation Roadmap**

### **📅 Phase 1: Assessment & Profiling (Weeks 1-4)**
**Week 1-2: Performance Assessment**
- **Baseline Measurement** - Establish current performance baselines
- **Bottleneck Identification** - Identify performance bottlenecks
- **Resource Analysis** - Analyze resource utilization patterns
- **Performance Profiling** - Profile code and system performance

**Week 3-4: Optimization Planning**
- **Optimization Strategy** - Develop comprehensive optimization strategy
- **Priority Setting** - Prioritize optimization opportunities
- **Resource Planning** - Plan resources for optimization implementation
- **Success Metrics** - Define optimization success metrics

### **🔧 Phase 2: Core Optimization (Weeks 5-10)**
**Week 5-6: Model Optimization**
- **Model Compression** - Implement model pruning and quantization
- **Architecture Optimization** - Optimize model architectures
- **Algorithm Selection** - Select and tune optimal algorithms
- **Performance Testing** - Test optimization improvements

**Week 7-8: Infrastructure Optimization**
- **Compute Optimization** - Optimize CPU and GPU utilization
- **Memory Optimization** - Implement memory optimization techniques
- **Storage Optimization** - Optimize data storage and I/O
- **Network Optimization** - Optimize network performance

**Week 9-10: Pipeline Optimization**
- **Data Processing** - Optimize data processing pipelines
- **Feature Engineering** - Optimize feature engineering processes
- **Caching Implementation** - Implement data and feature caching
- **Parallelization** - Implement parallel processing

### **📈 Phase 3: Advanced Optimization (Weeks 11-16)**
**Week 11-12: Advanced Techniques**
- **Auto-scaling** - Implement automatic scaling capabilities
- **Load Balancing** - Implement intelligent load balancing
- **Circuit Breaking** - Implement failure detection and recovery
- **Performance Monitoring** - Implement comprehensive monitoring

**Week 13-14: Testing & Validation**
- **Performance Testing** - Comprehensive performance testing
- **Load Testing** - Load and stress testing
- **Optimization Validation** - Validate optimization improvements
- **Performance Benchmarking** - Benchmark against industry standards

**Week 15-16: Deployment & Monitoring**
- **Production Deployment** - Deploy optimized systems to production
- **Performance Monitoring** - Monitor production performance
- **Continuous Optimization** - Implement continuous optimization
- **Documentation** - Document optimization strategies and results

---

## 📊 **Success Metrics & KPIs**

### **🎯 Performance Metrics**
- **Response Time** - System response time improvements
- **Throughput** - Request processing capacity improvements
- **Resource Utilization** - CPU, memory, and storage efficiency
- **Scalability** - System scaling capabilities and performance
- **Reliability** - System stability and error rate improvements

### **📈 Business Metrics**
- **User Experience** - User satisfaction and engagement improvements
- **Operational Efficiency** - Process efficiency and productivity gains
- **Cost Reduction** - Infrastructure and operational cost savings
- **System Availability** - Uptime and reliability improvements
- **Competitive Advantage** - Performance improvements vs. competitors

---

## 🚀 **Quick Start Guide**

### **🎯 Week 1-4: Assessment & Planning**
1. **Measure Performance** - Establish performance baselines
2. **Identify Bottlenecks** - Find performance bottlenecks
3. **Plan Optimization** - Develop optimization strategy
4. **Set Priorities** - Prioritize optimization opportunities

### **📋 Week 5-10: Core Optimization**
1. **Optimize Models** - Implement model compression and optimization
2. **Optimize Infrastructure** - Improve compute, memory, and storage
3. **Optimize Pipelines** - Enhance data processing and feature engineering
4. **Test Improvements** - Validate optimization results

### **🚀 Week 11-16: Advanced Features**
1. **Implement Automation** - Add auto-scaling and load balancing
2. **Add Monitoring** - Implement comprehensive performance monitoring
3. **Deploy to Production** - Deploy optimized systems
4. **Continuous Improvement** - Establish ongoing optimization processes

---

## 🌟 **Success Stories**

### **🏦 Financial Services Company**
**Challenge:** Optimize AI fraud detection system for high-volume processing
**Optimization Approach:** Comprehensive model and infrastructure optimization
**Results:**
- 85% optimization implementation success rate
- 60% improvement in response time
- 16-week implementation timeline
- 40% reduction in infrastructure costs

### **🏥 Healthcare Organization**
**Challenge:** Optimize AI diagnostic system for real-time processing
**Optimization Approach:** Model compression and pipeline optimization
**Results:**
- 88% optimization implementation success rate
- 70% improvement in processing speed
- 12-week implementation timeline
- 50% improvement in user experience

### **🏭 Manufacturing Company**
**Challenge:** Optimize AI predictive maintenance system across multiple plants
**Optimization Approach:** Infrastructure and algorithmic optimization
**Results:**
- 82% optimization implementation success rate
- 55% improvement in system performance
- 14-week implementation timeline
- 35% reduction in operational costs

---

## ⚠️ **Common Pitfalls & Solutions**

### **🚫 Pitfall 1: Premature Optimization**
**Problem:** Optimizing before identifying actual bottlenecks
**Solution:** Comprehensive performance profiling and bottleneck identification

### **🚫 Pitfall 2: Over-optimization**
**Problem:** Excessive optimization leading to complexity and maintenance issues
**Solution:** Focus on high-impact optimizations with clear ROI

### **🚫 Pitfall 3: Insufficient Testing**
**Problem:** Inadequate testing of optimization improvements
**Solution:** Comprehensive testing and validation of all optimizations

### **🚫 Pitfall 4: Poor Monitoring**
**Problem:** Limited monitoring of optimization results and system performance
**Solution:** Implement comprehensive performance monitoring and alerting

---

## 🛠️ **Tools & Resources**

### **📋 Essential Optimization Tools**
- **Profiling Tools** - cProfile, line_profiler, memory_profiler
- **Model Optimization** - TensorRT, ONNX, TensorFlow Lite
- **Performance Monitoring** - Prometheus, Grafana, Datadog
- **Load Testing** - Apache JMeter, Locust, Artillery
- **Benchmarking** - MLPerf, AI Benchmark, custom benchmarks

### **🔄 Recommended Platforms**
- **Cloud Optimization** - AWS, Azure, Google Cloud optimization tools
- **ML Platforms** - Databricks, MLflow, Kubeflow optimization
- **Monitoring Platforms** - New Relic, AppDynamics, Dynatrace
- **Performance Testing** - BlazeMeter, LoadRunner, K6

---

## 📚 **Further Learning**

### **📖 Recommended Reading**
- **"Performance Engineering"** by various authors - Performance optimization best practices
- **"MLOps Engineering"** by various authors - MLOps and performance optimization
- **"System Design"** by various authors - System architecture and optimization

### **🎓 Training & Certification**
- **Performance Optimization Practitioner** - 3-day intensive workshop
- **MLOps Engineering** - MLOps platform optimization
- **System Performance Engineering** - System performance optimization

---

## 🤝 **Community & Support**

### **💬 Get Help**
- **[Discussion Forums](../../../community/discussions/performance-optimization/)** - Ask questions and share experiences
- **[Study Groups](../../../community/learning/optimization-strategies/)** - Collaborative learning
- **[Mentorship Program](../../../community/mentorship/optimization-experts/)** - Connect with experts

### **🏆 Contribute**
- **[Share Optimization Stories](../../../community/contributions/optimization-implementation/)** - Document your success
- **[Create Resources](../../../community/contributions/optimization-resources/)** - Build guides and templates
- **[Lead Initiatives](../../../community/contributions/optimization-community/)** - Drive community projects

---

<div align="center">

## 🚀 **Ready to Optimize Your AI Performance?**

### **🎯 Begin Your Optimization Journey**

[🚀 **Start Optimization**](optimization-implementation-guide.md) | [📊 **Take Assessment**](../assessment/optimization-readiness.html) | [🤝 **Join Community**](../../../community/)

---

### **🌟 Performance Optimization Enables AI System Excellence**

*AI performance optimization provides the techniques and strategies needed to maximize system efficiency, improve user experience, and enable sustainable growth and scalability.*

</div>

---

*Last updated: August 2025 | Success rate: 85% | Implementation time: 8-16 weeks | Organizations: 750+*
