# 🏥 Hospital Dashboard — Full-Stack DevOps Project

A production-style **Hospital Management Dashboard** built as a full-stack application and deployed using modern **DevOps, CI/CD, containerization, infrastructure-as-code, Kubernetes, and monitoring** practices.

The project provides separate workflows for **Patients, Doctors, and Reception staff**, while demonstrating an automated deployment pipeline using Jenkins and AWS.

---

## 🚀 Project Highlights

* 🏥 Hospital management dashboard
* 👨‍⚕️ Doctor portal
* 🧑‍🤝‍🧑 Patient portal
* 🧑‍💼 Reception portal
* 🔐 Authentication and protected routes
* ⚛️ React + Vite frontend
* 🐍 FastAPI backend
* 🐳 Docker containerization
* 🔄 Jenkins CI/CD pipeline
* ☁️ AWS EC2 deployment
* ☸️ Kubernetes deployment
* 🏗️ Terraform Infrastructure as Code
* 📊 Prometheus monitoring
* 📈 Grafana dashboards
* 🔍 SonarQube/SonarCloud code analysis
* 🌐 Nginx reverse proxy
* 🔒 Environment-based configuration

---

## 🏗️ Architecture

```text
                         ┌──────────────────┐
                         │      User        │
                         │ Browser / Client │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │      Nginx       │
                         │ Reverse Proxy    │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
          ┌──────────────────┐        ┌──────────────────┐
          │ React + Vite     │        │ FastAPI Backend  │
          │ Frontend         │───────▶│ REST APIs        │
          └──────────────────┘        └────────┬─────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │     Database     │
                                      └──────────────────┘


                    DEVOPS / CLOUD INFRASTRUCTURE

        GitHub
           │
           ▼
       Jenkins CI/CD
           │
     ┌─────┼───────────────┐
     │     │               │
     ▼     ▼               ▼
  Testing SonarQube     Docker Build
                             │
                             ▼
                         DockerHub
                             │
                             ▼
                     AWS / Kubernetes
                             │
                 ┌───────────┴───────────┐
                 │                       │
                 ▼                       ▼
            Prometheus                Grafana
             Metrics                Dashboards
```

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Axios
* React Router

### Backend

* Python
* FastAPI
* REST APIs
* Uvicorn
* Authentication
* Environment variables

### Database

* MongoDB

### DevOps

* Git & GitHub
* Jenkins
* Docker
* DockerHub
* SonarQube / SonarCloud
* Nginx

### Cloud & Infrastructure

* AWS EC2
* Terraform
* Kubernetes

### Monitoring

* Prometheus
* Grafana

---

## 📁 Project Structure

```text
hospital-dashboard/
│
├── hospital-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── patient/
│   │   │   ├── doctor/
│   │   │   └── reception/
│   │   ├── services/
│   │   ├── mockData/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.js
│
├── hospital-backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   └── database.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
│
├── monitoring/
│   ├── prometheus.yml
│   └── ...
│
├── kubernetes/
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── services.yaml
│   └── ...
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── ...
│
└── Jenkinsfile
```

---

## 🔐 Application Features

### Patient Portal

Patients can access their dashboard and manage hospital-related information such as:

* Patient profile
* Appointments
* Doctors
* Dashboard information
* Authentication

### Doctor Portal

Doctors can access their dedicated dashboard and hospital information.

### Reception Portal

Reception staff can manage hospital operations and patient-related workflows.

---

# 🔄 CI/CD Pipeline

The project uses **Jenkins** to automate the software delivery process.

```text
Developer
    │
    ▼
GitHub
    │
    ▼
Jenkins
    │
    ├── Checkout Source
    │
    ├── Code Analysis
    │
    ├── Build Application
    │
    ├── Run Tests
    │
    ├── Build Docker Image
    │
    ├── Push Image to DockerHub
    │
    └── Deploy
          │
          ▼
       AWS / Kubernetes
```

### Pipeline Stages

1. Source code checkout from GitHub
2. Static code analysis
3. Application build
4. Testing
5. Docker image creation
6. DockerHub image push
7. Deployment to infrastructure
8. Application monitoring

---

# 🐳 Docker

Both frontend and backend applications are containerized using Docker.

Example workflow:

```bash
docker build -t hospital-frontend .
docker build -t hospital-backend .
```

Images can then be pushed to DockerHub:

```bash
docker push <dockerhub-username>/hospital-frontend
docker push <dockerhub-username>/hospital-backend
```

Containerization provides:

* Consistent environments
* Easier deployments
* Application isolation
* Portability
* Simplified scaling

---

# ☸️ Kubernetes

Kubernetes is used to manage containerized workloads.

The Kubernetes deployment includes resources such as:

* Deployments
* Services
* Pods
* ConfigMaps
* Secrets

