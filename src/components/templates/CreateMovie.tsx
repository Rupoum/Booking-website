import React, { useState } from "react";
import axios from "axios";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { HtmlSelect } from "../atoms/select";
import { Button } from "../atoms/button";
import { useRouter } from "next/navigation";
import { app } from "@/components/utils/config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";

enum Genre {
  Action = "Action",
  Comedy = "Comedy",
  Horror = "Horror",
  Drama = "Drama",
  Brutal = "Brutal",
}

export const CreateMovie = () => {
  const [form, setForm] = useState({
    title: "",
    director: "",
    duration: "",
    releaseDate: "",
    genre: "",
    posterUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (form.posterUrl && form.posterUrl.constructor === File) {
        setUploading(true);

        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${form.posterUrl.name}`); // Use form.posterUrl.name
        await uploadBytes(storageRef, form.posterUrl);
        const downloadURL = await getDownloadURL(storageRef);

        setImageURL(downloadURL);
        form.posterUrl = downloadURL;
      }
      const movieData = {
        ...form,
        posterUrl: imageURL || form.posterUrl,
      };

      await axios.post(
        "https://bookmyshowfinal.onrender.com/api/movie/movie",
        movieData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );

      toast.success("Movie created successfully."); // Use toast.success for success messages

      setForm({
        title: "",
        director: "",
        duration: "",
        releaseDate: "",
        genre: "",
        posterUrl: "",
      });

      router.replace("/admin/movies");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create movie");
      toast.error(error.message || "Failed to create movie"); // Use toast.error for error messages
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 flex justify-center flex-col sm:w-full gap-6 items-center">
          <div>
            <h1 className="mb-5 text-4xl font-bold">Create Movie</h1>
            <Label title="Title" error={error}>
              <Input
                placeholder="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </Label>
            <Label title="Director name" error={error}>
              <Input
                placeholder="Director name"
                name="director"
                value={form.director}
                onChange={handleChange}
              />
            </Label>
            <Label title="Duration" error={error}>
              <Input
                type="time"
                placeholder="Duration"
                name="duration"
                value={form.duration}
                onChange={handleChange}
              />
            </Label>
            <Label title="Release date" error={error}>
              <Input
                placeholder="Release date"
                type="date"
                name="releaseDate"
                value={form.releaseDate}
                onChange={handleChange}
              />
            </Label>
            <Label title="Genre" error={error}>
              <HtmlSelect
                name="genre"
                value={form.genre}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select genre
                </option>
                {Object.values(Genre).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </Label>
          </div>
          <Label title="Images" error={error}>
            <Input
              type="file"
              accept="image/*"
              name="posterUrl"
              onChange={handleChange}
            />
            {imageURL && (
              <Image
                src={imageURL}
                alt="Uploaded Poster"
                style={{ maxWidth: "200px" }}
              />
            )}
          </Label>
        </div>
        <div className="flex justify-center items-center ">
          <Button loading={loading || uploading} type="submit">
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer // Add ToastContainer here
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
