import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/home";

const routes = [
    {
        path: "/",
        name: "Startseite",
        component: Home,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;