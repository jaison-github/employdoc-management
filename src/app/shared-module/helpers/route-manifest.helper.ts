import { Dictionary } from "../models/dictionary";

export const getRouteManifest: (route: string, customBreadcrumbValue: string) => Dictionary = (route, customBreadcrumbValue) => {
    let dict = new Dictionary();

    dict.set("/admin/courselisting", { currentRoute: "/admin/courselisting", breadcrumbArray: ["Dashboard", "Courses"] });
    dict.set("/admin/coursedetailview", { currentRoute: "/admin/coursedetailview", breadcrumbArray: ["Dashboard", "Courses", customBreadcrumbValue] });
    dict.set("/admin/masterdata", { currentRoute: "/admin/masterdata", breadcrumbArray: ["Dashboard", "Master Data"] });
    dict.set("/agent/courselisting", { currentRoute: "/agent/courselisting", breadcrumbArray: ["Courses"] });
    dict.set("/individual/courselisting", { currentRoute: "/individual/courselisting", breadcrumbArray: ["Courses"] });
    dict.set("/agent/coursedetailview", { currentRoute: "/agent/coursedetailview", breadcrumbArray: ["Courses", customBreadcrumbValue] });
    dict.set("/individual/coursedetailview", { currentRoute: "/individual/coursedetailview", breadcrumbArray: ["Courses", customBreadcrumbValue] });
    dict.set("/admin/newcourse", { currentRoute: "/admin/newcourse", breadcrumbArray: ["Dashboard", "Courses", " Create New Course"] });
    dict.set("/admin/editcourse", { currentRoute: "/admin/editcourse", breadcrumbArray: ["Dashboard", "Courses", " Edit Course"] });
    dict.set("/admin/coursecreated", { currentRoute: "/admin/coursecreated", breadcrumbArray: ["Dashboard", "Courses", " Create New Course"] });
    dict.set("/individual/candidateprofile", { currentRoute: "/individual/candidateprofile", breadcrumbArray: ["Edit Profile"] });
    dict.set("/admin/courseoldslots", { currentRoute: "/admin/courseoldslots", breadcrumbArray: ["Dashboard", "Courses", customBreadcrumbValue, "Old Course Slots"] });
    dict.set("/agent/candidatelisting", { currentRoute: "/agent/candidatelisting", breadcrumbArray: ["Dashboard", "Candidates"] });
    dict.set("/agent/addnewcandidate", { currentRoute: "/agent/addnewcandidate", breadcrumbArray: ["Dashboard", "Candidates", "Add New Candidate"] });
    dict.set("/agent/agentprofile", { currentRoute: "/agent/agentprofile", breadcrumbArray: ["Courses", "Edit Profile"] });
    dict.set("/admin/candidatelisting", { currentRoute: "/admin/candidatelisting", breadcrumbArray: ["Dashboard", "Candidates"] });
    dict.set("/agent/editcandidate", { currentRoute: "/agent/editcandidate", breadcrumbArray: ["Dashboard", "Candidates", customBreadcrumbValue] });
    dict.set("/agent/candidate", { currentRoute: "/agent/candidate", breadcrumbArray: ["Dashboard", "Candidates", "Candidate Details"] });
    dict.set("/admin/candidate", { currentRoute: "/admin/candidate", breadcrumbArray: ["Dashboard", "Candidates", "Candidate Details"] });
    dict.set("/admin/companylisting", { currentRoute: "/admin/companylisting", breadcrumbArray: ["Dashboard", "Companies"] });
    dict.set("/individual/bookinglisting", { currentRoute: "/individual/bookinglisting", breadcrumbArray: ["Courses", "Booking"] });
    dict.set("/admin/agentbookingdetails", { currentRoute: "/admin/agentbookingdetails", breadcrumbArray: ["Dashboard", "Booking", customBreadcrumbValue] });
    dict.set("/admin/candbookingdetails", { currentRoute: "/admin/candbookingdetails", breadcrumbArray: ["Dashboard", "Booking", customBreadcrumbValue] });
    dict.set("/individual/bookingdetails", { currentRoute: "/individual/bookingdetails", breadcrumbArray: ["Booking", customBreadcrumbValue] });
    dict.set("/individual/bookingcreate", { currentRoute: "/individual/bookingcreate", breadcrumbArray: ["Courses", "Booking", "Request"] });
    dict.set("/admin/bookinglisting", { currentRoute: "/admin/bookinglisting", breadcrumbArray: ["Dashboard", "Booking"] });
    dict.set("/agent/bookingdetails", { currentRoute: "/agent/bookingdetails", breadcrumbArray: ["Dashboard", "Booking", customBreadcrumbValue] });
    dict.set("/agent/createbooking", { currentRoute: "/agent/createbooking", breadcrumbArray: ["Dashboard", "Booking", "Request"] });
    dict.set("/agent/bookinglisting", { currentRoute: "/agent/bookinglisting", breadcrumbArray: ["Dashboard", "Booking"] });
    dict.set("/admin/agentdetails", { currentRoute: "/admin/agentdetails", breadcrumbArray: ["Dashboard", 'Companies', customBreadcrumbValue] });
    dict.set("/admin/dashboard", { currentRoute: "/admin/dashboard", breadcrumbArray: ["Dashboard"] });



    return dict.get(route);
};

