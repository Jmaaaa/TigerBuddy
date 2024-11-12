import React, { useEffect, useState } from "react";
import { courseAnnouncementsData, nameData, profData } from "../data";
import announcement from "../../assets/announcement.png";

const AnnouncementCard = () => {
    const [gotAnnouncements, setGotAnnouncements] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    
    useEffect(() => {
        if (gotAnnouncements)
            return;
        setGotAnnouncements(true);

        let allAnnouncements = [];
        for (const [course, data] of Object.entries(courseAnnouncementsData)) {
            for (const announcement of data) {
                allAnnouncements.push({
                    date: new Date(announcement.date),
                    title: announcement.title,
                    course: course,
                    text: announcement.announcement
                });
            }
        }

        allAnnouncements = allAnnouncements.slice(0, 3);

        // Don't recursive update.
        setAnnouncements(allAnnouncements);
    });
    
    return (
        <div className="d-flex flex-column me-2">
            {announcements.map((data, idx) => {
                return (
                    <a href={`/courses/${data.course}/announcements`} className="text-decoration-none text-dark" key={idx}>
                        <div className="d-flex flex-row w-100 p-3 mb-2 bg-light bg-gradient rounded">
                            <div><img src={announcement} width="32" className="rounded"/></div>
                            <div className="d-flex flex-column ms-3">
                                <h5 className="mb-1">{data.title}</h5>
                                <h6 className="mb-1">2024 {nameData[data.course]} for {profData[data.course]}</h6>
                                <p className="small mb-0">{data.text}</p>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
};

export default AnnouncementCard;