"use client";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

enum Genre {
  Action = "Action",
  Comedy = "Comedy",
  Horror = "Horror",
  Drama = "Drama",
  Brutal = "Brutal",
  Select = "",
}

export const CreateMovie = () => {
  const [form, setForm] = useState<{
    title: string;
    director: string;
    duration: string;
    releaseDate: string;
    genre: string;
    posterUrl: string | File; // Allow both string and File
  }>({
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
    const { name, value, files } = e.target as HTMLInputElement;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: files && files[0] ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (form.posterUrl && form.posterUrl instanceof File) {
        setUploading(true);

        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${form.posterUrl.name}`);
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

      toast.success("Movie created successfully.");

      // Reset the form
      setForm({
        title: "",
        director: "",
        duration: "",
        releaseDate: "",
        genre: "",
        posterUrl: "",
      });

      setTimeout(() => {
        router.replace("/admin/listmovie");
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create movie");
      console.log(error);
      toast.error(error.message || "Failed to create movie");
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
                width={100}
                height={100}
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
      <ToastContainer
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
