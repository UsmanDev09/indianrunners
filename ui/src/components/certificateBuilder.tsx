import getAccount from "@/lib/getAccount";
import { Challenge } from "@/pages/api";
import { Cloudinary } from "@cloudinary/url-gen";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

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
  const [loader, setLoader] = useState(false);
  const [desState, setDesState] = useState({});
  const [users, setUsers] = useState([
    { user: { name: "", gender: "", _id: "" } },
  ]);
  const [userNo, setUserNo] = useState(0);
  const [URL, setURL] = useState("");
  const { account } = getAccount();
  const token = localStorage.getItem("token");

  const fetchDesignState = async () => {
    const chall = await fetch(
      `http://localhost:5000/api/challenge/${challenge._id}/certificate`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) =>
      response.json().then((chall) => {
        updateDesignState(chall.data.designState);
        setDesState(chall.data.designState);
        setIsImgEditorShown(true);
      })
    );
  };

  const updateDesignState = async (designState: any) => {
    if (users[userNo])
      for (const key in designState.annotations) {
        if (designState.annotations[key].id === "FullName") {
          designState.annotations[key].text = users[userNo].user.name;
          console.log(key, "is name text");
        }
        if (designState.annotations[key].id === "Gender") {
          designState.annotations[key].text = users[userNo].user.gender;
          console.log(key, "is Gender text");
        }
      }
  };
  useEffect(() => {
    const fetchUsersforCertificates = async () => {
      const chall = await fetch(
        `http://localhost:5000/api/challenge/${challenge._id}/certificate-status`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then((response) =>
        response.json().then((chall) => {
          setUsers(
            chall.data.filter(
              (user: { certificateSent: boolean }) =>
                user.certificateSent === false
            )
          );
        })
      );
    };
    fetchUsersforCertificates();
  }, []);

  const AddCertificate = async (
    challenge: Challenge,
    url: string,
    desState: any
  ) => {
    console.log(url);
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

  const AddCertificatetoUser = async (userId: string, url: string) => {
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
          certificateUrl: url,
        }),
      }
    ).then((response) => response.json().then((chall) => console.log(chall)));
  };

  const loadImage = (imageObj: any, state: any, userId?: string) => {
    const image = imageObj.imageBase64;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "certificate");
    data.append("cloud_name", "da39zmhtv");
    data.append("public_id", `${userId ? userId : challenge._id}_certificate`);
    fetch("https://api.cloudinary.com/v1_1/da39zmhtv/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (userId) AddCertificatetoUser(userId, data.secure_url);
        else AddCertificate(challenge, data.secure_url, state);
      })
      .catch((err) => console.log(err));
  };

  const Download = (imageObj: any, state: any) => {
    const image = imageObj.imageBase64;
    var link = document.createElement("a");
    link.download = `Certificate_${challenge._id}.png`;
    link.href = image;
    link.click();
  };

  const openImgEditor = () => {
    setLoader(true);
    if (!template) {
      fetchDesignState();
    } else setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setLoader(false);
    setUserNo(0);
    setIsImgEditorShown(false);
  };

  return (
    <div>
      <button
        onClick={openImgEditor}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 dark:text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
      >
        {loader && (
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}
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
                if (designState.annotations[key].text === "Gender") {
                  designState.annotations[key].id = "Gender";
                  console.log(key, "is Gender text");
                }
              }
              setDesState(designState);
              loadImage(editedImageObject, designState);
              Download(editedImageObject, designState);
              // AddCertificate(challenge, URL, designState);
              closeImgEditor();
            }}
            onClose={closeImgEditor}
            annotationsCommon={{
              fill: "#000000",
            }}
            Text={{ text: "", align: "center" }}
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
              console.log(
                "saved",
                designState,
                userNo,
                users[userNo]?.user._id
              );
              if (users[userNo]?.user?._id) {
                loadImage(
                  editedImageObject,
                  designState,
                  users[userNo].user._id
                );
                setUserNo(userNo + 1);
                for (const key in designState.annotations) {
                  if (designState.annotations[key].id === "FullName") {
                    designState.annotations[key].text = users[userNo].user.name;
                    console.log(key, "is name text");
                  }
                  if (designState.annotations[key].id === "Gender") {
                    designState.annotations[key].text =
                      users[userNo].user.gender;
                    console.log(key, "is Gender text");
                  }
                }
                setDesState(designState);
                console.log("design state updated");
              }
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
