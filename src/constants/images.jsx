import Image from "next/image";
import facebook from "@/../public/assets/images/svgs/facebook-icon.svg";
import linkedin from "@/../public/assets/images/svgs/linkedin-con.svg";
import instagram from "@/../public/assets/images/svgs/instagram-icon.svg";
import youtube from "@/../public/assets/images/svgs/youtube-icon.svg";
import illustration from "../../public/assets/images/png/illustration.png";
import website from "../../public/assets/images/jpg/laptop.jpg";
import mobile from "../../public/assets/images/jpg/mobile.jpg";
export const image=[
  {
    id:1,
    url:<Image src={facebook} alt="facebook" width={20} height={20}/>,
  },
  {
    id:2,
    url:<Image src={linkedin} alt="facebook" width={20} height={20}/>,
  },
  {
    id:3,
    url:<Image src={instagram} alt="facebook" width={20} height={20}/>,
  },
  {
    id:4,
    url:<Image src={youtube} alt="facebook" width={20} height={20}/>,
  },
]

export const portfolio=[
  {
    id:1,
    title:"Illustrations",
    path:"/portfolio/illustrations",
    url:illustration,
  },
  {
    id:2,
    title:"Websites",
    path:"/portfolio/websites",
    url:website,
  },
  {
    id:3,
    title:"Applications",
    path:"/portfolio/applications",
    url:mobile,
  },
]