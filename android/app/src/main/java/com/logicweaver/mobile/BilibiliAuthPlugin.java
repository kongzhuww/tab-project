package com.logicweaver.mobile;

import android.content.Intent;
import android.webkit.CookieManager;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.json.JSONObject;

@CapacitorPlugin(name = "BilibiliAuth")
public class BilibiliAuthPlugin extends Plugin {
    private static final String BILI_HOME = "https://www.bilibili.com/";
    private static final String USER_AGENT = "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36";
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @PluginMethod
    public void openLogin(PluginCall call) {
        Intent intent = new Intent(getContext(), BilibiliLoginActivity.class);
        startActivityForResult(call, intent, "loginFinished");
    }

    @ActivityCallback
    private void loginFinished(PluginCall call, ActivityResult activityResult) {
        if (call == null) return;
        JSObject result = statusObject();
        result.put("completed", activityResult.getResultCode() == android.app.Activity.RESULT_OK);
        call.resolve(result);
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        call.resolve(statusObject());
    }

    @PluginMethod
    public void getFolders(PluginCall call) {
        String uid = getCookieValue("DedeUserID");
        if (!isLoggedIn() || uid.isEmpty()) {
            call.reject("请先登录 B站");
            return;
        }
        String endpoint = "https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=" + encode(uid);
        requestJson(call, endpoint);
    }

    @PluginMethod
    public void getFolderItems(PluginCall call) {
        String folderId = call.getString("folderId", "").trim();
        int page = Math.max(1, call.getInt("page", 1));
        if (!isLoggedIn()) {
            call.reject("请先登录 B站");
            return;
        }
        if (!folderId.matches("\\d+")) {
            call.reject("收藏夹 ID 无效");
            return;
        }
        String endpoint = "https://api.bilibili.com/x/v3/fav/resource/list?media_id=" + encode(folderId) + "&pn=" + page + "&ps=20&platform=web";
        requestJson(call, endpoint);
    }

    private void requestJson(PluginCall call, String endpoint) {
        executor.execute(() -> {
            HttpURLConnection connection = null;
            try {
                connection = (HttpURLConnection) new URL(endpoint).openConnection();
                connection.setConnectTimeout(15000);
                connection.setReadTimeout(45000);
                connection.setRequestProperty("Accept", "application/json, text/plain, */*");
                connection.setRequestProperty("Referer", BILI_HOME);
                connection.setRequestProperty("User-Agent", USER_AGENT);
                connection.setRequestProperty("Cookie", cookies());
                int status = connection.getResponseCode();
                InputStream stream = status >= 200 && status < 300 ? connection.getInputStream() : connection.getErrorStream();
                String body = stream == null ? "" : readText(stream);
                if (status < 200 || status >= 300) throw new IllegalStateException("B站 HTTP " + status);
                JSONObject json = new JSONObject(body);
                int code = json.optInt("code", -1);
                if (code != 0) throw new IllegalStateException("B站接口 " + code + "：" + json.optString("message", "请求失败"));
                call.resolve(JSObject.fromJSONObject(json));
            } catch (Exception error) {
                call.reject("B站登录请求失败：" + error.getMessage(), error);
            } finally {
                if (connection != null) connection.disconnect();
            }
        });
    }

    private JSObject statusObject() {
        JSObject result = new JSObject();
        result.put("loggedIn", isLoggedIn());
        String uid = getCookieValue("DedeUserID");
        result.put("uid", uid);
        return result;
    }

    private boolean isLoggedIn() {
        return !getCookieValue("SESSDATA").isEmpty();
    }

    private String cookies() {
        String value = CookieManager.getInstance().getCookie(BILI_HOME);
        return value == null ? "" : value;
    }

    private String getCookieValue(String name) {
        String value = cookies();
        for (String item : value.split(";")) {
            String[] pair = item.trim().split("=", 2);
            if (pair.length == 2 && pair[0].equals(name)) return pair[1];
        }
        return "";
    }

    private static String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    private static String readText(InputStream stream) throws Exception {
        try (InputStream input = new BufferedInputStream(stream)) {
            byte[] buffer = new byte[8192];
            StringBuilder result = new StringBuilder();
            int count;
            while ((count = input.read(buffer)) != -1) result.append(new String(buffer, 0, count, StandardCharsets.UTF_8));
            return result.toString();
        }
    }

    @Override
    protected void handleOnDestroy() {
        executor.shutdownNow();
    }
}
