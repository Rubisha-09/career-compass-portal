export interface RoadmapYear {
  year: number;
  topics: string[];
  languages: string[];
  projects: string[];
}

export interface ResumeTemplate {
  objective: string;
  keySkills: string[];
  sampleExperience: {
    role: string;
    company: string;
    duration: string;
    bullets: string[];
  }[];
  sampleProjects: { name: string; description: string; tech: string[] }[];
  certifications: string[];
}

export interface Career {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  skills: string[];
  languages: string[];
  tools: string[];
  companies: string[];
  courses: { platform: string; title: string }[];
  roadmap: RoadmapYear[];
  projects: { level: string; items: string[] }[];
  companyExpectations: string[];
  requiredSkillsForGap: string[];
  resumeTemplate: ResumeTemplate;
}

export const CAREERS: Career[] = [
  {
    id: "software-developer",
    title: "Software Developer",
    icon: "💻",
    color: "#3b82f6",
    description:
      "Build software, websites, and applications used by millions. Software developers design, code, test, and maintain software systems across web, mobile, and desktop platforms.",
    skills: [
      "Programming",
      "Data Structures",
      "Problem Solving",
      "Web Development",
      "Version Control",
    ],
    languages: ["C", "Python", "Java", "JavaScript", "TypeScript"],
    tools: ["VS Code", "Git", "GitHub", "Node.js", "React", "Docker"],
    companies: [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS",
      "Infosys",
      "Wipro",
      "Flipkart",
    ],
    courses: [
      { platform: "Coursera", title: "Python for Everybody" },
      { platform: "Udemy", title: "The Complete Web Developer Bootcamp" },
      { platform: "freeCodeCamp", title: "Full Stack Web Development" },
      { platform: "edX", title: "Data Structures and Algorithms" },
    ],
    roadmap: [
      {
        year: 1,
        topics: [
          "Programming basics (C / Python)",
          "Problem solving",
          "HTML & CSS",
          "Git basics",
        ],
        languages: ["C", "Python", "HTML", "CSS"],
        projects: ["Calculator program", "Personal portfolio website"],
      },
      {
        year: 2,
        topics: [
          "Data Structures",
          "Object Oriented Programming",
          "SQL database",
          "JavaScript basics",
        ],
        languages: ["Python", "Java", "JavaScript", "SQL"],
        projects: ["Student management system", "To-Do list web app"],
      },
      {
        year: 3,
        topics: [
          "Web development (React / Node.js)",
          "REST APIs",
          "Git & GitHub",
          "Testing basics",
        ],
        languages: ["JavaScript", "TypeScript", "Python"],
        projects: ["E-commerce website", "Chat application"],
      },
      {
        year: 4,
        topics: [
          "System design",
          "Cloud basics",
          "Interview preparation",
          "CI/CD pipelines",
        ],
        languages: ["JavaScript", "Python", "Java"],
        projects: ["Full stack web application", "Internship project"],
      },
    ],
    projects: [
      {
        level: "Beginner",
        items: ["Calculator app", "Portfolio website", "To-Do list"],
      },
      {
        level: "Intermediate",
        items: ["Blog platform", "Expense tracker", "Weather dashboard"],
      },
      {
        level: "Advanced",
        items: ["E-commerce site", "Chat application", "Full-stack SaaS app"],
      },
    ],
    companyExpectations: [
      "Strong knowledge of at least one OOP language (Java, Python, or JavaScript)",
      "Understanding of Data Structures and Algorithms",
      "Proficiency with Git version control and collaboration workflows",
      "Experience building RESTful APIs and web applications",
      "Familiarity with databases (SQL and NoSQL)",
      "Knowledge of software development best practices and design patterns",
    ],
    requiredSkillsForGap: [
      "Python",
      "Data Structures",
      "GitHub",
      "JavaScript",
      "React",
      "SQL",
      "Node.js",
      "REST APIs",
      "Docker",
      "System Design",
    ],
    resumeTemplate: {
      objective:
        "Motivated Computer Science graduate with strong programming skills seeking a Software Developer role to build scalable web applications and contribute to innovative product teams.",
      keySkills: [
        "Python",
        "JavaScript",
        "React",
        "Node.js",
        "SQL",
        "Git",
        "Data Structures",
        "REST APIs",
      ],
      sampleExperience: [
        {
          role: "Software Developer Intern",
          company: "TechSolutions Pvt. Ltd.",
          duration: "May 2024 – Aug 2024",
          bullets: [
            "Developed RESTful APIs using Node.js serving 10,000+ daily requests",
            "Built responsive React dashboards reducing report generation time by 40%",
            "Collaborated with a 5-member agile team using GitHub and Jira",
          ],
        },
      ],
      sampleProjects: [
        {
          name: "E-Commerce Platform",
          description:
            "Full-stack shopping platform with cart, payments, and admin panel",
          tech: ["React", "Node.js", "MongoDB", "Stripe"],
        },
        {
          name: "Chat Application",
          description: "Real-time messaging app with rooms and notifications",
          tech: ["Socket.io", "Express", "React"],
        },
      ],
      certifications: [
        "Google IT Automation with Python (Coursera)",
        "Meta Front-End Developer Certificate",
        "AWS Cloud Practitioner Essentials",
      ],
    },
  },
  {
    id: "ai-ml-engineer",
    title: "AI / ML Engineer",
    icon: "🤖",
    color: "#8b5cf6",
    description:
      "Develop AI systems, chatbots, and prediction models that power the next generation of intelligent applications. Work on cutting-edge machine learning and deep learning systems.",
    skills: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Data Analysis",
      "Mathematics & Statistics",
    ],
    languages: ["Python", "R", "SQL", "Julia"],
    tools: [
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "Jupyter",
      "Pandas",
      "NumPy",
    ],
    companies: [
      "Google",
      "Amazon",
      "NVIDIA",
      "IBM",
      "OpenAI",
      "Meta",
      "Microsoft",
    ],
    courses: [
      {
        platform: "Coursera",
        title: "Machine Learning Specialization (Andrew Ng)",
      },
      { platform: "Udemy", title: "Deep Learning A-Z" },
      { platform: "fast.ai", title: "Practical Deep Learning for Coders" },
      { platform: "edX", title: "Artificial Intelligence MicroMasters" },
    ],
    roadmap: [
      {
        year: 1,
        topics: [
          "Python basics",
          "Mathematics for AI (Linear Algebra)",
          "Statistics & Probability",
        ],
        languages: ["Python", "R"],
        projects: ["Simple data analysis project", "Statistics visualizer"],
      },
      {
        year: 2,
        topics: [
          "Machine learning algorithms",
          "NumPy & Pandas",
          "Model evaluation",
          "Feature engineering",
        ],
        languages: ["Python", "SQL"],
        projects: ["House price prediction model", "Customer churn predictor"],
      },
      {
        year: 3,
        topics: [
          "Deep learning",
          "TensorFlow / PyTorch",
          "Neural networks",
          "Computer Vision basics",
        ],
        languages: ["Python", "R"],
        projects: ["Image recognition system", "AI chatbot"],
      },
      {
        year: 4,
        topics: [
          "Advanced AI (Transformers, LLMs)",
          "Model deployment",
          "MLOps",
          "Research papers",
        ],
        languages: ["Python", "Julia"],
        projects: ["AI recommendation system", "NLP text classifier"],
      },
    ],
    projects: [
      {
        level: "Beginner",
        items: [
          "Data visualizer",
          "Simple linear regression",
          "Spam classifier",
        ],
      },
      {
        level: "Intermediate",
        items: [
          "Movie recommendation engine",
          "Sentiment analysis tool",
          "Image classifier",
        ],
      },
      {
        level: "Advanced",
        items: [
          "AI chatbot",
          "Object detection system",
          "LLM fine-tuning project",
        ],
      },
    ],
    companyExpectations: [
      "Strong Python skills with ML libraries (TensorFlow, PyTorch, scikit-learn)",
      "Solid understanding of mathematics: Linear Algebra, Statistics, Calculus",
      "Experience building and evaluating ML models end-to-end",
      "Knowledge of deep learning architectures (CNNs, RNNs, Transformers)",
      "Familiarity with data preprocessing and feature engineering",
      "Understanding of MLOps and model deployment practices",
    ],
    requiredSkillsForGap: [
      "Python",
      "Linear Algebra",
      "Statistics",
      "scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Pandas",
      "Deep Learning",
      "NLP",
      "MLOps",
    ],
    resumeTemplate: {
      objective:
        "Passionate AI/ML enthusiast with strong Python and deep learning skills, seeking a role to build intelligent systems and deploy real-world machine learning solutions.",
      keySkills: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "scikit-learn",
        "Pandas",
        "NumPy",
        "Machine Learning",
        "Data Preprocessing",
      ],
      sampleExperience: [
        {
          role: "Machine Learning Intern",
          company: "DataVision Labs",
          duration: "Jun 2024 – Sep 2024",
          bullets: [
            "Built a customer churn prediction model with 89% accuracy using scikit-learn",
            "Preprocessed and cleaned datasets of 500K+ records using Pandas",
            "Deployed ML model as REST API using Flask and Docker",
          ],
        },
      ],
      sampleProjects: [
        {
          name: "AI Chatbot",
          description:
            "NLP-powered chatbot using transformer models for customer support",
          tech: ["Python", "HuggingFace", "FastAPI", "React"],
        },
        {
          name: "Image Classifier",
          description:
            "CNN-based classifier achieving 95% accuracy on CIFAR-10 dataset",
          tech: ["PyTorch", "OpenCV", "Python"],
        },
      ],
      certifications: [
        "Machine Learning Specialization – Andrew Ng (Coursera)",
        "Deep Learning Specialization (Coursera)",
        "TensorFlow Developer Certificate (Google)",
      ],
    },
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: "📊",
    color: "#10b981",
    description:
      "Analyze data and help companies make smarter decisions. Transform raw data into actionable insights using statistical analysis, data visualization, and business intelligence tools.",
    skills: [
      "SQL",
      "Excel",
      "Python",
      "Data Visualization",
      "Statistical Analysis",
      "Business Intelligence",
    ],
    languages: ["SQL", "Python", "R"],
    tools: [
      "Power BI",
      "Tableau",
      "Excel",
      "pandas",
      "Matplotlib",
      "Google Analytics",
    ],
    companies: [
      "Accenture",
      "Deloitte",
      "Amazon",
      "Flipkart",
      "Zomato",
      "TCS",
      "Infosys",
    ],
    courses: [
      { platform: "Coursera", title: "Google Data Analytics Certificate" },
      { platform: "Udemy", title: "The Complete SQL Bootcamp" },
      { platform: "edX", title: "Data Analysis with Python" },
      { platform: "Microsoft", title: "Power BI Data Analyst Associate" },
    ],
    roadmap: [
      {
        year: 1,
        topics: [
          "Excel fundamentals",
          "Statistics basics",
          "Data types and cleaning",
        ],
        languages: ["SQL", "Excel"],
        projects: ["Sales data analysis", "Student grade tracker"],
      },
      {
        year: 2,
        topics: [
          "SQL databases",
          "Python for data analysis",
          "Data wrangling with Pandas",
        ],
        languages: ["Python", "SQL"],
        projects: [
          "Student data analysis system",
          "E-commerce sales dashboard",
        ],
      },
      {
        year: 3,
        topics: [
          "Data visualization",
          "Power BI / Tableau",
          "Statistical modeling",
        ],
        languages: ["Python", "R"],
        projects: ["Business intelligence dashboard", "Market trend analysis"],
      },
      {
        year: 4,
        topics: [
          "Advanced analytics",
          "Business intelligence",
          "Storytelling with data",
        ],
        languages: ["Python", "R", "SQL"],
        projects: [
          "Company data insights project",
          "Predictive analytics report",
        ],
      },
    ],
    projects: [
      {
        level: "Beginner",
        items: [
          "Sales analysis in Excel",
          "CSV data cleaner",
          "Survey result visualizer",
        ],
      },
      {
        level: "Intermediate",
        items: [
          "Business dashboard",
          "Customer segmentation",
          "Financial data tracker",
        ],
      },
      {
        level: "Advanced",
        items: [
          "Real-time analytics pipeline",
          "Predictive sales model",
          "BI reporting system",
        ],
      },
    ],
    companyExpectations: [
      "Advanced SQL skills for complex queries and reporting",
      "Proficiency in Python (Pandas, Matplotlib, Seaborn) for data analysis",
      "Experience with BI tools: Power BI or Tableau for dashboards",
      "Strong statistical analysis and business acumen",
      "Ability to clean, transform, and interpret large datasets",
      "Data storytelling and presentation skills to stakeholders",
    ],
    requiredSkillsForGap: [
      "SQL",
      "Python",
      "Excel",
      "Power BI",
      "Tableau",
      "Statistics",
      "Pandas",
      "Data Cleaning",
      "Data Visualization",
      "Business Intelligence",
    ],
    resumeTemplate: {
      objective:
        "Detail-oriented Data Analyst with strong SQL and visualization skills, eager to transform complex datasets into clear business insights that drive strategic decisions.",
      keySkills: [
        "SQL",
        "Python",
        "Power BI",
        "Tableau",
        "Excel",
        "Pandas",
        "Data Visualization",
        "Statistics",
      ],
      sampleExperience: [
        {
          role: "Data Analyst Intern",
          company: "Deloitte India",
          duration: "Apr 2024 – Jul 2024",
          bullets: [
            "Analyzed sales data across 20+ regions to identify 15% revenue growth opportunities",
            "Built interactive Power BI dashboards used by C-suite executives",
            "Automated weekly reporting using Python scripts, saving 8 hours/week",
          ],
        },
      ],
      sampleProjects: [
        {
          name: "Sales Performance Dashboard",
          description:
            "Interactive BI dashboard tracking KPIs across product lines and regions",
          tech: ["Power BI", "SQL", "Excel"],
        },
        {
          name: "Customer Segmentation",
          description:
            "K-means clustering to identify high-value customer segments",
          tech: ["Python", "Pandas", "scikit-learn", "Matplotlib"],
        },
      ],
      certifications: [
        "Google Data Analytics Certificate (Coursera)",
        "Microsoft Power BI Data Analyst (PL-300)",
        "IBM Data Analyst Certificate (Coursera)",
      ],
    },
  },
  {
    id: "software-tester",
    title: "Software Tester (QA)",
    icon: "🔍",
    color: "#f59e0b",
    description:
      "Test software and find bugs before release to ensure quality products reach users. QA engineers design test cases, automate testing pipelines, and maintain software quality standards.",
    skills: [
      "Manual Testing",
      "Automation Testing",
      "Selenium",
      "Test Case Design",
      "Agile/Scrum",
    ],
    languages: ["Java", "Python", "JavaScript"],
    tools: ["Selenium", "JIRA", "Postman", "JUnit", "TestNG", "Cypress"],
    companies: [
      "Infosys",
      "Capgemini",
      "Cognizant",
      "Wipro",
      "TCS",
      "Accenture",
    ],
    courses: [
      { platform: "Udemy", title: "Selenium WebDriver with Java" },
      { platform: "Coursera", title: "Software Testing and Automation" },
      { platform: "edX", title: "QA Testing Fundamentals" },
      { platform: "ISTQB", title: "Foundation Level Certification" },
    ],
    roadmap: [
      {
        year: 1,
        topics: [
          "Programming basics",
          "Software Development Life Cycle (SDLC)",
          "Manual testing concepts",
        ],
        languages: ["Java", "Python"],
        projects: [
          "Test simple web pages manually",
          "Bug report documentation",
        ],
      },
      {
        year: 2,
        topics: [
          "Manual testing techniques",
          "Test case design",
          "JIRA bug tracking",
        ],
        languages: ["Java", "Python"],
        projects: ["Website testing project", "Test case repository"],
      },
      {
        year: 3,
        topics: [
          "Automation testing",
          "Selenium WebDriver",
          "CI/CD testing integration",
        ],
        languages: ["Java", "Python", "JavaScript"],
        projects: ["Automated login testing system", "Selenium test framework"],
      },
      {
        year: 4,
        topics: [
          "Performance testing",
          "Agile testing methodologies",
          "API testing with Postman",
        ],
        languages: ["Java", "Python"],
        projects: [
          "Complete web app testing framework",
          "Load testing project",
        ],
      },
    ],
    projects: [
      {
        level: "Beginner",
        items: [
          "Manual test cases for a website",
          "Bug report tracker",
          "Checklist automation",
        ],
      },
      {
        level: "Intermediate",
        items: [
          "Selenium login test suite",
          "API testing with Postman",
          "Regression test framework",
        ],
      },
      {
        level: "Advanced",
        items: [
          "Full test automation framework",
          "Performance testing suite",
          "CI/CD testing pipeline",
        ],
      },
    ],
    companyExpectations: [
      "Understanding of SDLC, STLC and agile methodologies",
      "Proficiency in manual testing: test case design, bug reporting",
      "Hands-on experience with automation tools (Selenium, Cypress, Postman)",
      "Knowledge of Java or Python for writing automated test scripts",
      "Familiarity with JIRA for defect tracking and project management",
      "Understanding of CI/CD pipeline integration for continuous testing",
    ],
    requiredSkillsForGap: [
      "Manual Testing",
      "Selenium",
      "Java",
      "JIRA",
      "Postman",
      "Test Case Design",
      "Agile/Scrum",
      "Python",
      "Cypress",
      "CI/CD",
    ],
    resumeTemplate: {
      objective:
        "Quality-focused Software Testing professional with expertise in manual and automated testing, committed to delivering bug-free software products through rigorous quality assurance processes.",
      keySkills: [
        "Manual Testing",
        "Selenium WebDriver",
        "Java",
        "JIRA",
        "Postman",
        "Test Case Design",
        "Agile/Scrum",
        "API Testing",
      ],
      sampleExperience: [
        {
          role: "QA Engineer Intern",
          company: "Wipro Technologies",
          duration: "May 2024 – Aug 2024",
          bullets: [
            "Designed and executed 300+ test cases for a banking web application",
            "Automated regression suite using Selenium WebDriver and Java, reducing testing time by 60%",
            "Identified and reported 45+ critical bugs using JIRA, preventing production incidents",
          ],
        },
      ],
      sampleProjects: [
        {
          name: "Automated Test Suite",
          description:
            "End-to-end automated testing framework for an e-commerce platform",
          tech: ["Selenium", "Java", "TestNG", "Maven"],
        },
        {
          name: "API Testing Framework",
          description:
            "Comprehensive API testing using Postman with CI/CD integration",
          tech: ["Postman", "Newman", "Jenkins", "GitHub Actions"],
        },
      ],
      certifications: [
        "ISTQB Foundation Level (CTFL)",
        "Selenium WebDriver with Java (Udemy)",
        "Agile Testing Certificate",
      ],
    },
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    icon: "🛡️",
    color: "#ef4444",
    description:
      "Protect systems and networks from cyber attacks. Cybersecurity analysts monitor threats, conduct ethical hacking, and build defensive systems to safeguard critical data and infrastructure.",
    skills: [
      "Network Security",
      "Ethical Hacking",
      "Cryptography",
      "Linux",
      "Security Tools",
    ],
    languages: ["Python", "Bash", "C", "PowerShell"],
    tools: [
      "Wireshark",
      "Metasploit",
      "Kali Linux",
      "Nmap",
      "Burp Suite",
      "Nessus",
    ],
    companies: [
      "Cisco",
      "IBM",
      "Palo Alto Networks",
      "CrowdStrike",
      "FireEye",
      "TCS",
      "Infosys",
    ],
    courses: [
      { platform: "Coursera", title: "Google Cybersecurity Certificate" },
      { platform: "Udemy", title: "Ethical Hacking from Scratch" },
      { platform: "CompTIA", title: "Security+ Certification" },
      { platform: "EC-Council", title: "Certified Ethical Hacker (CEH)" },
    ],
    roadmap: [
      {
        year: 1,
        topics: [
          "Networking basics (TCP/IP, DNS, HTTP)",
          "Linux fundamentals",
          "Basic cryptography",
        ],
        languages: ["Python", "Bash"],
        projects: ["Password strength checker", "Port scanner script"],
      },
      {
        year: 2,
        topics: [
          "Ethical hacking concepts",
          "Security vulnerabilities",
          "OWASP Top 10",
        ],
        languages: ["Python", "Bash"],
        projects: ["Network scanner tool", "Simple vulnerability detector"],
      },
      {
        year: 3,
        topics: [
          "Penetration testing",
          "Cryptography advanced",
          "Incident response",
        ],
        languages: ["Python", "Bash", "PowerShell"],
        projects: ["Vulnerability scanner", "Web security audit tool"],
      },
      {
        year: 4,
        topics: [
          "Advanced cybersecurity tools",
          "Threat intelligence",
          "Security certifications prep",
        ],
        languages: ["Python", "C", "Bash"],
        projects: [
          "Cyber attack detection system",
          "Security operations dashboard",
        ],
      },
    ],
    projects: [
      {
        level: "Beginner",
        items: [
          "Password strength checker",
          "Network port scanner",
          "Log analyzer",
        ],
      },
      {
        level: "Intermediate",
        items: [
          "Web vulnerability scanner",
          "Encryption/decryption tool",
          "Firewall rule generator",
        ],
      },
      {
        level: "Advanced",
        items: [
          "Penetration testing framework",
          "SIEM dashboard",
          "Intrusion detection system",
        ],
      },
    ],
    companyExpectations: [
      "Strong understanding of networking protocols (TCP/IP, DNS, HTTP/S)",
      "Linux and command-line proficiency for security operations",
      "Knowledge of ethical hacking and penetration testing techniques",
      "Familiarity with security tools: Wireshark, Nmap, Burp Suite, Metasploit",
      "Understanding of OWASP Top 10 web vulnerabilities",
      "Security certifications like CompTIA Security+ or CEH preferred",
    ],
    requiredSkillsForGap: [
      "Networking",
      "Linux",
      "Python",
      "Ethical Hacking",
      "Wireshark",
      "Cryptography",
      "OWASP",
      "Bash",
      "Penetration Testing",
      "Security Certifications",
    ],
    resumeTemplate: {
      objective:
        "Cybersecurity enthusiast with strong networking and ethical hacking skills, seeking to protect digital assets and build resilient security systems for enterprise environments.",
      keySkills: [
        "Network Security",
        "Ethical Hacking",
        "Linux",
        "Python",
        "Wireshark",
        "Penetration Testing",
        "OWASP",
        "Cryptography",
      ],
      sampleExperience: [
        {
          role: "Cybersecurity Intern",
          company: "InfoShield Technologies",
          duration: "Jun 2024 – Sep 2024",
          bullets: [
            "Performed vulnerability assessments on 3 web applications, identifying 12 critical CVEs",
            "Implemented firewall rules and IDS configurations reducing threat incidents by 30%",
            "Conducted security awareness training for 50+ employees on phishing prevention",
          ],
        },
      ],
      sampleProjects: [
        {
          name: "Network Vulnerability Scanner",
          description:
            "Custom tool to scan and report network vulnerabilities and open ports",
          tech: ["Python", "Nmap", "Shodan API", "Flask"],
        },
        {
          name: "CTF Challenge Solutions",
          description:
            "Documented solutions to 20+ Capture The Flag cybersecurity challenges",
          tech: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite"],
        },
      ],
      certifications: [
        "CompTIA Security+ (SY0-701)",
        "Certified Ethical Hacker (CEH) – EC-Council",
        "Google Cybersecurity Certificate (Coursera)",
      ],
    },
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    icon: "☁️",
    color: "#06b6d4",
    description:
      "Manage and build cloud infrastructure that powers modern applications. Cloud engineers deploy, maintain, and optimize systems on AWS, Azure, and Google Cloud platforms.",
    skills: [
      "Cloud Computing",
      "Linux",
      "Networking",
      "DevOps",
      "Infrastructure as Code",
    ],
    languages: ["Python", "Bash", "YAML", "Terraform"],
    tools: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Jenkins",
    ],
    companies: [
      "Amazon AWS",
      "Microsoft Azure",
      "Google Cloud",
      "Accenture",
      "Wipro",
      "Infosys",
      "IBM",
    ],
    courses: [
      { platform: "AWS", title: "AWS Cloud Practitioner" },
      { platform: "Microsoft", title: "Azure Fundamentals (AZ-900)" },
      { platform: "Google", title: "Google Cloud Associate Engineer" },
      { platform: "Udemy", title: "Docker and Kubernetes: The Complete Guide" },
    ],
    roadmap: [
      {
        year: 1,
        topics: [
          "Linux fundamentals",
          "Networking basics",
          "Cloud concepts overview",
        ],
        languages: ["Bash", "Python"],
        projects: [
          "Basic cloud storage setup on AWS S3",
          "Simple Linux server",
        ],
      },
      {
        year: 2,
        topics: [
          "AWS / Azure fundamentals",
          "Virtual machines",
          "Load balancing",
        ],
        languages: ["Python", "Bash", "YAML"],
        projects: ["Deploy simple website on cloud", "Auto-scaling setup"],
      },
      {
        year: 3,
        topics: [
          "DevOps tools",
          "Docker & Kubernetes",
          "CI/CD pipelines",
          "Infrastructure as Code",
        ],
        languages: ["Python", "Terraform", "YAML"],
        projects: ["CI/CD pipeline system", "Containerized microservice"],
      },
      {
        year: 4,
        topics: [
          "Cloud architecture patterns",
          "Multi-cloud strategy",
          "Cost optimization",
        ],
        languages: ["Python", "Terraform", "Go"],
        projects: ["Scalable cloud application", "Multi-region deployment"],
      },
    ],
    projects: [
      {
        level: "Beginner",
        items: [
          "Static website on S3",
          "Simple EC2 instance",
          "Cloud cost tracker",
        ],
      },
      {
        level: "Intermediate",
        items: [
          "Dockerized web app",
          "Auto-scaling group setup",
          "Serverless API",
        ],
      },
      {
        level: "Advanced",
        items: [
          "Kubernetes cluster",
          "CI/CD pipeline",
          "Multi-cloud architecture",
        ],
      },
    ],
    companyExpectations: [
      "Knowledge of major cloud platforms: AWS, GCP, or Azure",
      "Understanding of DevOps practices and CI/CD pipelines",
      "Deployment and scaling knowledge for cloud-native applications",
      "Infrastructure as Code with Terraform or Ansible",
      "Containerization with Docker and orchestration with Kubernetes",
      "Linux administration and networking fundamentals",
    ],
    requiredSkillsForGap: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Linux",
      "Terraform",
      "Python",
      "Networking",
      "CI/CD",
      "Git",
      "Monitoring",
    ],
    resumeTemplate: {
      objective:
        "Cloud-enthusiast engineer with hands-on AWS and DevOps experience, seeking to architect, deploy, and scale cloud infrastructure solutions that drive business efficiency.",
      keySkills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Linux",
        "Python",
        "CI/CD",
        "Networking",
      ],
      sampleExperience: [
        {
          role: "Cloud Infrastructure Intern",
          company: "Accenture India",
          duration: "May 2024 – Aug 2024",
          bullets: [
            "Migrated 3 legacy applications to AWS, reducing infrastructure costs by 35%",
            "Containerized microservices using Docker and orchestrated with Kubernetes EKS",
            "Built CI/CD pipelines using GitHub Actions and AWS CodePipeline for automated deployments",
          ],
        },
      ],
      sampleProjects: [
        {
          name: "Multi-tier AWS Architecture",
          description:
            "Designed and deployed a scalable 3-tier web app on AWS with auto-scaling",
          tech: ["AWS EC2", "RDS", "S3", "CloudFront", "Terraform"],
        },
        {
          name: "Kubernetes Cluster Setup",
          description:
            "Set up a production-grade K8s cluster with monitoring and logging",
          tech: ["Kubernetes", "Helm", "Prometheus", "Grafana", "Docker"],
        },
      ],
      certifications: [
        "AWS Certified Solutions Architect – Associate",
        "Google Cloud Associate Cloud Engineer",
        "Docker Certified Associate",
      ],
    },
  },
  {
    id: "uiux-designer",
    title: "UI / UX Designer",
    icon: "🎨",
    color: "#ec4899",
    description:
      "Design intuitive user interfaces and exceptional user experiences for digital products. UX designers research user needs, create wireframes, and craft pixel-perfect designs that users love.",
    skills: [
      "UI Design",
      "UX Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "User Testing",
    ],
    languages: ["HTML", "CSS", "JavaScript (basics)"],
    tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Zeplin", "Maze"],
    companies: [
      "Google",
      "Apple",
      "Meta",
      "Airbnb",
      "Swiggy",
      "Zomato",
      "Myntra",
      "Flipkart",
    ],
    courses: [
      { platform: "Coursera", title: "Google UX Design Certificate" },
      { platform: "Udemy", title: "Complete UI/UX Design Bootcamp (Figma)" },
      {
        platform: "Interaction Design Foundation",
        title: "Become a UX Designer",
      },
      { platform: "Skillshare", title: "Design Systems with Figma" },
    ],
    roadmap: [
      {
        year: 1,
        topics: [
          "Design basics & principles",
          "Color theory",
          "Typography fundamentals",
          "Design thinking",
        ],
        languages: ["HTML", "CSS"],
        projects: ["Redesign a website mockup", "Brand identity kit"],
      },
      {
        year: 2,
        topics: [
          "Figma mastery",
          "User research methods",
          "Wireframing & information architecture",
        ],
        languages: ["HTML", "CSS"],
        projects: ["Mobile app UI design", "User research case study"],
      },
      {
        year: 3,
        topics: [
          "High-fidelity prototyping",
          "Usability testing",
          "Design systems",
          "Accessibility",
        ],
        languages: ["HTML", "CSS", "JavaScript"],
        projects: [
          "Complete app design with user flows",
          "Design system component library",
        ],
      },
      {
        year: 4,
        topics: [
          "Advanced UX strategy",
          "Portfolio building",
          "Client communication",
        ],
        languages: ["Figma", "HTML", "CSS"],
        projects: [
          "Real client project or case study",
          "Personal design portfolio website",
        ],
      },
    ],
    projects: [
      {
        level: "Beginner",
        items: [
          "Website redesign mockup",
          "App icon set",
          "Color palette explorer",
        ],
      },
      {
        level: "Intermediate",
        items: [
          "Mobile app UI kit",
          "User journey map",
          "Interactive prototype",
        ],
      },
      {
        level: "Advanced",
        items: [
          "Full design system",
          "Usability research report",
          "Client portfolio piece",
        ],
      },
    ],
    companyExpectations: [
      "Strong portfolio showcasing UI/UX case studies with problem-solving approach",
      "Proficiency in Figma or Adobe XD for high-fidelity prototyping",
      "Understanding of user research methods and usability testing",
      "Knowledge of design systems, accessibility (WCAG), and responsive design",
      "Collaboration skills to work with developers using handoff tools like Zeplin",
      "Basic understanding of HTML/CSS to communicate with dev teams",
    ],
    requiredSkillsForGap: [
      "Figma",
      "UI Design",
      "UX Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "User Testing",
      "Accessibility",
      "HTML/CSS",
      "Design Thinking",
    ],
    resumeTemplate: {
      objective:
        "Creative UI/UX Designer with a strong portfolio of user-centered designs, passionate about crafting intuitive digital experiences that delight users and drive business outcomes.",
      keySkills: [
        "Figma",
        "UI Design",
        "UX Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
        "User Testing",
        "Adobe XD",
      ],
      sampleExperience: [
        {
          role: "UI/UX Design Intern",
          company: "DesignCraft Studios",
          duration: "Jun 2024 – Sep 2024",
          bullets: [
            "Redesigned mobile app onboarding flow, improving user retention by 25%",
            "Conducted usability testing with 15 participants and iterated based on findings",
            "Created and maintained a design system with 50+ reusable components in Figma",
          ],
        },
      ],
      sampleProjects: [
        {
          name: "HealthCare App Redesign",
          description:
            "End-to-end UX redesign of a patient portal app with improved accessibility",
          tech: ["Figma", "Maze", "FigJam", "Adobe Illustrator"],
        },
        {
          name: "E-Learning Platform UI",
          description:
            "Complete UI design for an online learning platform with design system",
          tech: ["Figma", "Protopie", "Adobe XD"],
        },
      ],
      certifications: [
        "Google UX Design Certificate (Coursera)",
        "Interaction Design Foundation – UX Design",
        "Figma for UI Design (Udemy)",
      ],
    },
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems Engineer",
    icon: "⚡",
    color: "#f97316",
    description:
      "Design hardware systems, microcontrollers, and IoT devices that power the physical world. Embedded systems engineers work at the intersection of hardware and software.",
    skills: [
      "Embedded C",
      "Microcontrollers",
      "IoT",
      "Circuit Design",
      "RTOS",
      "Electronics",
    ],
    languages: ["Embedded C", "C++", "Assembly", "Python"],
    tools: ["Arduino", "Raspberry Pi", "KEIL", "STM32", "Proteus", "MPLAB"],
    companies: [
      "Intel",
      "Bosch",
      "Qualcomm",
      "Texas Instruments",
      "NXP",
      "STMicroelectronics",
      "ISRO",
    ],
    courses: [
      { platform: "Coursera", title: "Embedded Systems Essentials with Arm" },
      {
        platform: "Udemy",
        title: "Mastering Microcontroller and Embedded Driver Development",
      },
      { platform: "edX", title: "Internet of Things (IoT) Specialization" },
      { platform: "MIT OpenCourseWare", title: "Embedded Systems Engineering" },
    ],
    roadmap: [
      {
        year: 1,
        topics: ["Electronics basics", "C programming", "Digital logic design"],
        languages: ["C", "Embedded C"],
        projects: ["LED blinking circuit", "Simple calculator with LEDs"],
      },
      {
        year: 2,
        topics: [
          "Microcontrollers (AVR / ARM)",
          "Arduino programming",
          "Sensor interfacing",
        ],
        languages: ["Embedded C", "C++"],
        projects: ["Temperature monitoring system", "LCD display project"],
      },
      {
        year: 3,
        topics: ["IoT development", "RTOS concepts", "Embedded Linux basics"],
        languages: ["Embedded C", "C++", "Python"],
        projects: ["Smart home automation", "IoT weather station"],
      },
      {
        year: 4,
        topics: [
          "Advanced embedded systems",
          "FPGA basics",
          "Device driver development",
        ],
        languages: ["Embedded C", "C++", "VHDL"],
        projects: ["IoT based smart device", "Autonomous robot"],
      },
    ],
    projects: [
      {
        level: "Beginner",
        items: [
          "LED blinking",
          "Temperature sensor reader",
          "Simple timer circuit",
        ],
      },
      {
        level: "Intermediate",
        items: [
          "Smart home automation",
          "Line-following robot",
          "Wireless data logger",
        ],
      },
      {
        level: "Advanced",
        items: [
          "IoT smart device",
          "RTOS-based system",
          "Autonomous vehicle prototype",
        ],
      },
    ],
    companyExpectations: [
      "Proficiency in Embedded C and C++ for microcontroller programming",
      "Knowledge of ARM/AVR microcontrollers and development boards (Arduino, STM32)",
      "Understanding of communication protocols: UART, SPI, I2C, CAN",
      "Experience with RTOS for real-time embedded applications",
      "Circuit design and PCB layout knowledge",
      "Familiarity with IoT protocols (MQTT, BLE, Wi-Fi) and cloud integration",
    ],
    requiredSkillsForGap: [
      "Embedded C",
      "C++",
      "Microcontrollers",
      "Arduino",
      "RTOS",
      "IoT Protocols",
      "Circuit Design",
      "Linux",
      "Assembly",
      "FPGA",
    ],
    resumeTemplate: {
      objective:
        "Embedded Systems Engineer with strong C/C++ and microcontroller programming skills, experienced in building firmware solutions for IoT and real-time applications.",
      keySkills: [
        "Embedded C",
        "C++",
        "Arduino",
        "Raspberry Pi",
        "RTOS",
        "IoT Protocols",
        "Circuit Design",
        "FPGA",
      ],
      sampleExperience: [
        {
          role: "Embedded Systems Intern",
          company: "Bosch India",
          duration: "May 2024 – Aug 2024",
          bullets: [
            "Developed firmware for STM32 microcontroller for an industrial sensor module",
            "Implemented MQTT protocol for IoT data transmission to AWS IoT Core",
            "Reduced power consumption by 20% through optimized sleep modes and interrupt handling",
          ],
        },
      ],
      sampleProjects: [
        {
          name: "Smart Home Automation System",
          description:
            "IoT-based home automation using ESP32 and MQTT with mobile control",
          tech: ["ESP32", "MQTT", "C++", "Node-RED", "React Native"],
        },
        {
          name: "RTOS-based Data Logger",
          description:
            "FreeRTOS application logging sensor data to SD card with LCD display",
          tech: ["STM32", "FreeRTOS", "C", "I2C", "SPI"],
        },
      ],
      certifications: [
        "Embedded Systems Programming (Coursera – University of Colorado)",
        "ARM Cortex-M Microcontroller Masterclass (Udemy)",
        "IoT Specialization (Coursera)",
      ],
    },
  },
  {
    id: "electrical-engineer",
    title: "Electrical Engineer",
    icon: "⚡",
    color: "#eab308",
    description:
      "Work with power systems, electrical equipment, and automation to keep the modern world running. Electrical engineers design and maintain electrical infrastructure, from power grids to industrial systems.",
    skills: [
      "Power Systems",
      "Electrical Machines",
      "Automation",
      "Circuit Analysis",
      "PLC Programming",
    ],
    languages: ["MATLAB", "Python", "PLC Ladder Logic"],
    tools: [
      "MATLAB",
      "Simulink",
      "AutoCAD Electrical",
      "PLC (Siemens/Allen-Bradley)",
      "ETAP",
    ],
    companies: [
      "Siemens",
      "ABB",
      "Schneider Electric",
      "BHEL",
      "L&T",
      "Tata Power",
      "NTPC",
    ],
    courses: [
      { platform: "Coursera", title: "Introduction to Power Electronics" },
      { platform: "Udemy", title: "PLC Programming from Scratch" },
      { platform: "edX", title: "Circuits and Electronics" },
      { platform: "NPTEL", title: "Electric Drives and Control" },
    ],
    roadmap: [
      {
        year: 1,
        topics: [
          "Electrical circuit theory",
          "Ohm's law, KVL, KCL",
          "Basic electronics",
        ],
        languages: ["MATLAB"],
        projects: ["Simple electrical circuit design", "DC circuit simulation"],
      },
      {
        year: 2,
        topics: [
          "Electrical machines (motors/generators)",
          "Power systems basics",
          "AC circuit analysis",
        ],
        languages: ["MATLAB", "Python"],
        projects: ["Motor control system", "Power factor correction circuit"],
      },
      {
        year: 3,
        topics: ["Industrial automation", "PLC programming", "SCADA systems"],
        languages: ["PLC Ladder Logic", "MATLAB"],
        projects: ["Automatic lighting system", "PLC-controlled conveyor"],
      },
      {
        year: 4,
        topics: [
          "Smart grid technology",
          "Renewable energy systems",
          "Power electronics",
        ],
        languages: ["MATLAB", "Python"],
        projects: [
          "Smart energy management system",
          "Solar power monitoring system",
        ],
      },
    ],
    projects: [
      {
        level: "Beginner",
        items: [
          "Circuit simulation in MATLAB",
          "DC motor speed controller",
          "Power supply design",
        ],
      },
      {
        level: "Intermediate",
        items: [
          "PLC traffic light system",
          "Motor control panel",
          "Energy monitoring system",
        ],
      },
      {
        level: "Advanced",
        items: [
          "Smart grid prototype",
          "Industrial automation system",
          "Renewable energy monitor",
        ],
      },
    ],
    companyExpectations: [
      "Strong foundation in electrical circuit theory and analysis",
      "Knowledge of electrical machines: motors, generators, transformers",
      "PLC programming skills (Siemens, Allen-Bradley) for industrial automation",
      "Proficiency in MATLAB/Simulink for simulation and modeling",
      "Understanding of power systems, protection schemes, and load flow",
      "Familiarity with AutoCAD Electrical for design documentation",
    ],
    requiredSkillsForGap: [
      "Circuit Analysis",
      "MATLAB",
      "Power Systems",
      "PLC Programming",
      "Electrical Machines",
      "AutoCAD",
      "SCADA",
      "Python",
      "Simulink",
      "Renewable Energy",
    ],
    resumeTemplate: {
      objective:
        "Electrical Engineering graduate with expertise in power systems, PLC programming, and circuit design, seeking to contribute to energy-efficient and sustainable electrical infrastructure projects.",
      keySkills: [
        "Circuit Analysis",
        "MATLAB",
        "PLC Programming",
        "Power Systems",
        "AutoCAD Electrical",
        "SCADA",
        "Simulink",
        "Electrical Machines",
      ],
      sampleExperience: [
        {
          role: "Electrical Engineering Intern",
          company: "ABB India",
          duration: "Jun 2024 – Sep 2024",
          bullets: [
            "Designed PLC ladder logic for automated conveyor belt control system",
            "Conducted load flow analysis using MATLAB for a 33kV substation upgrade",
            "Created AutoCAD Electrical drawings for a 500kW solar panel installation",
          ],
        },
      ],
      sampleProjects: [
        {
          name: "Smart Grid Monitoring System",
          description:
            "SCADA-based real-time monitoring of power distribution network",
          tech: ["MATLAB", "Simulink", "Python", "SCADA"],
        },
        {
          name: "Solar Energy Calculator",
          description:
            "Tool to calculate optimal solar panel placement and energy output",
          tech: ["Python", "MATLAB", "AutoCAD"],
        },
      ],
      certifications: [
        "Electrical Power Systems (NPTEL)",
        "MATLAB & Simulink for Electrical Engineers (Udemy)",
        "Power Electronics (Coursera – EPFL)",
      ],
    },
  },
];

export const getCareerById = (id: string): Career | undefined =>
  CAREERS.find((c) => c.id === id);
