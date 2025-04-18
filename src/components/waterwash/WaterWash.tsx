import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const vehicleOptions = {
  "2 Wheeler": [
    { label: "Scooty - ₹300", value: "Scooty", cost: 300 },
    { label: "Bike - ₹350", value: "Bike", cost: 350 },
  ],
  "4 Wheeler": [
    { label: "Hatchback - ₹600", value: "Hatchback", cost: 600 },
    { label: "Sedan - ₹700", value: "Sedan", cost: 700 },
    { label: "SUV - ₹800", value: "SUV", cost: 800 },
  ],
};

const WaterWash = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleType: "",
    vehicleModel: "",
    chainLube: false,
    timeSlot: new Date(),
  });

  const [selectedType, setSelectedType] = useState<
    "" | "2 Wheeler" | "4 Wheeler"
  >("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const inputValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;

    setForm((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleVehicleType = (type: "2 Wheeler" | "4 Wheeler") => {
    setSelectedType(type);
    setForm((prev) => ({
      ...prev,
      vehicleType: type,
      vehicleModel: "",
      chainLube: false,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicleType || !form.vehicleModel) {
      alert("Please select vehicle type and model.");
      return;
    }

    setLoading(true); // 🔁 Start loading

    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      vehicleType: form.vehicleType,
      vehicleModel: form.vehicleModel,
      chainLube: form.chainLube ? "Yes" : "No",
      timeSlot: form.timeSlot.toDateString(),
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyZo6IuU98RqfxpwHwOkgVrWJ0qFlU9rW8xsqA-ycatKW2srULuyelbdKhZbxzo5ibe2A/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          mode: "no-cors",
        }
      );
      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-center">
          CSI Holy Trinity Church - Youth Fellowship Water Wash Service
        </h1>
        <p className="text-lg text-center text-gray-400 max-w-xl mb-6 mx-auto lg:pt-10">
          We are conducting this water wash service as a fundraiser for the lift
          construction project at CSI Holy Trinity Church. 🙏
        </p>
      </div>

      {/* Form */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-xl animate-fade-in"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register Your Vehicle
          </h2>

          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              required
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Preferred Time Slot</label>
            <DatePicker
              selected={form.timeSlot}
              onChange={(date) =>
                setForm((prev) => ({ ...prev, timeSlot: date! }))
              }
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              minDate={new Date()}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Select Vehicle Type</label>
            <div className="flex gap-4">
              {["2 Wheeler", "4 Wheeler"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    handleVehicleType(type as "2 Wheeler" | "4 Wheeler")
                  }
                  className={`px-4 py-2 rounded flex items-center justify-center ${
                    selectedType === type ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {selectedType && (
            <div className="mb-4">
              <label className="block mb-1">Select Vehicle Model</label>
              <select
                name="vehicleModel"
                value={form.vehicleModel}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none"
              >
                <option value="">Select a model</option>
                {vehicleOptions[selectedType]?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedType === "2 Wheeler" && (
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  name="chainLube"
                  type="checkbox"
                  checked={form.chainLube}
                  onChange={handleChange}
                  className="mr-2"
                />
                Chain Lube
              </label>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 rounded transition flex justify-center items-center ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      ) : (
        <div className="bg-green-900/20 border border-green-400 text-green-300 p-6 rounded-lg text-center max-w-md mx-auto animate-fade-in-slow shadow-lg">
          <h2 className="text-2xl font-bold mb-2">
            ✅ Thank you for registering!
          </h2>
          <p>
            We will contact you shortly to confirm your preferred time slot. 😊
          </p>
        </div>
      )}

      {/* Footer */}
      <p className="text-md text-center text-gray-500 mt-12 mb-6 px-4 max-w-xl mx-auto">
        This service is organized by CSI Holy Trinity Church Youth Fellowship.
        100% of the proceeds will be contributed toward the church's lift
        construction. Thank you for your support! ❤️
      </p>
    </div>
  );
};

export default WaterWash;
