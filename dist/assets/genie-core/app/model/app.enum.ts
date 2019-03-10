/**
 * Enum string used for the PubSub Event functionality
 */
export enum AppPublishEvents {
    APP_CHANGE_ROOT = "app.change.root",
    APP_UPDATE_HEADER = "app.update.header",
    APP_REMINDERS_LOADED = "app.reminders.loaded",
    APP_REMINDERS_REFRESH = "app.reminders.refresh",
    APP_NOTIFICATION_RECEIVED = "app.notification.received",
    APP_RELOAD_PERFORMANCE_DASHBOARD = "app.performance.reload",
    APP_CHANGE_MAIN_TAB = "app.change.main.tab",
    APP_LEADS_UPDATED = "app.leads.updated",
    APP_DATA_SYNC_COMPLETED = "app.datasync.completed",
    APP_RESUMED_ACTIVE = "app.resumed.active",
    APP_MOBILE_CALL_COMPLETED = "app.mobile.call.completed",
    APP_WILL_LOGOUT = "app.will.logout"
}
