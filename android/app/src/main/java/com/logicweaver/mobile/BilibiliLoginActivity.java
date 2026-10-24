package com.logicweaver.mobile;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.ViewGroup;
import android.webkit.CookieManager;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

public class BilibiliLoginActivity extends Activity {
    private static final String LOGIN_URL = "https://passport.bilibili.com/login";
    private WebView webView;
    private TextView status;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        CookieManager cookies = CookieManager.getInstance();
        cookies.setAcceptCookie(true);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.WHITE);
        int padding = dp(16);

        status = new TextView(this);
        status.setPadding(padding, padding, padding, padding / 2);
        status.setTextSize(16);
        status.setTextColor(Color.rgb(20, 30, 50));
        status.setText("请在下方登录 B站。Cookie 只保存在本 App 的 Android WebView 中，不会上传 VPS。");
        root.addView(status, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        LinearLayout actions = new LinearLayout(this);
        actions.setPadding(padding, 0, padding, padding / 2);
        Button cancel = new Button(this);
        cancel.setText("取消");
        cancel.setOnClickListener(view -> finish());
        Button done = new Button(this);
        done.setText("登录完成，返回 App");
        done.setOnClickListener(view -> completeLogin());
        actions.addView(cancel, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
        actions.addView(done, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 2));
        root.addView(actions);

        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setUserAgentString(settings.getUserAgentString() + " LogicWeaverMobile/1.0");
        cookies.setAcceptThirdPartyCookies(webView, true);
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String scheme = request.getUrl().getScheme();
                return !("http".equalsIgnoreCase(scheme) || "https".equalsIgnoreCase(scheme));
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (isLoggedIn()) status.setText("✓ 已检测到 B站登录状态。点击“登录完成，返回 App”。");
            }
        });
        root.addView(webView, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1));
        setContentView(root);
        webView.loadUrl(LOGIN_URL);
    }

    private void completeLogin() {
        CookieManager.getInstance().flush();
        if (!isLoggedIn()) {
            Toast.makeText(this, "尚未检测到登录成功，请先完成 B站登录", Toast.LENGTH_LONG).show();
            return;
        }
        setResult(RESULT_OK);
        finish();
    }

    private boolean isLoggedIn() {
        String value = CookieManager.getInstance().getCookie("https://www.bilibili.com/");
        return value != null && value.contains("SESSDATA=");
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.destroy();
        }
        super.onDestroy();
    }
}
