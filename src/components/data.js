export const deadlinesData = {
    "ABC1000": [
        { id: 1, dateDue: "2024-11-15", timeDue: "23:59", course: "Course A", assignment: "Homework 3", submitted: false },
    ],
    "ABC2345": [
        { id: 2, dateDue: "2024-11-18", timeDue: "10:00", course: "Course B", assignment: "Essay Draft", submitted: true },
    ],
    "ABC3333": [
        { id: 3, dateDue: "2024-11-20", timeDue: "17:00", course: "Course C", assignment: "Lab Report", submitted: false },
    ],
    "ABC1111": [
        { id: 4, dateDue: "N/A", timeDue: "N/A", course: "Course D", assignment: "There are no deadlines for this class!", submitted: true},
    ],
};

export const courseData = {
    "ABC1000": [
        { assignment: "Homework 1", grade: "A" },
        { assignment: "Quiz 1", grade: "B" },
    ],
    "ABC2345": [
        { assignment: "Essay Draft", grade: "A-" },
        { assignment: "Project 1", grade: "B+" },
    ],
    "ABC3333": [
        { assignment: "Lab", grade: "A" },
        { assignment: "Project 1", grade: "B-" },
    ],
    "ABC1111": [
        { assignment: "Program 0", grade: "B+" },
        { assignment: "Project 1", grade: "B+" },
    ],
}
//generated sample course overviews 
export const overviewData = {
    "ABC1000" : [
        { description: " Gain a foundational understanding of data science concepts, including data wrangling, exploratory data analysis, visualization, and machine learning basics."},
        { keyTopics : "Python for data analysis, data visualization with Matplotlib & Seaborn, basic statistics, machine learning introduction."},
        { outcomes : " By the end of this course, students will be able to perform data analysis, create visualizations, and build simple machine learning models."},
        { instructor: " Dr. Terrion Arnold."},
        { officeHours: "Mondays & Wednesdays 2 PM - 4 PM (virtual appointments available)."}
    ],
    "ABC2345" : [
        { description: "Unleash your creativity and improve your writing craft through a series of guided exercises, peer feedback, and workshops focusing on various literary forms."},
        { keyTopics : " Short stories, poetry, character development, narrative voice, editing and revision."},
        { outcomes : " Students will complete and present a polished portfolio of original written works by the end of the course."},
        { instructor: "Prof. Henry To'oTo'o."},
        { officeHours: "Thursdays 11 AM - 1 PM, or by appointment."}
    ],
    "ABC3333" : [
        { description: "Explore marketing theories and practices used in business settings, focusing on strategy development, consumer behavior, digital marketing, and brand management."},
        { keyTopics : "Market research, segmentation, marketing mix (4Ps), branding strategies, digital campaigns."},
        { outcomes : "Students will develop comprehensive marketing plans and present marketing strategies for case studies."},
        { instructor: "Dr. Garrett Nuss"},
        { officeHours: "Tuesdays 10 AM - 12 PM."}
    ],
    "ABC1111" : [
        { description: " A beginner’s journey into web development, focusing on building static and interactive websites using HTML, CSS, and JavaScript."},
        { keyTopics : "HTML & CSS basics, responsive design, JavaScript fundamentals, form handling."},
        { outcomes : "By course completion, students will create and publish their own website and understand core web technologies."},
        { instructor: "Prof. Jayden Daniels"},
        { officeHours: "Fridays 3 PM - 5 PM (in-person and virtual)."}
    ]
}
