import { useState } from 'react'
import { ChevronDown, ChevronUp, ChevronRight, CheckCircle, Circle, Clock, BookOpen, Wrench, Target, Lightbulb, TrendingUp, Star, ArrowLeft } from 'lucide-react'

// ─── ROADMAP DATA ────────────────────────────────────────────────────────────

const ROLES = [
  {
    id: 'analyst',
    emoji: '📊',
    title: 'Data Analyst',
    tagline: 'Turn raw data into business insights',
    color: '#0d7a86',
    bg: 'rgba(13,122,134,0.08)',
    border: 'rgba(13,122,134,0.3)',
    timeline: '4–6 months',
    demand: 'Very High',
    avgSalary: '₹4–10 LPA',
    desc: 'Data Analysts collect, clean, and interpret datasets to help organizations make better decisions. Perfect starting point for an MSc Data Science graduate.',
    phases: [
      {
        name: 'Foundations',
        duration: '4–6 weeks',
        icon: '🏗️',
        color: '#15803d',
        topics: [
          {
            name: 'Excel & Google Sheets',
            why: 'Used in 90%+ of analyst roles — formulas, pivot tables, and charts are non-negotiable basics.',
            concepts: ['VLOOKUP / XLOOKUP', 'Pivot Tables', 'Conditional Formatting', 'Basic Charts', 'Data Validation', 'IF / SUMIF / COUNTIF'],
            resources: ['Excel Easy (exceljet.net)', 'Google Sheets crash course (YouTube)', 'Chandoo.org for advanced tricks'],
            tools: ['Microsoft Excel', 'Google Sheets'],
          },
          {
            name: 'SQL Fundamentals',
            why: 'SQL is the single most important skill for a data analyst — every interview will test it.',
            concepts: ['SELECT, WHERE, GROUP BY, ORDER BY', 'JOINs (INNER, LEFT, RIGHT, FULL)', 'Aggregations (COUNT, SUM, AVG, MAX)', 'Subqueries & CTEs', 'HAVING vs WHERE', 'Window functions (RANK, ROW_NUMBER, LAG)'],
            resources: ['SQLZoo (free interactive)', 'Mode Analytics SQL Tutorial', 'LeetCode SQL problems (easy first)', 'pgexercises.com'],
            tools: ['PostgreSQL', 'MySQL', 'SQLite', 'DBeaver (GUI)'],
          },
          {
            name: 'Statistics Basics',
            why: 'You need to understand data distributions, central tendency, and correlation before claiming insights.',
            concepts: ['Mean, Median, Mode, Std Dev', 'Normal distribution & Z-scores', 'Correlation vs Causation', 'Confidence intervals', 'P-value intuition', 'Sampling bias'],
            resources: ['Khan Academy Statistics (free)', 'StatQuest YouTube channel (brilliant, free)', 'Seeing Theory (visual probability)'],
            tools: ['Excel', 'Google Sheets'],
          },
        ],
      },
      {
        name: 'Core Skills',
        duration: '6–8 weeks',
        icon: '⚡',
        color: '#0d7a86',
        topics: [
          {
            name: 'Python for Data Analysis',
            why: 'Python with pandas is the industry standard for data wrangling and analysis at scale.',
            concepts: ['pandas DataFrames (read_csv, merge, groupby, pivot)', 'NumPy arrays & operations', 'Data cleaning (null handling, dtype casting, deduplication)', 'Exploratory Data Analysis (EDA)', 'matplotlib & seaborn for plotting', 'Jupyter notebooks workflow'],
            resources: ['Kaggle Learn Python (free)', 'Pandas documentation (pandas.pydata.org)', '"Python for Data Analysis" by Wes McKinney', '100 pandas exercises (GitHub repo)'],
            tools: ['Jupyter Notebook', 'VS Code + Jupyter extension', 'Google Colab (free GPU)'],
          },
          {
            name: 'Data Visualization',
            why: 'A chart that misleads or confuses is worse than no chart. Good viz is a core analyst skill.',
            concepts: ['Choosing the right chart type', 'Plotly & seaborn for Python', 'Tableau / Power BI basics', 'Dashboard design principles', 'Storytelling with data', 'KPIs and metrics selection'],
            resources: ['Tableau Public (free version)', 'Power BI Desktop (free)', '"Storytelling with Data" by Cole Knaflic (book)', 'Data Visualization Society resources'],
            tools: ['Tableau Public', 'Power BI Desktop', 'Plotly', 'seaborn'],
          },
          {
            name: 'Advanced SQL',
            why: 'Analysts who can write complex SQL queries are far more productive — and more hireable.',
            concepts: ['Complex JOINs across 3+ tables', 'CTEs and recursive queries', 'Window functions (running totals, percentile)', 'Query optimization & indexes', 'Stored procedures', 'Date/time functions'],
            resources: ['Advanced SQL for Data Scientists (Mode)', 'LeetCode SQL (medium/hard)', '"Learning SQL" by Alan Beaulieu', 'StrataScratch SQL practice'],
            tools: ['PostgreSQL', 'BigQuery (free tier)', 'Snowflake (trial)'],
          },
        ],
      },
      {
        name: 'Job-Ready Skills',
        duration: '4–6 weeks',
        icon: '🚀',
        color: '#7c3aed',
        topics: [
          {
            name: 'Business Acumen & Metric Design',
            why: 'Analysts who understand the business context of their data get promoted faster.',
            concepts: ['North Star Metrics', 'Funnel analysis', 'Cohort analysis', 'A/B test interpretation', 'ROI calculation', 'Business KPI frameworks (AARRR, OKR)'],
            resources: ['Reforge blog articles', 'Stratechery (business + tech)', 'HBR Analytics articles'],
            tools: ['Notion/Confluence for documentation', 'Miro for metric diagrams'],
          },
          {
            name: 'Portfolio Projects',
            why: 'A GitHub portfolio with 2–3 end-to-end projects beats a CV full of certifications.',
            concepts: ['EDA project on a real dataset (Kaggle)', 'SQL + Tableau / Power BI dashboard project', 'Python data cleaning pipeline', 'README writing and project documentation', 'Storytelling the findings'],
            resources: ['Kaggle datasets', 'data.gov.in (India datasets)', 'Google Dataset Search', 'Maven Analytics data playground'],
            tools: ['GitHub', 'Kaggle', 'Google Colab'],
          },
        ],
      },
    ],
    tools: ['Python', 'SQL', 'Excel/Google Sheets', 'Tableau or Power BI', 'Jupyter Notebook', 'Git/GitHub'],
    interviewTips: [
      'Always be ready to walk through an EDA process for a dataset',
      'Practice writing SQL queries by hand — no autocomplete in interviews',
      'Prepare 2 business case studies where you derived insights from data',
      'Know the difference between mean, median, and when to use each',
      'Be ready to explain a chart you made and why you chose that chart type',
    ],
  },
  {
    id: 'scientist',
    emoji: '🔬',
    title: 'Data Scientist',
    tagline: 'Build models that predict and explain',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.3)',
    timeline: '6–10 months',
    demand: 'High',
    avgSalary: '₹7–20 LPA',
    desc: 'Data Scientists build predictive models and extract deep insights using statistics and machine learning. This is the natural progression from analyst to scientist.',
    phases: [
      {
        name: 'Solid Foundations',
        duration: '5–7 weeks',
        icon: '🏗️',
        color: '#15803d',
        topics: [
          {
            name: 'Python Mastery',
            why: 'Python is the lingua franca of data science. You must be fluent, not just familiar.',
            concepts: ['OOP in Python (classes, inheritance)', 'List comprehensions & generators', 'pandas advanced (multi-index, apply, pipe)', 'NumPy broadcasting', 'Decorators & context managers', 'Virtual environments & pip'],
            resources: ['Fluent Python (book)', '"Python Tricks" by Dan Bader', 'Real Python website (realpython.com)', 'Corey Schafer YouTube'],
            tools: ['Python 3.10+', 'VS Code', 'Jupyter Lab', 'pip / conda'],
          },
          {
            name: 'Statistics & Probability',
            why: 'Machine learning is applied statistics. Without this foundation you are cargo-cult-coding.',
            concepts: ['Probability distributions (Gaussian, Binomial, Poisson)', 'Hypothesis testing (t-test, chi-square, ANOVA)', 'Bayesian thinking', 'Regression analysis', 'MLE and MAP estimation', 'Resampling (bootstrap, cross-validation)'],
            resources: ['StatQuest with Josh Starmer (YouTube — essential)', 'Think Stats by Allen Downey (free PDF)', '"Statistics" by Freedman, Pisani & Purves', 'Seeing Theory (interactive probability)'],
            tools: ['scipy.stats', 'statsmodels', 'pingouin'],
          },
          {
            name: 'Linear Algebra & Calculus Intuition',
            why: 'You need to understand why gradient descent works and what a matrix decomposition means.',
            concepts: ['Vectors, matrices, dot product', 'Eigenvalues & eigenvectors (PCA)', 'Gradients & partial derivatives', 'Chain rule (backprop foundation)', 'Matrix factorization basics'],
            resources: ['3Blue1Brown "Essence of Linear Algebra" (YouTube — free)', '3Blue1Brown "Essence of Calculus"', '"Mathematics for Machine Learning" by Deisenroth (free PDF)'],
            tools: ['NumPy for matrix ops'],
          },
        ],
      },
      {
        name: 'Machine Learning Core',
        duration: '8–10 weeks',
        icon: '⚡',
        color: '#0d7a86',
        topics: [
          {
            name: 'Supervised Learning',
            why: 'This is the bread and butter of applied ML — 70% of real projects use supervised learning.',
            concepts: ['Linear & Logistic Regression (from scratch)', 'Decision Trees & Random Forest', 'Gradient Boosting (XGBoost, LightGBM)', 'SVMs', 'Evaluation metrics (precision, recall, F1, AUC-ROC)', 'Bias-Variance tradeoff'],
            resources: ['scikit-learn User Guide (sklearn.org)', 'Hands-On ML by Aurélien Géron (best ML book)', 'fast.ai Practical Deep Learning (free)', 'StatQuest ML playlist'],
            tools: ['scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost'],
          },
          {
            name: 'Unsupervised Learning',
            why: 'Clustering and dimensionality reduction are essential for exploration and feature engineering.',
            concepts: ['K-Means & DBSCAN clustering', 'PCA & t-SNE / UMAP', 'Anomaly detection', 'Association rules (Apriori)', 'Hierarchical clustering', 'Gaussian Mixture Models'],
            resources: ['scikit-learn clustering docs', 'DataCamp unsupervised learning course', 'UMAP documentation (high quality)'],
            tools: ['scikit-learn', 'umap-learn', 'hdbscan'],
          },
          {
            name: 'Feature Engineering & Model Evaluation',
            why: 'In Kaggle competitions and industry alike, feature engineering wins more than algorithm choice.',
            concepts: ['Encoding categorical variables (target, frequency, one-hot)', 'Handling class imbalance (SMOTE, class_weight)', 'Missing value strategies', 'Cross-validation (stratified k-fold)', 'Hyperparameter tuning (Optuna, GridSearchCV)', 'Feature importance & SHAP values'],
            resources: ['Kaggle Learn feature engineering course', '"Feature Engineering for ML" by Alice Zheng (book)', 'SHAP documentation (shap.readthedocs.io)'],
            tools: ['scikit-learn Pipeline', 'Optuna', 'SHAP', 'imbalanced-learn'],
          },
        ],
      },
      {
        name: 'Advanced & Deployment',
        duration: '5–7 weeks',
        icon: '🚀',
        color: '#7c3aed',
        topics: [
          {
            name: 'Deep Learning Fundamentals',
            why: 'Neural networks power the most exciting applications — you need to understand the basics.',
            concepts: ['Feedforward networks (perceptron → MLP)', 'CNNs for image data', 'RNNs / LSTMs for sequences', 'Transfer learning', 'Regularization (dropout, batch norm)', 'PyTorch fundamentals'],
            resources: ['fast.ai Practical Deep Learning (free & excellent)', 'Deep Learning Specialization by Andrew Ng (Coursera)', 'PyTorch official tutorials', 'd2l.ai (Dive into Deep Learning, free)'],
            tools: ['PyTorch', 'TensorFlow/Keras', 'Hugging Face'],
          },
          {
            name: 'MLOps Basics & Deployment',
            why: 'A model that stays in a Jupyter notebook has zero business value. You must know how to ship it.',
            concepts: ['MLflow for experiment tracking', 'Building a REST API with FastAPI', 'Docker basics', 'Model versioning', 'Basic monitoring (data drift)', 'Streamlit for demo apps'],
            resources: ['MLflow documentation', 'FastAPI documentation (fastapi.tiangolo.com)', 'Docker in 100 Seconds (Fireship YouTube)', 'Streamlit docs'],
            tools: ['MLflow', 'FastAPI', 'Docker', 'Streamlit', 'GitHub Actions'],
          },
        ],
      },
    ],
    tools: ['Python', 'scikit-learn', 'XGBoost/LightGBM', 'PyTorch', 'MLflow', 'FastAPI', 'SQL', 'Git/GitHub'],
    interviewTips: [
      'Explain bias-variance tradeoff with a concrete example — this is asked in almost every DS interview',
      'Know when NOT to use a neural network (tabular data often prefers gradient boosting)',
      'Be able to code logistic regression and a simple decision tree from scratch',
      'Know your metrics cold — what does AUC-ROC actually measure?',
      'Have a Kaggle project or competition result to talk about',
    ],
  },
  {
    id: 'engineer',
    emoji: '⚙️',
    title: 'Data Engineer',
    tagline: 'Build the pipelines that power data teams',
    color: '#b45309',
    bg: 'rgba(180,83,9,0.08)',
    border: 'rgba(180,83,9,0.3)',
    timeline: '6–9 months',
    demand: 'Very High',
    avgSalary: '₹8–25 LPA',
    desc: 'Data Engineers design and maintain the infrastructure that moves, stores, and transforms data at scale. Currently the highest-demand role in the data ecosystem.',
    phases: [
      {
        name: 'Programming & Database Foundations',
        duration: '5–7 weeks',
        icon: '🏗️',
        color: '#15803d',
        topics: [
          {
            name: 'Python Engineering',
            why: 'Data engineering is 70% Python — you need to write production-quality, not notebook-quality code.',
            concepts: ['File I/O and error handling', 'Working with APIs (requests, httpx)', 'Async programming (asyncio)', 'Type hints & dataclasses', 'Unit testing with pytest', 'Packaging and modules'],
            resources: ['Real Python (realpython.com)', '"Clean Code" by Robert Martin', 'Python Testing with pytest (book)', 'Corey Schafer YouTube Python tutorials'],
            tools: ['Python 3.11+', 'VS Code', 'pytest', 'black (formatter)'],
          },
          {
            name: 'Advanced SQL & Database Design',
            why: 'You will write and optimize SQL queries that handle millions of rows every day.',
            concepts: ['Schema design (star schema, snowflake schema)', 'Indexing strategies', 'Partitioning & sharding basics', 'Transactions & ACID properties', 'Query execution plans (EXPLAIN ANALYZE)', 'Data warehousing concepts (SCD, fact/dimension tables)'],
            resources: ['pgexercises.com', '"Designing Data-Intensive Applications" ch 2 & 3', 'Mode Analytics SQL Advanced Tutorial', 'Use-the-index-luke.com'],
            tools: ['PostgreSQL', 'DBeaver', 'pgAdmin'],
          },
        ],
      },
      {
        name: 'Data Engineering Stack',
        duration: '8–10 weeks',
        icon: '⚡',
        color: '#0d7a86',
        topics: [
          {
            name: 'Pipeline Orchestration with Airflow',
            why: 'Apache Airflow is the industry standard for scheduling and monitoring data pipelines.',
            concepts: ['DAG structure and operators', 'Task dependencies and triggers', 'XComs for data passing', 'Hooks & connections', 'Scheduling with cron expressions', 'Error handling and retries'],
            resources: ['Apache Airflow official docs', 'Airflow in Practice (YouTube playlist)', 'Marc Lamberti Airflow courses', 'Astronomer tutorials (free)'],
            tools: ['Apache Airflow', 'Docker (for local Airflow)', 'Astronomer CLI'],
          },
          {
            name: 'Apache Spark & Distributed Processing',
            why: 'When data is too big for pandas, you need Spark. It is in almost every DE job description.',
            concepts: ['RDDs vs DataFrames vs Datasets', 'Spark SQL', 'PySpark transformations & actions', 'Partitioning strategy', 'Spark optimization (caching, broadcasting)', 'Structured Streaming basics'],
            resources: ['Spark: The Definitive Guide (O\'Reilly)', 'PySpark documentation', 'DataBricks community edition (free Spark cluster)', 'LearningSpark2.0 (free PDF from Databricks)'],
            tools: ['PySpark', 'Databricks Community Edition', 'Spark UI'],
          },
          {
            name: 'Cloud Data Platforms',
            why: 'All modern data engineering happens in the cloud — AWS, GCP or Azure is essential.',
            concepts: ['Cloud storage (S3, GCS, ADLS)', 'Managed data warehouses (BigQuery, Redshift, Snowflake)', 'Serverless functions for ETL', 'IAM & permissions', 'Cost management basics', 'Cloud-native pipeline patterns'],
            resources: ['AWS Free Tier (12 months free)', 'Google Cloud Skills Boost (free credits)', 'Snowflake 30-day free trial', '"Cloud Data Engineering" YouTube playlists'],
            tools: ['AWS S3 + Glue / GCP BigQuery', 'Snowflake or Redshift', 'Terraform basics'],
          },
          {
            name: 'dbt (Data Build Tool)',
            why: 'dbt has become the standard for SQL-based data transformation — it is everywhere in modern data stacks.',
            concepts: ['Models, seeds, and sources', 'Jinja templating in SQL', 'Tests and documentation', 'dbt lineage graph', 'Incremental models', 'Macros and packages'],
            resources: ['dbt Learn (courses.getdbt.com, free)', 'dbt documentation (docs.getdbt.com)', 'dbt Slack community'],
            tools: ['dbt Core (open source)', 'dbt Cloud (free dev tier)', 'BigQuery or Snowflake as warehouse'],
          },
        ],
      },
      {
        name: 'Production & Scale',
        duration: '4–6 weeks',
        icon: '🚀',
        color: '#7c3aed',
        topics: [
          {
            name: 'Streaming Data with Kafka',
            why: 'Real-time pipelines are increasingly common — Kafka is the undisputed leader.',
            concepts: ['Topics, partitions, consumers, producers', 'Consumer groups and offsets', 'Kafka Connect for sources/sinks', 'Schema Registry and Avro', 'Exactly-once semantics', 'Kafka Streams basics'],
            resources: ['Confluent Kafka tutorial (free)', 'Kafka: The Definitive Guide (free PDF)', 'Conduktor Kafka courses (YouTube)', 'Confluent Developer courses'],
            tools: ['Apache Kafka', 'Confluent Cloud (free tier)', 'Kafka UI (free local tool)'],
          },
          {
            name: 'Data Quality & Observability',
            why: 'Bad data costs companies millions. Engineers who prevent that are invaluable.',
            concepts: ['Great Expectations for data validation', 'Data lineage tracking', 'SLA monitoring', 'Schema evolution strategies', 'Alerting on pipeline failures', 'Data catalog basics'],
            resources: ['Great Expectations documentation', 'Monte Carlo data observability blog', 'Metabase / Superset for monitoring dashboards'],
            tools: ['Great Expectations', 'dbt tests', 'PagerDuty (alerting)'],
          },
        ],
      },
    ],
    tools: ['Python', 'SQL', 'Apache Airflow', 'Apache Spark/PySpark', 'dbt', 'Apache Kafka', 'AWS/GCP/Azure', 'Docker', 'Git/GitHub'],
    interviewTips: [
      'Be ready to design a full ETL pipeline on a whiteboard — sources, transformations, destinations',
      'Understand the difference between batch and streaming — and when to use each',
      'Know star schema vs snowflake schema and why it matters for query performance',
      'Explain idempotency in pipelines — why it matters and how to achieve it',
      'Practice debugging slow SQL queries using EXPLAIN ANALYZE',
    ],
  },
  {
    id: 'mlengineer',
    emoji: '🤖',
    title: 'ML Engineer',
    tagline: 'Deploy and scale machine learning systems',
    color: '#b91c1c',
    bg: 'rgba(185,28,28,0.08)',
    border: 'rgba(185,28,28,0.3)',
    timeline: '8–12 months',
    demand: 'High',
    avgSalary: '₹12–30 LPA',
    desc: 'ML Engineers sit at the intersection of software engineering and data science — they build the systems that serve ML models in production reliably at scale.',
    phases: [
      {
        name: 'Software Engineering Essentials',
        duration: '6–8 weeks',
        icon: '🏗️',
        color: '#15803d',
        topics: [
          {
            name: 'Production-Grade Python',
            why: 'MLE code runs in production 24/7 — you need software engineering discipline, not just data science scripts.',
            concepts: ['Design patterns (Factory, Strategy, Singleton)', 'Type hints everywhere (mypy)', 'Exception handling and logging', 'Configuration management (pydantic)', 'Unit + integration tests', 'CI/CD pipelines with GitHub Actions'],
            resources: ['Architecture Patterns with Python (O\'Reilly)', '"Clean Architecture" by Robert Martin', 'Effective Python by Brett Slatkin', 'testdriven.io (Python testing focus)'],
            tools: ['Python 3.11+', 'pydantic', 'mypy', 'pytest', 'black/ruff'],
          },
          {
            name: 'ML Fundamentals (for Engineers)',
            why: 'You do not need to invent new algorithms but you must understand how they work under the hood.',
            concepts: ['Linear algebra intuition (PCA, SVD)', 'Gradient descent variants (Adam, SGD, RMSProp)', 'Regularization (L1/L2, dropout)', 'Common architectures (MLP, CNN, RNN, Transformer)', 'Loss functions and their gradients', 'Numerical stability issues'],
            resources: ['CS231n Stanford notes (free)', 'Deep Learning book by Goodfellow (free PDF)', 'Andrej Karpathy YouTube (zero to hero neural nets)', 'fast.ai courses (free)'],
            tools: ['PyTorch', 'TensorFlow/Keras', 'scikit-learn'],
          },
        ],
      },
      {
        name: 'MLOps Core',
        duration: '8–10 weeks',
        icon: '⚡',
        color: '#0d7a86',
        topics: [
          {
            name: 'Model Serving & APIs',
            why: 'A model must be accessible via API to create value — this is table stakes for any MLE.',
            concepts: ['REST API design with FastAPI', 'Async endpoints for inference', 'Request/response validation (pydantic)', 'Batch vs real-time serving', 'gRPC for low-latency serving', 'Model versioning in APIs'],
            resources: ['FastAPI documentation (fastapi.tiangolo.com)', 'Full Stack FastAPI template', 'Designing ML Systems by Chip Huyen (book)', 'Chip Huyen\'s MLOps course (free on GitHub)'],
            tools: ['FastAPI', 'BentoML', 'TorchServe', 'ONNX Runtime'],
          },
          {
            name: 'Containerisation & Orchestration',
            why: 'Every production ML system runs in containers — Docker and Kubernetes are non-negotiable.',
            concepts: ['Dockerfile and image layers', 'Multi-stage builds for ML images', 'Docker Compose for local dev', 'Kubernetes fundamentals (pods, deployments, services)', 'Helm charts basics', 'Resource limits and auto-scaling'],
            resources: ['Docker official getting started guide', '"Kubernetes in Action" by Marko Luksa', 'Play with Kubernetes (free browser K8s)', 'Nana Techworld YouTube (K8s)'],
            tools: ['Docker', 'Kubernetes (minikube locally)', 'Helm', 'k9s CLI'],
          },
          {
            name: 'Experiment Tracking & Model Registry',
            why: 'Without systematic experiment tracking you are flying blind in ML development.',
            concepts: ['MLflow tracking server setup', 'Logging params, metrics, artifacts', 'Model registry and stage transitions', 'Weights & Biases (wandb) sweeps', 'Reproducibility (seeds, env locks)', 'A/B test orchestration'],
            resources: ['MLflow documentation (mlflow.org)', 'Weights & Biases documentation (wandb.ai)', 'Weights & Biases 100 Days of ML (YouTube)'],
            tools: ['MLflow', 'Weights & Biases', 'DVC (data versioning)'],
          },
          {
            name: 'Feature Stores',
            why: 'Feature stores prevent feature skew and enable feature reuse — now standard in large orgs.',
            concepts: ['Online vs offline store concepts', 'Feature materialization', 'Point-in-time joins', 'Feast (open source) setup', 'Feature discovery and governance', 'Redis for online serving'],
            resources: ['Feast documentation (feast.dev)', 'Tecton blog (feature store concepts)', 'Hopsworks tutorials'],
            tools: ['Feast', 'Hopsworks (free tier)', 'Redis'],
          },
        ],
      },
      {
        name: 'Production & Monitoring',
        duration: '4–6 weeks',
        icon: '🚀',
        color: '#7c3aed',
        topics: [
          {
            name: 'Model Monitoring & Drift Detection',
            why: 'Models degrade silently in production — catching this before users notice is the MLE\'s job.',
            concepts: ['Data drift vs concept drift', 'Statistical tests for drift (PSI, KS-test)', 'Evidently for ML monitoring', 'Prometheus + Grafana for metrics', 'Alerting strategies', 'Shadow mode / canary deployments'],
            resources: ['Evidently AI documentation (evidentlyai.com)', 'Prometheus getting started', 'MLOps Community YouTube', 'Chip Huyen\'s ML Interviews (free chapters)'],
            tools: ['Evidently AI', 'Prometheus', 'Grafana', 'Seldon Alibi Detect'],
          },
          {
            name: 'Cloud ML Platforms',
            why: 'Production ML is deployed on cloud platforms — you must know at least one end to end.',
            concepts: ['AWS SageMaker or GCP Vertex AI', 'Managed training jobs', 'Endpoint deployment and auto-scaling', 'Batch transform jobs', 'Model monitoring in cloud', 'Cost optimization strategies'],
            resources: ['AWS SageMaker Studio (free tier available)', 'GCP Vertex AI documentation', 'A Cloud Guru ML courses', 'AWS/GCP free tier labs'],
            tools: ['AWS SageMaker / GCP Vertex AI', 'Kubeflow (open-source on K8s)', 'Metaflow'],
          },
        ],
      },
    ],
    tools: ['Python', 'PyTorch/TensorFlow', 'FastAPI', 'Docker', 'Kubernetes', 'MLflow', 'AWS/GCP', 'Git/GitHub', 'Prometheus/Grafana'],
    interviewTips: [
      'Design a production ML system end-to-end: feature pipelines → model training → serving → monitoring',
      'Know the difference between online and offline serving latency requirements',
      'Explain how you would detect and respond to model drift in production',
      'Understand the CAP theorem and how it applies to feature stores',
      'Have experience containerising and deploying at least one real model',
    ],
  },
  {
    id: 'bi',
    emoji: '📈',
    title: 'BI Analyst',
    tagline: 'Deliver self-service analytics across the business',
    color: '#0369a1',
    bg: 'rgba(3,105,161,0.08)',
    border: 'rgba(3,105,161,0.3)',
    timeline: '3–5 months',
    demand: 'Very High',
    avgSalary: '₹4–12 LPA',
    desc: 'Business Intelligence Analysts build dashboards and reports that give stakeholders self-service access to data insights. The fastest route to employment from an MSc Data Science background.',
    phases: [
      {
        name: 'Core BI Tools',
        duration: '5–7 weeks',
        icon: '🏗️',
        color: '#15803d',
        topics: [
          {
            name: 'Power BI (Recommended path)',
            why: 'Power BI is the #1 BI tool by market share and appears in more Indian job postings than any other.',
            concepts: ['Power BI Desktop layout and workflow', 'Connecting to data sources', 'Power Query (M language basics)', 'Data modeling (relationships, calculated columns)', 'DAX formulas (CALCULATE, FILTER, ALL, SUMX)', 'Report design and interactivity'],
            resources: ['Microsoft Learn Power BI (free, official)', 'Guy in a Cube YouTube (Power BI, free)', 'SQLBI.com (DAX deep dives)', 'Power BI Community Forum'],
            tools: ['Power BI Desktop (free)', 'Power BI Service (free personal)'],
          },
          {
            name: 'Tableau (Alternative path)',
            why: 'Tableau is preferred in larger enterprises and product companies — stronger for complex visuals.',
            concepts: ['Connecting to data and data prep', 'Dimensions vs Measures', 'Calculated fields and LOD expressions', 'Dashboard design and actions', 'Table calculations', 'Publishing to Tableau Public/Server'],
            resources: ['Tableau training videos (help.tableau.com, free)', 'Tableau Public gallery for inspiration', 'Tableau e-learning (free trial)', 'SuperDataScience Tableau course'],
            tools: ['Tableau Public (free)', 'Tableau Desktop (student license available)'],
          },
          {
            name: 'SQL for BI',
            why: 'BI analysts query databases directly — strong SQL skills let you build better reports faster.',
            concepts: ['Complex aggregations for dashboards', 'Window functions for running totals/ranks', 'CTEs for readable complex queries', 'Date spine queries for time series', 'Semi-additive measures', 'Query performance for reporting'],
            resources: ['Mode Analytics SQL Tutorial', 'StrataScratch SQL problems', 'LeetCode SQL (medium level)', 'pgexercises.com'],
            tools: ['PostgreSQL', 'BigQuery', 'SQL Server (SSMS)'],
          },
        ],
      },
      {
        name: 'Data Modeling & Design',
        duration: '4–5 weeks',
        icon: '⚡',
        color: '#0d7a86',
        topics: [
          {
            name: 'DAX & Advanced Power BI',
            why: 'DAX is Power BI\'s calculation language — fluency in it separates junior from senior BI analysts.',
            concepts: ['Row context vs filter context (the most important concept in DAX)', 'CALCULATE and its magic', 'Time intelligence functions', 'RANKX, TOPN, SUMMARIZE', 'Performance optimization (avoid calculated columns)', 'Variables in DAX (VAR)'],
            resources: ['SQLBI DAX Patterns (daxpatterns.com, free)', '"The Definitive Guide to DAX" by Ferrari & Russo', 'SQLBI YouTube channel', 'Curbal YouTube'],
            tools: ['Power BI Desktop', 'DAX Studio (free, for debugging DAX)'],
          },
          {
            name: 'Dashboard Design Principles',
            why: 'A technically correct dashboard that nobody can read has zero value.',
            concepts: ['Information hierarchy', 'Color theory for data (sequential, diverging, categorical)', 'Gestalt principles', 'Mobile-first considerations', 'Accessibility in dashboards', 'Stakeholder requirements gathering'],
            resources: ['"Storytelling with Data" by Cole Knaflic (essential)', '"The Big Book of Dashboards" by Wexler et al.', 'Data Visualization Society (online community)', 'Figma for wireframing dashboards'],
            tools: ['Figma (free tier)', 'Coolors.co for color palettes'],
          },
        ],
      },
      {
        name: 'Business & Portfolio',
        duration: '3–4 weeks',
        icon: '🚀',
        color: '#7c3aed',
        topics: [
          {
            name: 'Excel + Power Query Mastery',
            why: 'Many BI environments still revolve around Excel — Power Query makes it powerful at scale.',
            concepts: ['Power Query data transformation', 'M language for custom transforms', 'Power Pivot (Excel\'s data model)', 'Dynamic array formulas (SPILL)', 'VBA basics for automation', 'Power Query vs pandas comparison'],
            resources: ['Excel Off The Grid YouTube', 'Excel Campus tutorials', 'Mr. Excel community forums'],
            tools: ['Microsoft Excel 365', 'Power Query Editor'],
          },
          {
            name: 'Portfolio & Certification',
            why: 'PL-300 (Power BI certification) + a public Tableau/Power BI portfolio will get your CV shortlisted.',
            concepts: ['Build 2 end-to-end dashboards with real data', 'Publish to Tableau Public or Power BI publish-to-web', 'Document business questions answered', 'Write a walkthrough of your design choices', 'Get PL-300 certified (Power BI)'],
            resources: ['Microsoft Learn free study paths for PL-300', 'Kaggle datasets for portfolio projects', 'data.gov.in for India-specific datasets', 'Maven Analytics data playground'],
            tools: ['Power BI Service', 'Tableau Public', 'LinkedIn to showcase work'],
          },
        ],
      },
    ],
    tools: ['Power BI', 'Tableau', 'SQL', 'Excel/Power Query', 'DAX', 'Python (basic pandas)'],
    interviewTips: [
      'Always bring a portfolio link — Tableau Public or a published Power BI report',
      'Be ready to walk through how you would design a sales dashboard from scratch',
      'Explain filter context vs row context in DAX if applying for Power BI roles',
      'Know at least 5 chart types and when NOT to use them',
      'Prepare to discuss a time your dashboard drove a business decision',
    ],
  },
  {
    id: 'llm',
    emoji: '🧠',
    title: 'AI / LLM Engineer',
    tagline: 'Build intelligent apps powered by large language models',
    color: '#0d7a86',
    bg: 'rgba(13,122,134,0.08)',
    border: 'rgba(13,122,134,0.3)',
    timeline: '5–8 months',
    demand: 'Explosive',
    avgSalary: '₹12–40 LPA',
    desc: 'AI/LLM Engineers build applications powered by large language models — chatbots, RAG systems, agents, and AI-powered workflows. The hottest and fastest-growing role in tech.',
    phases: [
      {
        name: 'Python & ML Foundations',
        duration: '4–5 weeks',
        icon: '🏗️',
        color: '#15803d',
        topics: [
          {
            name: 'Python for AI Engineering',
            why: 'LLM application code is Python — you need async, typing, and API patterns specifically.',
            concepts: ['Async / await patterns (aiohttp, httpx)', 'Pydantic for data validation', 'Environment management (.env, python-dotenv)', 'Working with REST APIs', 'Type hints and dataclasses', 'Context managers and generators'],
            resources: ['Real Python async tutorials', 'Pydantic documentation', 'FastAPI tutorial (naturally teaches async Python)'],
            tools: ['Python 3.11+', 'VS Code', 'uv (fast package manager)'],
          },
          {
            name: 'NLP & Transformer Foundations',
            why: 'You cannot build good LLM apps without understanding tokenization, embeddings, and attention.',
            concepts: ['Tokenization and vocabulary', 'Word embeddings (Word2Vec, GloVe) → contextual embeddings', 'Attention mechanism intuition', 'BERT, GPT architecture overview', 'Semantic similarity and cosine distance', 'Context window and tokens'],
            resources: ['The Illustrated Transformer by Jay Alammar (free blog)', 'Hugging Face NLP Course (free, huggingface.co/learn)', 'Andrej Karpathy "Let\'s build GPT" YouTube', '3Blue1Brown Attention video'],
            tools: ['Hugging Face Transformers', 'sentence-transformers'],
          },
        ],
      },
      {
        name: 'LLM Application Stack',
        duration: '7–9 weeks',
        icon: '⚡',
        color: '#0d7a86',
        topics: [
          {
            name: 'Prompt Engineering',
            why: 'The cheapest way to improve an LLM application is better prompts — this is a real skill.',
            concepts: ['Zero-shot vs few-shot prompting', 'Chain-of-Thought (CoT) prompting', 'Self-consistency technique', 'Role and persona prompting', 'Output format enforcement (JSON mode)', 'System vs user vs assistant messages'],
            resources: ['Prompt Engineering Guide (promptingguide.ai, free)', 'OpenAI Prompt Engineering Guide (official)', 'LLM Bootcamp by FSDL (free YouTube)'],
            tools: ['OpenAI Playground', 'Anthropic Console', 'PromptLayer'],
          },
          {
            name: 'RAG (Retrieval-Augmented Generation)',
            why: 'RAG is the most widely deployed LLM pattern in production — essential knowledge for any AI engineer.',
            concepts: ['Chunking strategies (fixed, recursive, semantic)', 'Embedding models (text-embedding-3-small, E5)', 'Vector databases (Pinecone, Qdrant, Chroma)', 'Similarity search (cosine, dot product)', 'Context construction and retrieval quality', 'Reranking (Cohere Rerank, BM25 hybrid)'],
            resources: ['LangChain RAG tutorial (python.langchain.com)', 'LlamaIndex documentation (llamaindex.ai)', 'Building RAG from scratch (YouTube by Various)', 'Qdrant vector DB documentation'],
            tools: ['LangChain / LlamaIndex', 'ChromaDB (local)', 'Pinecone / Qdrant (cloud)', 'OpenAI text-embedding-3 API'],
          },
          {
            name: 'LLM Frameworks',
            why: 'Frameworks like LangChain / LlamaIndex handle the plumbing — you build on top of them.',
            concepts: ['LangChain chains and LCEL', 'LangGraph for agentic workflows', 'LlamaIndex query pipelines', 'Memory management in conversations', 'Tool calling (function calling)', 'Streaming responses'],
            resources: ['LangChain Python docs', 'LlamaIndex documentation', 'LangGraph tutorials (for agents)', 'Langsmith for tracing/debugging'],
            tools: ['LangChain', 'LlamaIndex', 'LangGraph', 'LangSmith'],
          },
          {
            name: 'LLM Agents',
            why: 'Agents are the future of AI applications — automating multi-step reasoning with tool use.',
            concepts: ['ReAct pattern (Reasoning + Acting)', 'Tool definition and registration', 'Planning and memory patterns', 'Multi-agent orchestration', 'Human-in-the-loop checkpoints', 'Evaluation of agent outputs'],
            resources: ['LangGraph agent tutorials', 'AutoGen documentation (Microsoft)', 'CrewAI documentation', '"The AI Engineer" newsletter'],
            tools: ['LangGraph', 'AutoGen', 'CrewAI', 'Anthropic Computer Use (advanced)'],
          },
        ],
      },
      {
        name: 'Fine-tuning & Production',
        duration: '4–6 weeks',
        icon: '🚀',
        color: '#7c3aed',
        topics: [
          {
            name: 'Fine-Tuning & PEFT',
            why: 'Fine-tuning customizes a model for your domain — LoRA makes it affordable.',
            concepts: ['Full fine-tuning vs LoRA/QLoRA', 'Instruction tuning format (Alpaca, ChatML)', 'PEFT library from Hugging Face', 'Datasets for fine-tuning (JSONL format)', 'Evaluating fine-tuned models', 'Quantization (4-bit with bitsandbytes)'],
            resources: ['Hugging Face PEFT documentation', 'Sebastian Raschka\'s LoRA explainer (free PDF)', 'Axolotl fine-tuning framework', '"Fine-Tuning LLMs" by Shaw Talebi (YouTube)'],
            tools: ['Hugging Face PEFT', 'Axolotl', 'Unsloth (fast LoRA)', 'bitsandbytes'],
          },
          {
            name: 'LLM Evaluation & Guardrails',
            why: 'Production LLM apps must be reliable — hallucination and safety failures destroy trust.',
            concepts: ['RAGAS framework for RAG evaluation', 'LLM-as-judge pattern', 'Guardrails for output validation', 'Toxicity and bias evaluation', 'Latency optimization (streaming, caching)', 'Cost tracking and optimization'],
            resources: ['RAGAS documentation (ragas.io)', 'Guardrails AI documentation', 'LangSmith evaluation docs', 'Evals by OpenAI (GitHub)'],
            tools: ['RAGAS', 'Guardrails AI', 'LangSmith', 'Promptfoo'],
          },
        ],
      },
    ],
    tools: ['Python', 'LangChain/LlamaIndex', 'OpenAI/Anthropic API', 'Vector DB (Qdrant/Pinecone)', 'FastAPI', 'Docker', 'Hugging Face', 'LangSmith'],
    interviewTips: [
      'Build and demo a working RAG application — nothing beats a live demo in an AI engineering interview',
      'Explain the difference between semantic search and keyword search, and when to combine them',
      'Know the tradeoffs: fine-tuning vs RAG vs prompt engineering for a given problem',
      'Understand token economics — how to reduce cost and latency in production',
      'Be ready to discuss hallucination: how to detect it and reduce it in your system',
    ],
  },
]

