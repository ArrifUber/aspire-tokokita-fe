import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Description, TextArea } from "@heroui/react";

export default function DescriptionField({ form, updateField }) {
  return (
    <>
      <div className="flex gap-4 items-center">
        <div className="bg-green-100 p-2 rounded-md w-14 h-14 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faFileLines}
            size="xl"
            className="text-primary"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">4. Deskripsi</h2>{" "}
          <p className="text-slate-500 text-sm">
            Jelaskan produk anda secara detail.
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-center flex-col">
        <TextArea
          aria-label="Deskripsi Produk"
          id="description"
          placeholder="Masukkan deskripsi tentang produk..."
          rows={6}
          style={{ resize: "vertical" }}
          className="w-full"
          name="description"
          value={form.description}
          onChange={(e) => updateField("description")(e.target.value)}
        />
        <Description className="self-start">Deskripsi yang baik dapat membantu meningkatkan penjualan.</Description>
      </div>
    </>
  );
}
