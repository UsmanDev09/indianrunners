import getAccount from "@/lib/getAccount";
import { Challenge } from "@/pages/api";
import { Cloudinary } from "@cloudinary/url-gen";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const FilerobotImageEditor = dynamic(
  () => import("react-filerobot-image-editor"),
  {
    ssr: false,
  }
);

type CertificateBuilder_Props = {
  purpose: string;
  challenge: Challenge;
  template: boolean;
};
export default function CertificateBuilder({
  purpose,
  challenge,
  template,
}: CertificateBuilder_Props) {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [desState, setDesState] = useState({});
  const [users, setUsers] = useState([]);
  const [userNo, setUserNo] = useState(0);
  const [URL, setURL] = useState("");
  const { account } = getAccount();
  const token = localStorage.getItem("token");
  console.log(challenge);

  const fetchDesignState = async () => {
    const chall = await fetch(
      `http://localhost:5000/api/challenge/${challenge._id}/certificate`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) =>
      response.json().then((chall) => setDesState(chall.data.designState))
    );
  };

  const fetchUsersforCertificates = async () => {
    const chall = await fetch(
      `http://localhost:5000/api/challenge/${challenge._id}/certificate-status`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) => response.json().then((chall) => setUsers(chall.data)));
  };

  const AddCertificate = async (
    challenge: Challenge,
    url: string,
    desState: any
  ) => {
    const chall = await fetch(
      `http://localhost:5000/api/challenge/${challenge._id}/certificate`,
      {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          challengeId: challenge._id,
          certificateUrl: url,
          designState: desState,
        }),
      }
    ).then((response) => response.json().then((chall) => console.log(chall)));
  };

  const AddCertificatetoUser = async (userId: string) => {
    const chall = await fetch(
      `http://localhost:5000/api/user/${userId}/challenge/${challenge._id}/certificate`,
      {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          challengeId: challenge._id,
        }),
      }
    ).then((response) => response.json().then((chall) => console.log(chall)));
  };

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
        setURL(data.secure_url);
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
    if (!template) {
    }
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setUserNo(0);
    setIsImgEditorShown(false);
  };

  return (
    <div>
      <button
        onClick={openImgEditor}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 dark:text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
      >
        {purpose}
      </button>
      {template && isImgEditorShown && (
        <div className="absolute top-0 left-0 right-0 z-50 w-full h-screen p-4 overflow-x-hidden md:inset-0 backdrop-blur-md backdrop-brightness-50">
          <FilerobotImageEditor
            source="/White.png"
            onSave={(editedImageObject: any, designState: any) => {
              console.log("saved", designState);
              for (const key in designState.annotations) {
                if (designState.annotations[key].text === "FullName") {
                  designState.annotations[key].id = "FullName";
                  console.log(key, "is name text");
                }
                if (designState.annotations[key].text === "Rank") {
                  designState.annotations[key].id = "Rank";

                  console.log(key, "is Rank text");
                }
                if (designState.annotations[key].text === "For") {
                  designState.annotations[key].id = "For";
                  console.log(key, "is For text");
                }
                if (designState.annotations[key].text === "Remarks") {
                  designState.annotations[key].id = "Remarks";
                  console.log(key, "is Remarks text");
                }
                if (designState.annotations[key].text === "Gender") {
                  designState.annotations[key].id = "Gender";
                  console.log(key, "is Gender text");
                }
              }
              setDesState(designState);
              // loadImage(editedImageObject, designState);
              // Download(editedImageObject, designState);
              console.log(URL);
              AddCertificate(challenge, URL, designState);
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
      {!template && isImgEditorShown && (
        <div className="absolute top-0 left-0 right-0 z-50 w-full h-screen p-4 overflow-x-hidden md:inset-0 backdrop-blur-md backdrop-brightness-50">
          <FilerobotImageEditor
            source="/White.png"
            onSave={(editedImageObject: any, designState: any) => {
              console.log("saved", designState, userNo);
              for (const key in designState.annotations) {
                if (designState.annotations[key].id === "FullName") {
                  designState.annotations[key].text =
                    users[userNo].firstName + users[userNo].lastName;
                  console.log(key, "is name text");
                }
                if (designState.annotations[key].id === "Rank") {
                  designState.annotations[key].text = users[userNo].rank;
                  console.log(key, "is Rank text");
                }
                if (designState.annotations[key].id === "For") {
                  designState.annotations[key].text = users[userNo].for;
                  console.log(key, "is For text");
                }
                if (designState.annotations[key].id === "Remarks") {
                  designState.annotations[key].text = users[userNo].remarks;
                  console.log(key, "is Remarks text");
                }
                if (designState.annotations[key].id === "Gender") {
                  designState.annotations[key].text = users[userNo].gender;
                  console.log(key, "is Gender text");
                }
              }
              setDesState(designState);
              loadImage(editedImageObject, designState);
              AddCertificatetoUser(user[userNo]._id);
              setUserNo(userNo + 1);
            }}
            onClose={closeImgEditor}
            tabsIds={["Annotate"]}
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