// ─── TOPIC CARD ──────────────────────────────────────────────────────────────

function TopicCard({ topic, phaseColor, idx }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      border: `1.5px solid ${open ? phaseColor : 'var(--border)'}`,
      borderRadius: '14px',
      overflow: 'hidden',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxShadow: open ? `0 4px 20px ${phaseColor}22` : 'var(--shadow)',
      background: 'var(--surface)',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: '12px',
          background: open ? `${phaseColor}0d` : 'var(--surface)',
          border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          width: '28px', height: '28px', borderRadius: '8px',
          background: `${phaseColor}18`, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: '800', color: phaseColor, flexShrink: 0,
        }}>
          {idx + 1}
        </span>
        <span style={{ flex: 1, fontSize: '14.5px', fontWeight: '700', color: 'var(--text)' }}>
          {topic.name}
        </span>
        {open
          ? <ChevronUp size={16} color={phaseColor} style={{ flexShrink: 0 }} />
          : <ChevronDown size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
      </button>

      {open && (
        <div style={{ padding: '0 18px 18px', borderTop: `1px solid var(--border)` }}>
          {/* Why */}
          <div style={{ padding: '12px 14px', background: `${phaseColor}0d`, borderRadius: '10px', marginTop: '14px', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: phaseColor, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '5px' }}>Why this matters</div>
            <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.65' }}>{topic.why}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {/* Concepts */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Target size={13} color={phaseColor} />
                <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Key Concepts</span>
              </div>
              {topic.concepts.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '5px' }}>
                  <CheckCircle size={12} color={phaseColor} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '12.5px', color: 'var(--text-2)', lineHeight: '1.5' }}>{c}</span>
                </div>
              ))}
            </div>

            <div>
              {/* Resources */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <BookOpen size={13} color={phaseColor} />
                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Free Resources</span>
                </div>
                {topic.resources.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '5px' }}>
                    <ChevronRight size={12} color={phaseColor} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '12.5px', color: 'var(--text-2)', lineHeight: '1.5' }}>{r}</span>
                  </div>
                ))}
              </div>

              {/* Tools */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Wrench size={13} color={phaseColor} />
                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Tools</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {topic.tools.map((t, i) => (
                    <span key={i} style={{
                      padding: '3px 9px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '700',
                      background: `${phaseColor}14`, color: phaseColor, border: `1px solid ${phaseColor}33`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PHASE SECTION ───────────────────────────────────────────────────────────

function PhaseSection({ phase, phaseIdx }) {
  const [expanded, setExpanded] = useState(phaseIdx === 0)

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
          padding: '16px 20px', borderRadius: '14px',
          background: expanded ? `${phase.color}12` : 'var(--surface)',
          border: `2px solid ${expanded ? phase.color : 'var(--border)'}`,
          cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
          boxShadow: expanded ? `0 4px 20px ${phase.color}20` : 'var(--shadow)',
        }}
      >
        <span style={{ fontSize: '22px' }}>{phase.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '15.5px', fontWeight: '800', color: expanded ? phase.color : 'var(--text)' }}>
              Phase {phaseIdx + 1}: {phase.name}
            </span>
            <span style={{
              padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700',
              background: `${phase.color}14`, color: phase.color, border: `1px solid ${phase.color}33`,
            }}>
              <Clock size={10} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              {phase.duration}
            </span>
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {phase.topics.length} topic{phase.topics.length > 1 ? 's' : ''} — click to {expanded ? 'collapse' : 'expand'}
          </div>
        </div>
        {expanded
          ? <ChevronUp size={18} color={phase.color} style={{ flexShrink: 0 }} />
          : <ChevronDown size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
      </button>

      {expanded && (
        <div style={{ marginTop: '10px', paddingLeft: '12px', borderLeft: `3px solid ${phase.color}40` }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {phase.topics.map((topic, i) => (
              <TopicCard key={i} topic={topic} phaseColor={phase.color} idx={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── ROLE DETAIL ─────────────────────────────────────────────────────────────

function RoleDetail({ role, onBack }) {
  const demandColor = role.demand === 'Explosive' ? '#b91c1c' : role.demand === 'Very High' ? '#15803d' : '#0d7a86'

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 20px 64px' }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 14px', borderRadius: '9px',
          background: 'var(--surface)', border: '1.5px solid var(--border)',
          color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', marginBottom: '24px', transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = role.color; e.currentTarget.style.color = role.color }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
      >
        <ArrowLeft size={14} /> Back to all roles
      </button>

      {/* Header card */}
      <div style={{
        background: `linear-gradient(135deg, ${role.color}22, ${role.color}08)`,
        border: `2px solid ${role.color}44`,
        borderRadius: '20px', padding: '28px 28px 24px',
        marginBottom: '28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '48px', lineHeight: 1 }}>{role.emoji}</span>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: '900', color: role.color, lineHeight: 1.1 }}>
              {role.title}
            </h1>
            <div style={{ fontSize: '14px', color: 'var(--text-2)', marginBottom: '12px' }}>{role.tagline}</div>
            <p style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.65' }}>{role.desc}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { label: '⏱️ Timeline', value: role.timeline },
                { label: '💼 Demand', value: role.demand, valueColor: demandColor },
                { label: '💰 Avg Salary', value: role.avgSalary },
              ].map(({ label, value, valueColor }) => (
                <div key={label} style={{
                  padding: '8px 14px', borderRadius: '10px',
                  background: 'var(--surface)', border: '1.5px solid var(--border)',
                }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: valueColor || 'var(--text)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap phases */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '800', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} color={role.color} /> Learning Roadmap
        </h2>
        {role.phases.map((phase, i) => (
          <PhaseSection key={i} phase={phase} phaseIdx={i} />
        ))}
      </div>

      {/* Tools row */}
      <div className="card" style={{ padding: '22px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Wrench size={16} color={role.color} />
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: 'var(--text)' }}>Must-Know Tools & Technologies</h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {role.tools.map((t, i) => (
            <span key={i} style={{
              padding: '6px 13px', borderRadius: '20px', fontSize: '12.5px', fontWeight: '700',
              background: `${role.color}12`, color: role.color, border: `1.5px solid ${role.color}35`,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Interview tips */}
      <div className="card" style={{ padding: '22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Lightbulb size={16} color={role.color} />
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: 'var(--text)' }}>Interview Tips</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {role.interviewTips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{
                width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                background: `${role.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: '800', color: role.color,
              }}>{i + 1}</span>
              <span style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.6' }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── ROLE CARD ───────────────────────────────────────────────────────────────

function RoleCard({ role, onSelect }) {
  return (
    <button
      onClick={() => onSelect(role)}
      className="card card-hover"
      style={{
        padding: '22px 20px', cursor: 'pointer', border: `1.5px solid ${role.border}`,
        background: role.bg, textAlign: 'left', width: '100%',
        transition: 'all 0.2s', borderRadius: '16px',
        display: 'flex', flexDirection: 'column', gap: '12px',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = role.bg.replace('0.08', '0.14') }}
      onMouseLeave={e => { e.currentTarget.style.background = role.bg }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '34px', lineHeight: 1 }}>{role.emoji}</span>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: role.color, lineHeight: 1.1 }}>{role.title}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{role.tagline}</div>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-2)', lineHeight: '1.6' }}>
        {role.desc.slice(0, 110)}…
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', padding: '3px 9px', borderRadius: '20px', fontWeight: '700', background: `${role.color}14`, color: role.color, border: `1px solid ${role.color}30` }}>
            ⏱ {role.timeline}
          </span>
          <span style={{ fontSize: '11px', padding: '3px 9px', borderRadius: '20px', fontWeight: '700', background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
            {role.avgSalary}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: role.color, fontSize: '12.5px', fontWeight: '700' }}>
          View Roadmap <ChevronRight size={14} />
        </div>
      </div>
    </button>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function DataRoadmap() {
  const [selectedRole, setSelectedRole] = useState(null)

  if (selectedRole) {
    return <RoleDetail role={selectedRole} onBack={() => setSelectedRole(null)} />
  }

  return (
    <div style={{ color: 'var(--text)' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0d3c55 0%, #14a1af 100%)',
        padding: '56px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '20px',
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '20px',
          }}>
            <Star size={12} color="#fbbf24" fill="#fbbf24" />
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>Free · No sign-up · Updated 2025</span>
          </div>

          <h1 style={{ margin: '0 0 14px', fontSize: '42px', fontWeight: '900', color: 'white', lineHeight: 1.1, letterSpacing: '-0.8px' }}>
            Data Career Roadmap
          </h1>
          <p style={{ margin: '0 0 10px', fontSize: '18px', color: 'rgba(255,255,255,0.82)', lineHeight: '1.6', fontWeight: '400' }}>
            Pick your target role. Get a step-by-step learning path — skills, tools, free resources, and interview tips — to land your first data job.
          </p>
          <p style={{ margin: '0', fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.5' }}>
            Designed for MSc/BSc graduates who know the theory but want a practical path to employment.
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 24px', display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { emoji: '🎯', label: '6 career paths covered' },
            { emoji: '📚', label: '30+ curated free resources' },
            { emoji: '⏱️', label: 'Realistic timelines' },
            { emoji: '💼', label: 'Interview tips included' },
          ].map(({ emoji, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', color: 'var(--text-2)', fontWeight: '600' }}>
              <span>{emoji}</span> {label}
            </div>
          ))}
        </div>
      </div>

      {/* Role grid */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '800', color: 'var(--text)' }}>
            Choose Your Target Role
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
            Not sure which to pick? Start with <strong>Data Analyst</strong> or <strong>BI Analyst</strong> — they have the shortest path to employment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {ROLES.map(role => (
            <RoleCard key={role.id} role={role} onSelect={setSelectedRole} />
          ))}
        </div>

        {/* Bottom callout */}
        <div style={{
          marginTop: '48px', padding: '24px 28px',
          background: 'linear-gradient(135deg, rgba(13,122,134,0.08), rgba(20,161,175,0.05))',
          border: '1.5px solid var(--border)', borderRadius: '16px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>💡</div>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>
            Quick tip for MSc graduates
          </h3>
          <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto' }}>
            You already have the theory. The gap is <strong>practical, applied projects on GitHub</strong>. Pick one role, build 2–3 real end-to-end projects, and start applying. Most employers care more about what you've <em>built</em> than where you studied.
          </p>
        </div>
      </div>
    </div>
  )
}
