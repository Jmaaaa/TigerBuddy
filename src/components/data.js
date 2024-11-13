
export const courseCodes = [
    "ABC1000",
    "ABC2345",
    "ABC3333",
    "ABC1111",
];

export const nameData = {
    "ABC1000" : "Course A",
    "ABC2345" : "Course B",
    "ABC3333" : "Course C",
    "ABC1111" : "Course D",
}

export const profData = {
    "ABC1000" : "Kasey Davies",
    "ABC2345" : "Zach Hendrix",
    "ABC3333" : "Aisha Brewer",
    "ABC1111" : "Athena Duke",
}
 export const assignmentData = {
        "ABC1000": [
            { assignment: "Homework 1", submitted: true, graded: true, percent: 95, weight: 10, dateDue: "2024-11-1", timeDue: "23:59" },
            { assignment: "Quiz 1", submitted: true, graded: true, percent: 86, weight: 20, dateDue: "2024-11-8", timeDue: "23:59" },
            { assignment: "Homework 2", submitted: false, graded: false, percent: 0, weight: 10, dateDue: "2024-11-15", timeDue: "23:59"},
            { assignment: "Quiz 2", submitted: false, graded: false, percent: 0, weight: 10, dateDue: "2024-11-22", timeDue: "23:59"}
        ],
        "ABC2345": [
            { assignment: "Essay Draft", submitted: true, graded: true, percent: 92, weight: 10, dateDue: "2024-11-1", timeDue: "23:59" },
            { assignment: "Project 1", submitted: true, graded: true, percent: 88, weight: 20, dateDue: "2024-11-7", timeDue: "23:59" },
            { assignment: "Essay 1", submitted: false, graded: false, percent: 0, weight: 20, dateDue: "2024-11-17", timeDue: "23:59"},
            { assignment: "Project 2", submitted: false, graded: false, percent: 0, weight: 20, dateDue: "2024-11-22", timeDue: "23:59"}
        ],
        "ABC3333": [
            { assignment: "Lab Report 1", submitted: true, graded: true, percent: 96, weight: 10, dateDue: "2024-11-5", timeDue: "23:59"  },
            { assignment: "Project 1", submitted: true, graded: true, percent: 81, weight: 25, dateDue: "2024-11-13", timeDue: "23:59"  },
            { assignment: "Lab Report 2", submitted: false, graded: false, percent: 0, weight: 10, dateDue: "2024-11-20", timeDue: "23:59"},
            { assignment: "Project 2", submitted: false, graded: false, percent: 0, weight: 25, dateDue: "2024-11-30", timeDue: "23:59"}
        ],
        "ABC1111": [
            { assignment: "Program 0", submitted: true, graded: true, percent: 87, weight: 5, dateDue: "2024-11-6", timeDue: "23:59"  },
            { assignment: "Project 1", submitted: true, graded: true, percent: 88, weight: 15, dateDue: "2024-11-10", timeDue: "23:59" },
            { assignment: "Program 1", submitted: false, graded: false, percent: 0, weight: 10, dateDue: "2024-11-15", timeDue: "23:59"},
            { assignment: "Program 2", submitted: false, graded: false, percent: 0, weight: 10, dateDue: "2024-11-27", timeDue: "23:59"}
        ],
};


const totalWeight = (code) => assignmentData[code].reduce((acc,item) => acc + (item.graded ? item.weight : 0), 0);

export const getCurrentWeight = ((weight, code)=>{
    return (weight/totalWeight(code)*100).toFixed(1);
})
export const getGrade = ((grade) => {
    if(grade>=97) return `${grade.toFixed(1)} (A+)`;
    if(grade>=93) return `${grade.toFixed(1)} (A)`;
    if(grade>=90) return `${grade.toFixed(1)} (A-)`;
    if(grade>=87) return `${grade.toFixed(1)} (B+)`;
    if(grade>=83) return `${grade.toFixed(1)} (B)`;
    if(grade>=80) return `${grade.toFixed(1)} (B-)`;
    if(grade>=77) return `${grade.toFixed(1)} (C+)`;
    if(grade>=73) return `${grade.toFixed(1)} (C)`;
    if(grade>=70) return `${grade.toFixed(1)} (C-)`;
    if(grade>=67) return `${grade.toFixed(1)} (D+)`;
    if(grade>=63) return `${grade.toFixed(1)} (D)`;
    if(grade>=60) return `${grade.toFixed(1)} (D-)`;
    return `${grade.toFixed(1)} (F)`;
});

