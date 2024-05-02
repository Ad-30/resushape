/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/"
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/verify"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix that are used for Api authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect for when a user logs in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIECT = "/dashboard";