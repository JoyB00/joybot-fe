
import Uploader from "../component/Uploader.jsx";
import image from "../../public/image-from-rawpixel-id-14111059-jpeg.jpg"
import {TypeAnimation} from "react-type-animation";
function UploadFilePage() {

    const text =[
        "Welcome To\nJOYBOT",1000,
        "Let's\nStarted",1000
    ]

    return (
        <main className="w-full h-full starting-page bg-[url('/public/image-from-rawpixel-id-14240344-jpeg.jpg')] bg-cyan-950 bg-blend-overlay"
        >
            <div className="col-span-1 my-auto md:ps-5">
                <div className="pb-5">
                    <div className="lg:h-72 md:h-48 h-36">
                        <p className="text-2xl md:text-5xl text-lg-6xl font-semibold">🐶</p>
                        <div>
                            <TypeAnimation
                                sequence={text}
                                wrapper="div" speed={50} style={{ whiteSpace: "pre-wrap"}} repeat={Infinity} className="inline-block bg-gradient-to-r to-purple-500 from-sky-500 bg-clip-text pt-2 text-5xl lg:text-8xl font-black text-transparent"/>
                        </div>
                    </div>
                    <p className="text-sm px-4 md:px-0">I hope with our machine can help you to learn something</p>
                </div>
                <div className="w-fit flex mx-auto">
                    <Uploader/>
                </div>
            </div>
            <div className="col-span-1 h-screen bg-purple-900 bg-starting-page relative ps-16">
                {/*<div className="absolute inset-0 bg-gradient-to-t from-cyan-950 to-transparent opacity-70 z-10"></div>*/}
                <img src={image} alt="gambar bg" className="object-cover w-full h-full"/>
            </div>
        </main>
    )
}

export default UploadFilePage