export const getAverageGrade = ((code) => {
    return getGrade(
        assignmentData[code].reduce((acc,item) => acc + item.percent * (item.weight/totalWeight(code)), 0));
});

export const getQualityPoints = ((code) => {
    const grade = assignmentData[code].reduce((acc,item) => acc + item.percent * (item.weight/totalWeight(code)), 0);
    if(grade>=97) return 4.3;
    if(grade>=93) return 4;
    if(grade>=90) return 3.7;
    if(grade>=87) return 3.3;
    if(grade>=83) return 3;
    if(grade>=80) return 2.7;
    if(grade>=77) return 2.3;
    if(grade>=73) return 2;
    if(grade>=70) return 1.7;
    if(grade>=67) return 1.3;
    if(grade>=63) return 1;
    if(grade>=60) return 0.7;
    return 0;
});
//generated sample course overviews 
export const overviewData = {
    "ABC1000" : [
        { description: " Gain a foundational understanding of data science concepts, including data wrangling, exploratory data analysis, visualization, and machine learning basics."},
        { keyTopics : "Python for data analysis, data visualization with Matplotlib & Seaborn, basic statistics, machine learning introduction."},
        { outcomes : " By the end of this course, students will be able to perform data analysis, create visualizations, and build simple machine learning models."},
        { instructor: " Dr. Kasey Davies"},
        { officeHours: "Mondays & Wednesdays 2 PM - 4 PM (virtual appointments available)."}
    ],
    "ABC2345" : [
        { description: "Unleash your creativity and improve your writing craft through a series of guided exercises, peer feedback, and workshops focusing on various literary forms."},
        { keyTopics : " Short stories, poetry, character development, narrative voice, editing and revision."},
        { outcomes : " Students will complete and present a polished portfolio of original written works by the end of the course."},
        { instructor: "Prof. Zach Hendrix"},
        { officeHours: "Thursdays 11 AM - 1 PM, or by appointment."}
    ],
    "ABC3333" : [
        { description: "Explore marketing theories and practices used in business settings, focusing on strategy development, consumer behavior, digital marketing, and brand management."},
        { keyTopics : "Market research, segmentation, marketing mix (4Ps), branding strategies, digital campaigns."},
        { outcomes : "Students will develop comprehensive marketing plans and present marketing strategies for case studies."},
        { instructor: "Dr. Aisha Brewer"},
        { officeHours: "Tuesdays 10 AM - 12 PM."}
    ],
    "ABC1111" : [
        { description: " A beginner’s journey into web development, focusing on building static and interactive websites using HTML, CSS, and JavaScript."},
        { keyTopics : "HTML & CSS basics, responsive design, JavaScript fundamentals, form handling."},
        { outcomes : "By course completion, students will create and publish their own website and understand core web technologies."},
        { instructor: "Prof. Athena Duke"},
        { officeHours: "Fridays 3 PM - 5 PM (in-person and virtual)."}
    ]
}
//generated announcements to list in course announcements page
export const courseAnnouncementsData = {
    "ABC1000": [
        {
            title: "Assignment 3 Released",
            announcement: "The third assignment has been released and is due on November 20th. Please make sure to review the instructions carefully and reach out with any questions.",
            date: "2024-11-10",
        },
        {
            title: "Guest Lecture This Week",
            announcement: "We are excited to host a guest lecture by Dr. Alice Johnson on the topic of 'Data Ethics in Machine Learning'. Join us on November 15th at 2 PM.",
            date: "2024-11-08",
        },
    ],
    "ABC2345": [
        {
            title: "Creative Writing Contest",
            announcement: "Enter your best short story or poem in our class-wide creative writing contest! Submissions are due by December 1st.",
            date: "2024-11-05",
        },
        {
            title: "Peer Review Reminder",
            announcement: "Don't forget to complete your peer reviews by this Friday. This is a critical part of your participation grade.",
            date: "2024-11-07",
        },
    ],
    "ABC3333": [
        {
            title: "Marketing Project Updates",
            announcement: "Project 1 has been extended by one week due to popular demand. The new submission date is November 25th.",
            date: "2024-11-09",
        },
        {
            title: "Midterm Exam Results",
            announcement: "Midterm exam results are now available on the course portal. Please review your scores and reach out during office hours for any concerns.",
            date: "2024-11-06",
        },
    ],
    "ABC1111": [
        {
            title: "New Coding Challenge Posted",
            announcement: "A new optional coding challenge has been posted. This is a great opportunity to sharpen your JavaScript skills. Due by November 30th.",
            date: "2024-11-04",
        },
        {
            title: "Class Schedule Change",
            announcement: "Next week's class will be moved to Friday due to a public holiday on Wednesday. Please check the schedule for updated times.",
            date: "2024-11-01",
        },
    ],
};

