import organizationRoutes from "./organization_routes";
import groupRoutes from "./group_routes";

function routes() {
    if (localStorage.getItem('user_type')== "member") {
        return groupRoutes;
    } else if (localStorage.getItem('user_type')== "manager") {
        return organizationRoutes;

    }

}

export default routes();