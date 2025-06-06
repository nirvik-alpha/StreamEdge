import React, { useState } from "react";
import videoLogo from "../assets/upload.png";
import {
  Button,
  Card,
  FileInput,
  Label,
  Textarea,
  Progress,
  TextInput,
  Alert,
} from "flowbite-react";

import { Toaster, toast } from "react-hot-toast";
import { useWatchLocalStorageValue } from "flowbite-react/hooks/use-watch-localstorage-value";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  function formFieldChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();

    if (!selectedFile) {
      alert("Select File!!");
    }

    saveVideoToServer(selectedFile, meta);
  }

  function resetForm() {
    setMeta({
      title: "",
      description: "",
    });
    setSelectedFile(null);
    setUploading(false);
    // setMessage("");
  }

  //submit file to server
  async function saveVideoToServer(video, videoMetaData) {
    setUploading(true);

    //api call

    try {
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", selectedFile);

      let response = await axios.post(
        `http://localhost:8080/api/v1/videos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            console.log(progress);
            setProgress(progress);
          },
        }
      );

      console.log(response);
      setProgress(0);

      setMessage("File uploaded " + response.data.videoId);
      setUploading(false);
      toast.success("File uploaded successfully !!");
      resetForm();
    } catch (error) {
      console.log(error);
      setMessage("Error in uplaoding File");
      setUploading(false);
      toast.error("File not uploaded !!");
    }
  }

  return (
    <div className="text-white">
      <Card className="flex felx-col">
        <h1 className="text-black">upload videos</h1>

        <div>
          <form
            noValidate
            className=" flex flex-col space-y-6"
            onChange={handleForm}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload">Video title</Label>
                <TextInput
                  value={meta.title}
                  onChange={formFieldChange}
                  name="title"
                  placeholder="Enter title"
                />
              </div>
            </div>

            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment">Video Description</Label>
              </div>
              <Textarea
                value={meta.description}
                onChange={formFieldChange}
                name="description"
                id="comment"
                placeholder="Write Video description..."
                required
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-5 justify-center">
              <div className="shrink-0">
                <img
                  className="h-16 w-16 object-cover "
                  src={videoLogo}
                  alt="Current profile photo"
                />
              </div>
              <label className="block">
                <span className="sr-only">Choose video file</span>
                <input
                  onChange={handleFileChange}
                  name="file"
                  type="file"
                  className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0s
                                 file:text-sm file:font-semibold
                                 file:bg-violet-50 file:text-violet-700
                                  hover:file:bg-violet-100
                                      "
                />
              </label>
            </div>

            <div className="">
              {uploading && (
                <Progress
                  color="green"
                  progress={progress}
                  textLabel="Uploading"
                  size={"lg"}
                  labelProgress
                  labelText
                />
              )}
            </div>

            <div className="">
              {message && (
                <Alert
                  color={"success"}
                  rounded
                  withBorderAccent
                  onDismiss={() => {
                    setMessage("");
                  }}
                >
                  <span className="font-medium">Success alert! </span>
                  {message}
                </Alert>
              )}
            </div>

            <div className="flex justify-center">
              <Button disabled={uploading} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default VideoUpload;
