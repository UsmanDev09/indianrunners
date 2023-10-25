import getAccount from "@/lib/getAccount";
import { Cloudinary } from "@cloudinary/url-gen";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const FilerobotImageEditor = dynamic(
  () => import("react-filerobot-image-editor"),
  {
    ssr: false,
  }
);
export default function MyComponent() {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [desState, setDesState] = useState({});
  const { account } = getAccount();
  const cld = new Cloudinary({ cloud: { cloudName: "da39zmhtv" } });
  const loadImage = (imageObj: any, state: any) => {
    const image = imageObj.imageBase64;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "certificate");
    data.append("cloud_name", "da39zmhtv");
    data.append("public_id", `${account.firstName}_Cycling`);
    fetch("https://api.cloudinary.com/v1_1/da39zmhtv/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const Download = (imageObj: any, state: any) => {
    const image = imageObj.imageBase64;
    var link = document.createElement("a");
    link.download = `Certificate_${account.firstName}.png`;
    link.href = image;
    link.click();
  };

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  return (
    <div>
      <button
        onClick={openImgEditor}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center dark:text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Open Certificate Builder
      </button>
      {isImgEditorShown && (
        <div className="absolute top-0 left-0 right-0 z-50 w-full h-screen p-4 overflow-x-hidden md:inset-0 backdrop-blur-md backdrop-brightness-50">
          <FilerobotImageEditor
            source="/White.png"
            onSave={(editedImageObject: any, designState: any) => {
              console.log("saved", editedImageObject, designState);
              for (const key in designState.annotations) {
                if (
                  designState.annotations[key].text === "FullName" ||
                  designState.annotations[key].id === "FullName"
                ) {
                  designState.annotations[key].id = "FullName";
                  designState.annotations[key].text = "Ahmed Adil";
                  console.log(key, "is name text");
                }
                if (
                  designState.annotations[key].text === "Rank" ||
                  designState.annotations[key].id === "Rank"
                ) {
                  designState.annotations[key].id = "Rank";
                  designState.annotations[key].text = "A Plus";
                  console.log(key, "is Rank text");
                }
                if (
                  designState.annotations[key].text === "For" ||
                  designState.annotations[key].id === "For"
                ) {
                  designState.annotations[key].id = "For";
                  designState.annotations[key].text = "Web Development";
                  console.log(key, "is For text");
                }
                if (
                  designState.annotations[key].text === "Remarks" ||
                  designState.annotations[key].id === "Remarks"
                ) {
                  designState.annotations[key].id = "Remarks";
                  designState.annotations[key].text = "Well done";
                  console.log(key, "is Remarks text");
                }
                if (
                  designState.annotations[key].text === "Gender" ||
                  designState.annotations[key].id === "Gender"
                ) {
                  designState.annotations[key].id = "Gender";
                  designState.annotations[key].text = "Male";
                  console.log(key, "is Gender text");
                }
              }
              setDesState(designState);
              loadImage(editedImageObject, designState);
              Download(editedImageObject, designState);
            }}
            onClose={closeImgEditor}
            annotationsCommon={{
              fill: "#ff0000",
            }}
            Text={{ text: "" }}
            Rotate={{ angle: 90, componentType: "slider" }}
            Crop={{
              presetsItems: [
                {
                  titleKey: "classicTv",
                  descriptionKey: "4:3",
                  ratio: 4 / 3,
                  // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                },
                {
                  titleKey: "cinemascope",
                  descriptionKey: "21:9",
                  ratio: 21 / 9,
                  // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                },
              ],
              presetsFolders: [
                {
                  titleKey: "socialMedia",

                  // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                  groups: [
                    {
                      titleKey: "facebook",
                      items: [
                        {
                          titleKey: "profile",
                          width: 180,
                          height: 180,
                          descriptionKey: "fbProfileSize",
                        },
                        {
                          titleKey: "coverPhoto",
                          width: 820,
                          height: 312,
                          descriptionKey: "fbCoverPhotoSize",
                        },
                      ],
                    },
                  ],
                },
              ],
            }}
            tabsIds={["Adjust", "Annotate", "Watermark"]}
            defaultTabId="Annotate"
            defaultToolId="Text"
            savingPixelRatio={0}
            previewPixelRatio={0}
            loadableDesignState={desState}
          />
        </div>
      )}
    </div>
  );
}
