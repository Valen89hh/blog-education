export const ROUTES_NOT_LAYOUT = [
    "/register",
    "/login",
    "/admin",
    "/create-post",
    "/edit-post",
]

export const ROUTES_NAVBAR_MODE_DARK = [
    { path: "/dashboard", exact: false }, // Abarca todas las subrutas
    { path: "/posts", exact: true },      // Solo coincide exactamente con "/posts"
    { path: "/posts/category", exact: false },
];