//generated data for course module page
export const courseModules = {
    "ABC1000": [
        {
            moduleId: 1,
            title: "Introduction to Data Science",
            description: "Overview of data science concepts, tools, and ethical considerations.",
            content: [
                { type: "video", title: "Data Science Overview" },
                { type: "reading", title: "Chapter 1: What is Data Science?" },
                { type: "discussion", title: "Ethical Considerations in Data Science" }
            ],
            completed: false
        },
        {
            moduleId: 2,
            title: "Data Wrangling and Cleaning",
            description: "Techniques for cleaning and transforming data for analysis.",
            content: [
                { type: "video", title: "Data Cleaning Techniques" },
                { type: "reading", title: "Best Practices for Data Preparation" },
                { type: "interactive", title: "Data Cleaning Simulation" }
            ],
            completed: false
        }
    ],
    "ABC2345": [
        {
            moduleId: 1,
            title: "Foundations of Creative Writing",
            description: "Introduction to creative writing and basic literary forms.",
            content: [
                { type: "reading", title: "Elements of Fiction" },
                { type: "video", title: "Creative Writing Basics" }
            ],
            completed: true
        },
        {
            moduleId: 2,
            title: "Character Development",
            description: "Building compelling characters and creating character arcs.",
            content: [
                { type: "video", title: "Creating Characters Readers Love" },
                { type: "exercise", title: "Character Sketch Practice" },
                { type: "discussion", title: "Memorable Characters in Literature" }
            ],
            completed: false
        }
    ],
    "ABC3333": [
        {
            moduleId: 1,
            title: "Marketing Fundamentals",
            description: "Explore marketing principles and the marketing mix (4Ps).",
            content: [
                { type: "reading", title: "Marketing 101" },
                { type: "video", title: "Introduction to the 4Ps" }
            ],
            completed: true
        },
        {
            moduleId: 2,
            title: "Consumer Behavior",
            description: "Understanding consumer needs, motivations, and behavior.",
            content: [
                { type: "video", title: "Understanding Consumer Psychology" },
                { type: "caseStudy", title: "Successful Branding Examples" }
            ],
            completed: false
        }
    ],
    "ABC1111": [
        {
            moduleId: 1,
            title: "Introduction to Web Development",
            description: "Basics of HTML, CSS, and JavaScript for building web pages.",
            content: [
                { type: "video", title: "HTML and CSS Basics" },
                { type: "reading", title: "Building Your First Web Page" },
                { type: "interactive", title: "HTML/CSS Practice" }
            ],
            completed: true
        },
        {
            moduleId: 2,
            title: "Responsive Design and Layouts",
            description: "Techniques for creating responsive and mobile-friendly web pages.",
            content: [
                { type: "video", title: "Responsive Design Principles" },
                { type: "reading", title: "Media Queries and Flexbox" },
                { type: "discussion", title: "Challenges in Responsive Design" }
            ],
            completed: false
        }
    ]
};

