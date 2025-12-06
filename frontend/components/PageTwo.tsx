import { FormEvent } from "react";

interface StepTwoProps {
  location: string;
  date: string;
  setLocation: (val: string) => void;
  setDate: (val: string) => void;
  onBack: () => void;
  onSubmit: (e: FormEvent) => void;
}

export default function StepTwo({
  location,
  date,
  setLocation,
  setDate,
  onBack,
  onSubmit,
}: StepTwoProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Gdzie znaleziono?</span>
        </label>
        <input
          type="text"
          placeholder="np. Miejscowość, Ulica, Budynek"
          className="input input-bordered w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Kiedy znaleziono?</span>
        </label>
        <input
          type="date"
          className="input input-bordered w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 mt-4">
        <button type="button" onClick={onBack} className="btn btn-outline flex-1">
          Wróć
        </button>
        <button type="submit" onClick={onSubmit} className="btn btn-primary flex-1">
          Prześlij
        </button>
      </div>
    </div>
  );
}
