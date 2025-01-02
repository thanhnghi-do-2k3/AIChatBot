#import "AppDelegate.h"
#import "RNBootSplash.h"

#import <React/RCTBundleURLProvider.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <CodePush/CodePush.h>

//#import "AIChatBot-Swift.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.moduleName = @"AIChatBot";
    self.initialProps = @{};

    [AppCenterReactNative register];
    [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
    [AppCenterReactNativeCrashes registerWithAutomaticProcessing];

//    // Initialize the root view
//    UIViewController *rootViewController = [UIViewController new];
//    UIView *rootView = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
//    rootViewController.view = rootView;
//
//    // Configure the window and rootViewController
//    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//    self.window.rootViewController = rootViewController;
//    [self.window makeKeyAndVisible];
//
//    // Create and configure the Lottie animation
//    Dynamic *dynamicInstance = [Dynamic new];
//    UIView *animationUIView = [dynamicInstance createAnimationViewWithRootView:rootView lottieName:@"loading"]; // Replace "loading" with your Lottie animation name
//    animationUIView.backgroundColor = [UIColor whiteColor]; // Set background color
//    [rootView addSubview:animationUIView]; // Add animation to the root view
//
//    // Cast UIView to AnimationView
//    if ([animationUIView isKindOfClass:[AnimationView class]]) {
//        AnimationView *animationView = (AnimationView *)animationUIView;
//
//        // Play the animation
//        [dynamicInstance playWithAnimationView:animationView];
//    } else {
//        NSLog(@"Error: animationUIView is not of type AnimationView");
//    }
//
//    // Register the Lottie splash screen to RNSplashScreen
//    if ([RNSplashScreen respondsToSelector:@selector(showLottieSplash:inRootView:)]) {
//        [RNSplashScreen showLottieSplash:animationUIView inRootView:rootView];
//    } else {
//        NSLog(@"Error: RNSplashScreen does not support LottieSplashScreen");
//    }
//
//    // Set animation finished callback
//    if ([RNSplashScreen respondsToSelector:@selector(setAnimationFinished:)]) {
//        [RNSplashScreen setAnimationFinished:true];
//    } else {
//        NSLog(@"Error: RNSplashScreen does not have setAnimationFinished:");
//    }

    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}

- (void)customizeRootView:(RCTRootView *)rootView {
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; // ⬅️ initialize the splash screen
}

@end
