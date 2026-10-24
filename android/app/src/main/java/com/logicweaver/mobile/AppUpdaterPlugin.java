package com.logicweaver.mobile;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyStore;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import org.json.JSONArray;
import org.json.JSONObject;

@CapacitorPlugin(name = "AppUpdater")
public class AppUpdaterPlugin extends Plugin {
    private static final String KEY_ALIAS = "logicweaver_github_update_key";
    private static final String PREFS = "logicweaver_secure_update";
    private static final String TOKEN_ENTRY = "github_token";
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject result = new JSObject();
        result.put("versionName", BuildConfig.VERSION_NAME);
        result.put("versionCode", BuildConfig.VERSION_CODE);
        result.put("tokenConfigured", !readGithubToken().isEmpty());
        call.resolve(result);
    }

    @PluginMethod
    public void setGithubToken(PluginCall call) {
        String token = call.getString("token", "").trim();
        try {
            if (token.isEmpty()) {
                prefs().edit().remove(TOKEN_ENTRY).apply();
            } else {
                prefs().edit().putString(TOKEN_ENTRY, encrypt(token)).apply();
            }
            JSObject result = new JSObject();
            result.put("saved", !token.isEmpty());
            call.resolve(result);
        } catch (Exception error) {
            call.reject("无法安全保存更新凭据", error);
        }
    }

    @PluginMethod
    public void checkForUpdate(PluginCall call) {
        String owner = call.getString("owner", "kongzhuww").trim();
        String repo = call.getString("repo", "tab-Project").trim();
        executor.execute(() -> {
            HttpURLConnection connection = null;
            try {
                connection = openGithubConnection("https://api.github.com/repos/" + owner + "/" + repo + "/releases/latest", "application/vnd.github+json");
                int status = connection.getResponseCode();
                if (status != 200) throw new IllegalStateException("GitHub HTTP " + status);
                JSONObject release = new JSONObject(readText(connection.getInputStream()));
                JSONArray assets = release.optJSONArray("assets");
                JSONObject apk = null;
                if (assets != null) {
                    for (int index = 0; index < assets.length(); index++) {
                        JSONObject candidate = assets.getJSONObject(index);
                        String name = candidate.optString("name", "");
                        if (name.toLowerCase().endsWith(".apk")) {
                            apk = candidate;
                            if (name.toLowerCase().contains("logicweaver")) break;
                        }
                    }
                }
                if (apk == null) throw new IllegalStateException("最新 Release 中没有 APK 文件");
                String tag = release.optString("tag_name", "");
                String version = normalizeVersion(tag);
                JSObject result = new JSObject();
                result.put("currentVersion", BuildConfig.VERSION_NAME);
                result.put("version", version);
                result.put("tagName", tag);
                result.put("name", release.optString("name", tag));
                result.put("notes", release.optString("body", ""));
                result.put("assetApiUrl", apk.optString("url", ""));
                result.put("assetName", apk.optString("name", "logicweaver-mobile.apk"));
                result.put("updateAvailable", compareVersions(version, BuildConfig.VERSION_NAME) > 0);
                call.resolve(result);
            } catch (Exception error) {
                call.reject("检查 GitHub 更新失败：" + error.getMessage(), error);
            } finally {
                if (connection != null) connection.disconnect();
            }
        });
    }

    @PluginMethod
    public void downloadAndInstall(PluginCall call) {
        String assetApiUrl = call.getString("assetApiUrl", "").trim();
        if (!assetApiUrl.startsWith("https://api.github.com/")) {
            call.reject("拒绝非 GitHub API 的 APK 地址");
            return;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && !getContext().getPackageManager().canRequestPackageInstalls()) {
            Intent settingsIntent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + getContext().getPackageName()));
            settingsIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(settingsIntent);
            call.reject("请允许 LogicWeaver 安装未知应用，然后返回再次点击更新");
            return;
        }
        executor.execute(() -> {
            HttpURLConnection connection = null;
            try {
                connection = openGithubConnection(assetApiUrl, "application/octet-stream");
                connection.setInstanceFollowRedirects(true);
                int status = connection.getResponseCode();
                if (status < 200 || status >= 300) throw new IllegalStateException("APK 下载 HTTP " + status);
                long total = connection.getContentLengthLong();
                File apk = new File(getContext().getCacheDir(), "logicweaver-update.apk");
                try (InputStream input = new BufferedInputStream(connection.getInputStream()); FileOutputStream output = new FileOutputStream(apk)) {
                    byte[] buffer = new byte[32768];
                    long downloaded = 0;
                    int lastPercent = -1;
                    int count;
                    while ((count = input.read(buffer)) != -1) {
                        output.write(buffer, 0, count);
                        downloaded += count;
                        int percent = total > 0 ? (int) Math.min(100, downloaded * 100 / total) : 0;
                        if (percent != lastPercent) {
                            lastPercent = percent;
                            JSObject progress = new JSObject();
                            progress.put("percent", percent);
                            notifyListeners("downloadProgress", progress);
                        }
                    }
                }
                Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", apk);
                Intent install = new Intent(Intent.ACTION_VIEW);
                install.setDataAndType(uri, "application/vnd.android.package-archive");
                install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
                getContext().startActivity(install);
                JSObject result = new JSObject();
                result.put("downloaded", true);
                call.resolve(result);
            } catch (Exception error) {
                call.reject("APK 更新失败：" + error.getMessage(), error);
            } finally {
                if (connection != null) connection.disconnect();
            }
        });
    }

    private HttpURLConnection openGithubConnection(String url, String accept) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setConnectTimeout(15000);
        connection.setReadTimeout(120000);
        connection.setRequestProperty("Accept", accept);
        connection.setRequestProperty("User-Agent", "LogicWeaver-Android/" + BuildConfig.VERSION_NAME);
        connection.setRequestProperty("X-GitHub-Api-Version", "2022-11-28");
        String token = readGithubToken();
        if (!token.isEmpty()) connection.setRequestProperty("Authorization", "Bearer " + token);
        return connection;
    }

    private SharedPreferences prefs() {
        return getContext().getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    private String readGithubToken() {
        String encrypted = prefs().getString(TOKEN_ENTRY, "");
        if (encrypted == null || encrypted.isEmpty()) return "";
        try { return decrypt(encrypted); } catch (Exception ignored) { return ""; }
    }

    private SecretKey getOrCreateKey() throws Exception {
        KeyStore store = KeyStore.getInstance("AndroidKeyStore");
        store.load(null);
        if (store.containsAlias(KEY_ALIAS)) return (SecretKey) store.getKey(KEY_ALIAS, null);
        KeyGenerator generator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
        generator.init(new KeyGenParameterSpec.Builder(KEY_ALIAS, KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
            .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
            .build());
        return generator.generateKey();
    }

    private String encrypt(String value) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, getOrCreateKey());
        return Base64.encodeToString(cipher.getIV(), Base64.NO_WRAP) + ":" + Base64.encodeToString(cipher.doFinal(value.getBytes("UTF-8")), Base64.NO_WRAP);
    }

    private String decrypt(String value) throws Exception {
        String[] parts = value.split(":", 2);
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.DECRYPT_MODE, getOrCreateKey(), new GCMParameterSpec(128, Base64.decode(parts[0], Base64.NO_WRAP)));
        return new String(cipher.doFinal(Base64.decode(parts[1], Base64.NO_WRAP)), "UTF-8");
    }

    private static String readText(InputStream stream) throws Exception {
        StringBuilder result = new StringBuilder();
        byte[] buffer = new byte[8192];
        int count;
        while ((count = stream.read(buffer)) != -1) result.append(new String(buffer, 0, count, "UTF-8"));
        return result.toString();
    }

    private static String normalizeVersion(String value) {
        String normalized = value == null ? "" : value.replaceFirst("^[^0-9]*", "");
        return normalized.isEmpty() ? "0.0.0" : normalized;
    }

    private static int compareVersions(String left, String right) {
        String[] a = normalizeVersion(left).split("[.-]");
        String[] b = normalizeVersion(right).split("[.-]");
        for (int index = 0; index < Math.max(a.length, b.length); index++) {
            int av = index < a.length ? parseNumber(a[index]) : 0;
            int bv = index < b.length ? parseNumber(b[index]) : 0;
            if (av != bv) return Integer.compare(av, bv);
        }
        return 0;
    }

    private static int parseNumber(String value) {
        try { return Integer.parseInt(value.replaceAll("[^0-9].*$", "")); } catch (Exception ignored) { return 0; }
    }

    @Override
    protected void handleOnDestroy() {
        executor.shutdownNow();
    }
}
