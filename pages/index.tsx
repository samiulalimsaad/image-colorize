import axios from "axios";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import DragAndDrop from "../components/dnd";

export default function MyDropzone() {
    const [state, setState] = useState<Blob>();
    const [upload, setUpload] = useState<Blob>();
    const onDrop = useCallback(async (acceptedFiles) => {
        const reader = new FileReader();
        reader.onload = function (e: any) {
            const data = e.target.result;
            setUpload(data);
        };
        reader.readAsDataURL(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const convert = async () => {
        try {
            const { data } = (await axios.post("http://127.0.0.1:5000/", {
                image: upload,
            })) as any;
            setState(data);
        } catch (error: any) {
            if (error.message == "Network Error") {
                alert("Invalid image please chose a Gray Scale Image");
            } else {
                alert(error.message);
            }
        }
    };
    const reset = () => {
        setState(undefined);
        setUpload(undefined);
    };

    return (
        <div className="h-screen w-screen grid place-items-center bg-gray-100 overflow-x-hidden overflow-y-scroll">
            <div>
                <h1 className="absolute inset-0 text-center my-11 text-4xl font-semibold">
                    Gray to Color Image Conversion
                </h1>
                <div>
                    <div>
                        {upload ? (
                            <div className="flex items-center justify-center h-16 space-x-9 ml-10">
                                <button
                                    className="transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 px-5 py-3 text-white rounded-md"
                                    onClick={convert}
                                >
                                    Convert
                                </button>
                                <button
                                    className="transition duration-500 ease-in-out bg-red-600 hover:bg-blue-600 transform hover:-translate-y-1 hover:scale-110 px-5 py-3 text-white rounded-md"
                                    onClick={reset}
                                >
                                    Reset
                                </button>
                            </div>
                        ) : (
                            <div className="h-screen w-screen grid place-items-center">
                                <div {...getRootProps()}>
                                    <input
                                        {...getInputProps()}
                                        multiple={false}
                                    />
                                    {isDragActive ? (
                                        <DragAndDrop />
                                    ) : (
                                        <Image
                                            src="/photo.png"
                                            alt="drag and drop"
                                            height={50}
                                            width={50}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex space-x-3 flex-wrap">
                    {upload && (
                        <div className="relative h-96 w-96 rounded-md border border-gray-600">
                            <Image
                                className="object-center object-cover "
                                src={upload}
                                alt={"userName"}
                                layout="fill"
                            />
                        </div>
                    )}
                    {state && (
                        <div className="relative h-96 w-96 rounded-md border border-gray-600">
                            <Image
                                className="object-center object-cover "
                                src={state}
                                alt={"userName"}
                                layout="fill"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
