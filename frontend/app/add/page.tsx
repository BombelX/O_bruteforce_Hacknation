"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import StepOne from "@/components/PageOne";
import StepTwo from "@/components/PageTwo";
import { useRouter } from "next/navigation";
import { addItemAction, getCategoriesAction, getSubCategoriesAction } from "./action";

type SubCategoriesMap = Record<string, string[]>;

export default function Add() {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoriesMap>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showGuidelines, setShowGuidelines] = useState<boolean>(false);

  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesAction();
      console.log(data);
      if (data && data.length > 0) {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!selectedCategory) {
        // no category selected, don't modify the map
        return;
      }

      const data = await getSubCategoriesAction(categories.indexOf(selectedCategory) + 1);
      console.log(data);
      if (data && data.length > 0) {
        setSubCategories((prev) => ({
          ...prev,
          [selectedCategory]: data,
        }));
      } else {
        setSubCategories((prev) => ({
          ...prev,
          [selectedCategory]: [],
        }));
      }
    };

    fetchSubCategories();
  }, [selectedCategory, categories]);

  // const defaultSubCategories: SubCategoriesMap = {
  //   Elektronika: ["Telefon", "Słuchawki", "Laptop/Tablet", "Ładowarka/Kable", "Inne"],
  //   Dokumenty: ["Dowód osobisty", "Legitymacja", "Prawo jazdy", "Paszport", "Inne"],
  //   "Rzeczy osobiste": ["Portfel", "Klucze", "Okulary", "Biżuteria", "Plecak/Torebka", "Inne"],
  //   Odzież: ["Kurtka/Płaszcz", "Czapka/Szalik/Rękawiczki", "Buty", "Bluza/Sweter", "Inne"],
  // };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
  };

  const handleNext = () => {
    if (!selectedCategory) {
      alert("Proszę wybrać kategorię.");
      return;
    }
    if (!selectedSubCategory) {
      alert("Proszę wybrać podkategorię.");
      return;
    }
    if (!description) {
      alert("Proszę dodać krótki opis przedmiotu.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!location || !date) {
      alert("Proszę uzupełnić miejsce i datę.");
      return;
    }

    const formData = {
      category: selectedCategory,
      subCategory: selectedSubCategory || "Brak",
      description,
      location,
      date,
    };
    alert(categories);
    const result = await addItemAction(formData);

    if (result.success) {
      router.push("/add/success");
    } else {
      alert(result.message || "Wystąpił błąd podczas wysyłania formularza.");
    }
  };

  return (
    <div className="flex min-h-screen text-primary font-sans bg-blue-100 flex-col p-4 gap-4 items-center ">
      <h1 className="text-4xl font-bold mb-4 self-start md:self-center mt-10 ">
        Dodaj nowy zagubiony przedmiot
      </h1>

      <div className="w-full max-w-xs overflow-hidden">
        <div
          className="flex w-[200%] transition-transform duration-500 ease-in-out"
          style={{ transform: step === 1 ? "translateX(0%)" : "translateX(-50%)" }}
        >
          <div className="w-1/2 px-1">
            <StepOne
              categories={categories} // Przekazujemy stan
              subCategories={subCategories}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              description={description}
              onCategoryChange={handleCategoryChange}
              onSubCategoryChange={(e) => setSelectedSubCategory(e.target.value)}
              onDescriptionChange={(e) => setDescription(e.target.value)}
              onNext={handleNext}
              showGuidelines={showGuidelines}
              onGuidelinesToggle={() => setShowGuidelines(!showGuidelines)}
            />
          </div>

          <div className="w-1/2 px-1">
            <StepTwo
              location={location}
              date={date}
              setLocation={setLocation}
              setDate={setDate}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