Example:

```bash
kubectl apply -f kubernetes/
```

Check running workloads:

```bash
kubectl get pods
kubectl get services
kubectl get deployments
```

---

# 🏗️ Terraform

Terraform is used as **Infrastructure as Code (IaC)** to provision cloud infrastructure.

Terraform workflow:

```text
Terraform Configuration
          │
          ▼
     terraform init
          │
          ▼
     terraform plan
          │
          ▼
     terraform apply
          │
          ▼
      AWS Resources
```

Common commands:

```bash
terraform init
terraform validate
terraform plan
terraform apply
```

Infrastructure can be recreated consistently without manually configuring every resource.

---

# 📊 Monitoring with Prometheus & Grafana

The application infrastructure is monitored using **Prometheus and Grafana**.

### Prometheus

Prometheus collects and stores metrics from the infrastructure and application environment.

Monitoring can include:

* CPU utilization
* Memory utilization
* Disk usage
* Network metrics
* Application metrics
* Kubernetes metrics
* Container metrics

### Grafana

Grafana is used to visualize Prometheus metrics through dashboards.

Example monitoring flow:

```text
Application / Kubernetes
          │
          ▼
      Prometheus
          │
       Metrics
          │
          ▼
       Grafana
          │
          ▼
    Monitoring Dashboard
```

---

# 🔍 Code Quality

The project integrates **SonarQube/SonarCloud** into the CI/CD workflow to perform automated code analysis.

This helps identify:

* Bugs
* Code smells
* Vulnerabilities
* Duplicated code
* Maintainability issues

---

# ☁️ AWS Deployment

The application infrastructure is deployed on **AWS EC2**.

High-level deployment:

```text
GitHub
   │
   ▼
Jenkins
   │
   ▼
Docker
   │
   ▼
AWS EC2
   │
   ├── Application
   ├── Kubernetes
   ├── Prometheus
   └── Grafana
```

---

# ⚙️ Local Development

## 1. Clone the Repository

```bash
git clone https://github.com/jitender81/hospital-dashboard.git

cd hospital-dashboard
```

---

## 2. Frontend Setup

```bash
cd hospital-frontend

npm install

npm run dev
```

The Vite development server will provide the local frontend URL.

---

## 3. Backend Setup

Create and activate a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

---

# 🔑 Environment Variables

Create environment files based on the provided examples.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Backend environment variables can include database and CORS configuration.

> ⚠️ Never commit passwords, API keys, database credentials, JWT secrets, or other sensitive information to GitHub.

---

# 🧪 Testing

Before deployment, verify:

```bash
npm run build
```

For backend testing, verify that FastAPI starts correctly:

```bash
uvicorn app.main:app --reload
```

API documentation can be accessed through FastAPI's automatically generated documentation.

---

# 📈 DevOps Workflow

The complete workflow demonstrates:

```text
        CODE
         │
         ▼
       GitHub
         │
         ▼
      Jenkins
         │
    ┌────┴────┐
    ▼         ▼
 SonarQube   Tests
    │         │
    └────┬────┘
         ▼
   Docker Build
         │
         ▼
      DockerHub
         │
         ▼
      Kubernetes
         │
         ▼
        AWS
         │
    ┌────┴────┐
    ▼         ▼
Prometheus  Application
    │
    ▼
  Grafana
```

---

# 🎯 Project Objectives

This project was developed to gain practical experience with:

* Full-stack application deployment
* CI/CD automation
* Jenkins pipelines
* Docker containerization
* Kubernetes orchestration
* Terraform Infrastructure as Code
* AWS cloud infrastructure
* Monitoring and observability
* Code quality analysis
* Linux server administration
* Git/GitHub workflows
* Production-style deployment practices

---

# 💡 Key DevOps Skills Demonstrated

* CI/CD Pipeline Development
* Jenkins
* Docker
* Kubernetes
* Terraform
* AWS EC2
* Prometheus
* Grafana
* SonarQube
* Git & GitHub
* Linux
* Nginx
* Infrastructure as Code
* Application Monitoring
* Containerized Deployment

---

# 🔮 Future Improvements

Planned improvements may include:

* Kubernetes Horizontal Pod Autoscaling
* HTTPS with SSL/TLS
* Kubernetes Ingress
* Centralized logging
* Alertmanager integration
* Automated rollback
* Blue-green or rolling deployments
* Advanced application metrics
* Database backups
* High-availability infrastructure

---

# 👨‍💻 Author

**Jitender**

DevOps & Cloud Engineering Project

GitHub:
https://github.com/jitender81

---

## ⭐ If you find this project useful

Feel free to explore the repository, raise issues, or suggest improvements.

**Built to learn. Built to deploy. Built with DevOps. 🚀**
