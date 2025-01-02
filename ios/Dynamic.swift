//@objc class Dynamic: NSObject {
//
//    @objc func createAnimationView(rootView: UIView, lottieName: String) -> AnimationView {
//        let animationView = Lottie.AnimationView(name: lottieName) // Correct initialization
//        animationView.frame = rootView.frame
//        animationView.center = rootView.center
//        animationView.backgroundColor = UIColor.white
//        return animationView
//    }
//
//    @objc func play(animationView: Lottie.AnimationView) {
//        animationView.play { success in
//            // Replace with appropriate logic for finishing animation
//            print("Animation finished: \(success)")
//        }
//    }
//}
