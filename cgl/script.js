class SyllabusTracker {
    constructor() {
        this.syllabusData = {
            tier1: {
                "Quantitative Aptitude": [
                    "Averages",
                    "Basic algebraic identities",
                    "Bar diagram & Pie chart",
                    "Computation of whole numbers",
                    "Circle and its chords",
                    "Complementary angles",
                    "Decimals",
                    "Degree and Radian Measures",
                    "Discount",
                    "Fractions",
                    "Frequency polygon",
                    "Graphs of Linear Equations",
                    "Heights and Distances",
                    "Hemispheres",
                    "Interest",
                    "Mixture and Alligation",
                    "Partnership Business",
                    "Percentage",
                    "Quadrilaterals",
                    "Ratio & Proportion",
                    "Regular Polygons",
                    "Regular Right Pyramid",
                    "Right Circular Cone",
                    "Right Circular Cylinder",
                    "Right Prism",
                    "School Algebra",
                    "Similarity of triangles",
                    "Sphere",
                    "Square roots",
                    "Standard Identities",
                    "Time & Work",
                    "Time and distance",
                    "Trigonometric ratio",
                    "Triangle",
                    "Triangle centres",
                    "Profit and Loss"
                ],
                "General Intelligence": [
                    "Analysis",
                    "Arithmetic number series",
                    "Arithmetical reasoning",
                    "Blood Relations",
                    "Coding and decoding",
                    "Decision making",
                    "Discrimination",
                    "Figural classification",
                    "Judgment",
                    "Non-verbal series",
                    "Observation",
                    "Problem-solving",
                    "Relationship concepts",
                    "Similarities and differences",
                    "Syllogistic reasoning",
                    "Space visualization",
                    "Spatial orientation",
                    "Statement conclusion",
                    "Visual memory"
                ],
                "English": [
                    "Active Passive",
                    "Cloze test",
                    "Error Spotting",
                    "Fill in the Blanks",
                    "Idioms and Phrases",
                    "One word Substitution",
                    "Reading Comprehension",
                    "Sentence Correction",
                    "Sentence Improvement",
                    "Sentence Rearrangement",
                    "Spellings Correction",
                    "Synonyms-Antonyms"
                ],
                "General Awareness": [
                    "Books and Authors",
                    "Current Affairs",
                    "Important Days",
                    "Important Schemes",
                    "India and Neighboring Countries",
                    "People in News",
                    "Portfolio",
                    "Science",
                    "Sports",
                    "Static GK"
                ]
            },
            tier2: {
                "Mathematical Abilities": [
                    "Computation of whole numbers",
                    "Decimals and Fractions",
                    "Number Relationships",
                    "Percentage",
                    "Ratio & Proportion",
                    "Square roots",
                    "Averages",
                    "Interest",
                    "Profit and Loss",
                    "Discount",
                    "Partnership Business",
                    "Mixture and Alligation",
                    "Time and distance",
                    "Time & Work",
                    "Basic algebraic identities",
                    "Linear Equations",
                    "Triangle Properties",
                    "Circle Properties",
                    "Polygons",
                    "3D Shapes",
                    "Trigonometry",
                    "Data Interpretation"
                ],
                "Reasoning and Intelligence": [
                    "Semantic Analogy",
                    "Symbolic operations",
                    "Symbolic/Number Analogy",
                    "Trends",
                    "Figural Analogy",
                    "Space Orientation",
                    "Semantic Classification",
                    "Venn Diagrams",
                    "Number Classification",
                    "Drawing inferences",
                    "Pattern Analysis",
                    "Critical Thinking",
                    "Problem-Solving",
                    "Emotional Intelligence",
                    "Word Building",
                    "Social Intelligence",
                    "Coding and de-coding"
                ],
                "English Language": [
                    "Spot the error",
                    "Fill in the blanks",
                    "Synonyms/Antonyms",
                    "Spelling detection",
                    "Idioms & phrases",
                    "One-word substitution",
                    "Sentence Improvement",
                    "Voice Change",
                    "Narration Change",
                    "Sentence Rearrangement",
                    "Cloze passage",
                    "Comprehension"
                ],
                "Statistics": [
                    "Data Collection and Classification",
                    "Data Presentation",
                    "Frequency Distributions",
                    "Central Tendency",
                    "Partition Values",
                    "Measures of Dispersion",
                    "Moments, Skewness, Kurtosis",
                    "Correlation and Regression",
                    "Probability Theory",
                    "Random Variables",
                    "Probability Distributions",
                    "Sampling Theory",
                    "Statistical Inference",
                    "Analysis of Variance",
                    "Time Series Analysis",
                    "Index Numbers"
                ],
                "Computer Proficiency": [
                    "Computer Basics",
                    "CPU and Components",
                    "Input/Output devices",
                    "Memory Organization",
                    "Windows Explorer",
                    "Keyboard shortcuts",
                    "Microsoft Office",
                    "Internet Basics",
                    "Email Management",
                    "E-banking",
                    "Networking Basics",
                    "Cyber Security",
                    "Network Protocols",
                    "Security Threats",
                    "Preventive Measures"
                ]
            }
        };
        
        this.progress = {};
        this.initializeApp();
    }

    initializeApp() {
        this.loadProgress();
        this.renderSyllabus();
        this.setupEventListeners();
    }

    loadProgress() {
        const savedProgress = localStorage.getItem('syllabusProgress');
        if (savedProgress) {
            this.progress = JSON.parse(savedProgress);
        }
    }

    saveProgress() {
        localStorage.setItem('syllabusProgress', JSON.stringify(this.progress));
        this.updateProgressBar();
    }

    renderSyllabus() {
        ['tier1', 'tier2'].forEach(tier => {
            const container = document.querySelector(`#${tier} .subject-tabs`);
            Object.keys(this.syllabusData[tier]).forEach(subject => {
                this.renderSubject(container, subject, this.syllabusData[tier][subject], tier);
            });
        });
    }

    renderSubject(container, subject, topics, tier) {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject-section';
        subjectDiv.innerHTML = `
            <h3>${subject}</h3>
            <div class="progress mb-3">
                <div class="progress-bar" role="progressbar" style="width: 0%" 
                    id="progress-${tier}-${subject.replace(/\s+/g, '-')}"></div>
            </div>
            <div class="topic-list">
                ${topics.map(topic => this.createTopicElement(topic, tier, subject)).join('')}
            </div>
        `;
        container.appendChild(subjectDiv);
        this.updateSubjectProgress(tier, subject);
    }

    createTopicElement(topic, tier, subject) {
        const topicId = `${tier}-${subject}-${topic}`.replace(/\s+/g, '-');
        const isChecked = this.progress[topicId] ? 'checked' : '';
        
        return `
            <div class="topic-item">
                <input type="checkbox" id="${topicId}" ${isChecked} 
                    class="topic-checkbox" 
                    data-tier="${tier}" 
                    data-subject="${subject}" 
                    data-topic="${topic}">
                <label for="${topicId}">${topic}</label>
            </div>
        `;
    }

    setupEventListeners() {
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('topic-checkbox')) {
                const { tier, subject, topic } = e.target.dataset;
                const topicId = `${tier}-${subject}-${topic}`.replace(/\s+/g, '-');
                this.progress[topicId] = e.target.checked;
                this.saveProgress();
                this.updateSubjectProgress(tier, subject);
            }
        });
    }

    updateSubjectProgress(tier, subject) {
        const topics = this.syllabusData[tier][subject];
        const totalTopics = topics.length;
        const completedTopics = topics.filter(topic => {
            const topicId = `${tier}-${subject}-${topic}`.replace(/\s+/g, '-');
            return this.progress[topicId];
        }).length;
        
        const progressPercentage = (completedTopics / totalTopics) * 100;
        const progressBar = document.querySelector(`#progress-${tier}-${subject.replace(/\s+/g, '-')}`);
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
            progressBar.textContent = `${Math.round(progressPercentage)}%`;
        }
    }

    updateProgressBar() {
        const totalTopics = Object.values(this.syllabusData.tier1)
            .concat(Object.values(this.syllabusData.tier2))
            .flat()
            .length;
        
        const completedTopics = Object.values(this.progress)
            .filter(Boolean)
            .length;
        
        const progressPercentage = (completedTopics / totalTopics) * 100;
        const mainProgress = document.getElementById('totalProgress');
        if (mainProgress) {
            mainProgress.style.width = `${progressPercentage}%`;
            mainProgress.textContent = `${Math.round(progressPercentage)}%`;
        }
    }

    exportProgress() {
        const progressData = {
            progress: this.progress,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(progressData);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'ssc-cgl-progress.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    importProgress(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                this.progress = importedData.progress;
                this.saveProgress();
                this.renderSyllabus(); // Re-render to update checkboxes
                alert('Progress imported successfully!');
            } catch (error) {
                alert('Error importing progress. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.progress = {};
            this.saveProgress();
            this.renderSyllabus();
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const tracker = new SyllabusTracker();
}); 