import { ChangeEvent } from "react";

type SubCategoriesMap = Record<string, string[]>;

interface StepOneProps {
  categories: string[];
  subCategories: SubCategoriesMap;
  selectedCategory: string;
  selectedSubCategory: string;
  description: string;
  showGuidelines: boolean;
  onCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSubCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onDescriptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onGuidelinesToggle: () => void;
}

export default function StepOne({
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
  description,
  showGuidelines,
  onCategoryChange,
  onSubCategoryChange,
  onDescriptionChange,
  onNext,
  onGuidelinesToggle,
}: StepOneProps) {
  const hasSubCategories = !!subCategories[selectedCategory];
  const showDescription =
    selectedCategory !== "" && (hasSubCategories ? selectedSubCategory !== "" : true);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-bold font-primary">Kategoria</span>
        </label>
        <select 
          className="select select-bordered w-full bg-white border-black "
          value={selectedCategory}
          onChange={onCategoryChange}
        >
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}
            className="border-black">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {hasSubCategories && (
        <div className="form-control w-full animate-fade-in-down">
          <label className="label">
            <span className="label-text font-primary text-bold">Rodzaj przedmiotu</span>
          </label>
          <select
            className="select select-bordered w-full bg-white border-black"
            value={selectedSubCategory}
            onChange={onSubCategoryChange}
          >
            <option value="" disabled>
              Wybierz podkategorię
            </option>
            {subCategories[selectedCategory].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {showDescription && (
        <div className="form-control w-full animate-fade-in-down">
          <label className="label">
            <span className="label-text ">Opis przedmiotu</span>
            {/* Przycisk do włączania guidelines */}
            <button
              type="button"
              onClick={onGuidelinesToggle}
              className="btn btn-xs btn-circle bg-blue-100 hover:bg-blue-300 text-info border-none "
              title="Wskazówki"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 stroke-current  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </label>
          <input
            type="text"
            placeholder="Opisz przedmiot"
            className="input input-bordered w-full bg-white border-black mt-2"
            value={description}
            onChange={onDescriptionChange}
          />
        </div>
      )}

      {showGuidelines && (
        <div role="alert" className="alert alert-info text-sm animate-fade-in-down bg-blue-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            Podaj markę, kolor i cechy szczególne.{" "}
            <span className="font-bold">Pamiętaj o RODO:</span> nie wpisuj danych osobowych (np.
            imion) – opis musi być zanonimizowany, ponieważ będzie dostępny publicznie.
          </span>
        </div>
      )}

      <button type="button" onClick={onNext} className="btn btn-primary mt-4 w-full">
        Dalej
      </button>
    </div>
  );
}
