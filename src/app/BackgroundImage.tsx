import Image from "next/image";
import bgImageDark from "../../public/homepage_bg_dark.jpg";
import bgImageLight from "../../public/homepage_bg_light.jpg";

export default function BackgroundImage() {
  return (
    <div className="fixed top-0 -z-10 h-screen w-screen">
      <Image
        alt="Image de fond"
        src={bgImageLight}
        quality={100}
        fill={true}
        className="object-cover dark:hidden"
      />
      <Image
        alt="Image de fond"
        src={bgImageDark}
        quality={100}
        fill={true}
        className="hidden object-cover dark:block"
      />
    </div>
  );
}
