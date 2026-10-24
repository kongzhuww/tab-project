package com.logicweaver.mobile;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import org.json.JSONArray;
import org.json.JSONObject;

public class LogicWeaverWidgetProvider extends AppWidgetProvider {
    public static final String PREFS = "logicweaver_widget";
    public static final String KEY_TASKS = "todoist_tasks";
    private static final int[] ROW_IDS = {
        R.id.widget_task_1, R.id.widget_task_2, R.id.widget_task_3,
        R.id.widget_task_4, R.id.widget_task_5
    };

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        updateAll(context, manager, appWidgetIds);
    }

    static void updateAll(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        String payload = context.getSharedPreferences(PREFS, 0).getString(KEY_TASKS, "[]");
        JSONArray tasks;
        try { tasks = new JSONArray(payload); } catch (Exception ignored) { tasks = new JSONArray(); }
        for (int widgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.logicweaver_widget);
            views.setTextViewText(R.id.widget_title, "LogicWeaver · Todoist");
            views.setTextViewText(R.id.widget_count, tasks.length() + " 项待办");
            for (int index = 0; index < ROW_IDS.length; index++) {
                String text = "";
                if (index < tasks.length()) {
                    JSONObject task = tasks.optJSONObject(index);
                    if (task != null) {
                        String due = formatDue(task.optString("due", ""));
                        String recurring = task.optBoolean("recurring", false) ? " 🔁" : "";
                        text = "○ " + task.optString("content", "未命名任务") + (due.isEmpty() ? "" : "  · " + due) + recurring;
                    }
                }
                views.setTextViewText(ROW_IDS[index], text);
            }
            Intent intent = new Intent(context, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            PendingIntent pending = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            views.setOnClickPendingIntent(R.id.widget_root, pending);
            manager.updateAppWidget(widgetId, views);
        }
    }

    private static String formatDue(String value) {
        if (value == null || value.isEmpty()) return "";
        if (value.length() >= 16 && value.charAt(10) == 'T') return value.substring(5, 10) + " " + value.substring(11, 16);
        return value.length() >= 10 ? value.substring(5, 10) : value;
    }
}
