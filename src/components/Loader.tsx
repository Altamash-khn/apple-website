import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
        <p className="text-white text-sm tracking-widest uppercase">
          Loading...
        </p>
      </div>
    </Html>
  );
};

export default Loader;
