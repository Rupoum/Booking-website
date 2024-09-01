"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useToast } from "../molecules/Toaster/use-toast";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { TextArea } from "../atoms/textArea";
import { HtmlSelect } from "../atoms/select";
import { SimpleAccordion } from "../molecules/SimpleAccordion";
import { Plus } from "lucide-react";
// import { ProjectionType, SoundSystemTypes } from "../forms/createCinema";
import { Square } from "../organism/map/ScreenUtils";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/components/utils/config/firebase";
import { revalidatePath } from "../utils/actions/revalidatePath";

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

export const CreateCinema = () => <CreateCinemaContent />;

const CreateCinemaContent: React.FC = () => {
  const [formdata, setFormData] = useState<CinemaFormData>(initialFormData);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

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
      let posterUrl = formdata.posterUrl;
      if (posterUrl && posterUrl instanceof File) {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, `cinema_posters/${posterUrl.name}`);
        await uploadBytes(storageRef, posterUrl);
        posterUrl = await getDownloadURL(storageRef);
        setUploading(false);
      }

      const cinema = {
        ...formdata,
        posterUrl, // Save the URL after upload
        screens: formdata.screens.map((screen) => ({
          projectionType: screen.projectionType,
          soundSystemType: screen.soundSystemType,
          rows: screen.rows,
          columns: screen.columns,
          price: screen.price,
          screenno: screen.screenno,
        })),
      };

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
      setLoading(false);

      router.replace("/admin/listcinema");
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "Failed to create cinema");
      toast({ title: error.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <h1 className="my-10 text-4xl font-bold underline underline-offset-8">
        Create Cinema
      </h1>
      <form onSubmit={handleSubmit}>
        <Label title="Cinema Name" className="text-2xl">
          <Input
            placeholder="Cinema name"
            name="name"
            value={formdata.name}
            onChange={handleInputChange}
          />
        </Label>
        <Label title="Address" className="text-2xl">
          <TextArea
            placeholder="Address"
            name="Address"
            value={formdata.Address}
            onChange={handleInputChange}
          />
        </Label>
        <Label title="Poster" className="text-2xl">
          <Input
            type="file"
            accept="image/*"
            name="posterUrl"
            onChange={handleInputChange}
          />
          {formdata.posterUrl && typeof formdata.posterUrl === "string" && (
            <img
              src={formdata.posterUrl}
              alt="Cinema Poster"
              className="max-w-xs mt-2"
            />
          )}
        </Label>
        <AddScreens
          screens={formdata.screens}
          onScreenChange={handleScreenChange}
          onAddScreen={addScreen}
          onRemoveScreen={removeScreen}
        />
        <Button
          type="submit"
          className="mt-6 text-black dark:text-black"
          disabled={loading}
        >
          Create Cinema
        </Button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

interface AddScreensProps {
  screens: ScreenState[];
  onScreenChange: (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onAddScreen: () => void;
  onRemoveScreen: (index: number) => void;
}

const AddScreens: React.FC<AddScreensProps> = ({
  screens,
  onScreenChange,
  onAddScreen,
  onRemoveScreen,
}) => {
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
              <Label title="Rows">
                <Input
                  name="rows"
                  type="number"
                  value={screen.rows}
                  onChange={(e) => onScreenChange(index, e)}
                  className="text-black dark:text-black"
                />
              </Label>
              <Label title="Screen No.">
                <Input
                  name="screenno"
                  type="number"
                  value={screen.screenno}
                  onChange={(e) => onScreenChange(index, e)}
                  className="text-black dark:text-black"
                />
              </Label>

              <Label title="Columns">
                <Input
                  name="columns"
                  type="number"
                  value={screen.columns}
                  onChange={(e) => onScreenChange(index, e)}
                  className="text-black dark:text-black"
                />
              </Label>
              <Label title="Price">
                <Input
                  name="price"
                  type="number"
                  value={screen.price}
                  onChange={(e) => onScreenChange(index, e)}
                  className="text-black dark:text-black"
                />
              </Label>
            </div>
            <Grid rows={screen.rows || 0} columns={screen.columns || 0} />
          </div>
        </SimpleAccordion>
      ))}
      <Button
        className="flex items-center justify-center w-full py-2 text-xs border border-dashed"
        size="lg"
        variant="link"
        onClick={onAddScreen}
      >
        <Plus className="w-4 h-4" /> Add Screen
      </Button>
    </div>
  );
};

interface GridProps {
  rows: number;
  columns: number;
}

const Grid: React.FC<GridProps> = ({ rows, columns }) => {
  const renderRows = () => {
    const rowElements = [];

    let currentColumns = columns; // Start with the specified number of columns

    for (let i = 0; i < rows; i++) {
      const columnElements = [];
      // Ensure we don't have negative or zero columns
      for (let j = 0; j < Math.max(currentColumns, 0); j++) {
        columnElements.push(<Square key={`${i}-${j}`} />);
      }
      rowElements.push(
        <div key={`row-${i}`} className="flex gap-1">
          {columnElements}
        </div>
      );

      currentColumns -= 5;
    }

    return (
      <div className="flex flex-col items-center gap-2 px-2 overflow-x-auto">
        {rowElements}
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderRows()}
      <CurvedScreen />
    </div>
  );
};

const CurvedScreen: React.FC = () => {
  return (
    <div className="relative flex justify-center w-full my-2 text-white">
      <div className="h-2 bg-gray-500 rounded-t-full w-96"></div>
    </div>
  );
};
