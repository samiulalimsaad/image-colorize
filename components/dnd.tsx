import { Transition } from "@headlessui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const DragAndDrop = () => {
    const [state, setState] = useState(false)
    useEffect(() => {
        setState(true)
        return () => {
            setState(false)
        }
    }, [])
    return (
        <div className="absolute inset-0 h-screen w-screen  grid place-items-center bg-blue-200 opacity-50">
            <Transition
                show={state}
                enter="ease-out duration-1000"
                enterFrom="opacity-0 scale-0"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-1000"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-0"
            >
                <Image
                    src="/drag-and-drop.png"
                    alt="drag and drop"
                    height={250}
                    width={250}
                />
            </Transition>
        </div>
    );
};

export default DragAndDrop;
