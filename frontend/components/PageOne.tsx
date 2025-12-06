import { ChangeEvent } from "react";

type SubCategoriesMap = Record<string, string[]>;

interface StepOneProps {
  categories: string[];
  subCategories: SubCategoriesMap;
  selectedCategory: string;
  selectedSubCategory: string;
  description: string; // Nowy prop
  onCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSubCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onDescriptionChange: (e: ChangeEvent<HTMLInputElement>) => void; // Nowy handler
  onNext: () => void;
}

export default function StepOne({
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
  description,
  onCategoryChange,
  onSubCategoryChange,
  onDescriptionChange,
  onNext,
}: StepOneProps) {
  const hasSubCategories = !!subCategories[selectedCategory];
  const showDescription =
    selectedCategory !== "" && (hasSubCategories ? selectedSubCategory !== "" : true);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Kategoria</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={selectedCategory}
          onChange={onCategoryChange}
        >
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {hasSubCategories && (
        <div className="form-control w-full animate-fade-in-down">
          <label className="label">
            <span className="label-text">Rodzaj przedmiotu</span>
          </label>
          <select
            className="select select-bordered w-full"
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
            <span className="label-text">Opis przedmiotu</span>
          </label>
          <input
            type="text"
            placeholder="Opisz przedmiot"
            className="input input-bordered w-full"
            value={description}
            onChange={onDescriptionChange}
          />
        </div>
      )}

      <button type="button" onClick={onNext} className="btn btn-primary mt-4 w-full">
        Dalej
      </button>
    </div>
  );
}
