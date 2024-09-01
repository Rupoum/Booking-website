"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { TextArea } from "../atoms/textArea";
import { HtmlSelect } from "../atoms/select";
import { SimpleAccordion } from "../molecules/SimpleAccordion";
import { Plus } from "lucide-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/components/utils/config/firebase"; // Ensure you have your Firebase config here

// Enums for projection types and sound systems
enum ProjectionType {
  Imax = "Imax",
  FourK = "4k",
  Atoms = "Atoms",
  Imax4k = "Imax4k",
  Normal = "Normal",
}

enum SoundSystemTypes {
  Dolby = "Dolby",
  HighAmplifier = "HighAmplifier",
  Normal = "Normal",
  DolbyAtmos = "Dolby_Atmos",
}

// Interfaces for form data and screen state
interface ScreenState {
  projectionType: string;
  soundSystemType: string;
  rows: number;
  columns: number;
  price: number;
  screenno: number;
}

interface CinemaFormData {
  name: string;
  managerId: string;
  Address: string;
  posterUrl: string | File;
  screens: ScreenState[];
}

// Initial state values
const initialScreenState: ScreenState = {
  projectionType: "",
  soundSystemType: "",
  rows: 0,
  columns: 0,
  price: 0,
  screenno: 0,
};

const initialFormData: CinemaFormData = {
  name: "",
  managerId: "",
  Address: "",
  posterUrl: "",
  screens: [
    {
      ...initialScreenState,
    },
  ],
};

// AddScreens component definition
const AddScreens: React.FC<{
  screens: ScreenState[];
  onScreenChange: (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onAddScreen: () => void;
  onRemoveScreen: (index: number) => void;
}> = ({ screens, onScreenChange, onAddScreen, onRemoveScreen }) => {
  return (
    <div>
      {screens.map((screen, index) => (
        <SimpleAccordion title={`Screen ${index + 1}`} key={index}>
          <div className="flex justify-end my-2">
            <Button
              variant="link"
              size="sm"
              className="text-sm text-gray-600 underline underline-offset-2"
              onClick={() => onRemoveScreen(index)}
            >
              Remove Screen
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Label title="Projection Type">
                <HtmlSelect
                  name="projectionType"
                  value={screen.projectionType}
                  onChange={(e) => onScreenChange(index, e)}
                >
                  {Object.values(ProjectionType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </HtmlSelect>
              </Label>
              <Label title="Sound System Type">
                <HtmlSelect
                  name="soundSystemType"
                  value={screen.soundSystemType}
                  onChange={(e) => onScreenChange(index, e)}
                >
                  {Object.values(SoundSystemTypes).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </HtmlSelect>
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Label title="Number of Rows">
                <Input
                  name="rows"
                  value={screen.rows}
                  onChange={(e) => onScreenChange(index, e)}
                />
              </Label>
              <Label title="Number of Columns">
                <Input
                  name="columns"
                  value={screen.columns}
                  onChange={(e) => onScreenChange(index, e)}
                />
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Label title="Ticket Price">
                <Input
                  name="price"
                  value={screen.price}
                  onChange={(e) => onScreenChange(index, e)}
                />
              </Label>
              <Label title="Screen Number">
                <Input
                  name="screenno"
                  value={screen.screenno}
                  onChange={(e) => onScreenChange(index, e)}
                />
              </Label>
            </div>
          </div>
        </SimpleAccordion>
      ))}
      <Button
        variant="link"
        size="sm"
        className="mt-4 text-sm text-gray-600 underline underline-offset-2"
        onClick={onAddScreen}
      >
        <Plus className="inline-block w-4 h-4 mr-1" /> Add Another Screen
      </Button>
    </div>
  );
};

// Main component to create cinema
const EditCinema: React.FC<{ cinemaId?: string }> = ({ cinemaId }) => {
  const [formData, setFormData] = useState<CinemaFormData>(initialFormData);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (cinemaId) {
      const fetchCinema = async () => {
        try {
          const response = await axios.get(
            `https://bookmyshowfinal.onrender.com/api/cinema/cinema/${cinemaId}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching cinema details:", error);
          toast({
            title: "Error fetching cinema details",
            variant: "destructive",
          });
        }
      };

      fetchCinema();
    }
  }, [cinemaId, toast]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files && files[0] ? files[0] : value,
    }));
  };

  const handleScreenChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const screens = [...prevData.screens];
      screens[index] = { ...screens[index], [name]: value };
      return { ...prevData, screens };
    });
  };

  const addScreen = () => {
    setFormData((prevData) => ({
      ...prevData,
      screens: [...prevData.screens, { ...initialScreenState }],
    }));
  };

  const removeScreen = (index: number) => {
    setFormData((prevData) => {
      const screens = prevData.screens.filter((_, i) => i !== index);
      return { ...prevData, screens };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let posterUrl = formData.posterUrl;
      if (posterUrl && posterUrl instanceof File) {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, `cinema_posters/${posterUrl.name}`);
        await uploadBytes(storageRef, posterUrl);
        posterUrl = await getDownloadURL(storageRef);
        setUploading(false);
      }

      const cinema = {
        ...formData,
        posterUrl, // Save the URL after upload
        screens: formData.screens.map((screen) => ({
          projectionType: screen.projectionType,
          soundSystemType: screen.soundSystemType,
          rows: screen.rows,
          columns: screen.columns,
          price: screen.price,
          screenno: screen.screenno,
        })),
      };

      if (cinemaId) {
        await axios.patch(
          `https://bookmyshowfinal.onrender.com/api/cinema/cinema/${cinemaId}`,
          cinema,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },
          }
        );
        toast({ title: "Cinema updated successfully." });
      } else {
        await axios.post(
          "https://bookmyshowfinal.onrender.com/api/cinema/cinema",
          cinema,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },
          }
        );
        toast({ title: "Cinema created successfully." });
      }

      router.push("/admin");
    } catch (error) {
      console.error("Error saving cinema data:", error);
      setError(
        "An error occurred while saving cinema details. Please try again."
      );
      toast({ title: "An error occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {cinemaId ? "Edit Cinema" : "Create Cinema"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label title="Cinema Name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Label>
        </div>

        <div className="mb-4">
          <Label title="Address">
            <TextArea
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              required
            />
          </Label>
        </div>
        <div className="mb-4">
          <Label title="Poster Image">
            <Input
              type="file"
              name="posterUrl"
              onChange={handleInputChange}
              accept="image/*"
            />
            {uploading && <p>Uploading image...</p>}
          </Label>
        </div>
        <AddScreens
          screens={formData.screens}
          onScreenChange={handleScreenChange}
          onAddScreen={addScreen}
          onRemoveScreen={removeScreen}
        />
        <Button type="submit" disabled={loading}>
          {cinemaId ? "Update Cinema" : "Create Cinema"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default EditCinema;
