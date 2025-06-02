import TextInput from "./TextInput";
import ImageUpload from "./ImageUpload";

const ReceivePanel = () => {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-semibold">Select a method to receive:</h2>
      <TextInput />
      <ImageUpload />
    </div>
  );
};

export default ReceivePanel;
