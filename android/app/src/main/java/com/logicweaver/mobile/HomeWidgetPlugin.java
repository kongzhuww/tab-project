package com.logicweaver.mobile;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.os.Build;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import org.json.JSONArray;

@CapacitorPlugin(name = "HomeWidget")
public class HomeWidgetPlugin extends Plugin {
    @PluginMethod
    public void requestPin(PluginCall call) {
        AppWidgetManager manager = AppWidgetManager.getInstance(getContext());
        boolean supported = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && manager.isRequestPinAppWidgetSupported();
        boolean requested = false;
        if (supported) {
            ComponentName provider = new ComponentName(getContext(), LogicWeaverWidgetProvider.class);
            requested = manager.requestPinAppWidget(provider, null, null);
        }
        JSObject result = new JSObject();
        result.put("supported", supported);
        result.put("requested", requested);
        call.resolve(result);
    }

    @PluginMethod
    public void updateTasks(PluginCall call) {
        String payload = call.getString("payload", "[]");
        try {
            new JSONArray(payload);
            getContext().getSharedPreferences(LogicWeaverWidgetProvider.PREFS, 0)
                .edit().putString(LogicWeaverWidgetProvider.KEY_TASKS, payload).apply();
            AppWidgetManager manager = AppWidgetManager.getInstance(getContext());
            int[] ids = manager.getAppWidgetIds(new ComponentName(getContext(), LogicWeaverWidgetProvider.class));
            LogicWeaverWidgetProvider.updateAll(getContext(), manager, ids);
            JSObject result = new JSObject();
            result.put("updated", true);
            result.put("widgets", ids.length);
            call.resolve(result);
        } catch (Exception error) {
            call.reject("桌面小组件数据更新失败", error);
        }
    }
}
