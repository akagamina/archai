import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader-container">
      <Image
        src={"/image4.png"}
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
