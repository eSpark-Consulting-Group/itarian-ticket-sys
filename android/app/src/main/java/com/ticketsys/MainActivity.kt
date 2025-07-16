package com.ticketsys

import android.os.Bundle
import android.view.ActionMode
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "TicketSys"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return MainActivityDelegate(this, mainComponentName)
    }

    class MainActivityDelegate(
        activity: ReactActivity,
        mainComponentName: String
    ) : ReactActivityDelegate(activity, mainComponentName) {

        override fun loadApp(appKey: String?) {
            RNBootSplash.init(plainActivity)
            super.loadApp(appKey)
        }

        override fun createRootView(): ReactRootView {
            val rootView = ReactRootView(context)
            rootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED)
            return rootView
        }
    }

    override fun onActionModeStarted(mode: ActionMode) {
        mode.menu.clear()
    }
}
