import Image from "next/image";
import bgImageDark from "../../public/homepage_bg_dark.jpg";
import bgImageLight from "../../public/homepage_bg_light.jpg";

export default function BackgroundImage() {
  return (
    <div className="absolute -z-10 h-screen w-screen">
      <Image
        alt="Image de fond"
        src={bgImageLight}
        quality={100}
        fill={true}
        className="dark:hidden"
      />
      <Image
        alt="Image de fond"
        src={bgImageDark}
        quality={100}
        fill={true}
        className="hidden dark:block"
      />
    </div>
  );
}
