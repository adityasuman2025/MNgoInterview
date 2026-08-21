export const APP_NAME = "MNgo Interview Prep";

export const BROWSER_TAB_TITLE = {
    HOME: `${APP_NAME} — Practice Software Engineering Interview Questions`,
    TOPICS: `Topics | ${APP_NAME}`,
    TOPIC_QUESTIONS: (topicName: string) => `${topicName || "Topic"} | ${APP_NAME}`,
    ADMIN: {
        LOGIN: `Admin Login | ${APP_NAME}`,
        DASHBOARD: `Admin Dashboard | ${APP_NAME}`,
    },
} as const;
