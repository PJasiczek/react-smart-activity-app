package com.smartactivityapplication;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.polidea.reactnativeble.BlePackage;
import com.imagepicker.ImagePickerPackage;
import it.innove.BleManagerPackage;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import com.nuttawutmalee.RCTBluetoothSerial.*;
import com.facebook.react.shell.MainReactPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.remobile.toast.RCTToastPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;

import java.util.List;
import java.util.Arrays;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
      protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new BlePackage(),
            new ImagePickerPackage(),
            new BleManagerPackage(),
            new RCTBluetoothSerialPackage(),
            new MapsPackage(),
            new RNLocationPackage(),
            new LinearGradientPackage(),
            new RCTToastPackage(),
            new RNFetchBlobPackage(),
            new RNI18nPackage(),
            new SvgPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
          );
      }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
