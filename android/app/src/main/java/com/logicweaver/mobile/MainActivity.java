package com.logicweaver.mobile;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(AppUpdaterPlugin.class);
        registerPlugin(BilibiliAuthPlugin.class);
        registerPlugin(HomeWidgetPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
