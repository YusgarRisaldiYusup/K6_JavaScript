# Project Overview
This project is designed to perform comprehensive performance testing using K6, a modern load testing tool. The project includes 11 types of performance tests to evaluate different aspects of system behavior under varying load conditions.

Types of Testing Included
- Load Testing

Simulates a steady increase in traffic to assess how the system handles normal and peak conditions.
Helps in identifying performance bottlenecks.
- Spike Testing

Evaluates the system's ability to handle sudden and extreme increases in traffic.
Ensures the system can recover quickly after a traffic spike.
- Stress Testing

Pushes the system beyond its limits to determine its breaking point and how it fails.
Identifies the maximum capacity of the system.
- Endurance Testing

Checks the system's performance under continuous load over an extended period.
Ensures the system can sustain a prolonged workload without degrading.
- Soak Testing

Similar to endurance testing but focuses on assessing the system's stability and performance over a very long duration (e.g., several hours or days).
- Volume Testing

Evaluates the system's ability to handle large volumes of data or high numbers of requests over a short period.
Ensures the system can process large amounts of information efficiently.
- Concurrency Testing

Assesses how the system handles multiple users or processes performing operations simultaneously.
Essential for systems expected to handle many concurrent users.
- Capacity Testing

Determines the maximum load a system can handle before performance degrades.
Crucial for planning capacity and scaling needs.
- Performance Testing

Measures the system's response time, throughput, and stability under varying conditions.
Provides a baseline for system performance.
- Scalability Testing

Evaluates the system's ability to scale up or down in response to increasing or decreasing loads.
Crucial for understanding how well the system can grow.
- Failure Testing

Simulates the failure of various system components.
Ensures the system can recover gracefully without significant impact on the user experience.

# Instalasi
- Make sure choco is integrated into the terminal, and proceed with the installation of K6 with :
```markdown
choco install k6
```
# Running
- After make the test cases, running the project with :
   ```markdown
  K6 Run {Directory name}/{filename}
   ```


