import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader-container">
      <Image
        src={"/imag4.webp"}
        objectFit="contain"
        layout="intrinsic"
        width={400}
        height={400}
        alt="Architectural Blueprint"
        className="blueprint-loader"
      />
      <style jsx>{``}</style>
    </div>
  );
};

export default Loader;
