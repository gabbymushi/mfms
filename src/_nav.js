import organizationLinks from "./organization_nav";
import groupLinks from "./group_nav";

function items() {
    if (localStorage.getItem('user_type')== "member") {
       return groupLinks;
    } else if (localStorage.getItem('user_type')== "manager") {
        return organizationLinks;
    }
}

export default items();