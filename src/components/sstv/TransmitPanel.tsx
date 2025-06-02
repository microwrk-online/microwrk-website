import TextInput from "./TextInput";
import ImageUpload from "./ImageUpload";

const TransmitPanel = () => {
  return (
    <div className="mt-6 space-y-4 bg-dark text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-primary mb-4 text-center">
        Select a method to transmit:
      </h2>
      <TextInput />
      <ImageUpload />
    </div>
  );
};

export default TransmitPanel;
