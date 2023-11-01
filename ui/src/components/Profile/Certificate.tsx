import getAccount from "@/lib/getAccount";
import { Josefin_Sans } from "next/font/google";
import { useState, useRef } from "react";
import { AiFillCloseCircle, AiOutlineCloudDownload } from "react-icons/ai";
import { Cloudinary } from "@cloudinary/url-gen";
import { useRouter } from "next/router";
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import {
  RiFacebookBoxFill,
  RiFileCopyLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";
const josef = Josefin_Sans({ subsets: ["latin"] });

type ActivityCard_Props = {
  title?: string;
  price?: string;
  picture?: any;
  type?: string;
  _id?: string;
};

const Certificate = ({
  title,
  price,
  picture,
  type,
  _id,
}: ActivityCard_Props) => {
  const [display, setDisplay] = useState("none");
  const canvasRef = useRef(null);
  const { account } = getAccount();
  const router = useRouter();
  const cld = new Cloudinary({ cloud: { cloudName: "da39zmhtv" } });
  // const loadImage = () => {
  //   const img = document.getElementById("certificate");
  //   const canvas = canvasRef.current;
  //   // @ts-ignore: Object is possibly 'null'.
  //   const context = canvas.getContext("2d");
  //   //Our first draw
  //   context.drawImage(img, 0, 0, 640, 555);
  //   context.font = "30px Times New Roman";
  //   context.fillText(
  //     " " + account.firstName + " " + account.lastName,
  //     220,
  //     250
  //   );
  //   context.fillText("Cycling Challenge", 210, 335);
  //   var canvasElem = document.getElementById("myCanvas") as HTMLCanvasElement;
  //   const image = canvasElem
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "certificate");
  //   data.append("cloud_name", "da39zmhtv");
  //   data.append("public_id", `${account.firstName}_Cycling`);
  //   fetch("https://api.cloudinary.com/v1_1/da39zmhtv/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const Download = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    var link = document.createElement("a");
    link.download = `Certificate_${account.firstName}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div className="justify-center">
      <button
        onClick={() => {
          if (display == "none") {
            setDisplay("block");
          } else {
            setDisplay("none");
          }
        }}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center dark:text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        View Certificate
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
      <div
        className="absolute top-0 left-0 right-0 z-50 w-full h-screen p-4 overflow-x-hidden md:inset-0 backdrop-blur-md backdrop-brightness-50"
        style={{ display: display }}
      >
        <AiFillCloseCircle
          size={80}
          color="white"
          className="absolute right-0 top-0 m-4 rounded-lg text-lg cursor-pointer"
          onClick={() => {
            setDisplay("none");
          }}
        />
        <AiOutlineCloudDownload
          size={80}
          color="white"
          className="absolute left-0 top-0 m-4 rounded-lg text-lg cursor-pointer"
          onClick={() => {
            Download();
          }}
        />
        <RiFileCopyLine
          size={80}
          color="white"
          className="absolute left-20 top-0 m-4 rounded-lg text-lg cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href + "?image=" + picture
            );
            console.log(router.query);
          }}
        />
        <LinkedinShareButton
          className="absolute left-40 top-0 m-4 rounded-lg text-lg cursor-pointer"
          url={window.location.href + "?image=" + picture}
        >
          <RiLinkedinBoxFill size={80} color="white"></RiLinkedinBoxFill>
        </LinkedinShareButton>
        <FacebookShareButton
          className="absolute left-60 top-0 m-4 rounded-lg text-lg cursor-pointer"
          url={window.location.href + "?image=" + picture}
        >
          <RiFacebookBoxFill size={80} color="white"></RiFacebookBoxFill>
        </FacebookShareButton>

        {/* <canvas
          ref={canvasRef}
          id="myCanvas"
          width="640"
          height="555"
          className="absolute top-1/4 left-1/4 rounded-lg"
        ></canvas> */}
        <img
          src={picture}
          alt=""
          id="certificate"
          className="absolute top-1/4 rounded-lg object-scale-down h-full w-full"
        ></img>
      </div>
      <img
        src={picture}
        alt=""
        id="certificate"
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></img>
    </div>
  );
};

export default Certificate;
