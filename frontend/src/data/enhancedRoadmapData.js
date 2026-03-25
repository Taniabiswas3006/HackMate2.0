// Enhanced roadmap data with comprehensive topics and practical portions
export const enhancedRoadmapData = {
  AI: {
    Beginner: {
      topics: [
        {
          name: "Python Programming Fundamentals",
          subtopics: ["Variables & Data Types", "Loops & Conditionals", "Functions", "Object-Oriented Programming basics"],
          resources: ["Python.org docs", "Codecademy", "LeetCode Easy Problems"]
        },
        {
          name: "Mathematics for ML",
          subtopics: ["Linear Algebra basics", "Probability & Statistics", "Calculus fundamentals"],
          resources: ["3Blue1Brown videos", "Khan Academy", "Mathematics for ML Specialization"]
        },
        {
          name: "Data Manipulation",
          subtopics: ["NumPy arrays", "Pandas DataFrames", "Data cleaning", "Data visualization"],
          resources: ["DataCamp", "NumPy/Pandas documentation", "Kaggle datasets"]
        },
        {
          name: "ML Basics",
          subtopics: ["Supervised vs Unsupervised Learning", "Training/Testing", "Simple algorithms", "Model evaluation"],
          resources: ["Scikit-learn tutorials", "Coursera ML course", "Medium articles"]
        }
      ],
      practical: [
        { project: "Iris Dataset Classification", difficulty: "Easy", duration: "1 week", skills: ["Data loading", "Basic ML model"] },
        { project: "Housing Price Prediction", difficulty: "Easy", duration: "2 weeks", skills: ["Linear Regression", "Feature scaling"] },
        { project: "Iris Flower Classifier", difficulty: "Medium", duration: "2 weeks", skills: ["Classification", "Model evaluation"] }
      ]
    },
    Intermediate: {
      topics: [
        {
          name: "Supervised Learning",
          subtopics: ["Linear/Logistic Regression", "Decision Trees", "Random Forest", "SVM", "Performance metrics"],
          resources: ["Scikit-learn documentation", "Andrew Ng ML course", "Kaggle competitions"]
        },
        {
          name: "Unsupervised Learning",
          subtopics: ["K-means clustering", "Hierarchical clustering", "Dimensionality reduction", "PCA"],
          resources: ["StatQuest videos", "Sebastian Raschka's ML book", "Clustering tutorials"]
        },
        {
          name: "Introduction to Deep Learning",
          subtopics: ["Neural Networks basics", "Activation functions", "Backpropagation", "Optimization"],
          resources: ["Fast.ai", "Deep Learning specialization", "TensorFlow tutorials"]
        },
        {
          name: "Feature Engineering",
          subtopics: ["Feature scaling", "Encoding", "Feature selection", "Feature creation"],
          resources: ["Kaggle Feature Engineering competitions", "Domain knowledge", "Domain expertise"]
        }
      ],
      practical: [
        { project: "Titanic Survival Prediction", difficulty: "Medium", duration: "2 weeks", skills: ["Data preprocessing", "Feature engineering"] },
        { project: "Customer Segmentation", difficulty: "Medium", duration: "3 weeks", skills: ["Clustering", "Analysis"] },
        { project: "Sentiment Analysis", difficulty: "Medium", duration: "3 weeks", skills: ["NLP basics", "Classification"] },
        { project: "Credit Risk Prediction", difficulty: "Hard", duration: "4 weeks", skills: ["Imbalanced data", "Model tuning"] }
      ]
    },
    Advanced: {
      topics: [
        {
          name: "Advanced Neural Networks",
          subtopics: ["CNN for images", "RNN/LSTM for sequences", "Transformers", "Attention mechanisms"],
          resources: ["Fast.ai Part 2", "PapersWithCode", "ArXiv papers"]
        },
        {
          name: "Model Deployment",
          subtopics: ["Containerization (Docker)", "APIs (Flask/FastAPI)", "Cloud deployment", "Monitoring"],
          resources: ["TensorFlow Serving", "Docker docs", "AWS/GCP documentation"]
        },
        {
          name: "MLOps & Production",
          subtopics: ["Model versioning", "Continuous integration", "Model monitoring", "A/B testing"],
          resources: ["Full Stack Deep Learning course", "MLflow", "Weights & Biases"]
        },
        {
          name: "Research & Innovation",
          subtopics: ["Reading research papers", "Implementing papers", "Contributing to open source", "Novel applications"],
          resources: ["ArXiv", "Papers With Code", "GitHub", "Research communities"]
        }
      ],
      practical: [
        { project: "Image Classification (CNN)", difficulty: "Hard", duration: "4 weeks", skills: ["CNNs", "Transfer learning"] },
        { project: "Text Generation (RNN/LSTM)", difficulty: "Hard", duration: "4 weeks", skills: ["RNNs", "Sequence models"] },
        { project: "Deploy ML Model to Production", difficulty: "Hard", duration: "5 weeks", skills: ["Docker", "APIs", "Deployment"] },
        { project: "Implement Research Paper", difficulty: "Expert", duration: "6+ weeks", skills: ["Research", "Implementation", "Optimization"] }
      ]
    }
  },

  WebDevelopment: {
    Beginner: {
      topics: [
        {
          name: "Frontend Basics",
          subtopics: ["HTML structure", "CSS styling", "Responsive design", "Flexbox/Grid"],
          resources: ["MDN Web Docs", "freeCodeCamp", "CSS-Tricks"]
        },
        {
          name: "JavaScript Fundamentals",
          subtopics: ["Variables & Data Types", "Functions", "DOM manipulation", "Events", "Async/Await"],
          resources: ["Eloquent JavaScript", "JavaScript.info", "FreeCodeCamp"]
        },
        {
          name: "Version Control",
          subtopics: ["Git basics", "GitHub workflow", "Branching", "Merging", "Collaboration"],
          resources: ["GitHub Learning Lab", "Pro Git book", "Atlassian tutorials"]
        },
        {
          name: "Web Fundamentals",
          subtopics: ["HTTP/HTTPS", "DNS", "Browsers basics", "SEO basics"],
          resources: ["MDN Web Docs", "Web.dev", "How the web works guide"]
        }
      ],
      practical: [
        { project: "Personal Portfolio Website", difficulty: "Easy", duration: "2 weeks", skills: ["HTML", "CSS", "Responsive design"] },
        { project: "Todo App (Vanilla JS)", difficulty: "Easy", duration: "2 weeks", skills: ["DOM manipulation", "localStorage"] },
        { project: "Weather App", difficulty: "Medium", duration: "3 weeks", skills: ["APIs", "Async JavaScript"] }
      ]
    },
    Intermediate: {
      topics: [
        {
          name: "React Framework",
          subtopics: ["Components", "Hooks", "State management", "Props", "Lifecycle"],
          resources: ["React official docs", "React Query", "Redux", "Zustand"]
        },
        {
          name: "Backend Basics",
          subtopics: ["Node.js", "Express.js", "REST APIs", "Routing", "Middleware"],
          resources: ["Node.js documentation", "Express.js guide", "REST API design"]
        },
        {
          name: "Database Integration",
          subtopics: ["SQL basics", "MongoDB", "Database design", "Queries"],
          resources: ["SQL tutorial", "MongoDB docs", "Database design books"]
        },
        {
          name: "Authentication & Security",
          subtopics: ["JWT tokens", "Password hashing", "HTTPS", "CORS", "Input validation"],
          resources: ["Auth0 docs", "OWASP Top 10", "Password management guides"]
        }
      ],
      practical: [
        { project: "Full-Stack Todo App", difficulty: "Medium", duration: "3 weeks", skills: ["React", "Node.js", "Database"] },
        { project: "Blog Platform", difficulty: "Medium", duration: "4 weeks", skills: ["CRUD operations", "Authentication"] },
        { project: "E-commerce Product Page", difficulty: "Medium", duration: "4 weeks", skills: ["State management", "Filtering"] },
        { project: "Chat Application (Real-time)", difficulty: "Hard", duration: "5 weeks", skills: ["WebSockets", "Real-time updates"] }
      ]
    },
    Advanced: {
      topics: [
        {
          name: "Advanced Frontend",
          subtopics: ["Performance optimization", "Code splitting", "Testing (Jest/Cypress)", "TypeScript"],
          resources: ["Web Vitals", "Webpack docs", "Testing Library", "TypeScript handbook"]
        },
        {
          name: "System Design",
          subtopics: ["Scalability", "Caching strategies", "Load balancing", "Microservices", "Monitoring"],
          resources: ["System Design Interview book", "Designing Data-Intensive Applications", "High Scalability blog"]
        },
        {
          name: "DevOps & Deployment",
          subtopics: ["Docker & Kubernetes", "CI/CD pipelines", "Cloud platforms (AWS/GCP/Azure)", "Infrastructure as Code"],
          resources: ["Docker documentation", "Kubernetes docs", "GitHub Actions", "Terraform"]
        },
        {
          name: "Advanced Patterns",
          subtopics: ["Design patterns", "SOLID principles", "Clean code", "Refactoring", "Software architecture"],
          resources: ["Design Patterns book", "Clean Code", "Code Complete", "Architecture patterns"]
        }
      ],
      practical: [
        { project: "SPA with Advanced State", difficulty: "Hard", duration: "4 weeks", skills: ["Redux/Context API", "Performance"] },
        { project: "Microservices Backend", difficulty: "Hard", duration: "6 weeks", skills: ["Docker", "Microservices"] },
        { project: "Deploy to Cloud", difficulty: "Hard", duration: "3 weeks", skills: ["AWS/GCP", "DevOps"] },
        { project: "Build Production App", difficulty: "Expert", duration: "8+ weeks", skills: ["Full stack", "Optimization", "Security"] }
      ]
    }
  },

  CyberSecurity: {
    Beginner: {
      topics: [
        {
          name: "Networking Fundamentals",
          subtopics: ["TCP/IP model", "DNS", "HTTP/HTTPS", "Firewalls", "Network tools"],
          resources: ["Cisco CCNA", "CompTIA Network+", "Hackersploit YouTube"]
        },
        {
          name: "Linux Basics",
          subtopics: ["Command line", "File systems", "Permissions", "Shell scripting", "System administration"],
          resources: ["Linux Academy", "Udemy Linux course", "Linux man pages"]
        },
        {
          name: "Security Fundamentals",
          subtopics: ["Encryption basics", "Authentication", "Authorization", "Common threats", "Security mindset"],
          resources: ["NIST Cybersecurity Framework", "Security+ course", "OWASP resources"]
        },
        {
          name: "Basic Hacking Concepts",
          subtopics: ["Common vulnerabilities", "Social engineering", "Password cracking", "CTF basics"],
          resources: ["HackTheBox", "TryHackMe", "OverTheWire Wargames"]
        }
      ],
      practical: [
        { project: "Linux Privilege Escalation", difficulty: "Easy", duration: "2 weeks", skills: ["Linux", "Command line"] },
        { project: "Basic CTF Challenges", difficulty: "Easy", duration: "3 weeks", skills: ["Reconnaissance", "Problem solving"] },
        { project: "Network Packet Analysis", difficulty: "Medium", duration: "2 weeks", skills: ["Wireshark", "Protocols"] }
      ]
    },
    Intermediate: {
      topics: [
        {
          name: "Web Application Security",
          subtopics: ["OWASP Top 10", "SQL injection", "XSS attacks", "CSRF", "Web scanning"],
          resources: ["OWASP Testing Guide", "Burp Suite tutorials", "HackTheBox web challenges"]
        },
        {
          name: "Penetration Testing",
          subtopics: ["Reconnaissance", "Scanning", "Enumeration", "Exploitation basics", "Reporting"],
          resources: ["CEH course", "Penetration Testing", "PenTest procedures"]
        },
        {
          name: "Cryptography",
          subtopics: ["Symmetric encryption", "Asymmetric encryption", "Hash functions", "Digital signatures"],
          resources: ["Cryptography I course", "Applied Cryptography book", "Crypto challenges"]
        },
        {
          name: "Linux Advanced",
          subtopics: ["Kernel security", "SELinux", "AppArmor", "System hardening"],
          resources: ["Linux hardening guide", "Kernel documentation", "Security hardening"]
        }
      ],
      practical: [
        { project: "OWASP Top 10 Testing", difficulty: "Medium", duration: "3 weeks", skills: ["Web pentesting", "Burp Suite"] },
        { project: "Network Penetration Test", difficulty: "Hard", duration: "4 weeks", skills: ["Metasploit", "Network tools"] },
        { project: "Vulnerability Assessment", difficulty: "Hard", duration: "4 weeks", skills: ["Scanning", "Reporting"] }
      ]
    },
    Advanced: {
      topics: [
        {
          name: "Advanced Penetration Testing",
          subtopics: ["Active reconnaissance", "Social engineering", "Physical security", "Red team tactics"],
          resources: ["OSCP course", "Penetration Testing book", "Advanced PTesting resources"]
        },
        {
          name: "Malware Analysis",
          subtopics: ["Static analysis", "Dynamic analysis", "Reverse engineering", "Behavior analysis"],
          resources: ["Malware analysis course", "Ghidra tutorial", "IDA Pro guide"]
        },
        {
          name: "Incident Response",
          subtopics: ["Forensics", "Log analysis", "Timeline reconstruction", "Evidence collection"],
          resources: ["SANS Incident Response", "Forensic Investigation", "Log2Timeline"]
        },
        {
          name: "Cloud Security",
          subtopics: ["AWS security", "Azure security", "Cloud misconfigurations", "Compliance"],
          resources: ["AWS security best practices", "Cloud security courses", "Scout Suite"]
        }
      ],
      practical: [
        { project: "Advanced Exploitation", difficulty: "Hard", duration: "6 weeks", skills: ["Exploitation", "Shell access"] },
        { project: "Malware Reverse Engineering", difficulty: "Expert", duration: "8 weeks", skills: ["RE tools", "Analysis"] },
        { project: "Forensic Investigation", difficulty: "Hard", duration: "6 weeks", skills: ["Forensics", "Analysis"] },
        { project: "Bug Bounty Hunt", difficulty: "Expert", duration: "Ongoing", skills: ["Pentesting", "Vulnerability hunting"] }
      ]
    }
  },

  DataAnalysis: {
    Beginner: {
      topics: [
        {
          name: "Python for Data Analysis",
          subtopics: ["Python basics", "Pandas DataFrames", "NumPy arrays", "Data types"],
          resources: ["Pandas documentation", "NumPy guide", "Python Data Analysis book"]
        },
        {
          name: "Data Exploration",
          subtopics: ["Data loading", "Data cleaning", "Missing values", "Outlier detection"],
          resources: ["Data cleaning guide", "Kaggle notebooks", "Real datasets"]
        },
        {
          name: "Data Visualization",
          subtopics: ["Matplotlib", "Seaborn", "Plotly", "Chart types", "Visual storytelling"],
          resources: ["Matplotlib documentation", "Seaborn gallery", "Data visualization best practices"]
        },
        {
          name: "Statistics Basics",
          subtopics: ["Descriptive statistics", "Distributions", "Correlation", "Hypothesis testing"],
          resources: ["Statistics for Data Analysis", "Khan Academy", "StatQuest videos"]
        }
      ],
      practical: [
        { project: "Exploratory Data Analysis", difficulty: "Easy", duration: "2 weeks", skills: ["EDA", "Visualization"] },
        { project: "Sales Data Analysis", difficulty: "Easy", duration: "2 weeks", skills: ["Data cleaning", "Aggregation"] },
        { project: "Movie Dataset Analysis", difficulty: "Medium", duration: "3 weeks", skills: ["Multi-dataset", "Analysis"] }
      ]
    },
    Intermediate: {
      topics: [
        {
          name: "Advanced Analytics",
          subtopics: ["Time series analysis", "Cohort analysis", "Statistical testing", "Regression analysis"],
          resources: ["Time series forecasting", "Statistical testing guide", "Advanced analytics"]
        },
        {
          name: "SQL for Analytics",
          subtopics: ["Complex queries", "Joins", "Aggregations", "Window functions", "Optimization"],
          resources: ["SQL tutorial", "LeetCode Database problems", "Advanced SQL"]
        },
        {
          name: "Business Intelligence",
          subtopics: ["KPI development", "Dashboard design", "BI tools basics", "Metrics definition"],
          resources: ["BI fundamentals", "Dashboard design guide", "KPI development"]
        },
        {
          name: "Python Libraries",
          subtopics: ["Scikit-learn basics", "Statsmodels", "Scipy", "Advanced Pandas"],
          resources: ["Library documentation", "Tutorial notebooks", "Real-world examples"]
        }
      ],
      practical: [
        { project: "Customer Analytics Dashboard", difficulty: "Medium", duration: "3 weeks", skills: ["SQL", "Visualization"] },
        { project: "Time Series Forecasting", difficulty: "Medium", duration: "4 weeks", skills: ["Forecasting", "Analysis"] },
        { project: "A/B Test Analysis", difficulty: "Medium", duration: "3 weeks", skills: ["Statistics", "Testing"] }
      ]
    },
    Advanced: {
      topics: [
        {
          name: "Big Data Technologies",
          subtopics: ["Spark", "Hadoop", "Data warehouses", "ETL pipelines"],
          resources: ["Spark documentation", "Databricks", "Big data courses"]
        },
        {
          name: "Data Pipeline Development",
          subtopics: ["Data ingestion", "Transformation", "Loading", "Orchestration", "Monitoring"],
          resources: ["Apache Airflow", "dbt", "Data pipeline patterns"]
        },
        {
          name: "Advanced BI Tools",
          subtopics: ["Power BI advanced", "Tableau advanced", "Looker", "Business metrics"],
          resources: ["Tool documentation", "Advanced courses", "Case studies"]
        },
        {
          name: "Predictive Analytics",
          subtopics: ["Forecasting models", "Anomaly detection", "Customer segmentation", "Churn prediction"],
          resources: ["Predictive modeling", "ML for analytics", "Real-world projects"]
        }
      ],
      practical: [
        { project: "Build Data Pipeline", difficulty: "Hard", duration: "4 weeks", skills: ["ETL", "Orchestration"] },
        { project: "Enterprise Analytics Solution", difficulty: "Hard", duration: "6 weeks", skills: ["Big data", "BI"] },
        { project: "Predictive Model Deployment", difficulty: "Hard", duration: "5 weeks", skills: ["ML", "Production"] }
      ]
    }
  },

  Blockchain: {
    Beginner: {
      topics: [
        {
          name: "Blockchain Fundamentals",
          subtopics: ["Distributed ledger", "Blocks & chains", "Consensus mechanisms", "Cryptocurrencies"],
          resources: ["Blockchain basics", "Bitcoin whitepaper", "Blockchain explained videos"]
        },
        {
          name: "Cryptocurrency Basics",
          subtopics: ["Bitcoin", "Ethereum", "Wallets", "Transactions", "Mining"],
          resources: ["CoinMarketCap education", "Ethereum.org", "Crypto basics guide"]
        },
        {
          name: "Smart Contracts Introduction",
          subtopics: ["Smart contract concept", "Solidity basics", "EVM basics", "Contract lifecycle"],
          resources: ["Solidity documentation", "Cryptozombies", "Smart contract tutorials"]
        },
        {
          name: "Web3 Ecosystem",
          subtopics: ["DeFi basics", "NFTs", "DAOs", "Web3 standards"],
          resources: ["DeFi explained", "NFT guides", "Web3 resources"]
        }
      ],
      practical: [
        { project: "Understand Bitcoin Transactions", difficulty: "Easy", duration: "2 weeks", skills: ["Bitcoin", "Wallets"] },
        { project: "Deploy Simple Smart Contract", difficulty: "Easy", duration: "2 weeks", skills: ["Solidity", "Remix"] },
        { project: "Interact with Existing Contracts", difficulty: "Medium", duration: "2 weeks", skills: ["Web3.js", "Ethers.js"] }
      ]
    },
    Intermediate: {
      topics: [
        {
          name: "Solidity Development",
          subtopics: ["Solidity syntax", "Data types", "Functions", "Modifiers", "Testing"],
          resources: ["Solidity documentation", "Hardhat", "Truffle guides"]
        },
        {
          name: "DApp Development",
          subtopics: ["Frontend integration", "Web3 libraries", "Wallet integration", "Gas optimization"],
          resources: ["Web3.js docs", "Ethers.js docs", "DApp patterns"]
        },
        {
          name: "Smart Contract Security",
          subtopics: ["Common vulnerabilities", "Reentrancy attacks", "Integer overflow", "Best practices"],
          resources: ["Smart contract security", "OpenZeppelin", "Security audit guides"]
        },
        {
          name: "Ethereum Ecosystem",
          subtopics: ["Layer 2 solutions", "Testnets", "Network architecture", "Gas mechanics"],
          resources: ["Ethereum documentation", "L2 guides", "Gas optimization"]
        }
      ],
      practical: [
        { project: "Build Token Contract", difficulty: "Medium", duration: "3 weeks", skills: ["ERC-20", "Testing"] },
        { project: "Build Simple DApp", difficulty: "Medium", duration: "4 weeks", skills: ["Solidity", "Frontend"] },
        { project: "DeFi Protocol Interaction", difficulty: "Hard", duration: "4 weeks", skills: ["DeFi", "Complex contracts"] }
      ]
    },
    Advanced: {
      topics: [
        {
          name: "Advanced Smart Contracts",
          subtopics: ["Complex DeFi contracts", "Oracle integration", "Cross-chain", "Advanced patterns"],
          resources: ["Advanced Solidity", "DeFi protocols", "Chainlink", "Cross-chain guides"]
        },
        {
          name: "Blockchain Architecture",
          subtopics: ["Consensus algorithms", "Blockchain design", "Layer 2 protocols", "Sharding"],
          resources: ["Bitcoin whitepaper", "Ethereum research", "Cryptocurrency engineering"]
        },
        {
          name: "Web3 Infrastructure",
          subtopics: ["Node operation", "Indexing", "RPC infrastructure", "Protocol development"],
          resources: ["Node documentation", "The Graph", "Infrastructure guides"]
        },
        {
          name: "Compliance & Governance",
          subtopics: ["Regulatory compliance", "DAO governance", "Legal frameworks"],
          resources: ["Blockchain regulation", "DAO governance guides", "Legal resources"]
        }
      ],
      practical: [
        { project: "Build Advanced DeFi Protocol", difficulty: "Hard", duration: "7 weeks", skills: ["Complex Solidity", "DeFi"] },
        { project: "Create DAO", difficulty: "Hard", duration: "6 weeks", skills: ["Governance", "Smart contracts"] },
        { project: "Run a Blockchain Node", difficulty: "Hard", duration: "4 weeks", skills: ["Infrastructure", "Monitoring"] },
        { project: "Blockchain Research Project", difficulty: "Expert", duration: "Ongoing", skills: ["Research", "Innovation"] }
      ]
    }
  }
};

export default enhancedRoadmapData;
